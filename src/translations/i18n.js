import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
 
import { TRANSLATIONS_ZH } from "./zh/translations";
import { TRANSLATIONS_EN } from "./en/translations";
import { TRANSLATIONS_SP } from "./sp/translations";

let language = 'en';

if(localStorage.getItem('slamLanguage'))
    language  = localStorage.getItem('slamLanguage');

i18n
.use(LanguageDetector)
.use(initReactI18next)
.init({
    resources: {
        en: {
            translation: TRANSLATIONS_EN
        },
        zh: {
            translation: TRANSLATIONS_ZH
        },
        sp: {
            translation: TRANSLATIONS_SP
        }
    }
});

i18n.changeLanguage(language);

export default i18n;