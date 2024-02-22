import React, { useRef, useId } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";

import { useOptions, UseOptionsProps } from "@/comn/hooks";

/** */
type RadioProps = UseOptionsProps & {
    edit?: boolean;
    viewType?: "label" | "value" | "both";

    name?: string;
    value?: any;
    readOnly?: boolean;
    disabled?: boolean;
    onBlur?: (arg?: any) => void;
    onChange?: (arg?: any) => void;
};

export const Radio = (props: RadioProps) => {
    const {
        edit = true,
        viewType = "both",
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
        onBlur,
        onChange,
    } = props;

    const name = useId();

    const _props = Object.fromEntries(
        Object.entries({
            /** */
            readOnly,
            disabled,
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
                <div title={viewRadio(value, { options: o.options, viewType })}>
                    {viewRadio(value, { options: o.options, viewType })}
                </div>
            )}

            <div hidden={!edit}>
                <div className={classNames("flex flex-wrap w-fit", readOnly && "pointer-events-none")}>
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
                                        onChange={handleChange}
                                    />
                                    {option.label && <div> {t(option.label)}</div>}
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

export const formatRadio = (v: any) => {
    if (!v) return "";

    return String(v);
};

export const unformatRadio = (v: any, o?: any) => {
    if (v) return undefined;

    return String(v);
};
