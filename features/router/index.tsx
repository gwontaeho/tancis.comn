import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "../layouts";
import { Main } from "@/tra/tancis/Main";

import { ComnRoutes } from "@/comn/features/router/ComnRoutes";
import { TancisRoutes } from "@/tra/tancis/Routes";
import { Temp } from "@/comn/sample/temp";
import SampleMain from "@/comn/sample/smpl-Main";
import { ComnMain } from "@/comn/comn/comn-Main";
export const routes: any = [...ComnRoutes, ...TancisRoutes];

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/comn/comn/temp",
                element: <Temp />,
                // lazy: async () => {
                //     const { Temp } = await import("@/comn/sample/temp");
                //     return { Component: Temp };
                // },
            },
            // {
            //     path: "/comn/smpl/*",
            //     element: <SampleMain />,
            //     // lazy: async () => {
            //     //     const { SampleMain } = await import("@/comn/sample/smpl-Main");
            //     //     return { Component: SampleMain };
            //     // },
            // },
            // {
            //     path: "/comn/comn/*",
            //     element: <ComnMain />,
            //     // lazy: async () => {
            //     //     const { ComnMain } = await import("@/comn/comn/comn-Main");
            //     //     return { Component: ComnMain };
            //     // },
            // },
            {
                path: "*",
                element: <Main />,
            },
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
