<script setup lang="ts">
/**
 * 提交成功页面组件
 * 用于展示提交成功状态和相关信息
 */
import { useRouter } from 'vue-router';

const router = useRouter();

// 返回首页 - 直接跳转到预览模式的首页
const goToHome = () => {
  router.push('/preview/home');
};

</script>

<template>
  <div class="success-page">
    <div class="success-icon">
      <van-icon name="success" size="48" color="#07c160" />
    </div>
    <div class="success-title">提交成功</div>
    <div class="success-desc">您的申请已提交，我们将尽快处理</div>
    <div class="success-info">
      <div class="info-item">
        <span class="info-label">申请编号</span>
        <span class="info-value">2023060112345</span>
      </div>
      <div class="info-item">
        <span class="info-label">提交时间</span>
        <span class="info-value">2023-06-01 12:34:56</span>
      </div>
    </div>
    <div class="success-btn">
      <van-button type="primary" block @click="goToHome">返回首页</van-button>
    </div>
  </div>
</template>

<style scoped>
/* 成功页面样式 */
.success-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
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
  color: #323233;
  margin-bottom: 8px;
}

.success-desc {
  font-size: 14px;
  color: #969799;
  margin-bottom: 24px;
}

.success-info {
  width: 100%;
  background-color: #f7f8fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.info-item:last-child {
  margin-bottom: 0;
}

.info-label {
  color: #969799;
  font-size: 14px;
}

.info-value {
  color: #323233;
  font-size: 14px;
}

.success-btn {
  width: 100%;
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
</style>