import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useOptions, UseOptionsProps } from "@/comn/hooks";
import { Icon } from "@/comn/components";

/** */
type SelectProps = UseOptionsProps & {
    edit?: boolean;
    all?: boolean;
    select?: boolean;

    name?: string;
    value?: any;
    readOnly?: boolean;
    disabled?: boolean;
    onBlur?: (arg?: any) => void;
    onChange?: (arg?: any) => void;
};

export const Select = (props: SelectProps) => {
    const {
        /** */
        all,
        edit = true,
        select = true,
        /** useOptions props */
        area,
        comnCd,
        options,
        /** input props */
        name,
        value,
        readOnly,
        disabled,
        onBlur,
        onChange,
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
    const o = useOptions({ comnCd, area, options });

    const [_value, _setValue] = React.useState<any>(formatSelect(value));

    React.useEffect(() => {
        if (value === _value) return;
        _setValue(formatSelect(value));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        _setValue(e.target.value);
        if (onChange) onChange(e.target.value);
    };

    return (
        <div className="w-full">
            {/* view text */}
            {!edit && (
                <div title={viewSelect(value, { options: o.options })}>{viewSelect(value, { options: o.options })}</div>
            )}
            <div hidden={!edit}>
                <div className="relative flex w-full items-center">
                    <select
                        {..._props}
                        value={_value}
                        onChange={handleChange}
                        className={classNames("input appearance-none pr-5", readOnly && "pointer-events-none")}
                    >
                        {(all || select) && <option value="">{all ? t("L_AL") : t("L_SELT")}</option>}
                        {o.hasOption &&
                            o.options.map(({ label, value }, i) => {
                                return (
                                    <option key={o.base + "." + i} value={value}>
                                        {t(label)}
                                    </option>
                                );
                            })}
                    </select>
                    <Icon icon="down" size="xs" className="absolute right-1 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export const viewSelect = (v: any, o?: any) => {
    if (!o?.options) return;

    const option = o.options?.find(({ value }: any) => value === v);

    if (!option) return;

    const vt = option.value ? `[${option.value}] ` : "";
    const lt = option.label;

    return vt + lt;
};

export const formatSelect = (v: any) => {
    if (!v) return "";

    return String(v);
};

export const unformatSelect = (v: any, o?: any) => {
    if (v) return undefined;

    return String(v);
};
