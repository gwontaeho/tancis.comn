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

/* local */
// import en from "../../.module/lang-en.json";
// import ko from "../../.module/lang-ko.json";
// import tz from "../../.module/lang-tz.json";
// i18n.use(initReactI18next) // passes i18n down to react-i18next
//     .init({
//         // the translations
//         // (tip move them in a JSON file and import them,
//         // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
//         resources: {
//             en: {
//                 translation: en,
//             },
//             ko: {
//                 translation: ko,
//             },
//             tz: {
//                 translation: tz,
//             },
//         },
//         lng: "en", // if you're using a language detector, do not define the lng option
//         fallbackLng: "en",

//         interpolation: {
//             escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
//         },
//     });
