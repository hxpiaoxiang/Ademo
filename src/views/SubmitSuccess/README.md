# 提交成功页面

## 文件存放
 - 编写readme.md保存在页面目录下即可，打包时会自动将文档打包到`dist`目录下;

## 流程图
流程图是 Mermaid 中最常用的图表类型之一。通过 `flowchart` 或 `graph` 声明流程图类型，并指定排列方向：
- `TB`：自上而下
- `BT`：自下而上
- `LR`：从左到右
- `RL`：从右到左

示例：
```mermaid
flowchart LR
A[开始] --> B[处理]
B --> C[结束]
```

## 图片
 - 图片存放与`src/views/{pagename}/`目录下，文档中使用相对路径引用图片;
 - 支持Markdown语法的图片引用及HTML标签形式的图片引用；