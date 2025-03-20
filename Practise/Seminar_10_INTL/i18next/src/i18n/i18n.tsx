import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ru from './locales/ru.json';

i18n
  .use(initReactI18next) // Подключает i18next к React
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: 'ru', // Установи русский язык
    fallbackLng: 'en', // Если не найден перевод, использовать английский
    debug: true, // Показывает ошибки в консоли
    interpolation: {
      escapeValue: false, // Разрешает HTML в переводах
    },
  });




console.log("Доступные переводы:", i18n.getResourceBundle('ru', 'translation'));
console.log("Текущий язык:", i18n.language);

export default i18n;