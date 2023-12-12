import { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { Icon } from "@/com/components";

type InputTimeProps = {
    value?: Date | null;
    onChange?: (date?: Date | null) => void;
};

export const InputTime = (props: InputTimeProps) => {
    const { value, onChange } = props;
    const dateFormat = "HH:mm";

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
        <div className="w-full [&>div]:w-full">
            <Icon icon="clock" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
            <ReactDatePicker
                selected={_value}
                onChange={_onChange}
                dateFormat={dateFormat}
                showTimeSelect
                showTimeSelectOnly
                autoComplete="off"
                timeIntervals={5}
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
            />
        </div>
    );
};
