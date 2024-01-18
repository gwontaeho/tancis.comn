import React from "react";
import { comnUtils, comnEnvs } from "@/comn/utils";

export type TFormattedInputValues = {
    value: string;
    formattedValue: string;
    event: any;
};

export type FormattedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    mask?: string | Array<any>;
    exact?: boolean;
    decimalScale?: number;
    thousandSeparator?: boolean;
    letterCase?: "upper" | "lower";
    onValueChange?: (values: TFormattedInputValues) => void;
};

const handleDecimalScale = (v: any, schema: any) => {
    if (v === undefined || v === null) return v;
    if (schema.decimalScale === undefined) return v;
    const a = v.split(".");
    const int = a[0];
    const dec = a[1]?.toString().replaceAll(",", "").slice(0, schema.decimalScale);
    return int + (dec !== undefined ? "." + dec : "");
};

const handleNumber = (v: any, schema: any) => {
    if (v === undefined || v === null) return v;
    if (schema.type !== "number") return v;
    if (v === ".") v = "0.";
    if (isNaN(Number(v.toString().replaceAll(",", "")))) v = v.toString().replaceAll(/[\D]/g, "");
    return v;
};

const handleThousandSeparator = (v: any, schema: any) => {
    if (v === undefined || v === null) return v;
    if (schema.thousandSeparator !== true) return v;
    const a = v.toString().replaceAll(",", "").split(".");
    const int = a[0];
    const dec = a[1];
    v = (int ? Number(int).toLocaleString(comnUtils.getLocaleString()) : "") + (dec !== undefined ? "." + dec : "");
    return v;
};

const handleMask = (v: any, schema: any) => {
    if (schema.mask === undefined) return v;
    let pos = 0;
    let temp = "";
    var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    let t = v.replace(reg, "").split("");

    for (let i = 0; i < schema.mask.length; i++) {
        if (typeof schema.mask[i] === "string") {
            temp += schema.mask[i];
        } else {
            if (!schema.mask[i].test(t[pos])) {
                break;
            }
            temp += t[pos];
            pos++;
        }
    }

    return temp;
};

export const getFormattedValue = (v: any, schema: any) => {
    if (schema.letterCase === "lower" && v !== undefined) v = v.toLowerCase();
    if (schema.letterCase === "upper" && v !== undefined) v = v.toUpperCase();
    v = handleNumber(v, schema);
    v = handleDecimalScale(v, schema);
    v = handleThousandSeparator(v, schema);
    v = handleMask(v, schema);

    return v;
};

export const getUnFormattedValue = (v: any, schema: any) => {
    if (!schema || !schema.mask) return v;
    var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    return v.replace(reg, "");
};

export const FormattedInput = React.forwardRef<HTMLInputElement, FormattedInputProps>(
    (props: FormattedInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            type,
            mask,
            exact = true,
            decimalScale,
            thousandSeparator = false,
            letterCase,
            required,
            onValueChange,
            onChange,
            ...rest
        } = props;

        const _type = decimalScale || thousandSeparator ? "number" : type;
        const SET_LETTER = ["a", "A", "0", "*"];
        const REG_NUMBER = /^[0-9]+$/;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let v: TFormattedInputValues = { value: e.target.value, formattedValue: "", event: e };
            handleLowerCase(e, v);
            handleUpperCase(e, v);
            handleNumber(e);
            handleDecimalScale(e, v);
            handleThousandSeparator(e, v);
            handleMask(e, v);
            if (onValueChange) onValueChange(v);
            if (onChange) onChange(e);
        };

        const handleLowerCase = (e: React.ChangeEvent<HTMLInputElement>, v: TFormattedInputValues) => {
            if (letterCase !== "lower") return;
            e.target.value = e.target.value.toLowerCase();
            v.value = e.target.value;
            v.formattedValue = e.target.value;
        };

        const handleUpperCase = (e: React.ChangeEvent<HTMLInputElement>, v: TFormattedInputValues) => {
            if (letterCase !== "upper") return;
            e.target.value = e.target.value.toUpperCase();
            v.value = e.target.value;
            v.formattedValue = e.target.value;
        };

        /**
         * Number
         */
        const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (_type !== "number") return;
            if (e.target.value === ".") e.target.value = "0.";
            if (isNaN(Number(e.target.value.replaceAll(",", ""))))
                e.target.value = e.target.value.replaceAll(/[\D]/g, "");
        };

        /**
         * Number
         * Decimal Scale
         */
        const handleDecimalScale = (e: React.ChangeEvent<HTMLInputElement>, v: TFormattedInputValues) => {
            if (decimalScale === undefined) return;

            const a = e.target.value.split(".");
            const int = a[0];
            const dec = a[1]?.replaceAll(",", "").slice(0, decimalScale);

            e.target.value = int + (dec !== undefined ? "." + dec : "");
            v.value = e.target.value.replaceAll(",", "");
            v.formattedValue = e.target.value;
        };

        /**
         * Number
         * Thousand Separator
         */
        const handleThousandSeparator = (e: React.ChangeEvent<HTMLInputElement>, v: TFormattedInputValues) => {
            if (!thousandSeparator) return;

            const a = e.target.value.replaceAll(",", "").split(".");
            const int = a[0];
            const dec = a[1];

            e.target.value =
                (int ? Number(int).toLocaleString(comnUtils.getLocaleString()) : "") +
                (dec !== undefined ? "." + dec : "");
            v.value = e.target.value.replaceAll(",", "");
            v.formattedValue = e.target.value;
        };

        /**
         * Mask
         */
        const handleMask = (e: React.ChangeEvent<HTMLInputElement>, v: TFormattedInputValues) => {
            if (decimalScale !== undefined || thousandSeparator) return;
            if (mask === undefined) return;

            let pos = 0;
            let temp = "";
            var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
            let t = e.target.value.replace(reg, "").split("");
            let real = "";

            let pl = t.length;
            let p = e.target.selectionStart || 0;

            for (var i = 0; i < mask.length; i++) {
                if (typeof mask[i] === "string") {
                    if (t[pos] === undefined) {
                        break;
                    }
                    temp += mask[i];
                    p++;
                } else {
                    if (!mask[i].test(t[pos])) {
                        break;
                    }
                    temp += t[pos];
                    real += t[pos];
                    pos++;
                }
            }

            temp = exact ? temp.substring(0, mask.length) : temp;
            e.target.value = temp;
            v.value = real;
            v.formattedValue = temp;
            e.target.setSelectionRange(p - (pl - real.length), p - (pl - real.length));
        };

        return <input {...rest} ref={ref} onChange={handleChange} />;
    },
);
