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

type PageProps = {
    children?: React.ReactNode;
    id?: string;
    navigation?: any;
    title?: string;
    description?: string;
    popup?: boolean;
};

export const Page = (props: PageProps) => {
    const { children, id, title, description, navigation, popup } = props;
    return (
        <div className="uf-page">
            {(title || description || navigation) && (
                <div className="uf-page-header">
                    <div className="uf-page-info">
                        {title && (
                            <div className="uf-page-title">
                                {title}
                                {id && <>&nbsp;({id})</>}
                            </div>
                        )}
                        {description && <p className="uf-page-description">{description}</p>}
                    </div>
                    {navigation && <PageNavigation base={navigation.base} nodes={navigation.nodes} popup={popup} />}
                </div>
            )}

            {children}
        </div>
    );
};

const PageNavigation = (props: PageNavigationProps) => {
    const { t } = useTranslation();
    const [params] = useSearchParams(); /* 화면 폼 제어 */
    const { base = "/", nodes = [], popup = params.get("ppup") === "Y" } = props;

    if (popup === true) {
        return null;
    } else {
        return (
            <ul className="uf-page-navigation">
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

Page.Navigation = PageNavigation;
