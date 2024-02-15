import React from "react";
import Header from "@/comn/components/_/LayoutHeader";
import Footer from "@/comn/components/_/LayoutFooter";
import Navigation from "@/comn/components/_/LayoutNavigation";

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
