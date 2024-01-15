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
 * maxLength
 * placeholder
 */

/** */
export type InputNumberProps = Omit<FormattedInputProps, "mask" | "exact" | "letterCase"> & {
    edit?: boolean;
};

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
    (props: InputNumberProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            edit = true,
            /** */
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
            defaultValue,
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
                defaultValue,
            }).filter(([, value]) => value !== undefined),
        );

        const _ref = React.useRef<HTMLInputElement | null>(null);

        return (
            <div className="w-full">
                {!edit && <div>{_ref.current?.value}</div>}
                <div hidden={!edit}>
                    <FormattedInput
                        {..._props}
                        ref={(node) => {
                            _ref.current = node;
                            if (!ref) return;
                            if (typeof ref === "function") {
                                ref(node);
                            } else {
                                ref.current = node;
                            }
                        }}
                        type="number"
                        inputMode="numeric"
                        autoComplete="off"
                        className="input"
                    />
                </div>
            </div>
        );
    },
);
