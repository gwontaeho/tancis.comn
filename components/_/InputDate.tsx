import { useState, useEffect, forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { Icon } from "@/comn/components";
import { ControllerWrapper } from "./ControllerWrapper";
import { Control } from "react-hook-form";

export type InputDateProps = {
    name?: string;
    value?: Date | null;
    onChange?: (...args: any) => void;
    control?: Control;
};

const InputDateMain = forwardRef((props: InputDateProps, ref) => {
    const { value, onChange, ...rest } = props;
    const [_value, _setValue] = useState<Date | null | undefined>(value);

    useEffect(() => {
        if (value?.getTime() === _value?.getTime()) return;
        _setValue(value);
    }, [value]);

    useEffect(() => {
        if (!onChange) return;
        if (value?.getTime() === _value?.getTime()) return;
        onChange(_value);
    }, [_value]);

    const _onChange = (date: Date) => {
        _setValue(date);
    };

    return (
        <div className="relative w-full [&>div]:w-full">
            <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
            <ReactDatePicker
                {...rest}
                selected={_value}
                onChange={_onChange}
                autoComplete="off"
                className="input pl-5"
                portalId="root"
                popperProps={{ strategy: "fixed" }}
            />
        </div>
    );
});

export const InputDate = (props: InputDateProps) => {
    if (props.control && props.name)
        return (
            <ControllerWrapper {...props} control={props.control} name={props.name}>
                <InputDateMain />
            </ControllerWrapper>
        );

    return <InputDateMain {...props} />;
};
