import React from "react";

/**
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
export type InputTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, InputTextareaProps>(
    (props: InputTextareaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
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

        return <textarea {..._props} ref={ref} className="input overflow-hidden" />;
    },
);
