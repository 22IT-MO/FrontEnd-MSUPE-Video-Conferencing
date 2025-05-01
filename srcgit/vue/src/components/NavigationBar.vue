<template>
  <div class="navigation">
    <a href="/" class="logo">Testname</a>
    <div class="nav-links">
      <router-link :to="{ name: 'Home' }" class="nav-link">{{ $t('nav.home') }}</router-link>
      <router-link :to="{ name: 'Login' }" class="nav-link" v-if="!isAuthenticated">{{ $t('nav.login') }}</router-link>
      <router-link :to="{ name: 'Register' }" class="nav-link" v-if="!isAuthenticated">{{ $t('nav.register') }}</router-link>
      <a href="#" class="nav-link" @click.prevent="logout" v-if="isAuthenticated">{{ $t('nav.logout') }}</a>
      <LanguageSelector />
      <ThemeToggle />
    </div>
  </div>
</template>

<script>
import ThemeToggle from '@/components/ThemeToggle.vue';
import LanguageSelector from '@/components/LanguageSelector.vue';
import authService from '@/services/auth';

export default {
  name: 'NavigationBar',
  components: {
    ThemeToggle,
    LanguageSelector
  },
  data() {
    return {
      isAuthenticated: false
    };
  },
  methods: {
    async logout() {
      try {
        await authService.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
    checkAuthStatus() {
      // Здесь будет проверка аутентификации пользователя
      // Для простоты считаем, что пользователь аутентифицирован, если находится на странице профиля
      const isProfilePage = this.$route.name === 'Profile';
      this.isAuthenticated = isProfilePage;
    }
  },
  created() {
    this.checkAuthStatus();
  },
  watch: {
    $route() {
      this.checkAuthStatus();
    }
  }
}
</script>

<style scoped>
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 4rem;
  position: relative;
  z-index: 100;
  background: var(--secondary-bg-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.logo {
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-color);
  text-decoration: none;
  letter-spacing: 1px;
  transition: color 0.3s ease;
}

.logo:hover {
  opacity: 0.8;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: var(--nav-text-color);
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  height: 40px;
  display: flex;
  align-items: center;
}

.nav-link:hover {
  color: var(--link-color);
  background: var(--menu-hover-bg-color);
}

.nav-link.router-link-active {
  color: var(--accent-color);
  background: var(--menu-hover-bg-color);
}
</style>
