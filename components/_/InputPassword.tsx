import React from "react";

export const InputPassword = React.forwardRef<HTMLInputElement>((props, ref: React.ForwardedRef<HTMLInputElement>) => {
    return <input {...props} ref={ref} type="password" autoComplete="off" className="input" />;
});
