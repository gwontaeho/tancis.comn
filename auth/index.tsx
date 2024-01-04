import { useEffect } from "react";

const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
    useEffect(() => {
        authenticate();
    }, []);

    
    const authenticate1 = () => {};
    const authenticate = () => {};
console.log('test')
    return <>{children}</>;
};

export default AuthProvider;
