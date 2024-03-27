import { useSearchParams, ScrollRestoration } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { PopupLayout } from "./PopupLayout";

import CommonModal from "../../components/_/CommonModal";
import CommonToast from "../..//components/_/CommonToast";

const Layout = () => {
    const [searchParams] = useSearchParams();
    const isPopup = searchParams.get("ppup") === "Y";

    return (
        <>
            <ScrollRestoration />
            {/*  */}
            {isPopup ? <PopupLayout /> : <MainLayout />}
            <CommonModal />
            <CommonToast />
        </>
    );
};

export default Layout;
