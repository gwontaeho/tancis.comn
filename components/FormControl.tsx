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
import { TOption } from "@/comn/hooks";

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

type TButton = {
    icon?: IconsType;
    onClick?: (arg: any) => void;
};

export type FormControlProps = InputDaterangeProps & {
    /** common */
    type?: FormControlType;
    edit?: boolean;
    rightText?: string;
    leftButton?: TButton;
    rightButton?: TButton;

    /** common input props */
    name?: string;
    value?: any;
    readOnly?: boolean;
    disabled?: boolean;
    onBlur?: (arg?: any) => void;
    onFocus?: (arg?: any) => void;
    onChange?: (arg?: any) => void;

    /** UseOptions props */
    area?: string;
    comnCd?: string;
    options?: TOption[];

    /** text */
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

    /** code */
    popupSize?: "sm" | "md" | "lg";

    /** file */
    multiple?: boolean;

    /** boolean */
    inputLabel?: string;

    /** useForm */
    rules?: any;
    invalid?: any;

    /** form control */
    size?: keyof typeof SIZES;
    control?: any;
    message?: string;
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

const FormControlMain = React.forwardRef((props: any, ref) => {
    const { type, rightButton, leftButton, rightText, getValues, ...rest } = props;

    return (
        <div data-lb={!!leftButton || undefined} data-rb={!!rightButton || undefined} className="uf-form-control-main">
            {props.edit !== false && leftButton && (
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
                            return <Select {...rest} />;
                        case "radio":
                            return <Radio {...rest} />;
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
                {props.edit !== false && rightText && <span className="uf-right-text">{rightText}</span>}
            </div>

            {props.edit !== false && rightButton && (
                <button type="button" className="uf-right-button" onClick={rightButton.onClick}>
                    <Icon icon={rightButton.icon} size="xs" />
                </button>
            )}
        </div>
    );
});

export const FormControl = Object.assign(
    React.forwardRef((props: FormControlProps, ref) => {
        const { size = "full", message, invalid, ...rest } = props;
        const { t } = useTranslation();

        return (
            <div className={classNames("uf-form-control", props.edit !== false ? SIZES[size] : null)}>
                <Tooltip enabled={Boolean(invalid)} size="full" content={t(invalid?.message)}>
                    {props.control ? (
                        <ControllerWrapper {...rest}>
                            <FormControlMain />
                        </ControllerWrapper>
                    ) : (
                        <FormControlMain ref={ref} {...rest} />
                    )}
                </Tooltip>

                {/* message */}
                {props.edit !== false && message && <div className="uf-message">{message}</div>}

                {/* invalid message */}
                {props.edit !== false && invalid && (
                    <div className="uf-error-message">{t(invalid?.message || "invalid")}</div>
                )}
            </div>
        );
    }),
    { Group: FormControlGroup },
);
