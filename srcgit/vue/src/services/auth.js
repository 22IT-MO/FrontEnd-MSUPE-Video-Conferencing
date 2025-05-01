// Имитация сервиса аутентификации для демонстрационных целей
export default {
  login(email, password) {
    return new Promise((resolve) => {
      // Имитация задержки запроса к серверу
      setTimeout(() => {
        // В реальном приложении здесь был бы запрос к API
        localStorage.setItem('isAuthenticated', 'true');
        resolve({ success: true });
      }, 500);
    });
  },

  register(name, email, password) {
    return new Promise((resolve) => {
      // Имитация задержки запроса к серверу
      setTimeout(() => {
        // В реальном приложении здесь был бы запрос к API
        resolve({ success: true });
      }, 500);
    });
  },

  logout() {
    localStorage.removeItem('isAuthenticated');
    return Promise.resolve();
  },

  checkAuth() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}; 