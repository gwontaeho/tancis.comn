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
            defaultValue,
        } = props;

        const _props = Object.fromEntries(
            Object.entries({
                mask,
                exact,
                letterCase,
                onValueChange,
                /** */
                name,
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
                        type="text"
                        autoComplete="off"
                        className="input"
                    />
                </div>
            </div>
        );
    },
);
