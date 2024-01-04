import { useEffect } from "react";
import Cookies from "js-cookie";
import { authState } from "@/comn/features/recoil";
import { useRecoilState } from "recoil";

const AuthProvider = () => {
    const a = useRecoilState(authState);

    useEffect(() => {
        if (Cookies.get("accessToken")) {
            // 쿠키 있을때
            // 1. 쿠키검증
            test();
        } else {
            // 쿠키 없을때
        }
    }, []);

    const test = async () => {
        try {
            const res = await s(true);

            console.log(res);
        } catch (error) {
            // 로그아웃
            // reset recoil
        }
    };

    const s = (b: boolean) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (b) {
                    resolve("ok");
                } else {
                    reject("no");
                }
            }, 1000);
        });
    };

    return null;
};

export default AuthProvider;
