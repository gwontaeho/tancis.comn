import React from "react";
import ReactDatePicker from "react-datepicker";
import dayjs from "dayjs";
import constants from "@/comn/constants";
import { useTheme } from "@/comn/hooks";
import { Icon } from "@/comn/components";

export type InputDateProps = {
    edit?: boolean;
    name?: string;
    value?: Date | null;
    defaultValue?: any;
    readOnly?: boolean;
    disabled?: boolean;
    onChange?: (value?: Date | null) => void;
    onValueChange?: any;
    onBlur?: (...args: any) => void;
    startRef?: any;
    endRef?: any;
};

export const InputDate = (props: InputDateProps) => {
    const {
        edit = true,
        name,
        value,
        defaultValue,
        readOnly,
        disabled,
        onChange,
        onValueChange,
        onBlur,
        startRef,
        endRef,
    } = props;
    const _props = Object.fromEntries(
        Object.entries({
            name,
            readOnly,
            disabled,
            onBlur,
        }).filter(([, value]) => value !== undefined),
    );
    const { theme } = useTheme();

    const [_value, _setValue] = React.useState<Date | null | undefined>(formatDate(value));

    React.useEffect(() => {
        if (startRef) startRef.current.handleChangeStart = handleChange;
        if (endRef) endRef.current.handleChangeEnd = handleChange;
    }, []);

    React.useEffect(() => {
        if (dayjs(value).isSame(dayjs(_value))) return;

        _setValue(formatDate(value));
    }, [value]);

    const handleChange = (date: Date) => {
        _setValue(date);

        if (onChange) {
            onChange(date);
        }

        if (onValueChange) {
            onValueChange({
                value: date,
                data: dayjs(date).format(constants.DATE_FORMAT),
                formattedValue: dayjs(date).format(constants.DATE_FORMAT),
            });
        }
    };

    return (
        <div className="w-full">
            {!edit && <div>{localeDate(_value, theme.lang)}</div>}
            <div hidden={!edit}>
                <div className="relative w-full [&>div]:w-full">
                    <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
                    <ReactDatePicker
                        {..._props}
                        dateFormat={constants.DATE_FORMAT_INPUT[theme.lang]}
                        selected={_value}
                        onChange={handleChange}
                        autoComplete="off"
                        className="input pl-5"
                        portalId="root"
                        popperProps={{ strategy: "fixed" }}
                    />
                </div>
            </div>
        </div>
    );
};

export const localeDate = (v: any, l: "ko" | "en" | "tz") => {
    if (!v) return "";
    if (!dayjs(v).isValid()) return "";

    return dayjs(v).format(constants.DATE_FORMAT_DAYJS[l]);
};

export const formatDate = (v: any) => {
    if (!v) return undefined;
    if (!dayjs(v).isValid()) return undefined;

    return dayjs(v).toDate();
};

export const unformatDate = (v: any, o?: any) => {
    if (!v) return undefined;
    if (!dayjs(v).isValid()) return undefined;

    return dayjs(v).format(constants.DATE_FORMAT);
};
