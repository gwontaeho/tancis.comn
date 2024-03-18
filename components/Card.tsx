import classNames from "classnames";
import type { ReactNode } from "react";

import { Icon } from "./Icon";
import { icons } from "../assets/icons";
import { COLOR_BORDER, COLOR_TEXT, WIDTH } from "../features/foundation";

type CardProps = {
    children?: ReactNode;
    icon?: keyof typeof icons;
    color?: keyof typeof COLOR_BORDER;
    size?: keyof typeof WIDTH;
};

const Card = ({ children, icon, color, size }: CardProps) => {
    return (
        <div
            className={classNames(
                "flex flex-col items-center p-4 border rounded shadow bg-uf-card-background",
                color && COLOR_BORDER[color],
                color && COLOR_TEXT[color],
                size && WIDTH[size],
            )}
        >
            {icon && <Icon icon={icon} className="mb-2" />}
            <pre className="flex flex-col text-center text-xl font-semibold">{children}</pre>
        </div>
    );
};

export { Card };
