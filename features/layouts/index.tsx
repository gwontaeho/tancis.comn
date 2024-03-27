//@ts-nocheck

import React, { Suspense } from "react";

import { useSearchParams, ScrollRestoration } from "react-router-dom";
import PageContextProvider from "../context";
import { MainLayout } from "./MainLayout";
import { PopupLayout } from "./PopupLayout";

import CommonModal from "../../components/_/CommonModal";
import CommonToast from "../..//components/_/CommonToast";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Example "componentStack":
        //   in ComponentThatThrows (created by App)
        //   in ErrorBoundary (created by App)
        //   in div (created by App)
        //   in App
        // logErrorToMyService(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback;
        }

        return this.props.children;
    }
}

const Layout = () => {
    const [searchParams] = useSearchParams();

    const ppup = searchParams.get("ppup");

    return (
        <PageContextProvider>
            <ScrollRestoration />
            {/* <ErrorBoundary fallback={<div>ggg</div>}> */}
            {/* <Suspense fallback={<div>asd</div>}> */}
            {/*  */}
            {ppup === "Y" ? <PopupLayout /> : <MainLayout />}
            {/* </Suspense> */}
            {/* </ErrorBoundary> */}
            <CommonModal />
            <CommonToast />
        </PageContextProvider>
    );
};

export default Layout;
