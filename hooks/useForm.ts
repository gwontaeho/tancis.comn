import React from "react";
import dayjs from "dayjs";
import * as reacthookform from "react-hook-form";
import { comnUtils } from "@/comn/utils";
import { GroupControlProps } from "@/comn/components";

// import { getFormattedValue, getUnFormattedValue } from "@/comn/components/_";

export type TFormFieldName = string;
export type TFormFieldValue = any;
export type TFormValues = Record<TFormFieldName, TFormFieldValue>;
export type TFormSchema = { id: string; schema: TFormControlSchema };
type TFormControlSchema = Record<string, any>;
type UseFormProps = { defaultSchema: TFormSchema; defaultValues?: TFormValues };

export const useForm = (props: UseFormProps) => {
    const { defaultSchema, defaultValues } = props;
    const { id, schema } = defaultSchema;

    const {
        control,
        getValues,
        setValue,
        setFocus,
        trigger,
        watch,
        reset,
        setError,
        handleSubmit,
        clearErrors,
        formState: { errors, isSubmitted },
    } = reacthookform.useForm<TFormValues>({
        criteriaMode: "all",
        mode: "onSubmit",
        reValidateMode: "onChange",
        defaultValues:
            /** set default values */
            defaultValues &&
            Object.fromEntries(
                Object.entries(defaultValues).map(([k, v]) => {
                    return [k, comnUtils.getFormattedValue(v, schema[k]) ?? null];
                }),
            ),
    });

    /** schema */
    const [_schema, _setSchema] = React.useState<TFormControlSchema>(schema);

    /** schema by field */
    const _fields = Object.fromEntries(
        Object.entries(_schema).reduce<any>((prev, curr) => {
            switch (curr[1].type) {
                case "daterange":
                    return [
                        ...prev,
                        [curr[1]["start"]["name"], { ...curr[1]["start"], type: "date" }],
                        [curr[1]["end"]["name"], { ...curr[1]["end"], type: "date" }],
                    ];
                case "timerange":
                    return [
                        ...prev,
                        [curr[1]["start"]["name"], { ...curr[1]["start"], type: "time" }],
                        [curr[1]["end"]["name"], { ...curr[1]["end"], type: "time" }],
                    ];
                default:
                    return [...prev, [curr[0], curr[1]]];
            }
        }, []),
    );

    /** set schema */
    const setSchema = (name: string, value: any) => {
        _setSchema((prev) => ({ ...prev, [name]: { ...prev[name], ...value } }));
    };
    const setSchemas = (names: string[], schemas: any) => {
        names.forEach((name) => {
            setSchema(name, schemas);
        });
    };

    const resetSchema = (params?: any) => {
        _setSchema(params?.schema || schema);
    };

    const _getValue = (name: string) => {
        const v = _getValues([name]);
        if (v === undefined) return undefined;

        return v[0];
    };
    const _getValues = (arg?: any) => {
        return Object.fromEntries(
            Object.entries<any>(getValues(arg)).map(([k, v]) => [k, comnUtils.getUnformattedValue(v, _fields[k])]),
        );
    };
    const _setValue = (name: any, value: any) => {
        setValue(name, comnUtils.getFormattedValue(value, _schema[name]) ?? null, { shouldValidate: isSubmitted });
    };
    const _setValues = (values: TFormValues, part?: boolean) => {
        Object.keys(_fields).forEach((name) => {
            if (part === true && values[name] === undefined) return;

            let value = values[name];
            if (value === undefined) value = null;

            _setValue(name, value);
        });
    };
    const _clearValues = () => {
        Object.keys(_getValues()).forEach((name) => {
            setValue(name, null, { shouldValidate: isSubmitted });
        });
    };

    const setEditable = <T>(arg: T, value?: boolean) => {
        if (value === undefined)
            return _setSchema((prev) =>
                Object.fromEntries(
                    Object.entries(prev).map((_) => {
                        return [_[0], { ..._[1], edit: !!arg }];
                    }),
                ),
            );

        if (typeof arg === "string") {
            _setSchema((prev) => ({ ...prev, [arg]: { ...prev[arg], edit: value } }));
        }
    };

    const validate = (name?: TFormFieldValue) => {
        if (name in _schema) trigger(name, { shouldFocus: true });
        else trigger(undefined, { shouldFocus: true });
    };

    const _handleSubmit = (onValid?: (data: any) => void, onInvalid?: (data: any) => void) => {
        return handleSubmit(
            (data) => {
                if (!onValid) return;
                onValid(_getValues());
            },
            (error) => {
                if (!onInvalid) return;
                onInvalid(error);
            },
        );
    };

    /**
     *
     * @param s
     * @returns
     */
    const getSchema = (s: TFormControlSchema): any => {
        return Object.fromEntries(
            Object.entries(s).map(([k, v]) => {
                const getRules = (args: any) => {
                    let { min, max, minLength, pattern, validate, required, maxLength } = args;
                    if (required) required = "msg.00001";
                    return Object.fromEntries(
                        Object.entries({ min, max, minLength, pattern, validate, required, maxLength }).filter(
                            ([, _]) => _ !== undefined,
                        ),
                    );
                };

                return [
                    k,
                    (() => {
                        switch (v.type) {
                            case "daterange":
                            case "timerange": {
                                const { start, end, ...rest } = v;

                                return {
                                    ...rest,
                                    invalid: errors[k],
                                    start: {
                                        ...v.start,
                                        invalid: errors[v.start.name],
                                        rules: getRules(start),
                                        control,
                                    },
                                    end: {
                                        ...v.end,
                                        invalid: errors[v.end.name],
                                        rules: getRules(end),
                                        control,
                                    },
                                };
                            }

                            default: {
                                const { min, max, minLength, pattern, validate, ...rest } = v;
                                return {
                                    ...rest,
                                    invalid: errors[k],
                                    name: k,
                                    control,
                                    rules: getRules(v),
                                };
                            }
                        }
                    })(),
                ];
            }),
        );
    };

    const setErrors = (errors: any) => {
        if (errors === undefined || errors === null) return;
        Object.keys(_schema).forEach((name) => {
            if (errors[name] === undefined || errors[name] === null) return;
            setError(name, { message: errors[name], type: "error" });
        });
    };

    return {
        schema: getSchema(_schema),
        handleSubmit: _handleSubmit,
        getValue: _getValue,
        getValues: _getValues,
        setValue: _setValue,
        setValues: _setValues,
        clearValues: _clearValues,
        setSchema,
        setSchemas,
        resetSchema,
        setEditable,
        setFocus,
        validate,
        clearErrors,
        watch,
        errors,
        isSubmitted,
        setError,
        setErrors,
        reset,
    };
};
