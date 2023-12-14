import React from "react";
import { v4 as uuid } from "uuid";
import { FormControlOptionsType } from "@/comn/components";

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
    options?: FormControlOptionsType;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    (props: RadioProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const { options, ...rest } = props;
        const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);
        return (
            <div className="flex flex-wrap w-fit">
                {Array.isArray(options) &&
                    options.map(({ label, value }, i) => {
                        return (
                            <div key={OPTIONS_ID_BASE + "." + i} className="flex items-center h-7 space-x-1 mr-3">
                                <input ref={ref} {...rest} type="radio" value={value} />
                                {label && <label>{label}</label>}
                            </div>
                        );
                    })}
            </div>
        );
    }
);
