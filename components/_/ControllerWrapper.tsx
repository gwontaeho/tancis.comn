import React from "react";
import { useController, Control } from "react-hook-form";

export type TRule = {
    validate?: any;
    required?: any;
    min?: any;
    max?: any;
    minLength?: any;
    pattern?: any;
    maxLength?: any;
};

export type ControllerWrapperProps = TRule & {
    children: React.ReactElement;
    onChange?: any;
    onBlur?: any;
    control?: Control;
    name?: string;
    rules?: any;
    defaultValue?: any;
};

export const ControllerWrapper = (props: ControllerWrapperProps) => {
    const {
        children,
        control,
        name,
        rules,
        onChange,
        onBlur,
        defaultValue,
        // rule
        validate,
        required,
        min,
        max,
        minLength,
        pattern,
        maxLength,
        ...rest
    } = props;

    const { field } = useController({
        name: name as string,
        control: control as Control,
        defaultValue,
        rules: {
            validate,
            required,
            min,
            max,
            minLength,
            pattern,
            maxLength,
            ...rules,

            onChange: (event) => {
                if (!onChange) return;
                if (!event.target) return;
                onChange(event.target.value);
            },
            onBlur: (event) => {
                if (!onBlur) return;
                if (!event.target) return;
                onBlur(event.target);
            },
        },
    });

    /**
     * name
     * value
     * onChange
     * onBlur
     */

    return React.cloneElement(children, {
        ...rest,
        name: field.name,
        value: field.value,
        onChange: field.onChange,
        onBlur: field.onBlur,
        ref: field.ref,
    });
};
