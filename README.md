# APP设计文档

## 项目概述
产品经理可以利用cursor、trae等AI IDE生成产品原型及设计文档的工具。核心思路是搭建好框架，让大模型针对单个页面输出，降低大模型token需求。
需要nodejs环境,打包后需要用部署在nginx等网页服务器上。

## 核心功能

### 1. 展示页面
  - 平铺展示APP功能页面，每个页面用统一安卓样机包裹（含固定状态栏）
  - 样机下方标注页面名称，点击名称跳转当前页面预览模式

### 2. 预览模式
  - 全屏展示单个页面
  - 支持页面间跳转
  - 右侧显示页面说明文档

## 技术实现
- 框架：Vue 3 + TypeScript + Vite
- UI组件：Vant
- 页面渲染：Vue Router
- 页面内容：HTML片段
- 页面说明：Markdown
- 数据：MockJS模拟接口

## 项目结构

```
├── index.html           # 入口HTML文件
├── public/              # 静态资源目录
│   └── vite.svg         # 网站图标
├── src/                 # 源代码目录
│   ├── assets/          # 资源文件
│   ├── components/      # 公共组件
│   │   ├── MarkdownViewer/  # Markdown渲染组件
│   │   └── PhoneFrame/      # 手机样机组件
│   ├── mock/            # 模拟数据
│   ├── router/          # 路由配置
│   ├── views/           # 页面组件
│   │   ├── Home.vue     # 主展示页面
│   │   ├── Preview.vue  # 预览页面
│   │   ├── HomePage/    # 示例首页功能
│   │   │   ├── index.vue  # 页面组件
│   │   │   └── README.md  # 示例页面说明文档
│   │   └── SubmitSuccess/ # 示例提交成功页面
│   │       ├── index.vue  # 页面组件
│   │       └── README.md  # 示例页面说明文档
│   ├── App.vue          # 根组件
│   └── main.ts          # 入口文件
├── vite.config.ts       # Vite配置
├── package.json         # 项目依赖
├── tsconfig.json        # TypeScript配置入口
├── tsconfig.app.json    # 应用TypeScript配置
└── tsconfig.node.json   # Node.js TypeScript配置
```

## 页面管理指南

### 添加新页面

1. **创建页面目录和文件**

   在 `src/views/` 目录下创建新的页面目录，例如 `NewPage`，并添加以下文件：
   
   ```
   src/views/NewPage/
   ├── index.vue    # 页面组件
   └── README.md    # 页面说明文档
   ```

2. **编写页面组件**

   在 `index.vue` 中实现页面内容;

3. **编写页面说明文档**

   在 `README.md` 中添加页面说明;
   支持使用mermaid语法绘制流程图;
   图片存放与`src/views/NewPage/`目录下，markdown文档中使用相对路径引用图片;

4. **注册路由**

   在 `src/router/index.ts` 文件中添加页面组件导入和配置：

   ```typescript
   // 在pageComponents中添加
   const pageComponents: PageComponentsMap = {
     // 已有内容...
     'new-page': () => import('../views/NewPage/index.vue'),
   }

   // 在appPages中添加
   const appPages = [
     // 已有内容...
     {
       id: 'new-page',
       title: '新页面',
       path: '/new-page',
       docPath: '/src/views/NewPage/README.md',
       color: '#ff9800', // 页面主题色
       icon: 'star-o',   // 页面图标
       description: '新页面的简要描述'
     }
   ];
   ```
### 添加页面跳转

1. **预览模式路径（建议配置为此路径）**
   
   预览模式访问路径为 `/preview/{page-id}`，例如:
   ```
   /preview/home           # 首页预览
   /preview/submit-success # 提交成功页预览
   ```

2. **展示页面路径**
   
   页面直接访问路径为 `/{page-id}`，例如:
   ```
   /home           # 首页
   /submit-success # 提交成功页
   ```

### 删除页面

1. **删除页面文件**

   删除 `src/views/` 目录下对应的页面目录及其文件。

2. **移除路由配置**

   在 `src/router/index.ts` 文件中：
   
   - 从 `pageComponents` 中移除对应页面的导入
   - 从 `appPages` 数组中移除对应页面的配置

   ```typescript
   // 移除以下内容
   'page-to-remove': () => import('../views/PageToRemove/index.vue'),

   // 移除以下对象
   {
     id: 'page-to-remove',
     title: '要删除的页面',
     // 其他配置...
   }
   ```


## 使用指南

### 安装依赖

```bash
npm install
```

### 绘制原型、生成文档

让大模型生成页面组件和说明文档即可

### 启动开发服务器预览

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```