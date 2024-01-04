import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import langKo from './lang-ko.json'
import langEn from './lang-en.json'
import langTz from './lang-tz.json'

const resources = {
    en: {
        translation: langEn,
    },
    ko: {
        translation: langKo,
    },
    tz: {
        translation: langTz,
    },
}

i18n.use(initReactI18next).init({
    resources,
    lng: localStorage.getItem('lang') || 'ko',
    interpolation: { escapeValue: false },
})

export default i18n
