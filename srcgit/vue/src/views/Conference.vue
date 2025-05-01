<template>
  <div class="conference-container">
    <NavigationBar />
    
    <div class="participants-grid">
      <div class="participant-card" v-for="(participant, index) in participants" :key="index">
        <div class="participant-video">
          <div class="participant-avatar">
            <div class="avatar-circle">
              <div class="participant-initials" v-if="!participant.avatarSrc">{{ participant.initials }}</div>
              <img :src="participant.avatarSrc" class="participant-img" v-if="participant.avatarSrc" :alt="participant.name">
            </div>
          </div>
          <div class="participant-name">{{ participant.name }}</div>
          <div class="participant-controls">
            <span v-if="participant.audioMuted" class="fas fa-microphone-slash"></span>
            <span v-if="participant.videoMuted" class="fas fa-video-slash"></span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="conference-controls">
      <div class="controls-left">
        <button class="control-btn" :class="{ muted: audioMuted }" @click="toggleAudio">
          <i :class="['fas', audioMuted ? 'fa-microphone-slash' : 'fa-microphone']"></i>
        </button>
        <button class="control-btn" :class="{ muted: videoMuted }" @click="toggleVideo">
          <i :class="['fas', videoMuted ? 'fa-video-slash' : 'fa-video']"></i>
        </button>
      </div>
      
      <div class="controls-center">
        <button class="control-btn share-screen-btn" @click="toggleScreenShare">
          <i class="fas fa-desktop"></i>
          <span>{{ $t('conference.shareScreen') }}</span>
        </button>
        <button class="control-btn raise-hand-btn" @click="toggleRaiseHand">
          <i :class="['fas', handRaised ? 'fa-hand-paper' : 'fa-hand']"></i>
          <span>{{ $t('conference.raiseHand') }}</span>
        </button>
        <button class="control-btn participants-btn" @click="showParticipantsList">
          <i class="fas fa-users"></i>
          <span>{{ participants.length }} {{ $t('conference.participants') }}</span>
        </button>
      </div>
      
      <div class="controls-right">
        <button class="end-call-btn" @click="endCall">
          <i class="fas fa-phone-slash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';

export default {
  name: 'ConferencePage',
  components: {
    NavigationBar
  },
  data() {
    return {
      audioMuted: false,
      videoMuted: false,
      screenSharing: false,
      handRaised: false,
      participants: []
    };
  },
  methods: {
    toggleAudio() {
      this.audioMuted = !this.audioMuted;
      // Обновляем аудио статус текущего пользователя
      this.participants[0].audioMuted = this.audioMuted;
    },
    toggleVideo() {
      this.videoMuted = !this.videoMuted;
      // Обновляем видео статус текущего пользователя
      this.participants[0].videoMuted = this.videoMuted;
    },
    toggleScreenShare() {
      this.screenSharing = !this.screenSharing;
      // Здесь может быть логика включения/выключения демонстрации экрана
      alert(this.$t('conference.alerts.screenShare') + (this.screenSharing ? this.$t('conference.alerts.enabled') : this.$t('conference.alerts.disabled')));
    },
    toggleRaiseHand() {
      this.handRaised = !this.handRaised;
      // Здесь может быть логика поднятия/опускания руки
    },
    showParticipantsList() {
      // Здесь может быть логика отображения списка участников
      alert(this.$t('conference.alerts.participantsList') + this.participants.length);
    },
    endCall() {
      // Здесь может быть логика завершения звонка
      this.$router.push('/profile');
    },
    addRandomParticipants(count) {
      const names = ['Анна Иванова', 'Петр Сидоров', 'Ольга Смирнова', 'Иван Петров', 'Мария Козлова'];
      
      for (let i = 0; i < count; i++) {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const nameParts = randomName.split(' ');
        const initials = (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        
        this.participants.push({
          name: randomName,
          initials: initials,
          avatarSrc: null,
          audioMuted: Math.random() > 0.5,
          videoMuted: Math.random() > 0.5
        });
      }
    },
    loadCurrentUser() {
      // Загружаем данные текущего пользователя из localStorage
      const savedName = localStorage.getItem('userName') || 'Имя Фамилия';
      const savedAvatar = localStorage.getItem('avatar');
      const savedAudio = localStorage.getItem('audioEnabled');
      const savedVideo = localStorage.getItem('videoEnabled');
      
      // Устанавливаем глобальное состояние микрофона и видео
      this.audioMuted = savedAudio === null ? false : savedAudio !== 'true';
      this.videoMuted = savedVideo === null ? false : savedVideo !== 'true';
      
      // Создаем объект текущего пользователя
      const names = savedName.split(' ');
      let initials = 'ИФ';
      
      if (names.length >= 2) {
        initials = (names[0][0] + names[1][0]).toUpperCase();
      } else if (names.length === 1 && names[0]) {
        initials = names[0][0].toUpperCase();
      }
      
      // Добавляем текущего пользователя как первого участника
      this.participants.unshift({
        name: savedName,
        initials: initials,
        avatarSrc: savedAvatar,
        audioMuted: this.audioMuted,
        videoMuted: this.videoMuted
      });
    }
  },
  mounted() {
    // Загружаем данные текущего пользователя
    this.loadCurrentUser();
    
    // Добавляем случайных участников
    this.addRandomParticipants(3);
  }
}
</script>

<style scoped>
@import '../assets/styles.css';

/* Удаляем специфические стили для навигации, чтобы она была как на других страницах */
</style>
