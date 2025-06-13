<script setup lang="ts">
/**
 * App.vue 是应用的根组件
 * 负责全局布局和路由视图展示
 */
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="app-container">
    <!-- 路由视图，用于显示当前路由对应的组件 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
/* 全局样式 */
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
