import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Layout from "@/comn/features/layouts";
import { Main } from "@/tra/tancis/Main";
import { ComnRoutes } from "@/comn/features/router/ComnRoutes";
import { TancisRoutes } from "@/tra/tancis/Routes";

export const routes: any = [...ComnRoutes, ...TancisRoutes];

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/comn/comn/temp",
                lazy: async () => {
                    const { Temp } = await import("@/comn/sample/temp");
                    return { Component: Temp };
                },
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
                lazy: async () => {
                    const { ComnMain } = await import("@/comn/comn/comn-Main");
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

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
