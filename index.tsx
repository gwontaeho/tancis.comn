import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import RecoilProvider from "@/comn/recoil";
import AuthProvider from "@/comn/auth";
import { SampleRoutes } from "@/comn/sample/smpl-Routes";

import { SampleMain } from "@/comn/sample/smpl-Main";
import { SamplePopup } from "@/comn/sample/smpl-Popup";
import { CommonPopup } from "@/comn/popup/Popup";
import { useTheme } from "@/comn/hooks";

import { TancisRoutes } from "@/tra/tancis/Routes";
import { CommonModal, CommonToast } from "@/comn/components/_";

import axios from "axios";

export const api = axios.create({ baseURL: process.env.REACT_APP_API_COMN });

const ApiConfig = () => {
    const { theme } = useTheme();
    useEffect(() => {
        api.defaults.headers.common["Accept-Language"] = theme.lang.toUpperCase();
    }, [theme.lang]);

    return null;
};

export const Base = ({ children }: { children?: React.ReactNode }) => {
    return (
        <CookiesProvider>
            <RecoilProvider>
                <AuthProvider>
                    <ApiConfig />
                    <BrowserRouter>
                        <Routes>
                            <Route path="/comn/smpl/ppup/*" element={<SamplePopup />} />
                            <Route path="/comn/smpl/*" element={<SampleMain />} />
                            <Route path="/comn/ppup/*" element={<CommonPopup />} />
                            {children}
                        </Routes>
                        <CommonModal />
                        <CommonToast />
                    </BrowserRouter>
                </AuthProvider>
            </RecoilProvider>
        </CookiesProvider>
    );
};

export const R = [...SampleRoutes, ...TancisRoutes];
