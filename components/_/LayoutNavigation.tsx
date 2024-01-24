import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import { Collapse, Icon, Button } from "@/comn/components";

import { R } from "@/comn";

type NavItemProps = {
    children?: any[];
    depth_1?: any;
    depth_2?: any;
    _base?: string;
    base?: string;
    name?: string;
    to?: string;
    depth?: number;
};

const NavItem = (props: NavItemProps) => {
    const { children, depth = 1, depth_1, depth_2, _base = "", base = "", to = "", name } = props;

    const _depth = depth + 1;

    const __base = _base + base;

    const navigate = useNavigate();
    const location = useLocation();

    const [open, setOpen] = useState(
        Array.isArray(children) && location.pathname.startsWith(depth_1.base + depth_2.base + __base),
    );

    const handleClick = () => {
        if (children) return setOpen((prev) => !prev);
        navigate(depth_1.base + depth_2.base + __base + to);
    };

    const current = !Array.isArray(children) && location.pathname === depth_1.base + depth_2.base + __base + to;

    return (
        <li>
            <button
                className={classNames(
                    "p-1 flex text-[14px] w-full items-center justify-between text-left",
                    _depth === 2 && "font-medium",
                    _depth !== 2 && "text-[13px]",
                )}
                onClick={handleClick}
            >
                <p className={classNames({ "text-uf-blue underline": current })}>{name}</p>
                {children && (
                    <Icon icon="down" size="xs" className={classNames("transition", { "rotate-180": open })} />
                )}
            </button>
            {Array.isArray(children) && (
                <Collapse open={open}>
                    <ul className="pl-4 text-uf-gray dark:text-uf-lightgray">
                        {children.map((child) => {
                            return (
                                <NavItem
                                    key={depth_1.base + depth_2.base + __base + to + (child.base || child.to)}
                                    depth={_depth}
                                    depth_1={depth_1}
                                    depth_2={depth_2}
                                    _base={__base}
                                    {...child}
                                />
                            );
                        })}
                    </ul>
                </Collapse>
            )}
        </li>
    );
};

const Menu = () => {
    const location = useLocation();
    const pathname = location.pathname;

    const depth_1 = R.find(({ base }) => pathname.startsWith(base || ""));
    const depth_1_base = depth_1?.base || "";
    const depth_2 = depth_1?.children?.find(({ base }) => pathname.startsWith(depth_1_base + (base || "")));

    return (
        <nav className="p-2">
            {depth_1 && depth_2 && (
                <ul className="p-2 flex flex-col gap-2">
                    {depth_2?.children?.map((child) => {
                        return (
                            <NavItem
                                key={depth_1.name + "." + child.name}
                                depth_1={depth_1}
                                depth_2={depth_2}
                                {...child}
                            />
                        );
                    })}
                </ul>
            )}
        </nav>
    );
};

const Auth = () => {
    return (
        <div className="bg-uf-auth m-4 p-4 rounded space-y-2">
            <Button width="full" height="lg">
                login
            </Button>
            <Button variant="outlined" width="full" height="lg">
                regist
            </Button>
            <Button variant="underlined" width="full">
                Forgot your ID or Password?
            </Button>
        </div>
    );
};

export const Navigation = () => {
    return (
        <div className="uf-navigation">
            <div className="uf-navigation-container">
                <Auth />
                <Menu />
            </div>
        </div>
    );
};
