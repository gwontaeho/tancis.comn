import React from "react";
import { FormattedInput, FormattedInputProps } from "@/comn/components/_";

/**
 * decimalScale
 * thousandSeparator
 * onValueChange
 * - mask
 * - exact
 * - letterCase
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
export type InputNumberProps = Omit<FormattedInputProps, "mask" | "exact" | "letterCase">;

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
    (props: FormattedInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            decimalScale,
            thousandSeparator,
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
                decimalScale,
                thousandSeparator,
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

        return (
            <FormattedInput
                {..._props}
                ref={ref}
                type="number"
                inputMode="numeric"
                autoComplete="off"
                className="input"
            />
        );
    },
);
