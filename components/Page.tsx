import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { Icon } from "@/comn/components";

type NodeType = { path?: string; label: string };

type PageNavigationProps = {
    base: string;
    nodes: NodeType[];
    popup?: boolean;
};

type PageHeaderProps = {
    title?: string;
    description?: string;
};

type PageProps = {
    children?: React.ReactNode;
};

export const Page = (props: PageProps) => {
    const { children } = props;

    return <div className="space-y-4">{children}</div>;
};

export const SimplePage = (props: PageProps) => {
    const { children } = props;

    return <div className="space-y-4">{children}</div>;
};

const PageNavigation = (props: PageNavigationProps) => {
    const [params] = useSearchParams(); /* 화면 폼 제어 */
    const { base = "/", nodes = [], popup = false } = props;

    if (popup === true || params.get("popup") === "Y") {
        return null;
    } else {
        return (
            <ul className="h-6 flex items-center space-x-2 text-blue">
                <li>
                    <Link to={base}>
                        <Icon icon="home" size="sm" />
                    </Link>
                </li>
                {nodes.map(({ path, label }: NodeType) => {
                    return (
                        <li key={uuid()} className="space-x-2 text-lg">
                            <span>/</span>
                            {path ? <Link to={base + path}>{label}</Link> : <span>{label}</span>}
                        </li>
                    );
                })}
            </ul>
        );
    }
};

const PageHeader = (props: PageHeaderProps) => {
    const { title, description } = props;
    return (
        <div className="p-4 space-y-1 bg-card rounded shadow">
            {title && <div className="text-xl font-semibold">{title}</div>}
            {description && <p>{description}</p>}
        </div>
    );
};

Page.Navigation = PageNavigation;
Page.Header = PageHeader;
