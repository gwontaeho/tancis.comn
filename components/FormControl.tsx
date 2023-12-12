import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import classNames from "classnames";
import { Icon, IconsType, Tooltip } from "@/com/components";
import {
    ControllerWrapper,
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
} from "@/com/components/_";

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
    | "file"
    | "range"
    | "daterange"
    | "timerange";

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

export type FormControlOptionsType = { label: string; value: string }[];

type FormControlEditModeProps = InputDaterangeProps & {
    type?: FormControlType;
    value?: any;
    getValues?: any;
    edit?: boolean;
    name?: string;
    options?: FormControlOptionsType;
    rightText?: string;
    leftButton?: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: IconsType };
    rightButton?: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon: IconsType };
    onChange?: (e: any) => void;
    onBlur?: () => void;
    disabled?: boolean;
    setValue?: any;
    invalid?: string | boolean;
};

type FormControlMainProps = FormControlEditModeProps & {
    size?: keyof typeof SIZES;
    control?: any;
    rules?: any;
    mainClassName?: string;
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
};

export type FormControlProps = FormControlMainProps;

const FormControlEditMode = React.forwardRef<any>((props: any, ref) => {
    const { edit = true, rightButton, leftButton, rightText, getValues, setValue, invalid, value, ...rest } = props;

    return (
        <div
            className={classNames("flex w-full", {
                "[&_.input]:rounded-r-none": rightButton,
                "[&_.input]:rounded-l-none": leftButton,
                hidden: !edit,
            })}
        >
            {leftButton && (
                <button
                    type="button"
                    onClick={leftButton.onClick}
                    className="min-h-[1.75rem] px-2 border-y border-l rounded-l"
                >
                    <Icon icon={leftButton.icon} size="xs" />
                </button>
            )}
            <div className="w-full relative flex items-center">
                {(() => {
                    switch (props.type) {
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
                        case "checkbox":
                            return <Checkbox {...rest} ref={ref} />;
                        case "textarea":
                            return <Textarea {...rest} ref={ref} />;
                        case "file":
                            return <InputFile {...rest} ref={ref} />;
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
                        default:
                            return <InputText {...rest} ref={ref} />;
                    }
                })()}
                {rightText && <span className="absolute right-0 px-1">{rightText}</span>}
            </div>
            {rightButton && (
                <button
                    type="button"
                    className="min-h-[1.75rem] px-2 border-y border-r rounded-r"
                    onClick={rightButton.onClick}
                >
                    <Icon icon={rightButton.icon} size="xs" />
                </button>
            )}
        </div>
    );
});

export const FormControl = React.forwardRef((props: FormControlMainProps, ref) => {
    const { size = "full", message } = props;

    return (
        <div className={classNames(SIZES[size], props.mainClassName)}>
            <Tooltip enabled={Boolean(props.invalid)} size="full" text="invalid field">
                <FormControlEditMode ref={ref} {...props} />
            </Tooltip>
            {message && <div className="text-sm mt-1">{message}</div>}
            {props.invalid && <div className="text-invalid text-sm mt-1">invalid field</div>}
        </div>
    );
});
