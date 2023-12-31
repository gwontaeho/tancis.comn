import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/comn/hooks";
import { Icon, IconButton, Badge } from "@/comn/components";

import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { R } from "@/comn";

type NavItemProps = {
    children?: any[];
    name?: string;
    path?: string;
    base?: string;
};

const NavItem = (props: NavItemProps) => {
    const { name, children, path, base = "" } = props;
    const depth_1 = path || base;

    return (
        <li className="group">
            <Link to={depth_1}>
                <button className="flex text-uf-white items-center space-x-1">
                    <p>{name}</p>
                    <Icon icon="down" size="xs" className="transition group-hover:rotate-180" />
                </button>
            </Link>
            <div className="pt-2 w-max absolute hidden group-hover:block">
                <ul className="rounded border shadow bg-uf-auth p-4 grid grid-cols-2 gap-1 [&>li:hover]:underline">
                    <li className="col-span-2">
                        <Link to={depth_1} className="block p-2 font-semibold">
                            {name}
                        </Link>
                    </li>
                    {children?.map((child) => {
                        const { name, path, base } = child;
                        const depth_2 = path || base;
                        return (
                            <li key={uuid()}>
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

const Nav = () => {
    return (
        <nav className="hidden items-center lg:flex px-8">
            <ul className="flex space-x-4">
                {R.map((child) => {
                    return <NavItem key={uuid()} {...child} />;
                })}
            </ul>
        </nav>
    );
};

const Logo = () => {
    const { theme } = useTheme();

    const SRCS = {
        tanesw: {
            light: "/imgs/logo_tanesw.svg",
            dark: "/imgs/logo_tanesw_dark.svg",
        },
        tancis: {
            light: "/imgs/logo_tancis.svg",
            dark: "/imgs/logo_tancis_dark.svg",
        },
        tanoga: {
            light: "/imgs/logo_tanoga.svg",
            dark: "/imgs/logo_tanoga_dark.svg",
        },
    };

    const src = SRCS[process.env.REACT_APP_SYSTEM_GROUP as keyof typeof SRCS];
    const alt = process.env.REACT_APP_SYSTEM_GROUP_NAME;
    const name = process.env.REACT_APP_SYSTEM_GROUP_NAME;

    return (
        <Link to="/">
            <img src={src["light"]} alt={alt} title={name} hidden={theme.isDark === "true"} />
            <img src={src["dark"]} alt={alt} title={name} hidden={theme.isDark === "false"} />
        </Link>
    );
};

export const Header = () => {
    const { theme, setTheme } = useTheme();
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    return (
        <header className="uf-header">
            {/*  */}
            <div className="uf-header-logo">
                <Logo />
                <button onClick={() => setOpen((prev) => !prev)}>
                    <Icon icon="menu" size="xl" />
                </button>
            </div>

            {/*  */}
            <div className="uf-header-top">
                <Nav />

                <div className="flex flex-1 justify-end items-center space-x-4 px-4">
                    <div className="flex space-x-2">
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
                        onChange={(e) => setTheme((prev) => ({ ...prev, lang: e.target.value }))}
                    >
                        <option value="ko">{t("L_KO")}</option>
                        <option value="en">{t("L_EN")}</option>
                        <option value="tz">{t("L_SW")}</option>
                    </select>
                </div>

                {/* signout */}
                <div className="bg-uf-sign-out-background w-16 h-full flex items-center justify-center">
                    <div className="bg-uf-sign-out-fill rounded-full w-8 h-8 flex items-center justify-center">
                        <IconButton icon="out" className="text-uf-white rotate-90" size="sm" />
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
