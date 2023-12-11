import React from "react";

type InputFileProps = React.InputHTMLAttributes<HTMLInputElement>;

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
    (props: InputFileProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        return (
            <input
                {...props}
                ref={ref}
                multiple={true}
                type="file"
                className="file h-7 border rounded w-full file:h-full file:outline-none file:bg-header file:border-none file:text-text cursor-pointer"
            />
        );
    }
);
