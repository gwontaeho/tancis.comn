import { Suspense, useLayoutEffect } from "react";

import RecoilProvider from "./features/recoil";
import ApiProvider, { api } from "./features/apis";
import Router from "./features/router";

export { api };

const Base = () => {
    // console.log("\ncommon base\n\n");

    useLayoutEffect(() => {
        /* Dev */
        // indexedDB.deleteDatabase("TANCIS");
    }, []);

    return (
        // <Suspense fallback={<div>...load meta</div>}>
        <RecoilProvider>
            <ApiProvider>
                <Router />
            </ApiProvider>
        </RecoilProvider>
        // </Suspense>
    );
};

export default Base;
