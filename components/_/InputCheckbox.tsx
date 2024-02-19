import React from "react";
import lodash from "lodash";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useOptions, UseOptionsProps } from "@/comn/hooks";

/** */
type CheckboxProps = UseOptionsProps & {
    edit?: boolean;
    all?: boolean;
    viewType?: "label" | "value" | "both";

    name?: string;
    value?: any[];
    readOnly?: boolean;
    disabled?: boolean;
    onBlur?: (arg?: any) => void;
    onChange?: (arg?: any) => void;
};

export const Checkbox = (props: CheckboxProps) => {
    const {
        /** */
        all,
        edit = true,
        viewType = "both",
        /** useOptions props */
        area,
        comnCd,
        options,
        /**  */
        value,
        onChange,
        /** input props */
        name,
        readOnly,
        disabled,
        onBlur,
    } = props;

    /** input props */
    const _props = Object.fromEntries(
        Object.entries({
            name,
            readOnly,
            disabled,
            onBlur,
        }).filter(([, value]) => value !== undefined),
    );

    const { t } = useTranslation();
    const o = useOptions({ comnCd, area, options });

    const [_value, _setValue] = React.useState<any[]>(formatCheckbox(value));

    React.useEffect(() => {
        /** is equal */
        if (lodash.isEqual(value, _value)) return;

        _setValue(formatCheckbox(value));
    }, [value]);

    /** handle change */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const next = event.target.checked
            ? [..._value, event.target.value]
            : _value.filter((_) => _ !== event.target.value);

        _setValue(next);

        if (onChange) {
            onChange(next);
        }
    };

    /** handle change all */
    const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const next = event.target.checked ? o.options.map(({ value }) => value) : [];

        _setValue(next);

        if (onChange) {
            onChange(next);
        }
    };

    return (
        <div className="w-full">
            {/* view text */}
            {!edit && (
                <div>
                    {o.options
                        .filter(({ value }) => {
                            return _value.includes(value);
                        })
                        .map(({ label, value }) => {
                            return "[" + value + "] " + label;
                        })
                        .join(", ")}
                </div>
            )}
            <div hidden={!edit}>
                <div className={classNames("flex flex-wrap w-fit", readOnly && "pointer-events-none")}>
                    {/* all checkbox */}
                    {all && o.hasOption && (
                        <div className="flex items-center h-7 space-x-1 mr-3">
                            <label className="flex items-center h-7 space-x-1">
                                <input
                                    type="checkbox"
                                    disabled={disabled}
                                    onChange={handleChangeAll}
                                    checked={o.options.every(({ value }) => _value.includes(value)) || false}
                                />
                                <div>{t(`L_AL`)}</div>
                            </label>
                        </div>
                    )}
                    {o.hasOption &&
                        o.options.map((option, i) => {
                            return (
                                <label key={o.base + "." + i} className="flex items-center h-7 space-x-1 mr-3">
                                    <input
                                        {..._props}
                                        type="checkbox"
                                        value={option.value}
                                        onChange={handleChange}
                                        checked={_value.some((_) => _ === option.value)}
                                    />
                                    {option.label && <div>{t(option.label)}</div>}
                                </label>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export const viewCheckbox = (v: any, o?: any) => {
    if (!o?.options) return;

    const option = o.options?.find(({ value }: any) => value === v);

    if (!option) return;

    const vt = option.value || "";
    const lt = option.label || "";
    const vtWithBracket = option.value ? `[${option.value}] ` : "";

    const view = o?.viewType === "value" ? vt : o?.viewType === "label" ? lt : vtWithBracket + lt;

    return view;
};

export const formatCheckbox = (v: any) => {
    /** not array */
    if (!Array.isArray(v)) return [];

    return v;
};

export const unformatCheckbox = (v: any, o?: any) => {
    /** not array */
    if (!Array.isArray(v)) return undefined;
    /** empty array */
    if (v.length === 0) return undefined;

    return v;
};
