import { useId } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from "react-router-dom";
import { Icon } from ".";

type NodeType = { path?: string; label: string };

type PageNavigationProps = {
    base: string;
    nodes: NodeType[];
    popup?: boolean;
};

type PageProps = {
    children?: ReactNode;
    id?: string;
    title?: string;
    popup?: boolean;
    description?: string;
    navigation?: PageNavigationProps;
};

export const Page = (props: PageProps) => {
    const { children, id, title, description, navigation, popup } = props;

    return (
        <div className="uf-page">
            {(!!title || !!description || !!navigation) && (
                <div className="uf-page-header">
                    <div className="uf-page-info">
                        {!!title && (
                            <div className="uf-page-title">
                                {title}
                                {!!id && <>&nbsp;({id})</>}
                            </div>
                        )}
                        {!!description && <p className="uf-page-description">{description}</p>}
                    </div>
                    {!!navigation && <PageNavigation base={navigation.base} nodes={navigation.nodes} popup={popup} />}
                </div>
            )}
            {children}
        </div>
    );
};

const PageNavigation = (props: PageNavigationProps) => {
    const id = useId();
    const { t } = useTranslation();
    const [params] = useSearchParams();
    const { base = "/", nodes = [], popup = params.get("ppup") === "Y" } = props;

    if (popup) {
        return null;
    } else {
        return (
            <ul className="uf-page-navigation">
                <li>
                    <Link to={base}>
                        <Icon icon="home" size="sm" />
                    </Link>
                </li>
                {nodes.map(({ path, label }: NodeType, index) => {
                    return (
                        <li key={id + index} className="flex gap-2">
                            <span>/</span>
                            {!!path ? <Link to={base + path}>{t(label)}</Link> : <span>{t(label)}</span>}
                        </li>
                    );
                })}
            </ul>
        );
    }
};

Page.Navigation = PageNavigation;
