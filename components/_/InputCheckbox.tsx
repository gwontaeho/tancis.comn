import React from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { useOptions } from "@/comn/hooks";
import { TFormControlOptions } from "@/comn/components";

/**
 * edit=true
 *
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
    edit?: boolean;
    options?: TFormControlOptions;
    comnCd?: string;
    area?: string;
    lang?: string;
    all?: boolean;
    value?: any[];
    onChange?: (value: any[]) => void;
};

export const Checkbox = (props: CheckboxProps) => {
    const {
        edit = true,
        /** */
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
        if (value === undefined || value === null) {
            _setValue([]);
            return;
        }

        if (!Array.isArray(value)) return;
        if (String(value) === String(_value)) return;
        _setValue(value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const next = event.target.checked
            ? [..._value, event.target.value]
            : _value.filter((_) => _ !== event.target.value);
        _setValue(next);

        if (!onChange) return;
        onChange(next);
    };

    const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const next = event.target.checked ? o.options?.map(({ value }) => value) || [] : [];
        _setValue(next);

        if (!onChange) return;
        onChange(next);
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
        <div className="w-full">
            {!edit && (
                <div>
                    {o.options
                        ?.filter(({ value }) => {
                            return _value.includes(value);
                        })
                        .map(({ label }) => {
                            return label;
                        })
                        .join(", ")}
                </div>
            )}
            <div hidden={!edit}>
                <div className="flex flex-wrap w-fit">
                    {all && (
                        <div className="flex items-center h-7 space-x-1 mr-3">
                            <label className="flex items-center h-7 space-x-1">
                                <input type="checkbox" disabled={disabled} onChange={handleChangeAll} />
                                <div>{t(`L_AL`)}</div>
                            </label>
                        </div>
                    )}
                    {o.options?.map((option, i) => {
                        return (
                            <label key={OPTIONS_ID_BASE + "." + i} className="flex items-center h-7 space-x-1 mr-3">
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
