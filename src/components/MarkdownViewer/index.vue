<script setup lang="ts">
/**
 * Markdown文档查看器组件
 * 用于加载和渲染Markdown文件内容
 * 支持Mermaid图表渲染
 */
import { ref, onMounted, watch, nextTick } from 'vue';
import { marked } from 'marked';
import mermaid from 'mermaid';

interface Props {
  // Markdown文档路径
  docPath: string;
  // 是否自动加载文档
  autoLoad?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  autoLoad: true
});

// 文档内容
const docContent = ref('');
// 加载状态
const loading = ref(false);
// 加载错误信息
const error = ref('');

// 获取文档的基础路径，用于处理图片等相对路径资源
const getDocBasePath = (docPath: string): string => {
  // 从文档路径中提取基础目录路径
  const lastSlashIndex = docPath.lastIndexOf('/');
  return lastSlashIndex !== -1 ? docPath.substring(0, lastSlashIndex + 1) : '/';
};

// 配置marked解析器，处理mermaid代码块和图片路径
const configureMermaidRenderer = (docPath: string) => {
  const renderer = new marked.Renderer();
  const originalCodeRenderer = renderer.code.bind(renderer);
  const originalImageRenderer = renderer.image.bind(renderer);
  const basePath = getDocBasePath(docPath);
  
  // 重写code渲染器，特殊处理mermaid代码块
  renderer.code = (code, language, escaped) => {
    if (language === 'mermaid') {
      return `<pre class="mermaid">${code}</pre>`;
    }
    return originalCodeRenderer(code, language, escaped);
  };
  
  // 重写image渲染器，处理图片路径
  renderer.image = (href, title, text) => {
    // 如果href是相对路径（不以http://、https://或/开头），则将其转换为基于文档路径的路径
    if (href && !href.match(/^(https?:\/\/|\/)/) && basePath) {
      href = basePath + href;
    }
    
    // 使用原始渲染器生成HTML
    return originalImageRenderer(href, title, text);
  };
  
  // 应用自定义渲染器
  marked.setOptions({ renderer });
};

// 处理Markdown中的图片尺寸语法 =WIDTHxHEIGHT
const processImageSizeInMarkdown = (text: string): string => {
  // 匹配 ![alt](url =WIDTHxHEIGHT) 格式
  return text.replace(/!\[(.*?)\]\((.*?)\s+=\s*(\d+)x(\d+)\s*\)/g, (match, alt, url, width, height) => {
    console.log(`处理图片尺寸: ${match}`);
    return `<img src="${url}" alt="${alt || ''}" style="width:${width}px;height:${height}px;">`;
  });
};


/**
 * 处理HTML内容中的img标签src属性
 * 将相对路径转换为基于文档路径的绝对路径
 */
const processHtmlImgTags = (html: string, basePath: string): string => {
  // 使用正则表达式匹配所有img标签
  return html.replace(/<img([^>]*)src=['"](?!https?:\/\/)(?!\/)([^'"]+)['"]([^>]*)>/gi, (match, beforeSrc, src, afterSrc) => {
    // 将相对路径转换为基于文档路径的路径
    return `<img${beforeSrc}src="${basePath}${src}"${afterSrc}>`;
  });
};

// 加载markdown文档
const loadMarkdown = async (path: string) => {
  if (!path) return;
  
  loading.value = true;
  error.value = '';
  
  try {
    // 配置marked解析器，传入文档路径以处理相对路径
    configureMermaidRenderer(path);
    
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`加载文档失败: ${response.status} ${response.statusText}`);
    }
    
    // 获取原始文本
    let text = await response.text();
    
    // 处理图片尺寸语法
    text = processImageSizeInMarkdown(text);
    
    // 使用marked解析处理后的文本
    let html = marked(text);
    
    // 处理HTML内容中的img标签
    const basePath = getDocBasePath(path);
    html = processHtmlImgTags(html, basePath);
    
    docContent.value = html;
  } catch (err) {
    console.error('加载文档失败:', err);
    error.value = err instanceof Error ? err.message : '加载文档失败';
  } finally {
    loading.value = false;
  }
};

// 暴露方法给父组件
defineExpose({
  loadMarkdown
});

// 监听文档路径变化
watch(() => props.docPath, (newPath) => {
  if (props.autoLoad && newPath) {
    loadMarkdown(newPath);
  }
});

