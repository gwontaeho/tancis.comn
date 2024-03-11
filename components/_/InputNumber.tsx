import React from "react";

/** */
export type InputNumberProps = {
    edit?: boolean;
    decimalScale?: number;
    thousandSeparator?: boolean;

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

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
    (props: InputNumberProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            /** */
            edit = true,
            decimalScale,
            thousandSeparator = true,
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
        const o = { decimalScale, thousandSeparator };

        const [_value, _setValue] = React.useState<any>(formatNumber(value, o));

        React.useEffect(() => {
            if (value === _value) return;
            _setValue(formatNumber(value, o));
        }, [value]);

        React.useEffect(() => {
            _setValue(formatNumber(value, o));
        }, [decimalScale, thousandSeparator]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            _setValue(formatNumber(e.target.value, o));

            if (!onChange) return;
            onChange(unformatNumber(e.target.value, o));
        };

        return (
            <div className="w-full">
                {!edit && <div title={_value}>{_value}</div>}
                <div hidden={!edit}>
                    <input
                        {..._props}
                        ref={ref}
                        value={_value}
                        title={_value}
                        onChange={handleChange}
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        className="input"
                    />
                </div>
            </div>
        );
    },
);

export const formatNumber = (v: any, o?: any) => {
    if (v === 0 || v === "0") return "0";
    if (v === ".") {
        if (o?.decimalScale === 0) {
            return "";
        }
        return "0.";
    }
    if (!v) return "";

    let f = String(v).replaceAll(",", "");

    if (isNaN(Number(f))) {
        f = f.replaceAll(/\D/g, "");
    }

    if (o?.decimalScale !== undefined) {
        const x = f.split(".");
        const int = x[0];
        const dec = x[1]?.slice(0, o.decimalScale);

        if (o.decimalScale === 0) {
            f = int;
        } else {
            f = int + (dec === undefined ? "" : "." + dec);
        }
    }

    if (o?.thousandSeparator) {
        const x = f.split(".");
        const int = Number(x[0]).toLocaleString();
        const dec = x[1];
        f = int + (dec === undefined ? "" : "." + dec);
    }

    return f;
};

export const unformatNumber = (v: any, o?: any) => {
    if (v === 0 || v === "0") return 0;
    if (!v) return undefined;

    let f = String(v).replaceAll(",", "");

    if (isNaN(Number(f))) {
        f = f.replaceAll(/\D/g, "");
    }

    return Number(f);
};
