import React from "react";
import { Header, Navigation, Footer } from "@/comn/components/_";

export const MainLayout = ({ children }: { children?: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div className="uf-container">
                <Navigation />
                <main className="uf-main">{children}</main>
                <Footer />
            </div>
        </>
    );
};
