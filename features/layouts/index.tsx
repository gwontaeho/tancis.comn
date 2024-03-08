import React, { useEffect, Suspense } from "react";

import { useSearchParams, Outlet, useLocation } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { PopupLayout } from "./PopupLayout";

// class ErrorBoundary extends React.Component {
//     // @ts-ignore
//     constructor(props) {
//         super(props);
//         this.state = { hasError: false };
//     }
//     // @ts-ignore
//     static getDerivedStateFromError(error) {
//         // Update state so the next render will show the fallback UI.
//         return { hasError: true };
//     }

//     // @ts-ignore
//     componentDidCatch(error, info) {
//         // Example "componentStack":
//         //   in ComponentThatThrows (created by App)
//         //   in ErrorBoundary (created by App)
//         //   in div (created by App)
//         //   in App
//         console.log(error, info.componentStack);
//         //   logErrorToMyService(error, info.componentStack);
//     }

//     render() {
//         // @ts-ignore
//         if (this.state.hasError) {
//             // You can render any custom fallback UI
//             // @ts-ignore
//             return <div>a</div>;
//         }
//         // @ts-ignore
//         return this.props.children;
//     }
// }

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
                {/* <Suspense fallback={null}> */}
                <Outlet />
                {/* </Suspense> */}
            </PopupLayout>
        );

    // Main
    return (
        <MainLayout>
            {/* <Suspense fallback={null}> */}
            <Outlet />
            {/* </Suspense> */}
        </MainLayout>
    );
};

export default Layout;
