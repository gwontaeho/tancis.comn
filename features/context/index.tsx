import { useMemo, useRef, createContext, useContext } from "react";

const Context = createContext<any>(null);

export const usePageContext = () => {
    const context = useContext(Context);
    return context;
};

const PageContextProvider = ({ children }: any) => {
    const ref = useRef<any>({});
    const contextValue = useMemo(() => ({ ref }), []);

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default PageContextProvider;
