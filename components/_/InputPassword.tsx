import React from "react";
import { IconButton } from "@/comn/components/IconButton";

/** */
export type InputPasswordProps = {
    edit?: boolean;

    name?: string;
    value?: any;
    readOnly?: boolean;
    disabled?: boolean;
    maxLength?: number;
    placeholder?: string;
    defaultValue?: any;
    onBlur?: (arg?: any) => void;
    onFocus?: (arg?: any) => void;
    onChange?: (arg?: any) => void;
};

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
    (props: InputPasswordProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            /** */
            edit = true,
            /** input props */
            name,
            value,
            readOnly,
            disabled,
            maxLength,
            placeholder,
            defaultValue,
            onBlur,
            onFocus,
            onChange,
        } = props;

        const _props = Object.fromEntries(
            Object.entries({
                name,
                readOnly,
                disabled,
                maxLength,
                placeholder,
                defaultValue,
                onBlur,
                onFocus,
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

            if (onChange) {
                onChange(e.target.value);
            }
        };

        const replacePassword = (value: string) => {
            if (!value) return "*";

            let t = "";

            for (let i = 0; i < value.length; i++) {
                t += "*";
            }
            return t;
        };

        return (
            <div className="w-full">
                {!edit && <div>{replacePassword(_value)}</div>}
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

    return String(v);
};

export const unformatPassword = (v: any, o?: any) => {
    if (!v) return undefined;

    return String(v);
};
