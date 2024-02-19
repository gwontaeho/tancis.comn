import { useState } from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { authState, routeState } from "@/comn/features/recoil";
import { useTheme } from "@/comn/hooks";
import { Icon, IconButton, Badge } from "@/comn/components";
import i18n from "@/comn/features/locales/i18n";
import { routes } from "@/comn/features/router";
import Cookies from "js-cookie";

type NavItemProps = {
    children?: any[];
    name?: string;
    base?: string;
    to?: string;
};

const NavItem = (props: NavItemProps) => {
    const { name, children, base = "", to = "" } = props;
    const depth_1 = (base || to).startsWith("/") ? base || to : "/" + (base || to);

    const setRoute = useSetRecoilState(routeState);

    return (
        <li className="group flex relative items-center">
            <Link to={depth_1}>
                <button className="flex text-uf-white items-center space-x-1">
                    <p>{name}</p>
                    <Icon icon="down" size="xs" className="transition group-hover:rotate-180" />
                </button>
            </Link>
            <div className="pt-2 w-max absolute hidden top-full left-0 group-hover:block">
                <ul className="rounded border shadow bg-uf-auth p-4 grid grid-cols-2 gap-1 [&>li:hover]:underline">
                    <li className="col-span-2">
                        <Link to={depth_1} className="block p-2 font-semibold">
                            {name}
                        </Link>
                    </li>
                    {children?.map((child) => {
                        const { name, base } = child;
                        const depth_2 = base.startsWith("/") ? base : "/" + base;
                        return (
                            <li key={uuid()} onClick={() => setRoute(depth_1 + depth_2)}>
                                <Link to={depth_1 + depth_2} className="block w-40 py-2 px-4">
                                    {name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </li>
    );
};

const Logo = () => {
    const { theme } = useTheme();

    const SRCS = {
        tanesw: {
            logo: "/imgs/tanesw_logo.png",
            light: "/imgs/tanesw_title.png",
            dark: "/imgs/tanesw_title_dark.png",
        },
        tancis: {
            logo: "/imgs/tanesw_logo.png",
            light: "/imgs/tancis_title.png",
            dark: "/imgs/tancis_title_dark.png",
        },
        tanoga: {
            logo: "/imgs/tanoga_logo.png",
            light: "/imgs/tanoga_title.png",
            dark: "/imgs/tanoga_title_dark.png",
        },
    };

    const src = SRCS[process.env.REACT_APP_SYSTEM_GROUP as keyof typeof SRCS];
    const alt = process.env.REACT_APP_SYSTEM_GROUP_NAME;
    const name = process.env.REACT_APP_SYSTEM_GROUP_NAME;

    return (
        <Link to="/" className="flex items-center gap-2">
            <img src={src["logo"]} alt={alt} title={name} width={40} />
            <img src={src["light"]} alt={alt} title={name} hidden={theme.isDark === "true"} width={120} />
            <img src={src["dark"]} alt={alt} title={name} hidden={theme.isDark === "false"} width={120} />
        </Link>
    );
};

const Header = () => {
    const { theme, setTheme } = useTheme();
    const { t } = useTranslation();
    const resetAuth = useResetRecoilState(authState);

    const [open, setOpen] = useState(false);

    const signOut = () => {
        console.log("Sign Out");
        Cookies.remove("accessToken");
        resetAuth();
    };

    return (
        <header className="uf-header">
            {/*  */}
            <div className="uf-header-logo gap-4">
                <Logo />
                <button onClick={() => setOpen((prev) => !prev)}>
                    <Icon icon="menu" size="xl" />
                </button>
            </div>

            {/*  */}
            <div className="uf-header-main">
                <nav className="uf-header-navigation">
                    <ul className="flex gap-8">
                        {routes.map((child: any) => {
                            return <NavItem key={uuid()} {...child} />;
                        })}
                    </ul>
                </nav>

                <div className="uf-header-control">
                    <div className="flex gap-2">
                        {/* list */}
                        <Badge number={3}>
                            <IconButton className="text-uf-white" icon="list" />
                        </Badge>

                        {/* envelope */}
                        <Badge number={8}>
                            <IconButton className="text-uf-white" icon="envelope" />
                        </Badge>

                        {/* noti */}
                        <Badge>
                            <IconButton className="text-uf-white" icon="bell" />
                        </Badge>

                        {/* theme */}
                        <IconButton
                            className="text-uf-white"
                            icon={theme.isDark === "true" ? "sun" : "moon"}
                            onClick={() =>
                                setTheme((prev) => ({
                                    ...prev,
                                    isDark: prev.isDark === "true" ? "false" : "true",
                                }))
                            }
                        />
                    </div>

                    {/* lang */}
                    <select
                        className="w-20 h-6 text-uf-white bg-uf-layout-header outline-none cursor-pointer [&>option]:bg-uf-layout-header"
                        value={theme.lang}
                        onChange={(e) => {
                            i18n.changeLanguage(e.target.value);
                            setTheme((prev) => ({ ...prev, lang: e.target.value as "ko" | "en" | "tz" }));
                        }}
                    >
                        <option value="ko">{t("L_KO")}</option>
                        <option value="en">{t("L_EN")}</option>
                        <option value="tz">{t("L_SW")}</option>
                    </select>
                </div>

                {/* signout */}
                <div className="uf-header-sign-out">
                    <div className="bg-uf-sign-out-fill rounded-full w-8 h-8 flex items-center justify-center">
                        <IconButton icon="out" className="text-uf-white rotate-90" size="sm" onClick={signOut} />
                    </div>
                </div>
            </div>

            {/* {open && (
                <nav className="h-[calc(100vh-5rem)]">
                    <ul className="text-xl">
                        <li className="px-4 py-2 flex justify-between items-center">
                            <span>화면설계</span>
                            <Icon icon="down" />
                        </li>
                        <li className="px-4 py-2 flex justify-between items-center">
                            <span>화면설계</span>
                            <Icon icon="down" />
                        </li>
                        <li className="px-4 py-2 flex justify-between items-center">
                            <span>화면설계</span>
                            <Icon icon="down" />
                        </li>
                        <li className="px-4 py-2 flex justify-between items-center">
                            <span>화면설계</span>
                            <Icon icon="down" />
                        </li>
                    </ul>
                </nav>
            )} */}
        </header>
    );
};

export default Header;
