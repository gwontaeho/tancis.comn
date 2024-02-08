import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RecoilProvider from "@/comn/features/recoil";
import AuthProvider from "@/comn/features/auth";
import { SampleRoutes } from "@/comn/sample/smpl-Routes";

import { Layout } from "@/comn/features/layouts";
import { TancisRoutes } from "@/tra/tancis/Routes";
import { CommonModal, CommonToast } from "@/comn/components/_";
import { Main } from "@/tra/tancis/Main";

type TRoute = { name: string; base?: string; to?: string; children?: TRoute[] };
type TRoutes = TRoute[];

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/comn/smpl/*",
                lazy: async () => {
                    const { SampleMain } = await import("@/comn/sample/smpl-Main");
                    return { Component: SampleMain };
                },
            },
            {
                path: "/comn/*",
                lazy: async () => {
                    const { ComnMain } = await import("@/comn/sample/comn-Main");
                    return { Component: ComnMain };
                },
            },
            {
                path: "*",
                element: <Main />,
            },
        ],
    },
]);

export const Base = () => {
    console.log("==== BASE ====");

    return (
        <RecoilProvider>
            <AuthProvider />
            <RouterProvider router={router} />
            <CommonModal />
            <CommonToast />
        </RecoilProvider>
    );
};

export { default as api } from "@/comn/features/apis";
export const R: TRoutes = [...SampleRoutes, ...TancisRoutes];
