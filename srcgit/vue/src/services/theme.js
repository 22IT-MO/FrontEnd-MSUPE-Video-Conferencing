export default {
  // Получить текущую тему
  getCurrentTheme() {
    return localStorage.getItem('theme') || 'dark';
  },

  // Установить тему
  setTheme(theme) {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  },

  // Переключить тему
  toggleTheme() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  },

  // Инициализация темы при запуске
  initTheme() {
    const theme = this.getCurrentTheme();
    this.setTheme(theme);
    return theme;
  }
}; 