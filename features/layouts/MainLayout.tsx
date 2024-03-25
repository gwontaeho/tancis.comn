import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";

import Header from "./MainHeader";
import Footer from "./MainFooter";
import Navigation from "./MainNavigation";
import { menuState } from "../recoil";
import { api } from "../apis";

export const MainLayout = () => {
    const [menu, setMenu] = useRecoilState(menuState);

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

    return (
        <>
            <Header />
            <div className="uf-container">
                <Navigation />
                <main className="uf-main">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
};
