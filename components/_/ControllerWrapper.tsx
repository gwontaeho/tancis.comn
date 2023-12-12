import React from "react";
import { useController, Control } from "react-hook-form";
import { FormRulesType } from "@/com/hooks";

export type ControllerWrapperProps = FormRulesType & {
    children: React.ReactElement;
    name: string;
    control: Control;
    type?: any;
};

export const ControllerWrapper = (props: ControllerWrapperProps) => {
    const { children, control, ...rest } = props;

    const rules = {} as any;
    if (props.required) rules.required = props.required;
    if (props.min) rules.min = props.min;
    if (props.max) rules.max = props.max;
    if (props.minLength) rules.minLength = props.minLength;
    if (props.maxLength) rules.maxLength = props.maxLength;
    if (props.pattern) rules.pattern = props.pattern;
    if (props.validate) rules.validate = props.validate;

    const { field } = useController({ name: props.name, control, rules });

    return React.cloneElement(children, { ...rest, ...field });
};
