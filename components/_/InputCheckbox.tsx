import React, { useRef } from "react";
import lodash from "lodash";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useOptions, UseOptionsProps } from "@/comn/hooks";

/** */
type CheckboxProps = UseOptionsProps & {
    edit?: boolean;
    all?: boolean;
    checkAll?: boolean;
    viewType?: "label" | "value" | "both";
    editType?: "label" | "value" | "both";

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
        checkAll,
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

    //console.log(value);

    const { t } = useTranslation();
    const o = useOptions({ comnCd, area, options, excludes, includes, filter });
    const _checkAll = useRef(checkAll);

    const [_value, _setValue] = React.useState<any[]>(formatCheckbox(value));

    React.useEffect(() => {
        /** is equal */
        if (lodash.isEqual(value, _value)) return;

        _setValue(formatCheckbox(value));
    }, [value]);

    React.useEffect(() => {
        if (value === undefined && _checkAll.current === true && o.options.length > 0) {
            let t = o.options.map((item) => item.value);
            _setValue(formatCheckbox(t));
            _checkAll.current = false;
        }
    }, [o]);

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
                <div title={viewCheckbox(value, { viewType, options: o.options })}>
                    {viewCheckbox(value, { viewType, options: o.options })}
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
                                    {option.label && (
                                        <div> {editCheckbox(option.value, t(option.label), editType)}</div>
                                    )}
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
    if (!v) return;

    const view = o.options
        .filter(({ value }: any) => {
            return v.includes(value);
        })
        .map(({ label, value }: any) => {
            const vt = value || "";
            const lt = label || "";
            const vtWithBracket = value ? `[${value}] ` : "";
            const view = o?.viewType === "value" ? vt : o?.viewType === "label" ? lt : vtWithBracket + lt;

            return view;
        })
        .join(", ");

    return view;
};

export const editCheckbox = (value: string, label: string, editType: string) => {
    const view = editType === "label" ? label : editType === "value" ? value : "[" + value + "] " + label;
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
    if (v.length === 0) return [];

    return v;
};
