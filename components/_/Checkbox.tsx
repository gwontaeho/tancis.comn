import React from "react";
import { v4 as uuid } from "uuid";
import { Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useOptions } from "@/comn/hooks";
import { ControllerWrapper } from "@/comn/components/_";
import { TFormControlOptions } from "@/comn/components";

/**
 * name
 * value
 * onClick
 * onChange
 * onBlur
 * onFocus
 * readOnly
 * disabled
 */

/** */
type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
    options?: TFormControlOptions;
    comnCd?: string;
    area?: string;
    lang?: string;
    all?: boolean;
    value?: any[];
    onChange?: (value: any[]) => void;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    (props: CheckboxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            comnCd,
            area,
            lang,
            options,
            /** */
            all,
            /** */
            name,
            value,
            onClick,
            onChange,
            onBlur,
            onFocus,
            readOnly,
            disabled,
        } = props;

        const { t } = useTranslation();
        const o = useOptions({ comnCd, area, lang, options });

        const [_value, _setValue] = React.useState<any[]>(value || []);

        React.useEffect(() => {
            if (!onChange) return;
            if (String(value) === String(_value)) return;
            onChange(_value);
        }, [_value]);
        React.useEffect(() => {
            if (String(value) === String(_value)) return;
            _setValue(value || []);
        }, [value]);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const next = event.target.checked
                ? [..._value, event.target.value]
                : _value.filter((_) => _ !== event.target.value);
            _setValue(next);
        };

        const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
            const next = event.target.checked ? o.options?.map(({ value }) => value) || [] : [];
            _setValue(next);
        };

        const _props = Object.fromEntries(
            Object.entries({
                name,
                value,
                onClick,
                onBlur,
                onFocus,
                readOnly,
                disabled,
            }).filter(([, value]) => value !== undefined),
        );

        /**
         * readOnly 처리 해야함..
         */

        const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);
        return (
            <div className="flex flex-wrap w-fit">
                {all && (
                    <div className="flex items-center h-7 space-x-1 mr-3">
                        <label className="flex items-center h-7 space-x-1">
                            <input type="checkbox" disabled={disabled} onChange={handleChangeAll} />
                            <div>{t(`L_AL`)}</div>
                        </label>
                    </div>
                )}
                {o.options?.map(({ label, value }, i) => {
                    return (
                        <label key={OPTIONS_ID_BASE + "." + i} className="flex items-center h-7 space-x-1 mr-3">
                            <input
                                {..._props}
                                ref={ref}
                                type="checkbox"
                                value={value}
                                onChange={handleChange}
                                checked={_value.some((_) => _ === value)}
                            />
                            {label && <div>{t(label)}</div>}
                        </label>
                    );
                })}
            </div>
        );
    },
);
