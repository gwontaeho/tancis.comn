import React from "react";

type BadgeProps = {
    children?: React.ReactNode;
    number?: number;
};

export const Badge = (props: BadgeProps) => {
    if (props.number === undefined) return <>{props.children}</>;

    return (
        <div className="relative">
            {props.children}
            <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full bg-error w-3.5 h-3.5 text-uf-white leading-[0.6rem] text-[0.6rem]">
                {props.number}
            </span>
        </div>
    );
};
