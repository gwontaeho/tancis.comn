import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { FormControl, FormControlProps } from "./FormControl";
import { COL_SPAN, FLEX } from "../features/foundation";

const ALIGNS = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
};

const ALIGNS_FLEX = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-rend",
};

type GroupProps = {
    children?: React.ReactNode;
    bgColor?: boolean;
    flex?: keyof typeof FLEX;
};

type GroupHeaderProps = {
    children?: React.ReactNode;
};

type GroupTitleProps = {
    title?: string;
    description?: string;
    titleSize?: 1 | 2 | 3;
};

type GroupBodyProps = {
    children?: React.ReactNode;
};

type GroupSectionProps = {
    children?: React.ReactNode;
};

type GroupFooterProps = {
    children?: React.ReactNode;
};

type GroupRowProps = {
    borderTop?: boolean;
    borderBottom?: boolean;
    borderLeft?: boolean;
    borderRight?: boolean;
    children?: React.ReactNode;
};

type GroupAnyProps = {
    children?: React.ReactNode;
    align?: keyof typeof ALIGNS;
    anySize?: keyof typeof COL_SPAN;
};

type GroupLabelProps = FormControlProps & {
    label?: React.ReactNode;
    labelSize?: keyof typeof COL_SPAN;
    required?: boolean | string;
    align?: keyof typeof ALIGNS_FLEX;
    borderTop?: boolean;
    borderBottom?: boolean;
    borderLeft?: boolean;
    borderRight?: boolean;
};

export type GroupControlProps = GroupLabelProps & {
    controlSize?: keyof typeof COL_SPAN;
    only?: "control" | "label";
    "data-parent"?: string;
    borderTop?: boolean;
    borderBottom?: boolean;
    borderLeft?: boolean;
    borderRight?: boolean;
};

type GroupColProps = GroupLabelProps & {
    children?: React.ReactNode;
    colSize?: keyof typeof COL_SPAN;
    combine?: boolean;
    padding?: number;
};

/**
 *
 * # Group
 * * Header
 * * Title
 * * Body
 * * Row
 * * Label
 * * Control
 * * Col
 * @param props GroupProps
 * @returns
 */
export const Group = (props: GroupProps) => {
    const { children, flex } = props;
    return <div className={classNames("uf-group", flex && FLEX[flex])}>{children}</div>;
};

const GroupHeader = (props: GroupHeaderProps) => {
    const { children } = props;

    return <div className="uf-group-header">{children}</div>;
};

const GroupTitle = (props: GroupTitleProps) => {
    const { title, description, titleSize = 1 } = props;
    const { t } = useTranslation();
    const sizes = { 3: "text-lg", 2: "text-xl", 1: "text-2xl" };

    return (
        <div className="">
            {title && <div className={sizes[titleSize] + " font-semibold"}>{t(title)}</div>}
            {description && <p>{t(description)}</p>}
        </div>
    );
};

const GroupBody = (props: GroupBodyProps) => {
    const { children } = props;
    return <div className="uf-group-body">{children}</div>;
};

const GroupSection = (props: GroupSectionProps) => {
    const { children } = props;
    return <div className="uf-group-section">{children}</div>;
};

const GroupFooter = (props: GroupFooterProps) => {
    const { children } = props;
    return <div className="uf-group-footer">{children}</div>;
};

const GroupRow = (props: GroupRowProps) => {
    const { borderLeft = true, borderRight = true, borderTop = true, borderBottom = true, children } = props;
    return (
        <div
            className={classNames(
                "uf-group-row",
                borderLeft === false && "border-l-0",
                borderRight === false && "border-r-0",
                borderTop === false && "border-t-0",
                borderBottom === false && "border-b-0",
            )}
        >
            {children}
        </div>
    );
};

const GroupLabel = forwardRef((props: GroupLabelProps, ref) => {
    const { t } = useTranslation();
    const {
        label,
        labelSize = 2,
        align = "left",
        borderLeft = true,
        borderRight = true,
        borderTop = true,
        borderBottom = true,
        ...rest
    } = props;

    return (
        <div
            className={classNames(
                "uf-group-label",
                COL_SPAN[labelSize],
                ALIGNS_FLEX[align],
                borderLeft === false && "border-l-0",
                borderRight === false && "border-r-0",
                borderTop === false && "border-t-0",
                borderBottom === false && "border-b-0",
            )}
        >
            {props.type ? <FormControl ref={ref} {...rest} /> : typeof label === "string" ? t(label) : label}
            {props.required && (
                <span
                    className={classNames("text-uf-error ml-0.5", {
                        "absolute top-0 right-0.5": props.type,
                    })}
                >
                    *
                </span>
            )}
        </div>
    );
});

const GroupAny = (props: GroupAnyProps) => {
    const { children, anySize, align = "center", ...rest } = props;
    return (
        <>
            <div
                className={classNames(
                    "p-1",
                    "flex",
                    "items-center",
                    "space-x-1",
                    anySize === undefined ? "min-w-fit" : COL_SPAN[anySize],
                )}
                {...rest}
            >
                <div className={classNames("w-full", ALIGNS[align])}>{children}</div>
            </div>
        </>
    );
};

const GroupControl = forwardRef((props: GroupControlProps, ref) => {
    const {
        labelSize,
        label,
        only,
        controlSize = 4,
        borderLeft = false,
        borderRight = false,
        borderTop = false,
        borderBottom = false,

        ...rest
    } = props;
    return (
        <>
            {!props["data-parent"] && label !== undefined && only !== "control" && (
                <GroupLabel required={props.required} label={label} labelSize={labelSize} />
            )}
            {props["data-parent"] === "group_col" ? (
                <FormControl ref={ref} {...rest} />
            ) : (
                <div
                    className={classNames(
                        "uf-group-col",
                        COL_SPAN[controlSize],
                        borderLeft === false ? "border-l-0" : "border-l-[1px]",
                        borderRight === false ? "border-r-0" : "border-r-[1px]",
                        borderTop === false ? "border-t-0" : "border-t-[1px]",
                        borderBottom === false ? "border-b-0" : "border-b-[1px]",
                    )}
                >
                    <FormControl ref={ref} {...rest} />
                </div>
            )}
        </>
    );
});

const GroupCol = (props: GroupColProps) => {
    const { children, required, label, labelSize, combine = false, colSize = 4, padding = 1 } = props;
    return (
        <>
            {label && <GroupLabel required={required} label={label} labelSize={labelSize} />}

            {combine ? (
                <div className={classNames("uf-group-col", COL_SPAN[colSize])}>
                    <div className="flex border rounded divide-x overflow-hidden">
                        {React.Children.map(children, (child: any) => {
                            return (
                                <div className="[&_*]:border-none [&_*]:rounded-none">
                                    {child && React.cloneElement(child, { "data-parent": "group_col" })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className={classNames("p-" + padding + " flex items-center space-x-1", COL_SPAN[colSize])}>
                    {React.Children.map(children, (child: any) => {
                        if (typeof child === "string") return child;
                        if (child) return React.cloneElement(child, { "data-parent": "group_col" });
                    })}
                </div>
            )}
        </>
    );
};

Group.Header = GroupHeader;
Group.Body = GroupBody;
Group.Footer = GroupFooter;
Group.Section = GroupSection;
Group.Title = GroupTitle;
Group.Row = GroupRow;
Group.Col = GroupCol;
Group.Field = GroupCol;
Group.Any = GroupAny;
Group.Label = GroupLabel;
Group.Control = GroupControl;
