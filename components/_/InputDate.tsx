import React from "react";
import ReactDatePicker from "react-datepicker";
import { Icon } from "@/com/components";

export type InputDateProps = {
    value?: Date | null;
    onChange?: any;
};

export const InputDate = (props: InputDateProps) => {
    const { value, onChange } = props;

    return (
        <div className="relative w-full [&>div]:w-full">
            <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
            <ReactDatePicker
                selected={value}
                onChange={onChange}
                autoComplete="off"
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
            />
        </div>
    );
};
