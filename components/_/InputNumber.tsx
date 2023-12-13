import React from "react";
import { FormattedInput, FormattedInputProps } from "@/comn/components/_";

type InputNumberProps = FormattedInputProps;

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
    (props: InputNumberProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        return (
            <FormattedInput
                {...props}
                ref={ref}
                type="number"
                inputMode="numeric"
                autoComplete="off"
                className="input"
            />
        );
    }
);
