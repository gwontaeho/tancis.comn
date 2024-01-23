import React from "react";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { useOptions } from "@/comn/hooks";
import { Icon, TFormControlOptions } from "@/comn/components";

/** */
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    onChange?: any;

    edit?: boolean;
    all?: boolean;
    select?: boolean;
    options?: TFormControlOptions;

    /** code */
    comnCd?: string;
    area?: string;

    readOnly?: boolean;
    onValueChange?: any;
};

export const Select = (props: SelectProps) => {
    const {
        edit = true,
        options,
        /** */
        comnCd,
        area,
        /** */
        all,
        select = true,
        /** */
        name,
        value,
        onValueChange,
        onClick,
        onChange,
        onBlur,
        onFocus,
        readOnly,
        disabled,
    } = props;

    const _props = Object.fromEntries(
        Object.entries({
            name,
            onBlur,
            onClick,
            onFocus,
            readOnly,
            disabled,
        }).filter(([, value]) => value !== undefined),
    );

    const { t } = useTranslation();
    const o = useOptions({ comnCd, area, options });

    const [_value, _setValue] = React.useState<any>();

    React.useEffect(() => {
        if (value === _value) return;
        _setValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        _setValue(e.target.value);
        if (onChange) onChange(e.target.value);

        // if (onValueChange) {
        //     onValueChange({ value: e.target.value, data: e.target.value, formattedValue: e.target.value });
        // }
    };

    const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);

    return (
        <div className="w-full">
            {!edit && (
                <div title={viewSelect(value, { options: o.options })}>{viewSelect(value, { options: o.options })}</div>
            )}
            <div hidden={!edit}>
                <div className="relative flex w-full items-center">
                    <select
                        {..._props}
                        value={_value || ""}
                        onChange={handleChange}
                        className={classNames("input appearance-none pr-5", readOnly && "pointer-events-none")}
                    >
                        {(all || select) && <option value="">{all ? t("L_AL") : t("L_SELT")}</option>}
                        {o.options?.map(({ label, value }, i) => {
                            return (
                                <option key={OPTIONS_ID_BASE + "." + i} value={value}>
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
