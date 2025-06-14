import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import fs from 'fs'
import type { Plugin } from 'vite'

// 自定义插件：复制 Markdown 文件到构建输出目录
function copyMarkdownPlugin(): Plugin {
  return {
    name: 'vite-plugin-copy-markdown',
    // 在构建结束后执行
    closeBundle() {
      // 源目录和目标目录
      const srcDir = resolve(__dirname, 'src/views')
      const destDir = resolve(__dirname, 'dist/src/views')

      // 递归复制函数
      function copyDir(src: string, dest: string) {
        // 确保目标目录存在
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true })
        }

        // 读取源目录内容
        const entries = fs.readdirSync(src, { withFileTypes: true })

        // 遍历目录内容
        for (const entry of entries) {
          const srcPath = resolve(src, entry.name)
          const destPath = resolve(dest, entry.name)

          // 如果是目录，递归复制
          if (entry.isDirectory()) {
            copyDir(srcPath, destPath)
          }
          // 复制除vue文件外的所有文件到目标目录
          else if (!entry.name.endsWith('.vue')) {
            fs.copyFileSync(srcPath, destPath)
            console.log(`Copied: ${srcPath} -> ${destPath}`)
          }
        }
      }

      // 开始复制
      copyDir(srcDir, destDir)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copyMarkdownPlugin()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
