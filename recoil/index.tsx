import React from 'react'
import { RecoilRoot, atom, useRecoilSnapshot } from 'recoil'
import { ModalProps, ToastProps } from '@/comn/components/_'
import i18n from '@/comn/locales/i18n'

const theme = {
    isDark:
        localStorage.isDark === 'true' ||
        (!('isDark' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            ? 'true'
            : 'false',
    lang: localStorage.getItem('lang') || 'ko',
}

const defaultValue = {
    theme,
    modal: [],
    toast: [],
    condition: {},
    auth: {
        isSignedIn: false,
        accessToken: '',
        refreshToken: '',
    },
}

export const themeState = atom({
    key: 'themeState',
    default: defaultValue.theme,
    effects: [
        ({ onSet }) => {
            onSet((n, o: any) => {
                if (n.lang !== o.lang) {
                    localStorage.setItem('lang', n.lang)
                    i18n.changeLanguage(n.lang)
                }
                if (n.isDark !== o.isDark) {
                    localStorage.setItem('isDark', n.isDark)
                    if (n.isDark === 'true') document.documentElement.classList.add('dark')
                    if (n.isDark === 'false') document.documentElement.removeAttribute('class')
                }
            })
        },
    ],
})

export const modalState = atom<ModalProps[]>({
    key: 'modalState',
    default: defaultValue.modal,
})

export const toastState = atom<ToastProps[]>({
    key: 'toastState',
    default: defaultValue.toast,
})

export const conditionState = atom({
    key: 'conditionState',
    default: defaultValue.condition,
})

export const storeState = atom<Record<string, any>>({
    key: 'storeState',
    default: {},
})

const DebugObserver = () => {
    const snapshot = useRecoilSnapshot()

    React.useEffect(() => {
        console.debug('The following atoms were modified:')
        Array.from(snapshot.getNodes_UNSTABLE({ isModified: true })).forEach((node) => {
            console.debug(node.key, snapshot.getLoadable(node))
        })
    }, [snapshot])

    return null
}

const RecoilProvider = ({ children }: { children?: React.ReactNode }) => {
    return (
        <RecoilRoot>
            <DebugObserver />
            {children}
        </RecoilRoot>
    )
}

export default RecoilProvider
