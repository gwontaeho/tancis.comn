import { useSearchParams, Outlet, useLocation } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { PopupLayout } from "./PopupLayout";
import { useEffect } from "react";

const ScrollToTop = () => {
    // Extracts pathname property(key) from an object
    const { pathname } = useLocation();

    // Automatically scrolls to top whenever pathname changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export const Layout = () => {
    const [searchParams] = useSearchParams();

    const ppup = searchParams.get("ppup");

    if (ppup === "Y")
        return (
            <PopupLayout>
                <ScrollToTop />
                <Outlet />
            </PopupLayout>
        );

    return (
        <MainLayout>
            <ScrollToTop />
            <Outlet />
        </MainLayout>
    );
};
