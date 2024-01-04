import { useEffect } from "react";

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
    useEffect(() => {
        authenticate();
    }, []);

    const authenticate = () => {};
    const authenticate1 = () => {};

    return <>{children}</>;
};

export default AuthProvider;
