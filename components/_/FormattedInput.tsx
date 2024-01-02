import React from "react";

type Values = {
    value?: string;
    formattedValue?: string;
};

export type FormattedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    mask?: string;
    exact?: boolean;
    decimalScale?: number;
    thousandSeparator?: boolean;
    letterCase?: "upper" | "lower";
    onValueChange?: (values?: Values) => void;
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
            let v: Values = { value: e.target.value, formattedValue: "" };
            handleLowerCase(e, v);
            handleUpperCase(e, v);
            handleNumber(e);
            handleDecimalScale(e, v);
            handleThousandSeparator(e, v);
            handleMask(e, v);
            if (onValueChange) onValueChange(v);
            if (onChange) onChange(e);
        };

        const handleLowerCase = (e: React.ChangeEvent<HTMLInputElement>, v: Values) => {
            if (letterCase !== "lower") return;
            e.target.value = e.target.value.toLowerCase();
            v.value = e.target.value;
            v.formattedValue = e.target.value;
        };

        const handleUpperCase = (e: React.ChangeEvent<HTMLInputElement>, v: Values) => {
            if (letterCase !== "upper") return;
            e.target.value = e.target.value.toUpperCase();
            v.value = e.target.value;
            v.formattedValue = e.target.value;
        };

        const handleNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (_type !== "number") return;
            if (isNaN(Number(e.target.value.replaceAll(",", ""))))
                e.target.value = e.target.value.replaceAll(/[\D]/g, "");
        };

        const handleDecimalScale = (e: React.ChangeEvent<HTMLInputElement>, v: Values) => {
            if (decimalScale === undefined) return;

            const int = e.target.value.split(".")[0];
            const dec = e.target.value.split(".")[1]?.replaceAll(",", "").slice(0, decimalScale);
            e.target.value = int + (dec !== undefined ? "." + dec : "");
            v.value = e.target.value.replaceAll(",", "");
            v.formattedValue = e.target.value;
        };

        const handleThousandSeparator = (e: React.ChangeEvent<HTMLInputElement>, v: Values) => {
            if (!thousandSeparator) return;

            const int = e.target.value.split(".")[0];
            const dec = e.target.value.split(".")[1]?.replaceAll(",", "");
            e.target.value = Number(int.replaceAll(",", "")).toLocaleString() + (dec !== undefined ? "." + dec : "");
            v.value = e.target.value.replaceAll(",", "");
            v.formattedValue = e.target.value;
        };

        const handleMask = (e: React.ChangeEvent<HTMLInputElement>, v: Values) => {
            
            if (decimalScale !== undefined || thousandSeparator) return;
            if (mask === undefined) return;
            const oldValue = e.target.value;
            let maskedValueArray = mask.split("");
            let oldValueArray = oldValue.split("");
            let newValueArray = [];
            let formattedValueArray = [];
            const maxFormattedLength = maskedValueArray.length;
            const maxLength = maskedValueArray.filter((_) => SET_LETTER.includes(_)).length;

            

            for (let i = 0; i < oldValueArray.length; i++) {
                let skip = 0;
                for (
                    let j = i + skip;
                    !SET_LETTER.includes(maskedValueArray[i + skip]) && i + skip < maxFormattedLength;
                    j++
                ) {
                    if (maskedValueArray[i] === oldValueArray[i]) break;
                    formattedValueArray[j] = maskedValueArray[j];
                    skip++;
                }
                let letter = oldValueArray[i];
                const letterType = maskedValueArray[i + skip];
                const isNumber = REG_NUMBER.test(letter);
                const shouldUpperString = letterType === "A";
                const shouldLowerString = letterType === "a";
                const shouldNumber = letterType === "0";
                if (shouldNumber && !isNumber) break;
                if ((shouldUpperString || shouldLowerString) && isNumber) break;
                if (shouldUpperString) letter = letter.toUpperCase();
                if (shouldLowerString) letter = letter.toLowerCase();
                if (maskedValueArray[i] !== letter) newValueArray.push(letter);
                formattedValueArray[i + skip] = letter;

                
            }

            let value = newValueArray.join("");
            let formattedValue = formattedValueArray.join("");
            value = exact ? value.substring(0, maxLength) : value;
            formattedValue = exact ? formattedValue.substring(0, maxFormattedLength) : formattedValue;
            e.target.value = formattedValue;
            v.value = value;
            v.formattedValue = formattedValue;
        };

        return <input {...rest} ref={ref} onChange={handleChange} />;
    },
);
