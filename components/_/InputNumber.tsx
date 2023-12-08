import React from "react";
import { FormattedInput, FormattedInputProps } from "@/com/components/_";

export const InputNumber = React.forwardRef<HTMLInputElement, FormattedInputProps>(
    (props: FormattedInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        return (
            <FormattedInput {...props} ref={ref} type="text" inputMode="numeric" autoComplete="off" className="input" />
        );
    }
);
