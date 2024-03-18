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
            const _temp = formatText(e.target.value, o);
            /*
            if (_temp !== e.target.value) {
                let _s = e.target.selectionStart;
                let _e = e.target.selectionEnd;

                if (value.length > _temp.length) {
                    //setPosition(i + 1, i + 1);
                    //_apply.current = true;
                } else {
                    for (let i = 0; i < value.length; i++) {
                        if (value.charAt(i) !== _temp.charAt(i)) {
                            console.log("change", i, value, _temp);
                            setPosition(i + 1, i + 1);
                            _apply.current = true;
                            break;
                        }
                    }
                }
                //setPosition(e.target.selectionStart || 0, e.target.selectionEnd || 0);
                //_apply.current = true;
            } else {
                //setPosition(e.target.selectionStart || 0, e.target.selectionEnd || 0);
                //_apply.current = true;
            }
            //console.log(e.target.);
            //console.log(e.target.selectionStart);
            */

            _setValue(_temp);
            if (onChange) {
                onChange(_temp);
            }
            //console.log(e.target.selectionStart, e.target.selectionEnd);

            setPosition(e.target.selectionStart || 0, e.target.selectionEnd || 0);
            _apply.current = true;

            //setPosition(e.target.selectionStart || 0, e.target.selectionEnd || 0);
        };

        const handleDown = (e: any) => {
            //console.log(e.target.selectionStart);
            /*
            if (e.code === "Backspace" && o.mask) {
                if (e.target.selectionStart <= 0) return;
                setPosition(e.target.selectionStart - 1, e.target.selectionEnd - 1);
                _apply.current = true;
            }
            */
        };

        const handleSelect = (e: any) => {
            //console.log(1);
            if (_apply.current === true) {
                e.target.setSelectionRange(position.current[0], position.current[1]);
            } else {
                e.target.setSelectionRange(e.target.selectionStart, e.target.selectionEnd);
            }
            _apply.current = false;
            /*
            if (_apply.current === true) {
                e.target.setSelectionRange(position.current[0], position.current[1]);
            }
            */
        };
        const handleSelectCapture = (e: any) => {
            if (_apply.current !== true) {
                setPosition(position.current[0], position.current[1]);
            } else {
                setPosition(e.target.selectionStart, e.target.selectionEnd);
            }
            //e.target.setSelectionRange(e.target.selectionStart, e.target.selectionEnd);
            /*
            if (_apply.current === true) {
                //setPosition(e.target.selectionStart, e.target.selectionEnd);
                //e.target.setSelectionRange(position.current[0], position.current[1]);
                _apply.current = false;
            } else {
                //console.log(1);
                setPosition(e.target.selectionStart, e.target.selectionEnd);
                //e.target.setSelectionRange(e.target.selectionStart, e.target.selectionEnd);
                //e.target.setSelectionRange(position.current[0], position.current[1]);
            }
            */
            //e.target.setSelectionRange(position.current[0], position.current[1]);
            /*
            if (_apply.current === true) {
                e.target.setSelectionRange(position.current[0], position.current[1]);
            }
            */
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
                        onSelectCapture={handleSelectCapture}
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
                    //break;
                    pos++;
                    continue;
                }
                temp += o.mask[i];
                s++;
            } else {
                if (!o.mask[i].test(t[pos])) {
                    //break;
                    pos++;
                    continue;
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
