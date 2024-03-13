import { BOLD_TEXT, COLOR_TEXT, SIZE_TEXT } from "@/comn/features/foundation";
import { comnUtils } from "@/comn/utils";
import React, { useEffect } from "react";

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

    color?: keyof typeof COLOR_TEXT;
    editColor?: keyof typeof COLOR_TEXT;
    bold?: keyof typeof BOLD_TEXT;
    editBold?: keyof typeof BOLD_TEXT;
    fontSize?: keyof typeof SIZE_TEXT;

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

            color,
            editColor,
            bold,
            editBold,
            fontSize,

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
        const _ref = React.useRef<any>(null);
        const position = React.useRef<Array<number>>([-1, -1]);
        const _apply = React.useRef<boolean>(false);

        const setPosition = (start: number, end: number) => {
            position.current = [start, end];
        };

        React.useEffect(() => {
            if (value === _value) return;
            _setValue(formatText(value, o));
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            _setValue(formatText(e.target.value, o));
            if (onChange) {
                onChange(formatText(e.target.value, o));
            }
        };

        const handleDown = (e: any) => {
            if (e.code === "Backspace") {
                setPosition(e.target.selectionStart - 1 || 0, e.target.selectionEnd - 1 || 0);
                _apply.current = true;
            }
        };

        const handleSelect = (e: any) => {
            if (_apply.current === true) {
                e.target.setSelectionRange(position.current[0], position.current[1]);
                _apply.current = false;
            }
        };

        return (
            <div className="w-full">
                {!edit && (
                    <div title={_value} className={comnUtils.getViewStyle(color, bold, fontSize)}>
                        {_value}
                    </div>
                )}
                <div hidden={!edit}>
                    <input
                        {..._props}
                        ref={ref}
                        value={_value}
                        title={_value}
                        onChange={handleChange}
                        onKeyDown={handleDown}
                        onSelect={handleSelect}
                        type="text"
                        autoComplete="off"
                        className={"input" + comnUtils.getEditStyle(editColor, editBold)}
                    />
                </div>
            </div>
        );
    },
);

export const formatText = (v: any, o?: any) => {
    if (!v) return "";

    let f = String(v);

    if (o?.letterCase === "upper" || o?.imemode === "number+upper") {
        f = f.toUpperCase();
    }

    if (o?.letterCase === "lower" || o?.imemode === "number+lower") {
        f = f.toLowerCase();
    }

    if (o?.imemode === "number") {
        f = f.replace(/[^0-9]/g, "");
    } else if (o?.imemode === "number+upper") {
        f = f.replace(/[^A-Z0-9]/g, "");
    } else if (o?.imemode === "number+lower") {
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
                if (t[pos] === undefined) break;
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
