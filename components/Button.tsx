import React from "react";
import classNames from "classnames";

const SIZES = {
    1: "w-1/12",
    2: "w-2/12",
    3: "w-3/12",
    4: "w-4/12",
    5: "w-5/12",
    6: "w-6/12",
    7: "w-7/12",
    8: "w-8/12",
    9: "w-9/12",
    10: "w-10/12",
    11: "w-11/12",
    12: "w-full",
    fit: "w-fit",
    full: "w-full",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: keyof typeof SIZES;
};

export const Button = (props: ButtonProps) => {
    const { children, type = "button", size = "fit", ...rest } = props;

    return (
        <button {...rest} type={type} className={classNames("button", SIZES[size])}>
            {children}
        </button>
    );
};
