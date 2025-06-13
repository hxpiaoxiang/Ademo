<script setup lang="ts">
/**
 * 预览页面组件
 * 用于根据路由参数加载对应的页面内容进行预览
 */
import { ref, computed, shallowRef, defineAsyncComponent } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import PhoneFrame from '../components/PhoneFrame/index.vue';
import MarkdownViewer from '../components/MarkdownViewer/index.vue';

// 导入页面组件映射和页面配置
import { pageComponents, appPages } from '../router';

const router = useRouter();
const route = useRoute();

// 获取当前页面ID
const pageId = computed(() => route.params.id as string);

// 获取当前页面配置
const currentPage = computed(() => {
  return appPages.find(page => page.id === pageId.value) || null;
});

// 返回展示页面
const goToHome = () => {
  router.push('/');
};

// 页面内容组件
const PageContent = computed(() => {
  if (!pageId.value || !pageComponents[pageId.value]) return null;
  
  // 使用路由中定义的组件映射动态加载组件
  return defineAsyncComponent(pageComponents[pageId.value]);
});
</script>

<template>
  <div class="preview-container" v-if="currentPage">
    <div class="preview-content">
      <!-- 手机样机，预览模式 -->
      <PhoneFrame :title="currentPage.title" :isPreview="true">
        <component :is="PageContent" v-if="PageContent"></component>
        <div v-else class="no-content">
          <van-empty description="无法加载页面内容" />
        </div>
      </PhoneFrame>
    </div>
    
    <!-- 右侧说明文档 -->
    <div class="preview-docs">
      <!-- <h2>{{ currentPage.title }}</h2> -->
      <div class="docs-content">
        <MarkdownViewer :docPath="currentPage.docPath" />
      </div>
      
      <div class="preview-actions">
        <van-button type="primary" @click="goToHome">返回页面列表</van-button>
      </div>
    </div>
  </div>
  <div v-else class="error-container">
    <van-empty description="页面不存在" />
    <van-button type="primary" @click="goToHome" style="margin-top: 20px;">返回页面列表</van-button>
  </div>
</template>

<style scoped>
.preview-container {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f5f5f5;
}

.preview-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.preview-docs {
  width: 1000px;
  background-color: #fff;
  border-left: 1px solid #eee;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.docs-content {
  flex: 1;
}

.preview-docs h2 {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

:deep(.preview-docs h3) {
  margin: 20px 0 10px;
  font-size: 16px;
  color: #333;
}

:deep(.preview-docs p), :deep(.preview-docs li) {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 8px;
}

:deep(.preview-docs ul) {
  padding-left: 20px;
}

.preview-actions {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.error-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}

/* 首页样式 */
.home-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.app-header {
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.app-header h2 {
  margin: 0;
  font-size: 18px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px;
  background-color: #fff;
  margin: 12px 0;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #e8f4ff;
}

.feature-name {
  font-size: 12px;
}

.news-list {
  background-color: #fff;
  flex: 1;
  padding: 12px 16px;
}

.news-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.news-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.news-desc {
  font-size: 12px;
  color: #999;
}

.news-time {
  font-size: 12px;
  color: #999;
}

/* 成功页面样式 */
.success-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
}

.success-icon {
  margin-bottom: 20px;
}

.success-title {
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 12px;
}

.success-desc {
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
}

.success-info {
  width: 100%;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  color: #999;
  font-size: 14px;
}

.info-value {
  color: #333;
  font-size: 14px;
}

.success-btn {
  width: 100%;
}

.no-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
}
</style>