import React from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { useOptions } from "@/comn/hooks";
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

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
    options?: TFormControlOptions;
    comnCd?: string;
    area?: string;
    lang?: string;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    (props: RadioProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            comnCd,
            area,
            lang,
            options,
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

        const _props = Object.fromEntries(
            Object.entries({
                /** */
                name,
                value,
                onClick,
                onChange,
                onBlur,
                onFocus,
                readOnly,
                disabled,
            }).filter(([, value]) => value !== undefined),
        );

        const { t } = useTranslation();
        const o = useOptions({ comnCd, area, lang, options });

        const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);
        return (
            <>
                <div className="flex flex-wrap w-fit">
                    {o.options?.map(({ label, value }, i) => {
                        return (
                            <label key={OPTIONS_ID_BASE + "." + i} className="flex items-center h-7 space-x-1 mr-3">
                                <input {..._props} ref={ref} type="radio" value={value} />
                                {label && <div> {t(label)}</div>}
                            </label>
                        );
                    })}
                </div>
            </>
        );
    },
);
