import React from "react";
import { FormControlOptionsType } from "@/com/components";

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
    options?: FormControlOptionsType;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    (props: RadioProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const { options, ...rest } = props;

        return (
            <div className="flex flex-wrap w-fit">
                {Array.isArray(options) &&
                    options.map(({ label, value }) => {
                        return (
                            <div key={props.name + "." + value} className="flex items-center h-7 space-x-1 mr-3">
                                <input ref={ref} {...rest} type="radio" value={value} />
                                {label && <label>{label}</label>}
                            </div>
                        );
                    })}
            </div>
        );
    }
);
