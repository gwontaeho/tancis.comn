import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Layout } from "@/comn/features/layouts";
import { ComnMain } from "@/comn/comn/comn-Main";
import { ComnRoutes } from "./ComnRoutes";

import { TancisRoutes } from "@/tra/tancis/Routes";
import { Main } from "@/tra/tancis/Main";

export const routes = [...ComnRoutes, ...TancisRoutes];

const Router = () => (
    <RouterProvider
        router={createBrowserRouter([
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
                        path: "/comn/comn/*",
                        element: <ComnMain />,
                    },
                    {
                        path: "*",
                        element: <Main />,
                    },
                ],
            },
        ])}
    />
);

export default Router;
