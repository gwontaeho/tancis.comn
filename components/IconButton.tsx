import React from "react";
import classNames from "classnames";
import { Icon } from "@/comn/components/Icon";
import { IconProps } from "@/comn/components";

type IconButtomProps = React.ButtonHTMLAttributes<HTMLButtonElement> & IconProps;

export const IconButton = (props: IconButtomProps) => {
    const { icon, size, className, ...rest } = props;
    return (
        <button
            {...rest}
            type="button"
            className={classNames("rounded-full p-1 transition hover:bg-black/20 dark:hover:bg-white/20", className)}
        >
            <Icon icon={icon} size={size} />
        </button>
    );
};
