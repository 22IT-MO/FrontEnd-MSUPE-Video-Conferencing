<template>
  <button @click="toggleTheme" class="theme-toggle" :title="getThemeTitle">
    <i :class="['fas', isDarkTheme ? 'fa-sun' : 'fa-moon']"></i>
  </button>
</template>

<script>
import themeService from '@/services/theme';

export default {
  name: 'ThemeToggle',
  data() {
    return {
      currentTheme: 'dark'
    };
  },
  computed: {
    isDarkTheme() {
      return this.currentTheme === 'dark';
    },
    getThemeTitle() {
      return this.isDarkTheme ? this.$t('themeToggle.lightMode') : this.$t('themeToggle.darkMode');
    }
  },
  methods: {
    toggleTheme() {
      this.currentTheme = themeService.toggleTheme();
    }
  },
  mounted() {
    this.currentTheme = themeService.getCurrentTheme();
  }
};
</script>

<style scoped>
.theme-toggle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--theme-icon-color);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 10px;
}

.theme-toggle:hover {
  background: var(--menu-hover-bg-color);
  transform: rotate(30deg);
}
</style>
