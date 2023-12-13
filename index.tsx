import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import RecoilProvider from "@/com/recoil";
import AuthProvider from "@/com/auth";
import { SampleRoutes } from "@/com/sample/smpl-Routes";

import { SampleMain } from "@/com/sample/smpl-Main";
import { SamplePopup } from "@/com/sample/smpl-Popup";
import { CommonPopup } from "@/com/popup/Popup";

import { TancisRoutes } from "@/tancis/Routes";

import { CommonModal, CommonToast } from "@/com/components/_";

export const Base = ({ children }: { children?: React.ReactNode }) => {
    return (
        <CookiesProvider>
            <RecoilProvider>
                <AuthProvider>
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
