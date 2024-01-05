import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
    id?: string;
    description?: string;
};

type PageProps = {
    children?: React.ReactNode;
};

export const Page = (props: PageProps) => {
    const { children } = props;
    return <div className="space-y-4">{children}</div>;
};

const PageNavigation = (props: PageNavigationProps) => {
    const { t } = useTranslation();
    const [params] = useSearchParams(); /* 화면 폼 제어 */
    const { base = "/", nodes = [], popup = params.get("ppup") === "Y" } = props;

    if (popup === true) {
        return null;
    } else {
        return (
            <ul className="h-6 flex items-center space-x-2 text-uf-blue">
                <li>
                    <Link to={base}>
                        <Icon icon="home" size="sm" />
                    </Link>
                </li>
                {nodes.map(({ path, label }: NodeType) => {
                    return (
                        <li key={uuid()} className="space-x-2">
                            <span>/</span>
                            {path ? <Link to={base + path}>{t(label)}</Link> : <span>{t(label)}</span>}
                        </li>
                    );
                })}
            </ul>
        );
    }
};

const PageHeader = (props: PageHeaderProps) => {
    const { title, id, description } = props;
    return (
        <div className="space-y-1">
            {title && (
                <div className="text-xl font-semibold">
                    {title}
                    {id && <>&nbsp;({id})</>}
                </div>
            )}
            {description && <p>{description}</p>}
        </div>
    );
};

Page.Navigation = PageNavigation;
Page.Header = PageHeader;
