import { useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { PopupLayout } from "./PopupLayout";

import CommonModal from "../../components/_/CommonModal";
import CommonToast from "../..//components/_/CommonToast";

const Layout = () => {
    const [searchParams] = useSearchParams();
    const { pathname } = useLocation();

    const ppup = searchParams.get("ppup");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            {ppup === "Y" ? <PopupLayout /> : <MainLayout />}
            <CommonModal />
            <CommonToast />
        </>
    );
};

export default Layout;
