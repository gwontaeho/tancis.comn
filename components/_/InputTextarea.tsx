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
                onClick,
                onBlur,
                onFocus,
                readOnly,
                disabled,
                maxLength,
                placeholder,
                rows,
            }).filter(([, value]) => value !== undefined),
        );

        const [_value, _setValue] = React.useState<any>(typeof value == "string" ? value : "");

        React.useEffect(() => {
            if (value === _value) return;
            _setValue(typeof value !== "string" ? "" : value);
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            _setValue(e.target.value);
            if (!onChange) return;
            onChange(e);
        };

        return (
            <div className="w-full">
                {!edit && <div>{_value}</div>}
                <div hidden={!edit}>
                    <textarea
                        {..._props}
                        ref={ref}
                        value={_value}
                        onChange={handleChange}
                        className="input overflow-hidden"
                    />
                </div>
            </div>
        );
    },
);
