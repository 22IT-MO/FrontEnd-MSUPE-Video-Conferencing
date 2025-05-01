<template>
  <div class="main-container">
    <NavigationBar />
    
    <div class="main-content">
      <div class="title-container">
        <h1 class="main-title">{{ $t('home.title') }}</h1>
      </div>
      <div class="subtitle">
        <p>{{ $t('home.subtitle') }}</p>
      </div>
      <div class="cta-container">
        <router-link to="/conference" class="main-button">{{ $t('home.joinButton') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  name: 'HomePage',
  components: {
    NavigationBar
  },
  data() {
    return {
      // Удаляем дублирующуюся логику с языками, так как она теперь в компоненте
    };
  },
  computed: {
    // Удаляем вычисляемые свойства связанные с языками
  },
  methods: {
    // Удаляем методы связанные с языками
  },
  mounted() {
    // Удаляем код, связанный с языками
  },
  beforeUnmount() {
    // Удаляем код, связанный с языками
  }
}
</script>

<style scoped>
@import '../assets/styles.css';

.main-container {
  background-image: url('../assets/img/mainblack.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  min-height: 100vh;
}

[data-theme="light"] .main-container {
  background-image: url('../assets/img/mainwhite.png');
}

.main-content {
  background: rgba(0, 0, 0, 0.6);
  padding: 3rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
  margin: 4rem 2rem;
  max-width: 800px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

[data-theme="light"] .main-content {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
}
</style>
