import React from "react";
import { Header, Navigation } from "@/comn/components/_";

export const MainLayout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div className="flex h-full">
                <Navigation />
                <main className="p-4 w-full mt-20 space-y-4 lg:ml-64 lg:w-[calc(100%-16rem)]">{children}</main>
                <footer></footer>
            </div>
        </>
    );
};
