import React from "react";
import Header from "./MainHeader";
import Footer from "./MainFooter";
import Navigation from "./MainNavigation";

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
