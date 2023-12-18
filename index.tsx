import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import RecoilProvider from '@/comn/recoil'
import AuthProvider from '@/comn/auth'
import { SampleRoutes } from '@/comn/sample/smpl-Routes'

import { SampleMain } from '@/comn/sample/smpl-Main'
import { CommonPopup } from '@/comn/popup/Popup'
import { useTheme } from '@/comn/hooks'

import { Layout } from '@/comn/layouts'

import { TancisRoutes } from '@/tra/tancis/Routes'
import { CommonModal, CommonToast } from '@/comn/components/_'

import axios from 'axios'

export const api = axios.create({ baseURL: process.env.REACT_APP_API_COMN })

const ApiConfig = () => {
    const { theme } = useTheme()
    useEffect(() => {
        api.defaults.headers.common['Accept-Language'] = theme.lang.toUpperCase()
    }, [theme.lang])

    return null
}

export const Base = ({ children }: { children?: React.ReactNode }) => {
    console.log('base')

    return (
        <CookiesProvider>
            <RecoilProvider>
                <AuthProvider>
                    <ApiConfig />
                    <BrowserRouter>
                        <Routes>
                            <Route element={<Layout />}>
                                <Route path="/comn/smpl/*" element={<SampleMain />} />
                                <Route path="/comn/ppup/*" element={<CommonPopup />} />
                                {children}
                            </Route>
                        </Routes>
                        <CommonModal />
                        <CommonToast />
                    </BrowserRouter>
                </AuthProvider>
            </RecoilProvider>
        </CookiesProvider>
    )
}

export const R = [...SampleRoutes, ...TancisRoutes]
