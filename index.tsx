import RecoilProvider from "@/comn/features/recoil";
import ApiProvider, { api } from "@/comn/features/apis";
import Router from "@/comn/features/router";

import CommonModal from "./components/_/CommonModal";
import CommonToast from "./components/_/CommonToast";

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

    return (
        <RecoilProvider>
            <ApiProvider>
                <Router />
                <CommonModal />
                <CommonToast />
            </ApiProvider>
        </RecoilProvider>
    );
};
