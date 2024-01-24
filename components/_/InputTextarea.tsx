import React from "react";

/** */
export type InputTextareaProps = {
    edit?: boolean;

    name?: string;
    value?: any;
    rows?: number;
    readOnly?: boolean;
    disabled?: boolean;
    maxLength?: number;
    placeholder?: string;
    defaultValue?: any;
    onBlur?: (arg?: any) => void;
    onFocus?: (arg?: any) => void;
    onChange?: (arg?: any) => void;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, InputTextareaProps>(
    (props: InputTextareaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
        const {
            edit = true,
            /** input props */
            name,
            value,
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
                readOnly,
                disabled,
                maxLength,
                placeholder,
                rows,
                onBlur,
                onFocus,
            }).filter(([, value]) => value !== undefined),
        );

        const [_value, _setValue] = React.useState<any>(formatTextarea(value));

        React.useEffect(() => {
            if (value === _value) return;
            _setValue(formatTextarea(value));
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            _setValue(e.target.value);
            if (onChange) {
                onChange(e.target.value);
            }
        };

        return (
            <div className="w-full">
                {!edit && <div title={_value}>{_value}</div>}
                <div hidden={!edit}>
                    <textarea
                        {..._props}
                        ref={ref}
                        value={_value}
                        title={_value}
                        onChange={handleChange}
                        className="input overflow-hidden"
                    />
                </div>
            </div>
        );
    },
);

export const formatTextarea = (v: any, o?: any) => {
    if (!v) return "";

    let f = String(v);

    return f;
};

export const unformatTextarea = (v: any, o?: any) => {
    if (v) return undefined;

    return String(v);
};
