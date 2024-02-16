import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import { useRecoilState } from "recoil";

import { useModal } from "@/comn/hooks";
import { Collapse, Icon, Button } from "@/comn/components";

import { routes } from "@/comn/features/router";
import { routeState } from "@/comn/features/recoil";
import { createPortal } from "react-dom";
import axios from "axios";

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
        // navigate(depth_1.base + depth_2.base + __base + to);
        navigate(to);
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

    const [route] = useRecoilState(routeState);

    const depth_1 = routes.find(({ base }: any) => route.startsWith(base || ""));
    const depth_1_base = (depth_1?.base || "").startsWith("/") ? depth_1?.base || "" : "/" + (depth_1?.base || "");
    const depth_2 = depth_1?.children?.find(({ base }: any) =>
        route.startsWith(depth_1_base + ((base || "").startsWith("/") ? base || "" : "/" + (base || ""))),
    );

    // const add = (any: any, d2: any) => {
    //     return any.map((_: any) => {
    //         let nn = _;

    //         if (nn.children) {
    //             nn.children = add(nn.children, d2);
    //         }

    //         return { ...nn, d2 };
    //     });
    // };

    // const temp: any = R.map((_: any) => {
    //     let n = _;
    //     const d1 = n.base;
    //     if (n.children) {
    //         n.children = n.children.map((__: any) => {
    //             let nn = __;
    //             const d2 = d1 + (__.base.startsWith("/") ? __.base : "/" + __.base);
    //             if (nn.children) {
    //                 nn.children = add(nn.children, d2);
    //             }
    //             return { ...__, d1, d2 };
    //         });
    //     }

    //     return n;
    // });

    return (
        <nav className="p-2">
            {depth_1 && depth_2 && (
                <ul className="p-2 flex flex-col gap-2">
                    {depth_2?.children?.map((child: any) => {
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
    const [open, setOpen] = useState(false);

    const [id, setId] = useState("");
    const [tin, setTin] = useState("");

    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [open]);

    /** 임시 */
    const handleClick = () => {
        setOpen(true);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        if (!id || !tin) return;

        try {
            const res1 = await axios.post("http://localhost:9700/ptl/api/v1/ptl/comn/comn/login", { id, tin });
            console.log(res1);
        } catch (error) {
            console.log(error);
        }
        try {
            const res2 = await axios.post("http://localhost:9400/ptl/api/v1/ptl/comn/comn/login", { id, tin });
            console.log(res2);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="bg-uf-auth m-4 p-4 rounded space-y-2">
                <Button width="full" height="lg" onClick={handleClick}>
                    login
                </Button>
                <Button variant="outlined" width="full" height="lg">
                    regist
                </Button>
                <Button variant="underlined" width="full">
                    Forgot your ID or Password?
                </Button>
            </div>

            {open &&
                createPortal(
                    <div
                        className="fixed w-screen h-screen z-[9998] top-0 left-0 flex items-center justify-center bg-black/40"
                        onClick={() => setOpen(false)}
                    >
                        <div
                            className="flex items-center justify-center p-4 top-1/2 left-1/2 w-[450px] h-[250px] border rounded bg-uf-background z-[9999]"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <input
                                    className="h-12 border outline-none px-4 w-[400px]"
                                    onChange={(event) => setId(event.target.value)}
                                    value={id}
                                    placeholder="id"
                                />
                                <input
                                    className="h-12 border outline-none px-4 w-[400px]"
                                    onChange={(event) => setTin(event.target.value)}
                                    value={tin}
                                    placeholder="tin"
                                />
                                <button className="border h-12 w-[400px]">Sign In</button>
                            </form>
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    );
};

const Navigation = () => {
    return (
        <div className="uf-navigation">
            <div className="uf-navigation-container">
                <Auth />
                <Menu />
            </div>
        </div>
    );
};

export default Navigation;
