import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import RecoilProvider from "@/comn/features/recoil";
import AuthProvider from "@/comn/features/auth";
import { SampleRoutes } from "@/comn/sample/smpl-Routes";
import { SampleMain } from "@/comn/sample/smpl-Main";
import { ComnMain } from "@/comn/sample/comn-Main";
import { Layout } from "@/comn/features/layouts";
import { TancisRoutes } from "@/tra/tancis/Routes";
import { CommonModal, CommonToast } from "@/comn/components/_";
import { Main } from "@/tra/tancis/Main";
import { useEffect } from "react";

type TRoute = { name: string; base?: string; to?: string; children?: TRoute[] };
type TRoutes = TRoute[];

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export const Base = () => {
    return (
        <RecoilProvider>
            <BrowserRouter>
                <ScrollToTop />
                <AuthProvider />
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/comn/smpl/*" element={<SampleMain />} />
                        <Route path="/comn/*" element={<ComnMain />} />
                        <Route path="*" element={<Main />} />
                    </Route>
                </Routes>
                <CommonModal />
                <CommonToast />
            </BrowserRouter>
        </RecoilProvider>
    );
};

export { default as api } from "@/comn/features/apis";
export const R: TRoutes = [...SampleRoutes, ...TancisRoutes];
