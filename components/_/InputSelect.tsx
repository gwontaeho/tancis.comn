import type { ChangeEvent } from "react";
import { forwardRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { BOLD_TEXT, COLOR_TEXT, SIZE_TEXT } from "@/comn/features/foundation";
import { comnUtils } from "@/comn/utils";

import { useOptions, UseOptionsProps } from "@/comn/hooks";
import { Icon } from "@/comn/components";
import { Link } from "react-router-dom";

/** */
type SelectProps = UseOptionsProps & {
    edit?: boolean;
    all?: boolean;
    select?: boolean;
    viewType?: "label" | "value" | "both";
    editType?: "label" | "value" | "both";

    name?: string;
    value?: any;
    readOnly?: boolean;
    disabled?: boolean;

    color?: keyof typeof COLOR_TEXT;
    editColor?: keyof typeof COLOR_TEXT;
    bold?: keyof typeof BOLD_TEXT;
    editBold?: keyof typeof BOLD_TEXT;
    fontSize?: keyof typeof SIZE_TEXT;

    onBlur?: (arg?: any) => void;
    onChange?: (arg?: any) => void;
    onClick?: (arg?: any) => void;

    as?: "link";
    to?: string;
};

export const Select = forwardRef((props: SelectProps, ref: any) => {
    const {
        /** */
        all,
        edit = true,
        select = true,
        viewType = "both",
        editType = "label",
        /** useOptions props */
        area,
        comnCd,
        options,
        excludes,
        includes,
        filter,
        /** input props */
        name,
        value,
        readOnly,
        disabled,

        color,
        editColor,
        bold,
        editBold,
        fontSize,

        onBlur,
        onChange,
        onClick,

        as,
        to,
    } = props;

    const _props = Object.fromEntries(
        Object.entries({
            name,
            readOnly,
            disabled,
            onBlur,
        }).filter(([, value]) => value !== undefined),
    );

    const { t } = useTranslation();
    const o = useOptions({ comnCd, area, options, excludes, includes, filter });

    const [_value, _setValue] = useState<any>(formatSelect(value));

    useEffect(() => {
        if (value === _value) return;
        _setValue(formatSelect(value));
    }, [value]);

    useEffect(() => {
        if (all) return;
        if (select) return;
        if (value) return;
        if (!o.hasOption) return;

        // _setValue(o.options[0].value);
        // if (onChange) onChange(o.options[0].value);
    }, []);

    const handleClick = () => {
        if (onClick) {
            onClick(_value);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        _setValue(e.target.value);
        if (onChange) onChange(e.target.value);
    };

    return (
        <div className="w-full">
            {/* view text */}
            {!edit &&
                (as === "link" ? (
                    to ? (
                        <Link
                            to={to}
                            title={viewSelect(value, { viewType, options: o.options })}
                            onClick={handleClick}
                            className="text-uf-blue underline"
                        >
                            {viewSelect(value, { viewType, options: o.options })}
                        </Link>
                    ) : (
                        <div
                            title={viewSelect(value, { viewType, options: o.options })}
                            onClick={handleClick}
                            className="text-uf-blue underline cursor-pointer"
                        >
                            {viewSelect(value, { viewType, options: o.options })}
                        </div>
                    )
                ) : (
                    <div
                        title={viewSelect(value, { viewType, options: o.options })}
                        className={comnUtils.getViewStyle(color, bold, fontSize)}
                        onClick={handleClick}
                    >
                        {viewSelect(value, { viewType, options: o.options })}
                    </div>
                ))}
            <div hidden={!edit}>
                <div className="relative flex w-full items-center">
                    <select
                        {..._props}
                        ref={ref}
                        value={_value}
                        onChange={handleChange}
                        onClick={handleClick}
                        className={classNames(
                            "input appearance-none pr-5",
                            readOnly && "pointer-events-none",
                            comnUtils.getEditStyle(editColor, editBold),
                        )}
                    >
                        {(all || select) && <option value="">{all ? t("L_AL") : t("L_SELT")}</option>}
                        {o.hasOption &&
                            o.options.map(({ label, value }, i) => {
                                return (
                                    <option key={o.base + "." + i} value={value}>
                                        {editSelect(value, t(label), editType)}
                                    </option>
                                );
                            })}
                    </select>
                    <Icon icon="down" size="xs" className="absolute right-1 pointer-events-none" />
                </div>
            </div>
        </div>
    );
});

export const viewSelect = (v: any, o?: any) => {
    if (!o?.options) return;

    const option = o.options?.find(({ value }: any) => value === v);

    if (!option) return;

    const vt = option.value || "";
    const lt = option.label || "";
    const vtWithBracket = option.value ? `[${option.value}] ` : "";

    const view = o?.viewType === "value" ? vt : o?.viewType === "label" ? lt : vtWithBracket + lt;

    return view;
};

export const editSelect = (value: string, label: string, editType: string) => {
    const view = editType === "label" ? label : editType === "value" ? value : "[" + value + "] " + label;
    return view;
};

export const formatSelect = (v: any) => {
    if (!v) return "";

    return String(v);
};

export const unformatSelect = (v: any, o?: any) => {
    if (v) return undefined;

    return String(v);
};
