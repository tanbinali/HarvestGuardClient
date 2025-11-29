import { translations } from "../i18n/translations";
import useAuthStore from "../stores/authStore";

export const useTranslation = () => {
  const language = useAuthStore((state) => state.language) || "EN";

  const getNestedValue = (obj, path) => {
    return path.split(".").reduce((acc, key) => {
      return acc && acc[key] !== undefined ? acc[key] : null;
    }, obj);
  };

  const t = (key) => {
    // 1️⃣ Try current language
    let value = getNestedValue(translations[language], key);

    // 2️⃣ Fall back to English if missing
    if (value === null && language !== "EN") {
      value = getNestedValue(translations.EN, key);
    }

    // 3️⃣ Final fallback: return the key itself
    return value || key;
  };

  return { t, language };
};

export default useTranslation;
