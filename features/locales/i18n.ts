import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n.use(HttpBackend)
    .use(
        new LanguageDetector(null, {
            order: ["localStorage"],
            lookupLocalStorage: "i18nextLng",
            convertDetectedLanguage: (lng) => lng.toUpperCase(),
        }),
    )
    .use(initReactI18next)
    .init({
        lng: localStorage.getItem("lang") || "ko",
        interpolation: {
            escapeValue: false,
        },
        maxRetries: 0,
        backend: {
            loadPath: `${process.env.REACT_APP_API_PTLE}/api/v1/ptl/comn/comn/front/lang/{{lng}}`,
            customHeaders: {
                "Accept-Language": "EN",
            },
        },
    });

i18n.changeLanguage(localStorage.getItem("lang") || "ko");

export default i18n;
