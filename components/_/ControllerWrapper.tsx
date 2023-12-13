import React from "react";
import { useController, Control } from "react-hook-form";
import { FormRulesType } from "@/com/hooks";

export type ControllerWrapperProps = {
    children: React.ReactElement;
    control: Control;
    name: string;
    rules?: any;
};

export const ControllerWrapper = (props: ControllerWrapperProps) => {
    const { children, control, name, rules, ...rest } = props;

    const { field } = useController({ name, control, rules });

    return React.cloneElement(children, { ...rest, ...field });
};
