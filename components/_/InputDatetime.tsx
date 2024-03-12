import React from "react";
import dayjs from "dayjs";
import ReactDatePicker from "react-datepicker";
import { BOLD_TEXT, COLOR_TEXT, SIZE_TEXT } from "@/comn/features/foundation";
import { comnUtils } from "@/comn/utils";
import { useTheme } from "@/comn/hooks";
import { Icon } from "@/comn/components";
import constants from "@/comn/constants";

export type InputDateimeProps = {
    edit?: boolean;

    name?: string;
    value?: any;
    readOnly?: boolean;
    disabled?: boolean;
    defaultValue?: any;

    color?: keyof typeof COLOR_TEXT;
    editColor?: keyof typeof COLOR_TEXT;
    bold?: keyof typeof BOLD_TEXT;
    editBold?: keyof typeof BOLD_TEXT;
    fontSize?: keyof typeof SIZE_TEXT;

    onBlur?: (arg?: any) => void;
    onChange?: (arg?: any) => void;
};

export const InputDatetime = React.forwardRef((props: InputDateimeProps, ref: any) => {
    const {
        edit = true,
        /** input props */
        name,
        value,
        readOnly,
        disabled,
        defaultValue,

        color,
        editColor,
        bold,
        editBold,
        fontSize,

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

    const [_value, _setValue] = React.useState<Date | null | undefined>(formatDatetime(value));

    React.useEffect(() => {
        if (dayjs(value).isSame(dayjs(_value))) return;

        _setValue(formatDatetime(value));
    }, [value]);

    const handleChange = (date: Date) => {
        _setValue(date);
        if (onChange) {
            onChange(date);
        }
    };

    return (
        <div className="w-full">
            {!edit && (
                <div className={"min-w-max" + comnUtils.getViewStyle(color, bold, fontSize)}>
                    {localeDatetime(value, theme.lang)}
                </div>
            )}
            <div hidden={!edit}>
                <div className="relative w-full [&>div]:w-full">
                    <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
                    <ReactDatePicker
                        {..._props}
                        ref={(context: any) => {
                            if (context) {
                                if (typeof ref === "function") {
                                    ref(context.input);
                                }
                            }
                        }}
                        selected={_value}
                        onChange={handleChange}
                        dateFormat={constants.DATETIME_FORMAT_INPUT[theme.lang]}
                        autoComplete="off"
                        showTimeSelect
                        timeIntervals={5}
                        className={"input pl-5" + comnUtils.getEditStyle(editColor, editBold)}
                        portalId="root"
                        popperProps={{ strategy: "fixed" }}
                    />
                </div>
            </div>
        </div>
    );
});

export const localeDatetime = (v: any, l: "ko" | "en" | "tz") => {
    if (!v) return "";
    if (!dayjs(v).isValid()) return "";

    return dayjs(v).format(constants.DATETIME_FORMAT_DAYJS[l]);
};

export const formatDatetime = (v: any) => {
    if (!v) return undefined;
    if (!dayjs(v).isValid()) return undefined;

    return dayjs(v).toDate();
};

export const unformatDatetime = (v: any, o?: any) => {
    if (!v) return undefined;
    if (!dayjs(v).isValid()) return undefined;

    return dayjs(v).format(constants.DATETIME_FORMAT);
};
