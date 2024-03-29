import { useEffect, useId, useState, memo, useMemo } from "react";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { authState, menuState, routeState } from "@/comn/features/recoil";
import { useTheme, useToast } from "@/comn/hooks";
import { Icon, IconButton, Badge } from "@/comn/components";
import i18n from "@/comn/features/locales/i18n";
import { routes } from "@/comn/features/router";
import Cookies from "js-cookie";
import { Resource } from "./Resource";
import axios from "axios";

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
            logo: "/imgs/tanesw_logo.webp",
            light: "/imgs/tanesw_title.webp",
            dark: "/imgs/tanesw_title_dark.webp",
        },
        tancis: {
            logo: "/imgs/tancis_logo.webp",
            light: "/imgs/tancis_title.webp",
            dark: "/imgs/tancis_title_dark.webp",
        },
        tanoga: {
            logo: "/imgs/tanoga_logo.webp",
            light: "/imgs/tanoga_title.webp",
            dark: "/imgs/tanoga_title_dark.webp",
        },
    };

    const src = SRCS[process.env.REACT_APP_SYSTEM_GROUP as keyof typeof SRCS];
    const alt = process.env.REACT_APP_SYSTEM_GROUP_NAME;
    const name = process.env.REACT_APP_SYSTEM_GROUP_NAME;

    return (
        <Link to="/" className="flex items-center gap-2">
            <img src={src["logo"]} alt={alt} title={name} width={40} height={40} />
            <img
                loading={theme.isDark === "true" ? "lazy" : undefined}
                src={src["light"]}
                alt={alt}
                title={name}
                hidden={theme.isDark === "true"}
                width={120}
                height={35}
            />
            <img
                loading={theme.isDark === "false" ? "lazy" : undefined}
                src={src["dark"]}
                alt={alt}
                title={name}
                hidden={theme.isDark === "false"}
                width={120}
                height={35}
            />
        </Link>
    );
};

const Header = () => {
    const id = useId();
    const { theme, setTheme } = useTheme();
    const { t } = useTranslation();
    const setAuth = useSetRecoilState(authState);
    const { showToast } = useToast();

    const [open, setOpen] = useState(false);

    const setMenu = useSetRecoilState(menuState);

    const toggle = () => {
        setMenu((prev: any) => ({ ...prev, mode: prev.mode === "dev1" ? "dev2" : "dev1" }));
    };

    const signOut = () => {
        console.log("Sign Out");
        Cookies.remove("authorization");
        setAuth({
            userInfo: {},
            isSignedIn: false,
            signedAt: null,
        });
        showToast({ content: "Sign Out" });
    };

    const TEMPROUTES = useMemo(() => routes, []);

    console.log(TEMPROUTES);

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
                {/* <TopMenu /> */}
                <nav className="uf-header-navigation">
                    <ul className="flex gap-8">
                        {TEMPROUTES.map((child: any, i: any) => {
                            return <NavItem key={`${id} qwwqme ${i}`} {...child} />;
                        })}
                    </ul>
                </nav>

                <div className="uf-header-control">
                    <div className="flex gap-2">
                        {/* list */}
                        <Badge number={3}>
                            <Link to="/comn/comn/temp">
                                <IconButton className="text-uf-white" icon="list" />
                            </Link>
                        </Badge>

                        {/* envelope */}
                        <Badge number={8}>
                            <IconButton className="text-uf-white" icon="envelope" onClick={toggle} />
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

                    {/* <Resource /> */}

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

                    {/* load meta */}
                    <LoadMetaButton />
                </div>

                {/* signout */}
                <div className="uf-header-sign-out">
                    <div className="bg-uf-sign-out-fill rounded-full w-8 h-8 flex items-center justify-center">
                        <IconButton icon="out" className="text-uf-white rotate-90" size="sm" onClick={signOut} />
                    </div>
                </div>
            </div>
        </header>
    );
};

/**
 * 임시 !~
 * @returns
 */
