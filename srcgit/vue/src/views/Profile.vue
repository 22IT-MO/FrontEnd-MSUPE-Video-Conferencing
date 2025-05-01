<template>
  <div class="profile-container">
    <NavigationBar />
    
    <div class="profile-box">
      <div class="avatar-wrapper">
        <div class="avatar-circle">
          <div class="initials" v-if="!avatarSrc">{{ userInitials }}</div>
          <img :src="avatarSrc" alt="Аватар пользователя" id="avatar" v-if="avatarSrc">
        </div>
        <label class="avatar-upload">
          <input 
            type="file" 
            accept="image/*" 
            @change="handleAvatarChange"
          >
          <i class="fas fa-camera"></i>
        </label>
      </div>
      
      <input 
        type="text" 
        class="name-input" 
        v-model="userName" 
        :placeholder="$t('profile.namePlaceholder')"
      >
      
      <div class="control-panel">
        <button class="control-btn" :class="{ muted: !audioEnabled }" @click="toggleAudio">
          <i :class="['fas', audioEnabled ? 'fa-microphone' : 'fa-microphone-slash']"></i>
        </button>
        <button class="control-btn" :class="{ muted: !videoEnabled }" @click="toggleVideo">
          <i :class="['fas', videoEnabled ? 'fa-video' : 'fa-video-slash']"></i>
        </button>
        <router-link to="/conference" class="connect-btn">
          {{ $t('profile.connectButton') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import authService from '@/services/auth';
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  name: 'ProfilePage',
  components: {
    NavigationBar
  },
  data() {
    return {
      userName: 'Имя Фамилия',
      avatarSrc: null,
      audioEnabled: true,
      videoEnabled: true
    };
  },
  computed: {
    userInitials() {
      const names = this.userName.split(' ');
      if (names.length >= 2) {
        return (names[0][0] + names[1][0]).toUpperCase();
      } else if (names.length === 1 && names[0]) {
        return names[0][0].toUpperCase();
      }
      return 'ИФ';
    }
  },
  methods: {
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarSrc = e.target.result;
          localStorage.setItem('avatar', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    toggleAudio() {
      this.audioEnabled = !this.audioEnabled;
    },
    toggleVideo() {
      this.videoEnabled = !this.videoEnabled;
    },
    async logout() {
      try {
        await authService.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    },
    saveUserData() {
      localStorage.setItem('userName', this.userName);
      localStorage.setItem('audioEnabled', this.audioEnabled);
      localStorage.setItem('videoEnabled', this.videoEnabled);
    }
  },
  mounted() {
    // Восстановление данных пользователя из localStorage
    const savedName = localStorage.getItem('userName');
    const savedAvatar = localStorage.getItem('avatar');
    const savedAudio = localStorage.getItem('audioEnabled');
    const savedVideo = localStorage.getItem('videoEnabled');
    
    if (savedName) {
      this.userName = savedName;
    }
    
    if (savedAvatar) {
      this.avatarSrc = savedAvatar;
    }
    
    if (savedAudio !== null) {
      this.audioEnabled = savedAudio === 'true';
    }
    
    if (savedVideo !== null) {
      this.videoEnabled = savedVideo === 'true';
    }
  },
  beforeUnmount() {
    this.saveUserData();
  },
  watch: {
    userName() {
      this.saveUserData();
    },
    audioEnabled() {
      this.saveUserData();
    },
    videoEnabled() {
      this.saveUserData();
    }
  }
}
</script>

<style scoped>
@import '../assets/styles.css';

.profile-container {
  background-image: var(--bg-image);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
