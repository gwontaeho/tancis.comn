import { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { Icon } from "@/com/components";

export type InputDateProps = {
    value?: Date | null;
    onChange?: (date?: Date | null) => void;
};

export const InputDate = (props: InputDateProps) => {
    const { value, onChange } = props;
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
                selected={_value}
                onChange={_onChange}
                autoComplete="off"
                className="input pl-5"
                portalId="root"
                popperProps={{ strategy: "fixed" }}
            />
        </div>
    );
};
