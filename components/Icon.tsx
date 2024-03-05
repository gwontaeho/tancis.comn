import { cloneElement } from "react";
import classNames from "classnames";
import { icons, iconSizes } from "@/comn/assets/icons";

export type IconsType = keyof typeof icons;
export type IconSizesType = keyof typeof iconSizes;

export type IconProps = {
    icon: IconsType;
    size?: IconSizesType;
    className?: string;
};

export const Icon = (props: IconProps) => {
    const { icon, className, size = "md" } = props;

    if (!icon || !icons[icon]) return null;
    return cloneElement(icons[icon], {
        ...icons[icon].props,
        className: classNames(iconSizes[size], className),
        strokeWidth: 2,
    });
};
