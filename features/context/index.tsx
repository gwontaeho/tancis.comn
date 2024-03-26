import { useEffect, useMemo, useRef, createContext, useContext } from "react";
import { useSetRecoilState } from "recoil";
import { menuState } from "../recoil";
import { api } from "../apis";

const Context = createContext<any>(null);

export const usePageContext = () => {
    const context = useContext(Context);
    return context;
};

const PageContextProvider = ({ children }: any) => {
    const ref = useRef<any>({});
    const contextValue = useMemo(() => ({ ref }), []);

    const setMenu = useSetRecoilState(menuState);

    useEffect(() => {
        getMenu();
    }, []);

    const getMenu = async () => {
        try {
            const { data } = await api.get(`http://localhost:9700/ptl/api/v1/ptl/comn/comn/menu`);
            setMenu((prev: any) => ({ ...prev, nonSigned: data.menuDta }));
        } catch (error) {
            console.log(error);
        }
    };

    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default PageContextProvider;
