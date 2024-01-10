import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Icon, IconsType, Tooltip } from "@/comn/components";

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
} from "@/comn/components/_";

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
    | "boolean";

const SIZES = {
    1: "w-1/12",
    2: "w-2/12",
    3: "w-3/12",
    4: "w-4/12",
    5: "w-5/12",
    6: "w-6/12",
    7: "w-7/12",
    8: "w-8/12",
    9: "w-9/12",
    10: "w-10/12",
    11: "w-11/12",
    12: "w-full",
    fit: "w-fit",
    full: "w-full",
};

type FormControlGroupProps = {
    children?: React.ReactNode;
};

export type TFormControlOptions = {
    label: string;
    value: string;
}[];

export type FormControlProps = InputDaterangeProps & {
    type?: FormControlType;
    value?: any;
    getValues?: any;
    edit?: boolean;
    name?: string;
    options?: TFormControlOptions;
    rightText?: string;
    leftButton?: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: IconsType };
    rightButton?: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: IconsType };
    onChange?: (e: any) => void;
    onBlur?: () => void;
    disabled?: boolean;
    readOnly?: boolean;
    setValue?: any;
    invalid?: any;
    comnCd?: string;
    area?: string;
    keyword?: string;
    multiple?: boolean;
    size?: keyof typeof SIZES;
    control?: any;
    rules?: any;
    defaultValue?: any;
    onFocus?: (e: any) => void;
    mask?: string;
    message?: string;
    maxLength?: number;
    exact?: boolean;
    decimalScale?: number;
    thousandSeparator?: boolean;
    letterCase?: "upper" | "lower";
    start?: any;
    end?: any;
    all?: boolean;
    select?: boolean;
    validate?: any;
    pattern?: any;
    min?: any;
    max?: any;
    minLength?: any;
    lang?: string;
    popupSize?: "sm" | "md" | "lg";
    inputLabel?: string;
    rows?: number;
};

const FormControlGroup = (props: FormControlGroupProps) => {
    return (
        <div className="flex border rounded divide-x">
            {React.Children.map(props.children, (child) => {
                return <div className="[&_*]:border-none">{child}</div>;
            })}
        </div>
    );
};

const FormControlEditMode = React.forwardRef((props: any, ref) => {
    const { type, rightButton, leftButton, rightText, getValues, ...rest } = props;

    return (
        <div
            className={classNames("flex w-full", {
                "[&_.input]:rounded-r-none": rightButton,
                "[&_.input]:rounded-l-none": leftButton,
            })}
        >
            {props.edit !== false && leftButton && (
                <button type="button" onClick={leftButton.onClick} className="uf-input-left-button">
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
                        case "select":
                            return <Select {...rest} ref={ref} />;
                        case "radio":
                            return <Radio {...rest} ref={ref} />;
                        case "textarea":
                            return <Textarea {...rest} ref={ref} />;
                        case "file":
                            return <InputFile {...rest} />;
                        case "checkbox":
                            return <Checkbox {...rest} />;
                        case "date":
                            return <InputDate {...rest} />;
                        case "time":
                            return <InputTime {...rest} />;
                        case "datetime":
                            return <InputDatetime {...rest} />;
                        case "daterange":
                            return <InputDaterange {...rest} />;
                        case "timerange":
                            return <InputTimerange {...rest} />;
                        case "code":
                            return <InputCode {...rest} />;
                        case "boolean":
                            return <InputBoolean {...rest} />;
                        default:
                            return <InputText {...rest} ref={ref} />;
                    }
                })()}
                {props.edit !== false && rightText && <span className="absolute right-0 px-1">{rightText}</span>}
            </div>

            {props.edit !== false && rightButton && (
                <button type="button" className="uf-input-right-button" onClick={rightButton.onClick}>
                    <Icon icon={rightButton.icon} size="xs" />
                </button>
            )}
        </div>
    );
});

export const FormControl = Object.assign(
    React.forwardRef((props: FormControlProps, ref) => {
        const { size = "full", message, invalid, getValues, ...rest } = props;
        const { t } = useTranslation();

        return (
            <div className={classNames("uf-input", SIZES[size])}>
                <Tooltip enabled={Boolean(invalid)} size="full" content={t(invalid?.message)}>
                    {props.control ? (
                        <ControllerWrapper {...rest}>
                            <FormControlEditMode />
                        </ControllerWrapper>
                    ) : (
                        <FormControlEditMode ref={ref} {...rest} />
                    )}
                </Tooltip>

                {/* message */}
                {message && <div className="uf-input-message">{message}</div>}

                {/* invalid message */}
                {invalid?.message && <div className="uf-input-error-message">{t(invalid?.message)}</div>}
            </div>
        );
    }),
    { Group: FormControlGroup },
);
