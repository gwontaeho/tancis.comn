import { useEffect } from "react";

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
    useEffect(() => {
        authenticate();
    }, []);

    const authenticate = () => {};
    console.log("asd");

    return <>{children}</>;
};

export default AuthProvider;
