import { useRecoilState } from "recoil";
import { authState } from "../features/recoil";

export const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authState);
    console.log(auth);

    const get = (key: string): any => {
        return auth?.userInfo?.[key];
    };
    return { get };
};
