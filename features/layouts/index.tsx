import { useEffect, Suspense } from "react";

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
                <Suspense fallback={null}>
                    <Outlet />
                </Suspense>
            </PopupLayout>
        );

    // Main
    return (
        <MainLayout>
            <Suspense fallback={<div>as</div>}>
                <Outlet />
            </Suspense>
        </MainLayout>
    );
};

export default Layout;