const LoadMetaButton = () => {
    const { theme } = useTheme();
    const [pending, setPending] = useState(false);

    useEffect(() => {
        get("ko");
        get("en");
        get("tz");
    }, []);

    const get = (lang: any) => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("DEV");
            request.onupgradeneeded = () => {
                const db = request.result;
                db.createObjectStore("META");
            };
            request.onsuccess = async () => {
                const db = request.result;
                const ts = db.transaction("META", "readonly");
                const os = ts.objectStore("META");
                const get = os.get(lang);
                get.onsuccess = () => {
                    if (get.result) {
                        i18n.addResourceBundle(lang, "translation", get.result, undefined, true);
                        if ((localStorage.getItem("lang") || "ko") === lang) {
                            i18n.changeLanguage(lang);
                        }
                    }
                    //@ts-ignore
                    resolve();
                };
            };
        });
    };

    const put = (record: any, lang: any) => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("DEV");
            request.onupgradeneeded = () => {
                const db = request.result;
                db.createObjectStore("META");
            };
            request.onsuccess = async () => {
                const db = request.result;
                const ts = db.transaction("META", "readwrite");
                const os = ts.objectStore("META");
                const put = os.put(record, lang);
                put.onsuccess = () => {
                    // @ts-ignore
                    resolve();
                };
            };
        });
    };

    const handleClick = async () => {
        setPending(true);
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API_PTLE}/api/v1/ptl/comn/comn/front/lang/${theme.lang}`,
            );
            put(data, theme.lang);
            i18n.addResourceBundle(theme.lang, "translation", data, undefined, true);
            i18n.changeLanguage(theme.lang);
            console.log(`${theme.lang} loaded`);
        } catch (error) {
            console.log(error);
        }
        setPending(false);
    };

    return (
        <button disabled={pending} className="text-uf-white w-20" onClick={handleClick}>
            {pending ? (
                <div className="flex gap-1 items-center justify-center">
                    load {theme.lang}...
                    <Icon icon="loading" className="animate-spin" size="xs" />
                </div>
            ) : (
                `load ${theme.lang}`
            )}
        </button>
    );
};

/* temp */
const TopMenu = memo(() => {
    // const id = useId();
    // const menu = useRecoilValue(menuState);
    // const { nonSigned, mode } = menu;

    // console.log(routes);
    // console.log(nonSigned);
    // console.log(id);

    return (
        <nav className="uf-header-navigation">
            <ul className="flex gap-8">
                {routes.map((child: any) => {
                    return <NavItem key={uuid()} {...child} />;
                })}
            </ul>
        </nav>
    );

    // return mode === "dev1" ? (
    //     <nav className="uf-header-navigation">
    //         <ul className="flex gap-8">
    //             {routes.map((child: any) => {
    //                 return <NavItem key={uuid()} {...child} />;
    //             })}
    //         </ul>
    //     </nav>
    // ) : (
    //     <nav className="uf-header-navigation">
    //         <ul className="flex gap-8">
    //             {nonSigned &&
    //                 Array.isArray(nonSigned.children) &&
    //                 Boolean(nonSigned.children.length) &&
    //                 nonSigned.children.map((child: any) => {
    //                     return <TopMenuItem key={`${id}${child.menuId}`} {...child} />;
    //                 })}
    //         </ul>
    //     </nav>
    // );
});

/* temp */
const TopMenuItem = (props: any) => {
    const id = useId();
    const { menuId, menuNm, menuUrl, children } = props;
    const systemBase = menuId;

    return (
        <li className="group flex relative items-center">
            <Link to={`/?menuId=${menuId}`}>
                <button className="flex text-uf-white items-center space-x-1">
                    <p>{menuNm}</p>
                    <Icon icon="down" size="xs" className="transition group-hover:rotate-180" />
                </button>
            </Link>
            <div className="pt-2 w-max absolute hidden top-full left-0 group-hover:block">
                <ul className="rounded border shadow bg-uf-auth p-4 grid grid-cols-2 gap-1 [&>li:hover]:underline">
                    <li className="col-span-2">
                        <Link to={menuUrl} className="block p-2 font-semibold">
                            {menuNm}
                        </Link>
                    </li>
                    {Array.isArray(children) &&
                        Boolean(children.length) &&
                        children.map((child: any) => {
                            const { menuId, menuNm, menuUrl } = child;
                            return (
                                <li key={`${id}${menuId}`}>
                                    <Link to={`/?menuId=${menuId}`} className="block w-40 py-2 px-4 break-all">
                                        {menuNm}
                                    </Link>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </li>
    );
};

export default Header;
