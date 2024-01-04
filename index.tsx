import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecoilProvider from "@/comn/features/recoil";
import { SampleRoutes } from "@/comn/sample/smpl-Routes";
import { SampleMain } from "@/comn/sample/smpl-Main";
import { Layout } from "@/comn/features/layouts";
import { TancisRoutes } from "@/tra/tancis/Routes";
import { CommonModal, CommonToast } from "@/comn/components/_";
import { Main } from "@/tra/tancis/Main";

export const Base = () => {
    return (
        <RecoilProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/comn/smpl/*" element={<SampleMain />} />
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
export const R = [...SampleRoutes, ...TancisRoutes];
