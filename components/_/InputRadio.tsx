import React, { useRef, useId } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { BOLD_TEXT, COLOR_TEXT, SIZE_TEXT } from "@/comn/features/foundation";
import { comnUtils } from "@/comn/utils";

import { useOptions, UseOptionsProps } from "@/comn/hooks";

/** */
type RadioProps = UseOptionsProps & {
    all?: boolean;
    edit?: boolean;
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
};

export const Radio = (props: RadioProps) => {
    const {
        all,
        edit = true,
        viewType = "both",
        editType = "label",
        /** useOptions props */
        area,
        comnCd,
        options,
        excludes,
        includes,
        filter,
        /** */
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
    } = props;

    const name = useId();
    const _props = Object.fromEntries(
        Object.entries({
            /** */
            onBlur,
        }).filter(([, value]) => value !== undefined),
    );

    const [_value, _setValue] = React.useState<any>(value);

    const { t } = useTranslation();
    const o = useOptions({ comnCd, area, options, excludes, includes, filter });

    React.useEffect(() => {
        if (value === _value) return;
        _setValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        _setValue(e.target.value);
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className="w-full">
            {/* view text */}
            {!edit && (
                <div
                    title={viewRadio(value, { options: o.options, viewType })}
                    className={comnUtils.getViewStyle(color, bold, fontSize)}
                >
                    {viewRadio(value, { options: o.options, viewType })}
                </div>
            )}

            <div hidden={!edit}>
                <div className={classNames("flex flex-wrap w-fit", readOnly && "pointer-events-none")}>
                    {o.hasOption && all && (
                        <label className="flex items-center h-7 space-x-1 mr-3">
                            <input
                                {..._props}
                                name={name}
                                type="radio"
                                value=""
                                checked={_value === ""}
                                onChange={handleChange}
                            />
                            <div className={comnUtils.getEditStyle(editColor, editBold)}>{t(`L_AL`)}</div>
                        </label>
                    )}

                    {o.hasOption &&
                        o.options.map((option, i) => {
                            return (
                                <label key={o.base + "." + i} className="flex items-center h-7 space-x-1 mr-3">
                                    <input
                                        {..._props}
                                        name={name}
                                        type="radio"
                                        value={option.value}
                                        checked={option.value === _value}
                                        readOnly={readOnly && option.value === _value}
                                        disabled={disabled || (readOnly && option.value !== _value)}
                                        onChange={handleChange}
                                    />
                                    {option.label && (
                                        <div className={comnUtils.getEditStyle(editColor, editBold)}>
                                            {editRadio(option.value, t(option.label), editType)}
                                        </div>
                                    )}
                                </label>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export const viewRadio = (v: any, o?: any) => {
    if (!o?.options) return;

    const option = o.options?.find(({ value }: any) => value === v);

    if (!option) return;

    const vt = option.value || "";
    const lt = option.label || "";
    const vtWithBracket = option.value ? `[${option.value}] ` : "";

    const view = o?.viewType === "value" ? vt : o?.viewType === "label" ? lt : vtWithBracket + lt;

    return view;
};

export const editRadio = (value: string, label: string, editType: string) => {
    const view = editType === "label" ? label : editType === "value" ? value : "[" + value + "] " + label;
    return view;
};

export const formatRadio = (v: any) => {
    if (!v) return "";

    return String(v);
};

export const unformatRadio = (v: any, o?: any) => {
    if (v) return undefined;

    return String(v);
};
