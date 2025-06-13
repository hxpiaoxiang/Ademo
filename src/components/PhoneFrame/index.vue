<script setup lang="ts">
/**
 * 手机样机组件
 * 用于包裹APP页面内容，提供统一的手机外观和状态栏
 */
import { ref } from 'vue';

// 定义组件属性
defineProps({
  // 页面标题
  title: {
    type: String,
    default: '页面标题'
  },
  // 是否为预览模式（全屏展示）
  isPreview: {
    type: Boolean,
    default: false
  }
});

// 当前时间
const currentTime = ref(new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));

// 更新时间
setInterval(() => {
  currentTime.value = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
}, 60000); // 每分钟更新一次
</script>

<template>
  <div class="phone-frame" :class="{ 'preview-mode': isPreview }">
    <!-- 手机外壳 -->
    <div class="phone-outer">
      <!-- 状态栏 -->
      <div class="status-bar">
        <span class="time">{{ currentTime }}</span>
        <div class="status-icons">
          <van-icon name="wifi" />
          <van-icon name="signal" />
          <van-icon name="battery-o" />
        </div>
      </div>
      
      <!-- 内容区域 -->
      <div class="phone-content hide-scrollbar">
        <slot></slot>
      </div>
    </div>
    
    <!-- 页面标题已移除 -->
  </div>
</template>

<style scoped>
.phone-frame {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.phone-outer {
  width: 280px;
  height: 560px;
  background-color: #fff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border: 8px solid #333;
  position: relative;
}

.status-bar {
  height: 28px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  font-size: 12px;
  color: #333;
}

.status-icons {
  display: flex;
  gap: 4px;
}

.phone-content {
  height: 504px; /* 560 - 8*2(边框) - 28(状态栏) - 12(底部安全区) */
  overflow-y: auto;
  background-color: #f8f8f8;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* 页面标题样式已移除 */

/* 预览模式样式 */
.preview-mode .phone-outer {
  width: calc(80vh * 9 / 18);
  height: 80vh;
}

.preview-mode .phone-content {
  height: calc(80vh - 16px - 28px - 12px); /* 减去边框、状态栏和底部安全区 */
}
</style>