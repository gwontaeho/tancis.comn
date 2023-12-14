import React from "react";
import { FormattedInput, FormattedInputProps } from "@/comn/components/_";

type InputTextProps = FormattedInputProps;

export const InputText = React.forwardRef((props: InputTextProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    console.log(props);
    return <FormattedInput {...props} ref={ref} type="text" autoComplete="off" className="input" />;
});
