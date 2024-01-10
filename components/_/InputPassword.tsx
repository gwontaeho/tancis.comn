import React from "react";
import { IconButton } from "@/comn/components/IconButton";

/**
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
export type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement> & {
    edit?: boolean;
};

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
    (props: InputPasswordProps, ref: React.ForwardedRef<HTMLInputElement>) => {
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
            }).filter(([, value]) => value !== undefined),
        );

        const [show, setShow] = React.useState(false);
        const _ref = React.useRef<HTMLInputElement | null>(null);

        return (
            <div className="w-full">
                {!edit && <div>{_ref.current?.value}</div>}
                <div hidden={!edit}>
                    <div className="relative flex items-center">
                        <input
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
                            type={show ? "text" : "password"}
                            autoComplete="off"
                            className="input"
                        />
                        <IconButton
                            onClick={() => setShow((prev) => !prev)}
                            icon={show ? "eyeSlash" : "eye"}
                            size="sm"
                            className="absolute right-1"
                        />
                    </div>
                </div>
            </div>
        );
    },
);
