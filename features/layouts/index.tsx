import { useEffect } from "react";
import { useSearchParams, Outlet, useLocation } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { PopupLayout } from "./PopupLayout";

const Layout = () => {
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();

    const ppup = searchParams.get("ppup");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    // Popup
    if (ppup === "Y")
        return (
            <PopupLayout>
                <Outlet />
            </PopupLayout>
        );

    // Main
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

export default Layout;
