import React from "react";
import { FormattedInput, FormattedInputProps } from "@/comn/components/_";

/**
 * # FormattedInputProps
 * mask
 * exact
 * letterCase
 * onValueChange
 * - decimalScale
 * - thousandSeparator
 *
 * name
 * value
 * onClick
 * onChange
 * onBlur
 * onFocus
 * readOnly
 * disabled
 * maxLength
 * placeholder
 */

/** */
export type InputTextProps = Omit<FormattedInputProps, "decimalScale" | "thousandSeparator">;

export const InputText = React.forwardRef<HTMLInputElement, FormattedInputProps>(
    (props: FormattedInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            mask,
            exact,
            letterCase,
            onValueChange,
            /** */
            name,
            value,
            onClick,
            onChange,
            onBlur,
            onFocus,
            readOnly,
            disabled,
            maxLength,
            placeholder,
        } = props;

        const _props = Object.fromEntries(
            Object.entries({
                mask,
                exact,
                letterCase,
                onValueChange,
                /** */
                name,
                value,
                onClick,
                onChange,
                onBlur,
                onFocus,
                readOnly,
                disabled,
                maxLength,
                placeholder,
            }).filter(([, value]) => value !== undefined),
        );

        return <FormattedInput {..._props} ref={ref} type="text" autoComplete="off" className="input" />;
    },
);
