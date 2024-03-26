import { Outlet } from "react-router-dom";
import Header from "./MainHeader";
import Footer from "./MainFooter";
import Navigation from "./MainNavigation";

export const MainLayout = () => {
    return (
        <>
            <Header />
            <div className="uf-container">
                <Navigation />
                <main className="uf-main">
                    <Outlet context={{ test: "asd" }} />
                </main>
                <Footer />
            </div>
        </>
    );
};
