import { useLayoutEffect } from "react";

import RecoilProvider from "@/comn/features/recoil";
import ApiProvider, { api } from "@/comn/features/apis";
import Router from "@/comn/features/router";

export { api };

/**
 * # Common Base
 *
 *
 * ### Router Paths
 *
 * * Sample : "/comn/smpl/*"
 * * Common : "/comn/comn/*"
 * * System : "/*"
 *
 *
 *
 */
export const Base = () => {
    console.log("\n  %cCommon Base\n", "font-size:14px");

    useLayoutEffect(() => {
        /* Dev */
        // indexedDB.deleteDatabase("TANCIS");
    }, []);

    return (
        <RecoilProvider>
            <ApiProvider>
                <Router />
            </ApiProvider>
        </RecoilProvider>
    );
};
