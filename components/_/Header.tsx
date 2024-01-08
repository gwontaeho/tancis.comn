import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/comn/hooks";
import { Icon, IconButton } from "@/comn/components";

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
                <button className="flex items-center space-x-1">
                    <p>{name}</p>
                    <Icon icon="down" size="xs" className="transition group-hover:rotate-180" />
                </button>
            </Link>
            <div className="pt-2 w-max absolute hidden group-hover:block">
                <ul className="rounded bg-header p-4 grid grid-cols-2 gap-1 [&>li:hover]:underline">
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

const Menu = () => {
    return (
        <nav className="hidden items-center lg:flex text-white px-8">
            <ul className="flex space-x-4">
                {R.map((child) => {
                    return <NavItem key={uuid()} {...child} />;
                })}
            </ul>
        </nav>
    );
};

export const Header = () => {
    const { theme, setTheme } = useTheme();
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    return (
        <header className="uf-header">
            {/*  */}
            <div className="uf-logo">
                <Link to="/">
                    <img
                        src={`/imgs/logo_${process.env.REACT_APP_SYSTEM_GROUP}.svg`}
                        alt={process.env.REACT_APP_SYSTEM_GROUP_NAME}
                        title={process.env.REACT_APP_SYSTEM_GROUP_NAME}
                    />
                </Link>
                <button onClick={() => setOpen((prev) => !prev)}>
                    <Icon icon="menu" size="xl" />
                </button>
            </div>

            {/*  */}
            <div className="uf-top">
                <Menu />

                <div className="flex flex-1 justify-end items-center space-x-4 px-8">
                    {/* theme */}
                    <IconButton
                        className="text-white"
                        icon={theme.isDark === "true" ? "sun" : "moon"}
                        onClick={() =>
                            setTheme((prev) => ({
                                ...prev,
                                isDark: prev.isDark === "true" ? "false" : "true",
                            }))
                        }
                    />

                    {/* lang */}
                    <select
                        className="w-20 bg-uf-layout-header text-white outline-none cursor-pointer [&>option]:bg-uf-layout-header"
                        value={theme.lang}
                        onChange={(e) => setTheme((prev) => ({ ...prev, lang: e.target.value }))}
                    >
                        <option value="ko">{t("L_KO")}</option>
                        <option value="en">{t("L_EN")}</option>
                        <option value="tz">{t("L_SW")}</option>
                    </select>
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
