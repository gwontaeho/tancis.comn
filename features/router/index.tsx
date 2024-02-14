import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Layout } from "@/comn/features/layouts";
import { ComnMain } from "@/comn/comn/comn-Main";
import { ComnRoutes } from "./ComnRoutes";

import { TancisRoutes } from "@/tra/tancis/Routes";
import { Main } from "@/tra/tancis/Main";

/** temp */
import { Temp } from "@/comn/sample/temp";

export const routes = [...ComnRoutes, ...TancisRoutes];
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

export default Router;
