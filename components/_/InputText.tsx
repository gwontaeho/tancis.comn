import React from "react";

/** */
export type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
    onChange?: any;
    onValueChange?: any;

    edit?: boolean;
    mask?: any;
    exact?: boolean;
    letterCase?: "upper" | "lower";
};

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
    (props: InputTextProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            /** */
            edit = true,
            mask,
            exact,
            letterCase,
            value,
            onChange,
            onValueChange,
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
        const o = { mask, exact, letterCase };

        const [_value, _setValue] = React.useState<any>(formatText(value, o));

        React.useEffect(() => {
            if (value === _value) return;
            _setValue(formatText(value, o));
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            _setValue(formatText(e.target.value, o));

            if (!onChange) return;
            onChange(formatText(e.target.value, o));
        };

        return (
            <div className="w-full">
                {!edit && <div title={_value}>{_value}</div>}
                <div hidden={!edit}>
                    <input
                        {..._props}
                        ref={ref}
                        value={_value}
                        onChange={handleChange}
                        type="text"
                        autoComplete="off"
                        className="input"
                        title={_value}
                    />
                </div>
            </div>
        );
    },
);

export const formatText = (v: any, o?: any) => {
    if (!v) return "";

    let f = String(v);

    if (o?.letterCase === "upper") {
        f.toUpperCase();
    }

    if (o?.letterCase === "lower") {
        f.toLowerCase();
    }

    if (o?.mask) {
        let pos = 0;
        let temp = "";
        var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        let t = f.replace(reg, "").split("");
        let real = "";

        for (var i = 0; i < o.mask.length; i++) {
            if (typeof o.mask[i] === "string") {
                if (t[pos] === undefined) {
                    break;
                }
                temp += o.mask[i];
                pos++;
            } else {
                if (!o.mask[i].test(t[pos])) {
                    break;
                }
                temp += t[pos];
                real += t[pos];
                pos++;
            }
        }

        f = temp;
    }

    return f;
};

export const unformatText = (v: any, o?: any) => {
    if (!v) return undefined;

    let f = String(v);

    if (o?.mask) {
        var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        return f.replace(reg, "");
    }
    return f;
};
