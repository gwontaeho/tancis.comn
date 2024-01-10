import React from "react";

/**
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
export type InputTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    edit?: boolean;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, InputTextareaProps>(
    (props: InputTextareaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
        const {
            edit = true,
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
            rows,
        } = props;

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
                rows,
            }).filter(([, value]) => value !== undefined),
        );

        const _ref = React.useRef<HTMLTextAreaElement | null>(null);

        return (
            <div className="w-full">
                {!edit && <div>{_ref.current?.value}</div>}
                <div hidden={!edit}>
                    <textarea
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
                        className="input overflow-hidden"
                    />
                </div>
            </div>
        );
    },
);
