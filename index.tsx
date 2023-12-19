import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import RecoilProvider from '@/comn/recoil'
import AuthProvider from '@/comn/auth'
import { SampleRoutes } from '@/comn/sample/smpl-Routes'
import { SampleMain } from '@/comn/sample/smpl-Main'
import { Layout } from '@/comn/layouts'
import { TancisRoutes } from '@/tra/tancis/Routes'
import { CommonModal, CommonToast } from '@/comn/components/_'
import { Signin } from '@/comn/Signin'

export const api = axios.create({ baseURL: process.env.REACT_APP_API_COMN })

api.interceptors.request.use(
    (config) => {
        const lang = localStorage.getItem('lang')?.toUpperCase() || 'EN'
        const accessToken = Cookies.get('accessToken')
        const refreshToken = Cookies.get('refreshToken')

        config.headers['Accept-Language'] = lang
        if (accessToken) config.headers.Authorization = 'Bearer ' + accessToken
        if (refreshToken) config.headers['RefreshToken'] = 'Bearer ' + refreshToken

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const Base = ({ children }: { children?: React.ReactNode }) => {
    return (
        <RecoilProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/signin" element={<Signin />} />
                        <Route element={<Layout />}>
                            <Route path="/comn/smpl/*" element={<SampleMain />} />
                            {children}
                        </Route>
                    </Routes>
                    <CommonModal />
                    <CommonToast />
                </BrowserRouter>
            </AuthProvider>
        </RecoilProvider>
    )
}

export const R = [...SampleRoutes, ...TancisRoutes]
