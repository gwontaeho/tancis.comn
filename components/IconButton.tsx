import React from "react";
import { Icon } from "@/com/components/Icon";
import { IconProps } from "@/com/components";

type IconButtomProps = React.ButtonHTMLAttributes<HTMLButtonElement> & IconProps;

export const IconButton = (props: IconButtomProps) => {
  const { icon, size, ...rest } = props;
  return (
    <button {...rest} className="rounded-full p-1 transition hover:bg-black/5 dark:hover:bg-white/5">
      <Icon icon={icon} size={size} />
    </button>
  );
};
