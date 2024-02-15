import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Layout } from "@/comn/features/layouts";
import { ComnMain } from "@/comn/comn/comn-Main";
import { Main } from "@/tra/tancis/Main";
import { Temp } from "@/comn/sample/temp";

import RecoilProvider from "@/comn/features/recoil";
import AuthProvider from "@/comn/features/auth";
import { CommonModal, CommonToast } from "@/comn/components/_";

import { ComnRoutes } from "@/comn/features/router/ComnRoutes";
import { TancisRoutes } from "@/tra/tancis/Routes";

export { default as api } from "@/comn/features/apis";
export const routes: any = [...ComnRoutes, ...TancisRoutes];

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,

        children: [
            {
                path: "/comn/comn/temp",
                element: <Temp />,
            },
            {
                path: "/comn/smpl/*",
                lazy: async () => {
                    const { SampleMain } = await import("@/comn/sample/smpl-Main");
                    return { Component: SampleMain };
                },
            },
            {
                path: "/comn/comn/*",
                element: <ComnMain />,
            },
            {
                path: "*",
                element: <Main />,
            },
        ],
    },
]);
const Router = () => <RouterProvider router={router} />;

/**
 * # Common Base
 *
 *
 * ### Router Paths
 *
 * * Sample : "/comn/smpl/*"
 * * Common : "/comn/comn/*"
 * * System : "/*"
 *
 *
 *
 */
export const Base = () => {
    console.log("\n  %cCommon Base\n", "font-size:14px");

    return (
        <RecoilProvider>
            <AuthProvider />
            <Router />

            <CommonModal />
            <CommonToast />
        </RecoilProvider>
    );
};
