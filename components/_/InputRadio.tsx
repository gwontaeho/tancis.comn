import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useOptions } from "@/comn/hooks";
import { TFormControlOptions } from "@/comn/components";

/** */
type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
    edit?: boolean;
    options?: TFormControlOptions;
    comnCd?: string;
    area?: string;
    lang?: string;
    onValueChange?: any;
};

export const Radio = (props: RadioProps) => {
    const {
        edit = true,
        /** */
        comnCd,
        area,
        lang,
        options,
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
            /** */
            name,
            onClick,
            onBlur,
            onFocus,
            readOnly,
            disabled,
        }).filter(([, value]) => value !== undefined),
    );

    const [_value, _setValue] = React.useState<any>(value);

    const { t } = useTranslation();
    const o = useOptions({ comnCd, area, options });
    console.log(o);

    React.useEffect(() => {
        if (value === _value) return;
        _setValue(value);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        _setValue(e.target.value);
        if (onChange) {
            onChange(e);
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
                <div className={classNames("flex flex-wrap w-fit", readOnly && "pointer-events-none")}>
                    {o.options?.map((option, i) => {
                        return (
                            <label key={OPTIONS_ID_BASE + "." + i} className="flex items-center h-7 space-x-1 mr-3">
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
