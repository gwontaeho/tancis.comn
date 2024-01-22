import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import { idb, utils } from "@/comn/utils";

import { resourceState } from "@/comn/features/recoil";
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
        /** */
        comnCd,
        area,
        options,
        /** */
        all,
        select = true,
        /** */
        name,
        value,
        onClick,
        onChange,
        onValueChange,
        onBlur,
        onFocus,
        readOnly,
        disabled,
    } = props;

    const _props = Object.fromEntries(
        Object.entries({
            name,
            onClick,
            onBlur,
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
        if (onChange) {
            onChange(e.target.value);
        }
        if (onValueChange) {
            onValueChange({ value: e.target.value, data: e.target.value, formattedValue: e.target.value });
        }
    };

    const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);

    return (
        <div className="w-full">
            {!edit && <div>{o.options?.find(({ value }) => value === _value)?.label}</div>}
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
