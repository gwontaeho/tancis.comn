import { BOLD_TEXT, COLOR_TEXT, SIZE_TEXT } from "@/comn/features/foundation";
import { comnUtils } from "@/comn/utils";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

/** */
export type InputTextProps = {
    edit?: boolean;
    mode?: "edit" | "view" | null;
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
    onEnter?: (arg?: any) => void;
    onClick?: (arg?: any) => void;

    as?: "link";
    to?: string;
};

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
    (props: InputTextProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            /** */
            edit = true,
            mode,
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
            onEnter,
            onClick,

            as,
            to,
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
        const _change = React.useRef<boolean>(false);
        const _key = React.useRef<boolean>(false);
        const _capture = React.useRef<Array<any>>([]);

        const setCapture = (evt: any) => {
            if (_capture.current.length >= 3) {
                _capture.current.shift();
            }
            _capture.current[_capture.current.length] = evt;
        };

        const setPosition = (start: number, end: number) => {
            position.current = [start, end];
        };

        React.useEffect(() => {
            if (value === _value) return;
            _setValue(formatText(value, o));
        }, [value]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const _temp = formatText(e.target.value, o);

            _setValue(_temp);
            if (onChange) {
                onChange(_temp);
            }

            setCapture({ e: "change", start: e.target.selectionStart, end: e.target.selectionEnd });
        };

        const handleClick = () => {
            if (onClick) {
                onClick(_value);
            }
        };

        const handleDown = (e: any) => {
            if ((e.code === "Backspace" || e.code === "Delete") && o.mask) {
                _key.current = true;
            }

            if (e.keyCode === 13) {
                /* on enter */
                if (onEnter) {
                    onEnter();
                }
            }

            setCapture({ e: "down", start: e.target.selectionStart, end: e.target.selectionEnd });
        };

        const handleSelect = (e: any) => {
            //console.log(_capture.current?.[0].e, _capture.current?.[0].start, _capture.current?.[0].end);
            //console.log(_capture.current?.[1]?.e, _capture.current?.[1]?.start, _capture.current?.[1]?.end);
            if (_capture.current?.[1]?.e === "select") {
            } else if (_capture.current?.[1]?.e === "change" && _key.current === true) {
                e.target.setSelectionRange(_capture.current[1].start, _capture.current[1].end);
            }
            _key.current = false;
            setCapture({ e: "select", start: e.target.selectionStart, end: e.target.selectionEnd });
        };
        const handleSelectCapture = (e: any) => {
            setCapture({ e: "selectCapture", start: e.target.selectionStart, end: e.target.selectionEnd });
        };

        const EDIT_STATUS = mode === "edit" ? true : mode === "view" ? false : edit;

        return (
            <div className="w-full">
                {!EDIT_STATUS &&
                    (as === "link" ? (
                        to ? (
                            <Link to={to} title={_value} onClick={handleClick} className="text-uf-blue underline">
                                {_value}
                            </Link>
                        ) : (
                            <div title={_value} onClick={handleClick} className="text-uf-blue underline cursor-pointer">
                                {_value}
                            </div>
                        )
                    ) : (
                        <div
                            title={_value}
                            className={comnUtils.getViewStyle(color, bold, fontSize)}
                            onClick={handleClick}
                        >
                            {_value}
                        </div>
                    ))}

                <div hidden={!EDIT_STATUS}>
                    <input
                        {..._props}
                        ref={ref}
                        value={_value}
                        title={_value}
                        onClick={handleClick}
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
