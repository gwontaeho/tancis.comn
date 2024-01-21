import React from "react";
import dayjs from "dayjs";
import ReactDatePicker from "react-datepicker";
import { useTheme } from "@/comn/hooks";

import { Icon } from "@/comn/components";
import constants from "@/comn/constants";

export type InputDateimeProps = {
    edit?: boolean;
    name?: string;
    value?: Date | null;
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (value?: Date | null) => void;
    onValueChange?: any;
};

export const InputDatetime = (props: InputDateimeProps) => {
    const { edit = true, name, value, readOnly, disabled, onChange, onValueChange } = props;
    const _props = Object.fromEntries(
        Object.entries({
            name,
            readOnly,
            disabled,
        }).filter(([, value]) => value !== undefined),
    );

    const { theme } = useTheme();

    const [_value, _setValue] = React.useState<Date | null | undefined>(formatDatetime(value));

    React.useEffect(() => {
        if (dayjs(value).isSame(dayjs(_value))) return;

        _setValue(formatDatetime(value));
    }, [value]);

    const handleChange = (date: Date) => {
        _setValue(date);
        if (!onChange) return;
        onChange(date);

        if (onValueChange) {
            onValueChange({
                value: date,
                data: dayjs(date).format(constants.DATETIME_FORMAT),
                formattedValue: dayjs(date).format(constants.DATETIME_FORMAT),
            });
        }
    };

    return (
        <div className="w-full">
            {!edit && <div>{localeDatetime(value, theme.lang)}</div>}
            <div hidden={!edit}>
                <div className="relative w-full [&>div]:w-full">
                    <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
                    <ReactDatePicker
                        {..._props}
                        selected={_value}
                        onChange={handleChange}
                        dateFormat={constants.DATETIME_FORMAT_INPUT[theme.lang]}
                        autoComplete="off"
                        showTimeSelect
                        timeIntervals={5}
                        className="input pl-5"
                        portalId="root"
                        popperProps={{ strategy: "fixed" }}
                    />
                </div>
            </div>
        </div>
    );
};

export const localeDatetime = (v: any, l: "ko" | "en" | "tz") => {
    if (!v) return "";
    if (!dayjs(v).isValid()) return "";

    return dayjs(v).format(constants.TIME_FORMAT_DAYJS[l]);
};

export const formatDatetime = (v: any) => {
    if (!v) return undefined;
    if (!dayjs(v).isValid()) return undefined;

    return dayjs(v).toDate();
};

export const unformatDatetime = (v: any, o?: any) => {
    if (!v) return undefined;
    if (!dayjs(v).isValid()) return undefined;

    return dayjs(v).format(constants.TIME_FORMAT);
};
