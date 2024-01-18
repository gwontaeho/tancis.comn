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
                onClick,
                onBlur,
                onFocus,
                readOnly,
                disabled,
                maxLength,
                placeholder,
                defaultValue,
            }).filter(([, value]) => value !== undefined),
        );

        const [_value, _setValue] = React.useState<any>(typeof value == "string" ? value : "");

        React.useEffect(() => {
            if (value === _value) return;
            _setValue(typeof value !== "string" ? "" : value);
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            _setValue(e.target.value);
            if (!onChange) return;
            onChange(e);
        };

        return (
            <div className="w-full">
                {!edit && <div>{_value}</div>}
                <div hidden={!edit}>
                    <FormattedInput
                        {..._props}
                        ref={ref}
                        value={_value}
                        onChange={handleChange}
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
