import React from "react";
import dayjs from "dayjs";
import ReactDatePicker from "react-datepicker";
import { useTheme } from "@/comn/hooks";
import constants from "@/comn/constants";
import { Icon } from "@/comn/components";

export type InputTimeProps = {
    edit?: boolean;
    name?: string;
    value?: Date | null;
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (value?: Date | null) => void;
    onValueChange?: any;
    startRef?: any;
    endRef?: any;
};

export const InputTime = (props: InputTimeProps) => {
    const { edit = true, name, value, readOnly, disabled, onChange, onValueChange, startRef, endRef } = props;
    const _props = Object.fromEntries(
        Object.entries({
            name,
            readOnly,
            disabled,
        }).filter(([, value]) => value !== undefined),
    );

    const { theme } = useTheme();

    const [_value, _setValue] = React.useState<Date | null | undefined>(() => {
        return !value || !dayjs(value).isValid() ? undefined : dayjs(value).toDate();
    });

    React.useEffect(() => {
        if (startRef) startRef.current.handleChangeStart = handleChange;
        if (endRef) endRef.current.handleChangeEnd = handleChange;
    }, []);

    React.useEffect(() => {
        if (dayjs(value).isSame(dayjs(_value))) return;

        if (!value) return _setValue(undefined);

        if (dayjs(value).isValid()) {
            _setValue(dayjs(value).toDate());
            return;
        }

        if (dayjs("2000-01-01 " + value).isValid()) {
            _setValue(dayjs("2000-01-01 " + value).toDate());
            return;
        }
    }, [value]);

    const handleChange = (date: Date) => {
        _setValue(date);
        if (onChange) {
            onChange(date);
        }
        if (onValueChange) {
            onValueChange({
                value: date,
                data: dayjs(date).format(constants.TIME_FORMAT),
                formattedValue: dayjs(date).format(constants.TIME_FORMAT),
            });
        }
    };

    return (
        <div className="w-full">
            {!edit && (
                <div>
                    {!!_value &&
                        dayjs(_value).isValid() &&
                        dayjs(_value).format(constants.TIME_FORMAT_DAYJS[theme.lang])}
                </div>
            )}
            <div hidden={!edit}>
                <div className="relative w-full [&>div]:w-full">
                    <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
                    <ReactDatePicker
                        {..._props}
                        selected={_value}
                        onChange={handleChange}
                        dateFormat={constants.TIME_FORMAT_INPUT[theme.lang]}
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
