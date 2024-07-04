import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "@/locales/english.json";
import arabic from "@/locales/arabic.json";
import { getItem } from "@/storage/languageStorage";
export const languageResources = {
  en: { translation: english },
  ar: { translation: arabic },
};
const getLanguage = async () => {
  try {
    const value = getItem("language");
    if (value) {
      return value;
    }
  } catch (e) {
    console.error("Failed to fetch the language from storage", e);
  }
  return "en"; // Default language
};

const initI18n = async () => {
  const lng = await getLanguage();
  i18n.use(initReactI18next).init({
    resources: languageResources,
    compatibilityJSON: "v3",
    lng: lng,
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

// Expose a function to get the current language
export const getCurrentLanguage = () => {
  return i18n.language; // Use i18n.language to get the current language
};

export default i18n;
