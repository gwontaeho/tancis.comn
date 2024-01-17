import React, { forwardRef } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { FormControl, FormControlProps } from "@/comn/components";

const SIZES = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
};

const FLEXES = {
    1: "flex-[1]",
    2: "flex-[2]",
    3: "flex-[3]",
    4: "flex-[4]",
    5: "flex-[5]",
    6: "flex-[6]",
    7: "flex-[7]",
    8: "flex-[8]",
    9: "flex-[9]",
    10: "flex-[10]",
    11: "flex-[11]",
    12: "flex-[12]",
};

type GroupProps = {
    children?: React.ReactNode;
    bgColor?: boolean;
    flex?: keyof typeof FLEXES;
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
    children?: React.ReactNode;
};

type GroupAnyProps = {
    children?: React.ReactNode;
};

type GroupLabelProps = FormControlProps & {
    label?: React.ReactNode;
    labelSize?: keyof typeof SIZES;
    required?: boolean | string;
};

export type GroupControlProps = GroupLabelProps & {
    controlSize?: keyof typeof SIZES;
    only?: "control" | "label";
    "data-parent"?: string;
};

type GroupColProps = GroupLabelProps & {
    children?: React.ReactNode;
    colSize?: keyof typeof SIZES;
    combine?: boolean;
};

/**
 *
 *
 * Group
 * - Header
 * - Title
 * - Body
 * - Row
 * - Label
 * - Control
 * - Col
 *
 *
 */

export const Group = (props: GroupProps) => {
    const { children, flex } = props;
    return <div className={classNames("uf-group", flex && FLEXES[flex])}>{children}</div>;
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
    const { children } = props;
    return <div className="uf-group-row">{children}</div>;
};

const GroupLabel = forwardRef((props: GroupLabelProps, ref) => {
    const { t } = useTranslation();
    const { label, labelSize = 2, ...rest } = props;

    return (
        <div className={classNames("uf-group-label", SIZES[labelSize])}>
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
    const { children, ...rest } = props;
    return (
        <>
            <div className={"p-1 flex items-center space-x-1"} {...rest}>
                {children}
            </div>
        </>
    );
};

const GroupControl = forwardRef((props: GroupControlProps, ref) => {
    const { labelSize, label, only, controlSize = 4, ...rest } = props;
    return (
        <>
            {!props["data-parent"] && label !== undefined && only !== "control" && (
                <GroupLabel required={props.required} label={label} labelSize={labelSize} />
            )}
            {props["data-parent"] === "group_col" ? (
                <FormControl ref={ref} {...rest} />
            ) : (
                <div className={classNames("uf-group-col", SIZES[controlSize])}>
                    <FormControl ref={ref} {...rest} />
                </div>
            )}
        </>
    );
});

const GroupCol = (props: GroupColProps) => {
    const { children, required, label, labelSize, combine = false, colSize = 4 } = props;
    return (
        <>
            {label && <GroupLabel required={required} label={label} labelSize={labelSize} />}

            {combine ? (
                <div className={classNames("uf-group-col", SIZES[colSize])}>
                    <div className="flex border rounded divide-x overflow-hidden">
                        {React.Children.map(children, (child: any) => {
                            return (
                                <div className="[&_*]:border-none [&_*]:rounded-none">
                                    {React.cloneElement(child, { "data-parent": "group_col" })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className={classNames("p-1 flex items-center space-x-1", SIZES[colSize])}>
                    {React.Children.map(children, (child: any) => {
                        return React.cloneElement(child, { "data-parent": "group_col" });
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
