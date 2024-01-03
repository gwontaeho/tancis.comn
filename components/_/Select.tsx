import React from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { useOptions } from "@/comn/hooks";
import { Icon, TFormControlOptions } from "@/comn/components";

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
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    options?: TFormControlOptions;
    comnCd?: string;
    area?: string;
    lang?: string;
    all?: boolean;
    select?: boolean;
    readOnly?: boolean;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
        const {
            comnCd,
            area,
            lang,
            options,
            /** */
            all,
            select,
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

        const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);

        const _props = Object.fromEntries(
            Object.entries({
                all,
                select,
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

        /**
         * readOnly 처리 해야함..
         */

        return (
            <>
                <div className="relative flex w-full items-center">
                    <select {..._props} ref={ref} className="input appearance-none pr-5">
                        {all && <option value="">{t("L_AL")}</option>}
                        {select && <option value="">{t("L_SELT")}</option>}
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
            </>
        );
    },
);
