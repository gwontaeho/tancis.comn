import React from "react";

/** */
export type InputTextProps = {
    edit?: boolean;
    mask?: any;
    imemode?: "number" | "number+upper" | "number+lower";
    exact?: boolean;
    letterCase?: "upper" | "lower";

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

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
    (props: InputTextProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            /** */
            edit = true,
            imemode,
            mask,
            exact,
            letterCase,
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

        const o = { mask, exact, letterCase, imemode };

        const [_value, _setValue] = React.useState<any>(formatText(value, o));
        const input = React.useRef<any>(null);
        const start = React.useRef<any>(null);
        const end = React.useRef<any>(null);

        React.useEffect(() => {
            if (value === _value) return;
            _setValue(formatText(value, o));
        }, [value]);

        React.useEffect(() => {
            handleSelection();
        }, [_value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            saveSelection(e);

            _setValue(formatText(e.target.value, o));

            if (onChange) {
                onChange(formatText(e.target.value, o));
            }

            console.log(start.current);

            //e.target.setSelectionRange(start.current, start.current);
        };

        const setSelection = (e: any) => {
            saveSelection(e);
            handleSelection();
        };

        const saveSelection = (e: any) => {
            input.current = e.target;
            start.current = e.target.selectionStart;
            end.current = e.target.selectionEnd;
            console.log(e.target.selectionStart);
        };

        const handleSelection = () => {
            if (input.current) {
                input.current.setSelectionRange(start.current, end.current);
            }
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
                        autoComplete="off"
                        className="input"
                        onKeyUp={setSelection}
                        on={() => {
                            handleSelection();
                            console.log("load");
                        }}
                    />
                </div>
            </div>
        );
    },
);

export const formatText = (v: any, o?: any) => {
    if (!v) return "";

    let f = String(v);

    if (o?.letterCase === "upper" || o.imemode === "number+upper") {
        f = f.toUpperCase();
    }

    if (o?.letterCase === "lower" || o.imemode === "number+lower") {
        f = f.toLowerCase();
    }

    if (o.imemode === "number") {
        f = f.replace(/[^0-9]/g, "");
    } else if (o.imemode === "number+upper") {
        f = f.replace(/[^A-Z0-9]/g, "");
    } else if (o.imemode === "number+lower") {
        f = f.replace(/[^a-z0-9]/g, "");
    }

    if (o?.mask) {
        let pos = 0;
        let temp = "";
        var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
        let t = f.replace(reg, "").split("");
        let real = "";
        let s = 0;

        for (var i = 0; i < o.mask.length; i++) {
            if (typeof o.mask[i] === "string") {
                if (t[pos] === undefined) {
                    break;
                }
                temp += o.mask[i];
                s++;
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
