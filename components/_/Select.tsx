import React from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { Icon, FormControlOptionsType } from "@/comn/components";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    options?: FormControlOptionsType;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
        const { options, ...rest } = props;

        const { t } = useTranslation();

        return (
            <div className="relative flex w-full items-center">
                <select {...rest} ref={ref} className="input appearance-none pr-5">
                    {Array.isArray(options) &&
                        options.map(({ label, value }) => {
                            return (
                                <option key={uuid()} value={value}>
                                    {typeof label === "string" ? t(label) : label}
                                </option>
                            );
                        })}
                </select>
                <Icon icon="down" size="xs" className="absolute right-1 pointer-events-none" />
            </div>
        );
    }
);
