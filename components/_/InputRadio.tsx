import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useOptions, UseOptionsProps } from "@/comn/hooks";

/** */
type RadioProps = UseOptionsProps & {
    edit?: boolean;

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
        /** useOptions props */
        area,
        comnCd,
        options,
        /** */
        name,
        value,
        readOnly,
        disabled,
        onBlur,
        onChange,
    } = props;

    const _props = Object.fromEntries(
        Object.entries({
            /** */
            name,
            readOnly,
            disabled,
            onBlur,
        }).filter(([, value]) => value !== undefined),
    );

    const [_value, _setValue] = React.useState<any>(value);

    const { t } = useTranslation();
    const o = useOptions({ comnCd, area, options });

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
            {!edit && <div>{viewRadio(value, { options: o.options })}</div>}

            <div hidden={!edit}>
                <div className={classNames("flex flex-wrap w-fit", readOnly && "pointer-events-none")}>
                    {o.hasOption &&
                        o.options.map((option, i) => {
                            return (
                                <label key={o.base + "." + i} className="flex items-center h-7 space-x-1 mr-3">
                                    <input
                                        {..._props}
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

    const vt = option.value ? `[${option.value}] ` : "";
    const lt = option.label;

    return vt + lt;
};

export const formatRadio = (v: any) => {
    if (!v) return "";

    return String(v);
};

export const unformatRadio = (v: any, o?: any) => {
    if (v) return undefined;

    return String(v);
};
