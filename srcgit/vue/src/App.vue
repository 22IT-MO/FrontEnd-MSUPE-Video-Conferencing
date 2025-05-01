<template>
  <div>
    <link rel="preload" href="@/assets/img/mainblack.png" as="image">
    <link rel="preload" href="@/assets/img/mainwhite.png" as="image">
    <link rel="preload" href="@/assets/img/enterblack.png" as="image">
    <link rel="preload" href="@/assets/img/enterwhite.png" as="image">
    
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import themeService from './services/theme';

export default {
  mounted() {
    // Инициализация темы при запуске приложения
    themeService.initTheme();
    
    // Предварительная загрузка изображений
    const images = [
      require('@/assets/img/mainblack.png'),
      require('@/assets/img/mainwhite.png'),
      require('@/assets/img/enterblack.png'),
      require('@/assets/img/enterwhite.png')
    ];
    
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
}
</script>

<style>
@import './assets/styles.css';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Анимации переходов между страницами */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Анимация сдвига */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from {
  transform: translateX(50px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
