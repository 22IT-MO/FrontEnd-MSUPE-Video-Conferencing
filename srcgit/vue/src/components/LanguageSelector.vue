<template>
  <div class="language-selector">
    <button class="language-button" @click="toggleLanguageDropdown">
      <img :src="require(`@/assets/img/${$i18n.locale}.png`)" alt="" />
      <span>{{ currentLanguageName }}</span>
      <i class="fas fa-chevron-down"></i>
    </button>
    <div class="language-dropdown" :class="{ active: isLanguageDropdownOpen }">
      <a
        href="#"
        class="language-option"
        v-for="(name, code) in availableLanguages"
        :key="code"
        @click.prevent="changeLanguage(code)"
      >
        <img :src="require(`@/assets/img/${code}.png`)" alt="" />
        {{ name }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LanguageSelector',
  data() {
    return {
      isLanguageDropdownOpen: false
    };
  },
  computed: {
    currentLanguageName() {
      return this.$t(`languages.${this.$i18n.locale}`);
    },
    availableLanguages() {
      return {
        ru: this.$t('languages.ru'),
        en: this.$t('languages.en'),
        de: this.$t('languages.de'),
        fr: this.$t('languages.fr')
      };
    }
  },
  methods: {
    toggleLanguageDropdown() {
      this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
    },
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      localStorage.setItem('selectedLanguage', lang);
      this.isLanguageDropdownOpen = false;
    },
    handleClickOutside(event) {
      const dropdown = this.$el.querySelector('.language-selector');
      if (dropdown && !dropdown.contains(event.target)) {
        this.isLanguageDropdownOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
    
    // Восстановление языка из localStorage
    const savedLang = localStorage.getItem('selectedLanguage');
    const availableLangs = Object.keys(this.availableLanguages);
    if (savedLang && availableLangs.includes(savedLang)) {
      this.$i18n.locale = savedLang;
    }
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.language-selector {
  display: flex;
  align-items: center;
  position: relative;
  margin-left: 20px;
}

.language-button {
  background: transparent;
  border: none;
  color: var(--nav-text-color);
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  height: 40px;
}

.language-button span {
  display: inline-block;
}

.language-button img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--dropdown-bg);
  border-radius: 8px;
  padding: 0.5rem;
  margin-top: 0.5rem;
  display: none;
  flex-direction: column;
  width: 180px;
  box-shadow: 0 4px 12px var(--dropdown-shadow);
  z-index: 1000;
}

.language-option {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  color: var(--dropdown-text);
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 4px;
  gap: 8px;
}

.language-option img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.language-button:hover {
  color: var(--link-color);
  background: var(--menu-hover-bg-color);
}

.language-option:hover {
  background: var(--dropdown-hover-bg);
  color: var(--link-color);
}

.language-dropdown.active {
  display: flex;
}
</style>
