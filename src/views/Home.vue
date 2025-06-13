<script setup lang="ts">
/**
 * 展示页面组件
 * 用于展示APP所有功能页面列表
 */
import { ref, shallowRef, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';
import { Icon as VanIcon, Popup, Button } from 'vant';
import PhoneFrame from '../components/PhoneFrame/index.vue';
// 导入页面组件映射和页面配置
import { pageComponents, appPages } from '../router';

// 控制使用说明弹窗的显示/隐藏
const showGuidePopup = ref(false);

/**
 * 打开使用说明弹窗
 */
const openGuidePopup = () => {
  showGuidePopup.value = true;
};

/**
 * 关闭使用说明弹窗
 */
const closeGuidePopup = () => {
  showGuidePopup.value = false;
};

const router = useRouter();

// 使用路由中定义的页面配置
const pages = ref(appPages);

/**
 * 跳转到预览页面
 * @param pageId 页面ID
 */
const goToPreview = (pageId: string) => {
  router.push(`/preview/${pageId}`);
};

/**
 * 异步加载页面组件
 * @param pageId 页面ID
 * @returns 对应的组件
 */
const getPageComponent = (pageId: string) => {
  if (pageComponents[pageId]) {
    // 使用defineAsyncComponent异步加载组件
    return defineAsyncComponent(pageComponents[pageId]);
  }
  return null;
};

/**
 * 获取页面对应的颜色
 * @param pageId 页面ID
 * @returns 颜色代码
 */
const getPageColor = (pageId: string): string => {
  const page = pages.value.find(p => p.id === pageId);
  return page?.color || '#969799';
};
</script>

<template>
  <div class="home-container">
    <div class="header-container">
      <h1 class="page-title">APP设计文档</h1>
      <button class="guide-button" @click="openGuidePopup">
        <van-icon name="question-o" />
        <span>使用说明</span>
      </button>
    </div>
    
    <!-- 使用说明弹窗 -->
    <van-popup
      v-model:show="showGuidePopup"
      round
      position="center"
      :style="{ width: '90%', maxWidth: '500px' }"
      class="guide-popup"
    >
      <div class="popup-header">
        <h2>使用说明</h2>
        <van-icon name="cross" @click="closeGuidePopup" class="close-icon" />
      </div>
      <div class="popup-content">
        <div class="guide-section">
          <h3>基本操作</h3>
          <ul>
            <li><van-icon name="eye-o" /> <b>浏览页面</b>：在主页查看所有功能页面的缩略图</li>
            <li><van-icon name="play-circle-o" /> <b>预览模式</b>：点击页面名称进入全屏预览</li>
            <li><van-icon name="description" /> <b>查看文档</b>：预览模式下右侧可查看页面说明文档</li>
          </ul>
        </div>
        <div class="guide-section">
          <h3>页面交互</h3>
          <ul>
            <li><van-icon name="exchange" /> <b>页面切换</b>：预览模式下可通过顶部导航切换页面</li>
            <li><van-icon name="back-top" /> <b>返回主页</b>：点击左上角返回按钮回到主页</li>
            <li><van-icon name="scroll" /> <b>内容滚动</b>：页面内容超出显示区域时可上下滚动</li>
          </ul>
        </div>
      </div>
      <div class="popup-footer">
        <van-button type="primary" block @click="closeGuidePopup">我知道了</van-button>
      </div>
    </van-popup>
    
    <div class="pages-grid">
      <!-- 遍历页面列表 -->
      <div v-for="page in pages" :key="page.id" class="page-item">
        <PhoneFrame :title="page.title">
          <!-- 动态加载子页面组件 -->
          <component :is="getPageComponent(page.id)" v-if="getPageComponent(page.id)" />
          <!-- 当组件不存在时显示占位符 -->
          <div v-else class="preview-placeholder">
            <van-icon name="warning-o" size="48" :color="getPageColor(page.id)" />
            <div class="preview-text">{{ page.title }}</div>
          </div>
        </PhoneFrame>
        
        <!-- 页面名称，点击进入预览 -->
        <div class="page-name" @click="goToPreview(page.id)">
          {{ page.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  width: 100%;
  padding: 20px;
  padding-top: 80px; /* 为固定的标题留出空间 */
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 15px 20px;
  background-color: #fff;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.page-title {
  text-align: left;
  font-size: 28px;
  color: #333;
  margin: 0;
}

.guide-button {
  display: flex;
  align-items: center;
  background-color: #e3f2fd;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(33, 150, 243, 0.1);
}

.guide-button:hover {
  background-color: #bbdefb;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.2);
}

.guide-button span {
  margin-left: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #1976d2;
}

/* 弹窗样式 */
.guide-popup {
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.popup-header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.close-icon {
  font-size: 20px;
  color: #999;
  cursor: pointer;
}

.close-icon:hover {
  color: #666;
}

.popup-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.popup-footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
}

.guide-section {
  margin-bottom: 20px;
}

.guide-section:last-child {
  margin-bottom: 0;
}

.guide-section h3 {
  font-size: 16px;
  margin-bottom: 12px;
  color: #333;
  font-weight: 500;
}

.guide-section ul {
  padding-left: 16px;
  margin: 0;
}

.guide-section li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  line-height: 1.5;
}

.guide-section li:last-child {
  margin-bottom: 0;
}

.guide-section li .van-icon {
  margin-right: 8px;
  color: #1976d2;
  flex-shrink: 0;
}

.pages-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
}

.page-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-name {
  margin-top: 1px;
  font-size: 16px;
  font-weight: 500;
  color: #2196f3;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  background-color: #f0f9ff;
  border-radius: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(33, 150, 243, 0.1);
}

.page-name:hover {
  background-color: #e3f2fd;
  color: #1976d2;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(33, 150, 243, 0.2);
}

/* 预览占位符样式 */
.preview-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
}

.preview-text {
  margin-top: 16px;
  font-size: 16px;
  color: #666;
}
</style>