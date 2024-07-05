import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from "@/locales/english.json";
import arabic from "@/locales/arabic.json";
import mandarin from "@/locales/mandarin.json";
import Hindi from "@/locales/Hindi.json";
import spanish from "@/locales/spanish.json";
import french from "@/locales/french.json";
import bengali from "@/locales/bengali.json";
import russian from "@/locales/russian.json";
import indonesia from "@/locales/indo.json";
import { getItem } from "@/storage/languageStorage";
export const languageResources = {
  en: { translation: english },
  ar: { translation: arabic },
  man: { translation: mandarin },
  hindi: { translation: Hindi },
  spa: { translation: spanish },
  fr: { translation: french },
  ben: { translation: bengali },
  rus: { translation: russian },
  indo: { translation: indonesia },
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