// 初始化Mermaid配置
const initMermaid = () => {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose', // 允许点击事件
    fontFamily: 'sans-serif'
  });
};

// 渲染Mermaid图表
const renderMermaidDiagrams = async () => {
  // 等待DOM更新
  await nextTick();
  
  try {
    // 查找所有mermaid代码块
    const elements = document.querySelectorAll('.markdown-content pre.mermaid');
    
    if (elements.length > 0) {
      // 重置已处理的图表，避免重复渲染错误
      // 在mermaid 11.6.0中，reset方法可能已经改变位置或移除
      try {
        // 尝试使用新版API重置配置
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'sans-serif'
        });
      } catch (e) {
        console.warn('重置mermaid配置失败:', e);
      }
      
      // 渲染每个mermaid图表
      elements.forEach((element, index) => {
        const id = `mermaid-diagram-${index}`;
        element.id = id;
        try {
          // 确保element是HTMLElement类型
          if(element instanceof HTMLElement) {
            mermaid.run({
              nodes: [element]
            });
          }
        } catch (err) {
          console.error('渲染Mermaid图表失败:', err);
          // 确保err是Error类型
          const errorMessage = err instanceof Error ? err.message : '未知错误';
          element.innerHTML = `<div class="mermaid-error">图表渲染失败: ${errorMessage}</div>`;
        }
      });
    }
  } catch (err) {
    console.error('处理Mermaid图表时出错:', err);
  }
};

// 监听文档内容变化，渲染Mermaid图表
watch(docContent, () => {
  if (docContent.value) {
    renderMermaidDiagrams();
  }
});

// 组件挂载时初始化
onMounted(() => {
  // 初始化Mermaid
  initMermaid();
  
  // 自动加载文档
  if (props.autoLoad && props.docPath) {
    loadMarkdown(props.docPath);
  }
});
</script>

<template>
  <div class="markdown-viewer">
    <!-- 加载中状态 -->
    <div v-if="loading" class="loading-state">
      <van-loading type="spinner" color="#1989fa" />
      <span>加载文档中...</span>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="error" class="error-state">
      <van-icon name="warning-o" size="24" color="#ee0a24" />
      <div class="error-message">{{ error }}</div>
      <van-button size="small" type="primary" @click="loadMarkdown(props.docPath)">
        重试
      </van-button>
    </div>
    
    <!-- 文档内容 -->
    <div v-else class="markdown-content" v-html="docContent"></div>
  </div>
</template>

<style scoped>
.markdown-viewer {
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.loading-state,
.error-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  padding: 20px;
  text-align: center;
}

.error-message {
  margin: 12px 0;
  color: #ee0a24;
}

.markdown-content {
  padding: 0 4px;
}

/* Markdown样式 */
:deep(h1) {
  font-size: 24px;
  margin-bottom: 16px;
  color: #333;
}

:deep(h2) {
  font-size: 20px;
  margin: 24px 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  color: #333;
}

:deep(h3) {
  font-size: 18px;
  margin: 20px 0 12px;
  color: #333;
}

:deep(p) {
  margin-bottom: 16px;
  line-height: 1.6;
  color: #666;
}

:deep(ul), :deep(ol) {
  padding-left: 24px;
  margin-bottom: 16px;
}

:deep(li) {
  margin-bottom: 8px;
  line-height: 1.6;
  color: #666;
}

:deep(code) {
  background-color: #f5f5f5;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9em;
  color: #d56161;
}

:deep(pre) {
  background-color: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
  margin-bottom: 16px;
}

:deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: #333;
}

/* Mermaid图表样式 */
:deep(pre.mermaid) {
  background-color: transparent;
  text-align: center;
  padding: 8px 0;
}

:deep(.mermaid-error) {
  color: #ee0a24;
  padding: 8px;
  border: 1px dashed #ee0a24;
  border-radius: 4px;
  font-size: 14px;
}

:deep(blockquote) {
  border-left: 4px solid #ddd;
  padding-left: 16px;
  color: #777;
  margin: 0 0 16px;
}

:deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 16px;
}

:deep(th), :deep(td) {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}

:deep(th) {
  background-color: #f5f5f5;
  font-weight: 500;
}
</style>