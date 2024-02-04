import React from "react";
import dayjs from "dayjs";
import ReactDatePicker from "react-datepicker";

import { useTheme } from "@/comn/hooks";
import constants from "@/comn/constants";
import { Icon } from "@/comn/components";

export type InputTimeProps = {
    edit?: boolean;
    startRef?: any;
    endRef?: any;

    name?: string;
    value?: any;
    readOnly?: boolean;
    disabled?: boolean;
    defaultValue?: any;
    placeholder?: any;
    onBlur?: (arg?: any) => void;
    onChange?: (arg?: any) => void;
};

export const InputTime = (props: InputTimeProps) => {
    const {
        edit = true,
        startRef,
        endRef,
        /** input props */
        name,
        value,
        readOnly,
        disabled,
        defaultValue,
        placeholder,
        onBlur,
        onChange,
    } = props;
    const _props = Object.fromEntries(
        Object.entries({
            name,
            readOnly,
            disabled,
            defaultValue,
            onBlur,
        }).filter(([, value]) => value !== undefined),
    );

    const { theme } = useTheme();
    const [_value, _setValue] = React.useState<Date | null | undefined>(formatTime(value));

    React.useEffect(() => {
        if (startRef) startRef.current.handleChangeStart = handleChange;
        if (endRef) endRef.current.handleChangeEnd = handleChange;
    }, []);

    React.useEffect(() => {
        if (dayjs(value).isSame(dayjs(_value))) return;

        _setValue(formatTime(value));
    }, [value]);

    const handleChange = (date: Date) => {
        _setValue(date);
        if (onChange) {
            onChange(date);
        }
    };

    return (
        <div className="w-full">
            {!edit && <div>{localeTime(_value, theme.lang)}</div>}
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
                        portalId="root"
                        popperProps={{ strategy: "fixed" }}
                        placeholderText={placeholder}
                    />
                </div>
            </div>
        </div>
    );
};

export const localeTime = (v: any, l: "ko" | "en" | "tz") => {
    if (!v) return "";
    if (!dayjs(v).isValid()) return "";

    return dayjs(v).format(constants.TIME_FORMAT_DAYJS[l]);
};

export const formatTime = (v: any) => {
    if (!v) return undefined;

    if (dayjs(v).isValid()) return dayjs(v).toDate();
    if (dayjs("2000-10-10 " + v).isValid()) return dayjs("2000-10-10 " + v).toDate();

    return undefined;
};

export const unformatTime = (v: any, o?: any) => {
    if (!v) return undefined;

    if (dayjs(v).isValid()) return dayjs(v).format(constants.TIME_FORMAT);
    if (dayjs("2000-10-10 " + v).isValid()) return dayjs("2000-10-10 " + v).format(constants.TIME_FORMAT);

    return undefined;
};
