<template>
  <div class="login-container">
    <NavigationBar />
    
    <div class="register-box" :class="{ 'input-focused': isFocused, 'very-small-screen': isSmallScreen, 'mobile-device': isMobile }">
      <h1>{{ $t('register.title') }}</h1>
      <form class="register-form" @submit.prevent="handleSubmit">
        <div class="input-group">
          <i class="fas fa-user input-icon"></i>
          <input 
            type="text" 
            class="form-input" 
            :placeholder="$t('register.namePlaceholder')" 
            v-model="name"
            @focus="setFocus(true)"
            @blur="setFocus(false)"
          >
          <div class="error-message" v-if="errors.name">{{ errors.name }}</div>
        </div>
        
        <div class="input-group">
          <i class="fas fa-envelope input-icon"></i>
          <input 
            type="email" 
            class="form-input" 
            :placeholder="$t('register.emailPlaceholder')" 
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
            :placeholder="$t('register.passwordPlaceholder')" 
            v-model="password"
            @focus="setFocus(true)"
            @blur="setFocus(false)"
          >
          <div class="error-message" v-if="errors.password">{{ errors.password }}</div>
        </div>
        
        <div class="input-group">
          <i class="fas fa-lock input-icon"></i>
          <input 
            type="password" 
            class="form-input" 
            :placeholder="$t('register.confirmPasswordPlaceholder')" 
            v-model="confirmPassword"
            @focus="setFocus(true)"
            @blur="setFocus(false)"
          >
          <div class="error-message" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</div>
        </div>
        
        <div class="success-message" v-if="registerSuccess">{{ $t('register.success') }}</div>
        
        <button type="submit" class="register-button">{{ $t('register.button') }}</button>
        
        <div class="login-link">
          {{ $t('register.haveAccount') }} <router-link to="/login">{{ $t('register.login') }}</router-link>
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
  name: 'RegisterPage',
  components: {
    NavigationBar
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      isFocused: false,
      isSmallScreen: false,
      registerSuccess: false,
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
      
      if (!this.name.trim()) {
        newErrors.name = this.$t('register.errors.nameRequired');
      }
      
      if (!this.email.trim()) {
        newErrors.email = this.$t('register.errors.emailRequired');
      } else if (!/^\S+@\S+\.\S+$/.test(this.email)) {
        newErrors.email = this.$t('register.errors.emailInvalid');
      }
      
      if (!this.password.trim()) {
        newErrors.password = this.$t('register.errors.passwordRequired');
      } else if (this.password.length < 6) {
        newErrors.password = this.$t('register.errors.passwordLength');
      }
      
      if (this.password !== this.confirmPassword) {
        newErrors.confirmPassword = this.$t('register.errors.passwordMismatch');
      }
      
      this.errors = newErrors;
      return Object.keys(newErrors).length === 0;
    },
    async handleSubmit() {
      if (this.validateForm()) {
        try {
          const response = await authService.register(this.name, this.email, this.password);
          
          if (response.success) {
            this.registerSuccess = true;
            setTimeout(() => {
              this.$router.push('/login');
            }, 1500);
          }
        } catch (error) {
          console.error('Registration error:', error);
          this.errors.general = this.$t('register.errors.general');
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
