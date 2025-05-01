<template>
  <div class="login-container">
    <NavigationBar />
    
    <div class="login-box" :class="{ 'input-focused': isFocused, 'very-small-screen': isSmallScreen, 'mobile-device': isMobile }">
      <h1>{{ $t('login.title') }}</h1>
      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="input-group">
          <i class="fas fa-envelope input-icon"></i>
          <input 
            type="text" 
            class="form-input" 
            :placeholder="$t('login.emailPlaceholder')" 
            v-model="email"
            @focus="setFocus(true)"
            @blur="setFocus(false)"
          >
          <div class="error-message" v-if="errors.email">{{ errors.email }}</div>
        </div>
        
        <div class="input-group">
          <i class="fas fa-lock input-icon"></i>
          <input 
            type="password" 
            class="form-input" 
            :placeholder="$t('login.passwordPlaceholder')" 
            v-model="password"
            @focus="setFocus(true)"
            @blur="setFocus(false)"
          >
          <div class="error-message" v-if="errors.password">{{ errors.password }}</div>
        </div>
        
        <div class="success-message" v-if="loginSuccess">{{ $t('login.success') }}</div>
        
        <button type="submit" class="login-button">{{ $t('login.button') }}</button>
        
        <div class="create-account">
          {{ $t('login.noAccount') }} <router-link to="/register" class="create-link">{{ $t('login.register') }}</router-link>
        </div>
      </form>
    </div>
    
    <div class="decoration-wave"></div>
    <div class="decoration-corner"></div>
  </div>
</template>

<script>
import authService from '@/services/auth';
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  name: 'LoginPage',
  components: {
    NavigationBar
  },
  data() {
    return {
      email: '',
      password: '',
      errors: {},
      isFocused: false,
      isSmallScreen: false,
      loginSuccess: false,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    };
  },
  methods: {
    setFocus(value) {
      if (this.isMobile) {
        this.isFocused = value;
      }
    },
    validateForm() {
      const newErrors = {};
      
      if (!this.email.trim()) {
        newErrors.email = this.$t('login.errors.emailRequired');
      }
      
      if (!this.password.trim()) {
        newErrors.password = this.$t('login.errors.passwordRequired');
      }
      
      this.errors = newErrors;
      return Object.keys(newErrors).length === 0;
    },
    async handleSubmit() {
      if (this.validateForm()) {
        try {
          const response = await authService.login(this.email, this.password);
          
          if (response.success) {
            this.loginSuccess = true;
            setTimeout(() => {
              this.$router.push('/profile');
            }, 1500);
          }
        } catch (error) {
          console.error('Login error:', error);
          this.errors.general = this.$t('login.errors.general');
        }
      }
    },
    checkScreenSize() {
      this.isSmallScreen = window.innerWidth < 360 || window.innerHeight < 500;
    }
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkScreenSize);
  }
}
</script>

<style scoped>
@import '../assets/styles.css';

.login-container {
  background-image: url('../assets/img/enterblack.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

[data-theme="light"] .login-container {
  background-image: url('../assets/img/enterwhite.png');
}
</style>
