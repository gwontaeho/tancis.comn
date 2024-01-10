import React from "react";
import { useController, Control } from "react-hook-form";

export type ControllerWrapperProps = {
    children: React.ReactElement;
    onChange?: any;
    control?: Control;
    name?: string;
    rules?: any;
};

export const ControllerWrapper = (props: ControllerWrapperProps) => {
    const { children, control, name, rules, onChange, ...rest } = props;

    const { field } = useController({
        name: name as string,
        control: control as Control,
        rules: {
            ...rules,
            onChange: (event) => {
                if (!onChange) return;
                if (!event.target) return;
                onChange(event.target.value);
            },
        },
    });

    return React.cloneElement(children, {
        ...rest,
        onChange: field.onChange,
        onBlur: field.onBlur,
        value: field.value,
    });
};
