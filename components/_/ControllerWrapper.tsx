//@ts-nocheck

import React from "react";
import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";

export type TRule = {
    min?: any;
    max?: any;
    minLength?: any;
    maxLength?: any;
    required?: any;
    pattern?: any;
    validate?: any;
};

export type ControllerWrapperProps = TRule & {
    children: React.ReactElement;
    control?: Control;
    name?: string;
    onBlur?: any;
    onChange?: any;
    defaultValue?: any;
};

export const ControllerWrapper = (props: ControllerWrapperProps) => {
    const {
        children,
        control,
        name,
        onBlur,
        onChange,
        defaultValue,

        // rule
        min,
        max,
        minLength,
        maxLength,
        required,
        pattern,
        validate,

        ...rest
    } = props;

    // msg.00005

    const { field } = useController({
        name,
        control,
        defaultValue,
        rules: {
            min,
            max,
            minLength,
            maxLength,
            required: required ? "msg.00005" : undefined,
            pattern,
            validate,
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

    return React.cloneElement(children, {
        ...field,
        ...rest,
    });
};
