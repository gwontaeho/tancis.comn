import { useSearchParams, ScrollRestoration } from "react-router-dom";
import PageContextProvider from "../context";
import { MainLayout } from "./MainLayout";
import { PopupLayout } from "./PopupLayout";

import CommonModal from "../../components/_/CommonModal";
import CommonToast from "../..//components/_/CommonToast";

const Layout = () => {
    const [searchParams] = useSearchParams();

    const ppup = searchParams.get("ppup");

    return (
        <PageContextProvider>
            <ScrollRestoration />
            {ppup === "Y" ? <PopupLayout /> : <MainLayout />}
            <CommonModal />
            <CommonToast />
        </PageContextProvider>
    );
};

export default Layout;
