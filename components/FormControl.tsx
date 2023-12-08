import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import { useController, Control } from "react-hook-form";
import classNames from "classnames";
import { Icon, IconsType, Tooltip } from "@/com/components";
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
    InputRange,
    InputRangeProps,
} from "@/com/components/_";
import dayjs from "dayjs";

type FormControlType =
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
    | "daterange"
    | "timerange"
    | "range";

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

type ControllerProps = {
    children: React.ReactElement;
    name: string;
    control: Control;
    rules: any;
};

type FormControlTextModeProps = {
    type?: FormControlType;
    value?: any;
    getValues?: any;
};

type FormControlEditModeProps = FormControlTextModeProps &
    InputRangeProps & {
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
    };

type FormControlMainProps = FormControlEditModeProps & {
    size?: keyof typeof SIZES;
    invalid?: boolean;
    control?: any;
    rules?: any;
    mainClassName?: string;
    defaultValue?: string;
};

export type FormControlProps = FormControlMainProps;

const FormControlTextMode = (props: FormControlTextModeProps) => {
    const { type, value } = props;

    return (
        <span className="break-all">
            {(() => {
                switch (type) {
                    case "checkbox":
                        return value && value.join(", ");
                    case "date":
                        return dayjs(value).format("YYYY-MM-DD");
                    case "time":
                        return dayjs(value).format("HH:mm");
                    case "datetime":
                        return dayjs(value).format("YYYY-MM-DD HH:mm");

                    default:
                        return value;
                }
            })()}
        </span>
    );
};

const FormControlEditMode = React.forwardRef<any>((props: FormControlEditModeProps, ref) => {
    const { edit = true, rightButton, leftButton, rightText, getValues, setValue, ...rest } = props;

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
                        case "range":
                            return (
                                <InputRange
                                    {...rest}
                                    setValue={setValue}
                                    hasLeftButton={!!leftButton}
                                    hasRightButton={!!rightButton}
                                />
                            );
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

const FormControlMain = React.forwardRef((props: FormControlMainProps, ref) => {
    const { edit = true, size = "full" } = props;

    return (
        <div className={classNames(SIZES[size], props.mainClassName)}>
            {!edit && <FormControlTextMode type={props.type} value={props.value} getValues={props.getValues} />}
            <Tooltip enabled={Boolean(props.invalid)} size="full" text="invalid field">
                <FormControlEditMode ref={ref} {...props} />
            </Tooltip>
            {props.invalid && <div className="text-invalid text-sm mt-1">invalid field</div>}
        </div>
    );
});

const Controller = (props: ControllerProps) => {
    const { children, name, control, rules } = props;
    const { field } = useController({ name, control, rules });
    return React.cloneElement(children, field);
};

export const FormControl = React.forwardRef((props: FormControlProps, ref) => {
    const { control, rules, ...rest } = props;
    if (props.name && control)
        return (
            <Controller name={props.name} control={control} rules={rules}>
                <FormControlMain ref={ref} {...rest} />
            </Controller>
        );
    return <FormControlMain ref={ref} {...props} />;
});
