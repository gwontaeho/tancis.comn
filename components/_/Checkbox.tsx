import React from "react";
import { FormControlOptionsType } from "@/com/components";

type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
    options?: FormControlOptionsType;
    value?: string[] | number[] | null[];
    onChange?: (value?: any) => void;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
    (props: CheckBoxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const { options, onChange, ...rest } = props;

        return (
            <div className="flex flex-wrap w-fit">
                {Array.isArray(options) &&
                    options.map(({ label, value }, index) => {
                        return (
                            <div key={props.name + "." + value} className="flex items-center h-7 space-x-1 mr-3">
                                <input
                                    {...rest}
                                    ref={ref}
                                    type="checkbox"
                                    value={value}
                                    onChange={(e) => {
                                        if (onChange === undefined) return;
                                        const valueCopy = [...(props.value || [])];

                                        valueCopy[index] = e.target.checked ? e.target.value : null;

                                        onChange(valueCopy);

                                        console.log(e.target.checked);
                                        console.log(e.target.value);
                                    }}
                                />
                                {label && <label>{label}</label>}
                            </div>
                        );
                    })}
            </div>
        );
    }
);
