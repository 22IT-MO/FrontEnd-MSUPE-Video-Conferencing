export default {
  nav: {
    home: 'Главная',
    login: 'Вход',
    register: 'Регистрация',
    logout: 'Выйти'
  },
  home: {
    title: 'Testname',
    subtitle: 'Платформа для видеоконференций. Общайтесь в режиме реального времени из любой точки мира.',
    joinButton: 'Начать конференцию'
  },
  login: {
    title: 'Вход в систему',
    emailPlaceholder: 'Email или телефон',
    passwordPlaceholder: 'Пароль',
    button: 'Войти',
    noAccount: 'Нет аккаунта?',
    register: 'Зарегистрироваться',
    success: 'Вход выполнен успешно. Перенаправление...',
    errors: {
      emailRequired: 'Пожалуйста, введите email или телефон',
      passwordRequired: 'Пожалуйста, введите пароль',
      general: 'Ошибка входа. Пожалуйста, проверьте ваши учетные данные.'
    }
  },
  register: {
    title: 'Регистрация',
    namePlaceholder: 'Ваше имя',
    emailPlaceholder: 'Email',
    passwordPlaceholder: 'Пароль',
    confirmPasswordPlaceholder: 'Подтвердите пароль',
    button: 'Зарегистрироваться',
    haveAccount: 'Уже есть аккаунт?',
    login: 'Войти',
    success: 'Регистрация успешна. Перенаправление...',
    errors: {
      nameRequired: 'Пожалуйста, введите ваше имя',
      emailRequired: 'Пожалуйста, введите email',
      emailInvalid: 'Пожалуйста, введите корректный email',
      passwordRequired: 'Пожалуйста, введите пароль',
      passwordLength: 'Пароль должен содержать не менее 6 символов',
      passwordMismatch: 'Пароли не совпадают',
      general: 'Ошибка регистрации. Пожалуйста, попробуйте позже.'
    }
  },
  profile: {
    namePlaceholder: 'Ваше имя',
    connectButton: 'Начать конференцию'
  },
  conference: {
    shareScreen: 'Демонстрация экрана',
    raiseHand: 'Поднять руку',
    participants: 'участников',
    alerts: {
      screenShare: 'Демонстрация экрана ',
      enabled: 'включена',
      disabled: 'выключена',
      participantsList: 'Список участников: '
    }
  },
  themeToggle: {
    lightMode: 'Включить светлую тему',
    darkMode: 'Включить тёмную тему'
  },
  languages: {
    ru: 'Русский',
    en: 'English',
    de: 'Deutsch',
    fr: 'Français'
  }
}; 