import React from "react";
import { FormattedInput, FormattedInputProps } from "@/comn/components/_";

/**
 *
 * # FormattedInputProps
 * mask
 * exact
 * letterCase
 * onValueChange
 * - decimalScale
 * - thousandSeparator
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
export type InputTextProps = Omit<FormattedInputProps, "decimalScale" | "thousandSeparator"> & {
    edit?: boolean;
};

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
    (props: InputTextProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            edit = true,
            /** */
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
                        type="text"
                        autoComplete="off"
                        className="input"
                    />
                </div>
            </div>
        );
    },
);
