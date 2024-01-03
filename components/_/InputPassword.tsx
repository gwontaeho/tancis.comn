import React from "react";
import { IconButton } from "@/comn/components/IconButton";

/**
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
export type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement>;

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
    (props: InputPasswordProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const { name, value, onClick, onChange, onBlur, onFocus, readOnly, disabled, maxLength, placeholder } = props;

        const _props = Object.fromEntries(
            Object.entries({
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

        const [show, setShow] = React.useState(false);

        return (
            <div className="w-full relative flex items-center">
                <input {..._props} ref={ref} type={show ? "text" : "password"} autoComplete="off" className="input" />
                <IconButton
                    onClick={() => setShow((prev) => !prev)}
                    icon={show ? "eyeSlash" : "eye"}
                    size="sm"
                    className="absolute right-1"
                />
            </div>
        );
    },
);
