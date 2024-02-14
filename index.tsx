import { CommonModal, CommonToast } from "@/comn/components/_";
import Router from "@/comn/features/router";
import RecoilProvider from "@/comn/features/recoil";
import AuthProvider from "@/comn/features/auth";

export { default as api } from "@/comn/features/apis";
export { routes } from "@/comn/features/router";

/**
 * # Common Base
 *
 *
 * ### Router Paths
 *
 * * Sample : /comn/smpl/*
 * * Common : /comn/comn/*
 * * Part   : /*
 *
 */
export const Base = () => {
    console.log("\n  %cCommon Base\n", "font-size:14px");

    return (
        <RecoilProvider>
            <AuthProvider />
            <Router />
            <CommonModal />
            <CommonToast />
        </RecoilProvider>
    );
};
