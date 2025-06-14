<script setup lang="ts">
/**
 * 首页组件
 * 用于展示APP首页内容
 */
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 * 功能项点击处理函数
 * @param index 功能项索引
 */
const handleFeatureClick = (index: number) => {
  // 当点击功能1时，跳转到提交成功页面
  if (index === 1) {
    router.push('/preview/submit-success');
  }
};
</script>

<template>
  <div class="home-page">
    <div class="app-header">
      <h2>我的应用</h2>
    </div>
    <div class="feature-grid">
      <div class="feature-item" v-for="i in 6" :key="i" @click="handleFeatureClick(i)" :class="{ 'clickable': i === 1 }">
        <div class="feature-icon"></div>
        <div class="feature-name">功能{{ i }}</div>
      </div>
    </div>
    <div class="news-list">
      <div class="news-item" v-for="i in 3" :key="i">
        <div class="news-content">
          <div class="news-title">消息标题{{ i }}</div>
          <div class="news-desc">这是一条示例消息内容</div>
        </div>
        <div class="news-time">10:0{{ i }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 首页样式 */
.home-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fa;
}

.app-header {
  padding: 16px;
  background-color: #fff;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.app-header h2 {
  margin: 0;
  font-size: 18px;
  color: #323233;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 0 16px;
  margin-bottom: 16px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 12px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  background-color: #1989fa;
  border-radius: 8px;
  margin-bottom: 8px;
}

.feature-name {
  font-size: 12px;
  color: #323233;
}

.news-list {
  padding: 0 16px;
}

.news-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
}

.news-item:last-child {
  margin-bottom: 0;
}

.news-content {
  flex: 1;
}

.news-title {
  font-size: 14px;
  color: #323233;
  margin-bottom: 4px;
}

.news-desc {
  font-size: 12px;
  color: #969799;
}

.news-time {
  font-size: 12px;
  color: #969799;
  margin-left: 8px;
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

/* 可点击的功能项样式 */
.feature-item.clickable {
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.feature-item.clickable:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.feature-item.clickable .feature-icon {
  background-color: #07c160; /* 使用提交成功页面的绿色 */
}

.feature-item.clickable .feature-name {
  color: #07c160;
  font-weight: 500;
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
</style>