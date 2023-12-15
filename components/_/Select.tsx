import React from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { Icon, FormControlOptionsType } from "@/comn/components";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    options?: FormControlOptionsType;
    all?: boolean;
    select?: boolean;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
        const { options, all, select, required, ...rest } = props;
        const { t } = useTranslation();

        const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);
        return (
            <div className="relative flex w-full items-center">
                <select {...rest} ref={ref} className="input appearance-none pr-5">
                    {all === true && (
                        <option key={OPTIONS_ID_BASE + ".all"} value="">
                            {t("L_AL")}
                        </option>
                    )}
                    {select === true && (
                        <option key={OPTIONS_ID_BASE + ".select"} value="">
                            {t("L_SELT")}
                        </option>
                    )}
                    {Array.isArray(options) &&
                        options.map(({ label, value }, i) => {
                            return (
                                <option key={OPTIONS_ID_BASE + "." + i} value={value}>
                                    {t(label)}
                                </option>
                            );
                        })}
                </select>
                <Icon icon="down" size="xs" className="absolute right-1 pointer-events-none" />
            </div>
        );
    }
);
