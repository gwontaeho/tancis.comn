import React from "react";
import { IconButton } from "@/com/components/IconButton";

export const InputPassword = React.forwardRef<HTMLInputElement>((props, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [show, setShow] = React.useState(false);

    return (
        <div className="w-full relative flex items-center">
            <input {...props} ref={ref} type={show ? "text" : "password"} autoComplete="off" className="input" />
            <IconButton
                onClick={() => setShow((prev) => !prev)}
                icon={show ? "eyeSlash" : "eye"}
                size="sm"
                className="absolute right-1"
            />
        </div>
    );
});
