# 首页

## 文件存放
 - 编写readme.md保存在页面目录下即可，打包时会自动将文档打包到`dist`目录下;

## 流程图
 - 支持mermaid流程图, 示例如下:

```mermaid
graph TD
    A[开始] --> B{判断}
    B --> C[是]
    B --> D[否]
    C --> E[结束]
    D --> E
```

## 图片
 - 图片存放与`src/views/{pagename}/`目录下，文档中使用相对路径引用图片;
 - 支持Markdown语法的图片引用及HTML标签形式的图片引用；
 - 示例如下：  
<img src="img/2025-06-14-14-47-24.png" alt="html标签" style="height:300px;" /><br>
 html标签引用<br>
![markdown图片引用](img/2025-06-14-14-47-24.png =150x300)<br>
 markdown图片引用