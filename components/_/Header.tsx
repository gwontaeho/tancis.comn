import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/comn/hooks";
import { Icon, FormControl } from "@/comn/components";
import { NavTop } from "./NavTop";

const ModeControl = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() =>
                setTheme((prev) => ({
                    ...prev,
                    isDark: prev.isDark === "false" ? "true" : "false",
                }))
            }
        >
            <Icon icon={theme.isDark === "true" ? "sun" : "moon"} />
        </button>
    );
};

export const Logo = () => {
    const path = `/imgs/logo_${process.env.REACT_APP_SYSTEM_GROUP}.png`;

    return (
        <img
            src={path}
            alt={process.env.REACT_APP_SYSTEM_GROUP_NAME}
            title={process.env.REACT_APP_SYSTEM_GROUP_NAME}
        />
    );
};

export const Header = () => {
    const { theme, setTheme } = useTheme();
    const { t } = useTranslation();

    const [open, setOpen] = useState(false);

    return (
        <header className="fixed w-full bg-background z-50">
            <div className="flex h-20">
                <div className="w-60 flex items-center p-4 space-x-8">
                    <button onClick={() => setOpen((prev) => !prev)}>
                        <Icon icon="menu" />
                    </button>
                    <div className="flex-1">
                        <Logo />
                    </div>
                </div>
                <div className="flex flex-1 p-4">
                    <NavTop />
                    <div className="flex flex-1 justify-end items-center space-x-4">
                        <div>{t("test")}</div>

                        <ModeControl />
                        <FormControl
                            type="select"
                            value={theme.lang}
                            size="fit"
                            onChange={(e: any) =>
                                setTheme((prev) => ({
                                    ...prev,
                                    lang: e.target.value,
                                }))
                            }
                            options={[
                                { label: "한국어", value: "ko" },
                                { label: "영어", value: "en" },
                                { label: "스와힐리어", value: "tz" },
                            ]}
                        />
                    </div>
                </div>
            </div>

            {open && (
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
            )}
        </header>
    );
};
