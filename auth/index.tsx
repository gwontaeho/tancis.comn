import { useEffect } from "react";
import { useCookies } from "react-cookie";

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        authenticate();
    }, []);

    const authenticate = () => {};

    return <>{children}</>;
};

export default AuthProvider;
