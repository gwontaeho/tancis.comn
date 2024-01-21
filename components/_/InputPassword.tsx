import React from "react";
import { IconButton } from "@/comn/components/IconButton";

/** */
export type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement> & {
    edit?: boolean;
};

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
    (props: InputPasswordProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            /** */
            edit = true,
            value,
            onChange,
            /** */
            name,
            onBlur,
            onClick,
            onFocus,
            readOnly,
            disabled,
            maxLength,
            placeholder,
            defaultValue,
        } = props;

        const _props = Object.fromEntries(
            Object.entries({
                name,
                onBlur,
                onClick,
                onFocus,
                readOnly,
                disabled,
                maxLength,
                placeholder,
                defaultValue,
            }).filter(([, value]) => value !== undefined),
        );

        const [show, setShow] = React.useState(false);

        const [_value, _setValue] = React.useState<any>(formatPassword(value));

        React.useEffect(() => {
            if (value === _value) return;

            _setValue(formatPassword(value));
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

export const formatPassword = (v: any, o?: any) => {
    if (!v) return "";

    let f = String(v);

    return f;
};

export const unformatPassword = (v: any, o?: any) => {};
