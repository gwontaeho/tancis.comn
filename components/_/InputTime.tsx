import React from "react";
import dayjs from "dayjs";
import ReactDatePicker from "react-datepicker";
import { Icon } from "@/comn/components";

export type InputTimeProps = {
    edit?: boolean;
    name?: string;
    value?: Date | null;
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (value?: Date | null) => void;
};

export const InputTime = (props: InputTimeProps) => {
    const { edit = true, name, value, readOnly, disabled, onChange } = props;

    const dateFormat = "HH:mm";
    const [_value, _setValue] = React.useState<Date | null | undefined>(value);

    React.useEffect(() => {
        if (value?.getTime() === _value?.getTime()) return;
        _setValue(value);
    }, [value]);

    const handleChange = (date: Date) => {
        _setValue(date);

        if (!onChange) return;
        onChange(date);
    };

    const _props = Object.fromEntries(
        Object.entries({
            name,
            readOnly,
            disabled,
        }).filter(([, value]) => value !== undefined),
    );

    return (
        <div className="w-full">
            {!edit && <div>{dayjs(_value).format(dateFormat)}</div>}
            <div hidden={!edit}>
                <div className="relative w-full [&>div]:w-full">
                    <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
                    <ReactDatePicker
                        {..._props}
                        selected={_value}
                        onChange={handleChange}
                        dateFormat={dateFormat}
                        showTimeSelect
                        showTimeSelectOnly
                        autoComplete="off"
                        timeIntervals={5}
                        className="input pl-5"
                        popperProps={{ strategy: "fixed" }}
                    />
                </div>
            </div>
        </div>
    );
};
