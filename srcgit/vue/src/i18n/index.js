import { createI18n } from 'vue-i18n';
import ru from './translations/ru';
import en from './translations/en';
import de from './translations/de';
import fr from './translations/fr';

const messages = {
  ru,
  en,
  de,
  fr
};

export default createI18n({
  legacy: false,
  locale: 'ru', // Язык по умолчанию
  fallbackLocale: 'en',
  messages
});
