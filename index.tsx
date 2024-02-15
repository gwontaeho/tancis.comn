import RecoilProvider from "@/comn/features/recoil";
import Router from "@/comn/features/router";
import { CommonModal, CommonToast } from "@/comn/components/_";

export { default as api } from "@/comn/features/apis";

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
            <Router />

            <CommonModal />
            <CommonToast />
        </RecoilProvider>
    );
};
