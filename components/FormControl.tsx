import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Icon, IconsType } from "./Icon";
import { TOption } from "../hooks";
import type { TRule } from "../hooks";
import { Tooltip } from "./Tooltip";
import { BOLD_TEXT, COLOR_TEXT, SIZE_TEXT, WIDTH } from "../features/foundation";
import {
    InputText,
    InputNumber,
    InputPassword,
    Textarea,
    Select,
    Checkbox,
    Radio,
    InputFile,
    InputDate,
    InputTime,
    InputDatetime,
    InputDaterangeProps,
    InputDaterange,
    InputTimerange,
    InputCode,
    InputBoolean,
    ControllerWrapper,
} from "./_";
import { SEditor } from "@/comn/components";

export const FormControlList = [
    "text",
    "number",
    "password",
    "select",
    "radio",
    "checkbox",
    "textarea",
    "date",
    "time",
    "datetime",
    "daterange",
    "timerange",
    "code",
    "file",
    "boolean",
    "editor",
];

export type FormControlType =
    | "text"
    | "number"
    | "password"
    | "select"
    | "radio"
    | "checkbox"
    | "textarea"
    | "date"
    | "time"
    | "datetime"
    | "daterange"
    | "timerange"
    | "code"
    | "file"
    | "boolean"
    | "editor";

type TButton = {
    icon?: IconsType;
    onClick?: (arg: any) => void;
};

export type FormControlProps = InputDaterangeProps &
    TRule & {
        /** common */
        type?: FormControlType;
        edit?: boolean;
        mode?: "edit" | "view" | null;
        rightText?: string;
        leftButton?: TButton;
        rightButton?: TButton;

        /** common input props */
        name?: string;
        value?: any;
        readOnly?: boolean;
        disabled?: boolean;
        onClick?: (arg?: any) => void;
        onBlur?: (arg?: any) => void;
        onFocus?: (arg?: any) => void;
        onChange?: (arg?: any) => void;
        onEnter?: (arg?: any) => void;

        as?: "link";
        to?: string;

        /** UseOptions props */
        area?: string;
        comnCd?: string;
        options?: TOption[];
        excludes?: string[];
        includes?: { label: string; value: string }[];
        filter?: (arg?: any) => boolean;
        callback?: (arg?: any) => boolean;

        /** with option */
        viewType?: "label" | "value" | "both";
        editType?: string;

        /** text */
        imemode?: "number" | "number+upper" | "number+lower";
        mask?: string | any[];
        exact?: boolean;
        letterCase?: "upper" | "lower";
        maxLength?: number;
        placeholder?: string;
        defaultValue?: any;

        /** number */
        decimalScale?: number;
        thousandSeparator?: boolean;

        /** checkbox */
        all?: boolean;
        checkAll?: boolean;

        /** select */
        select?: boolean;

        /** range */
        start?: any;
        end?: any;

        /** textarea */
        rows?: number;

        /** date, time */
        startRef?: any;
        endRef?: any;
        second?: boolean;

        /** code */
        popupSize?: "sm" | "md" | "lg";
        popupParams?: any;

        /** file */
        multiple?: boolean;

        /** boolean */
        inputLabel?: string;

        /** useForm */
        invalid?: any;

        /** form control */
        size?: keyof typeof WIDTH;
        control?: any;
        message?: string;

        /** editor */
        height?: number;

        /** style */
        color?: keyof typeof COLOR_TEXT;
        editColor?: keyof typeof COLOR_TEXT;
        bold?: keyof typeof BOLD_TEXT;
        editBold?: keyof typeof BOLD_TEXT;
        fontSize?: keyof typeof SIZE_TEXT;
    };

const FormControlMain = forwardRef((props: any, ref) => {
    const { type = "text", rightButton, leftButton, rightText, getValues, ...rest } = props;
    const { edit = true } = props;

    return (
        <div data-lb={!!leftButton || undefined} data-rb={!!rightButton || undefined} className="uf-form-control-main">
            {edit && leftButton && (
                <button type="button" onClick={leftButton.onClick} className="uf-left-button">
                    <Icon icon={leftButton.icon} size="xs" />
                </button>
            )}

            <div className="w-full relative flex items-center">
                {(() => {
                    switch (type) {
                        case "text":
                            return <InputText {...rest} ref={ref} />;
                        case "number":
                            return <InputNumber {...rest} ref={ref} />;
                        case "password":
                            return <InputPassword {...rest} ref={ref} />;
                        case "textarea":
                            return <Textarea {...rest} ref={ref} />;
                        case "select":
                            return <Select {...rest} ref={ref} />;
                        case "radio":
                            return <Radio {...rest} />;
                        case "file":
                            return <InputFile {...rest} />;
                        case "checkbox":
                            return <Checkbox {...rest} />;
                        case "date":
                            return <InputDate {...rest} ref={ref} />;
                        case "time":
                            return <InputTime {...rest} ref={ref} />;
                        case "datetime":
                            return <InputDatetime {...rest} ref={ref} />;
                        case "daterange":
                            return <InputDaterange {...rest} />;
                        case "timerange":
                            return <InputTimerange {...rest} />;
                        case "code":
                            return <InputCode {...rest} ref={ref} />;
                        case "boolean":
                            return <InputBoolean {...rest} />;
                        case "editor":
                            return <SEditor {...rest} />;
                        default:
                            return <InputText {...rest} ref={ref} />;
                    }
                })()}
                {edit && rightText && <span className="uf-right-text">{rightText}</span>}
                {!edit && rightText && <span className="px-1 min-w-max">{rightText}</span>}
            </div>

            {edit && rightButton && (
                <button type="button" className="uf-right-button" onClick={rightButton.onClick}>
                    <Icon icon={rightButton.icon} size="xs" />
                </button>
            )}
        </div>
    );
});

export const FormControl = forwardRef((props: FormControlProps, ref) => {
    const { size = "full", message, invalid, ...rest } = props;
    const { type, edit = true, control } = props;

    const { t } = useTranslation();

    return (
        <div className={classNames("uf-form-control", edit ? WIDTH[size] : type === "editor" ? "w-full" : "w-auto")}>
            <Tooltip enabled={Boolean(invalid)} size="full" content={t(invalid?.message)}>
                {control ? (
                    <ControllerWrapper {...rest}>
                        <FormControlMain />
                    </ControllerWrapper>
                ) : (
                    <FormControlMain ref={ref} {...rest} />
                )}
            </Tooltip>

            {/* message */}
            {edit && message && <div className="uf-message">{message}</div>}
            {/* invalid message */}
            {edit && invalid && <div className="uf-error-message">{t(invalid?.message || "invalid")}</div>}
        </div>
    );
});
