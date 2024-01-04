import { useEffect } from "react";

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
    useEffect(() => {
        authenticate();
    }, []);

    const authenticate = () => {};

    return <>{children}</>;
};

export default AuthProvider;
