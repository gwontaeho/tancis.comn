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
                onClick,
                onBlur,
                onFocus,
                readOnly,
                disabled,
                maxLength,
                placeholder,
            }).filter(([, value]) => value !== undefined),
        );

        const [show, setShow] = React.useState(false);

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
                    <div className="relative flex items-center">
                        <input
                            {..._props}
                            ref={ref}
                            value={_value}
                            onChange={handleChange}
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
