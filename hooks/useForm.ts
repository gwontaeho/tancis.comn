import React from "react";
import dayjs from "dayjs";
import * as reacthookform from "react-hook-form";
import { comnUtils } from "@/comn/utils";
import { GroupControlProps } from "@/comn/components";
import { getFormattedValue, getUnFormattedValue } from "@/comn/components/_";

export type TFormFieldName = string;
export type TFormFieldValue = any;
export type TFormValues = Record<TFormFieldName, TFormFieldValue>;
export type TFormSchema = { id: string; schema: TFormControlSchema };
type TFormControlSchema = Record<string, GroupControlProps>;
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
        defaultValues:
            defaultValues &&
            Object.fromEntries(
                Object.entries(defaultValues).map(([k, v]) => {
                    return [
                        k,
                        (() => {
                            const s = schema[k];
                            if (s) {
                                switch (s.type) {
                                    case "text":
                                    case "number": {
                                        return getFormattedValue(v, s);
                                    }
                                    case "checkbox":
                                        if (!Array.isArray(v)) return null;
                                        return v;
                                    case "time": {
                                        if (dayjs(v).isValid()) {
                                            return dayjs(v).toDate();
                                        }
                                        if (dayjs("2000-01-01 " + v).isValid()) {
                                            return dayjs("2000-01-01 " + v).toDate();
                                        }
                                        return null;
                                    }
                                    case "date":
                                    case "datetime": {
                                        if (dayjs(v).isValid()) {
                                            return dayjs(v).toDate();
                                        }
                                        return null;
                                    }
                                    default:
                                        return v;
                                }
                            }

                            return v;
                        })(),
                    ];
                }),
            ),
    });

    const [_schema, _setSchema] = React.useState<TFormControlSchema>(schema);

    const _formFields = Object.fromEntries(
        Object.entries(_schema).reduce<any>((prev, curr) => {
            switch (curr[1].type) {
                case "daterange":
                    return [
                        ...prev, //
                        [curr[1]["start"]["name"], "date"],
                        [curr[1]["end"]["name"], "date"],
                    ];
                case "timerange":
                    return [
                        ...prev, //
                        [curr[1]["start"]["name"], "time"],
                        [curr[1]["end"]["name"], "time"],
                    ];
                default:
                    return [...prev, [curr[0], curr[1]["type"]]];
            }
        }, []),
    );

    const _setValue = (name: any, value: any) => {
        const s = _schema[name];

        if (
            comnUtils.isEmptyString(value) ||
            comnUtils.isEmptyArray(value) ||
            comnUtils.isUndefined(value) ||
            comnUtils.isNull(value)
        ) {
            setValue(name, null, { shouldValidate: isSubmitted });
            return;
        }

        if (s) {
            let v = value;
            switch (s.type) {
                case "text":
                case "number": {
                    v = getFormattedValue(String(v), s);
                    break;
                }
                case "checkbox":
                    if (!Array.isArray(v)) {
                        v = null;
                        break;
                    }
                    break;
                case "time": {
                    if (dayjs(v).isValid()) {
                        v = dayjs(v).toDate();
                        break;
                    }
                    if (dayjs("2000-01-01 " + v).isValid()) {
                        v = dayjs("2000-01-01 " + v).toDate();
                        break;
                    }
                    v = null;
                    break;
                }
                case "date":
                case "datetime": {
                    if (dayjs(v).isValid()) {
                        v = dayjs(v).toDate();
                        break;
                    }
                    v = null;
                    break;
                }

                default:
                    break;
            }
            setValue(name, v, { shouldValidate: isSubmitted });
            return;
        }

        setValue(name, value, { shouldValidate: isSubmitted });
    };

    const setSchema = (name: string, value: any) => {
        _setSchema((prev) => ({ ...prev, [name]: { ...prev[name], ...value } }));
    };

    const getValue = (name: string) => {
        const v = _getValues([name]);
        if (v === undefined) return undefined;

        return v[0];
    };

    const _getValues = (arg?: any) => {
        return Object.fromEntries(
            Object.entries<any>(getValues(arg)).map(([key, value]) => [
                key,
                comnUtils.isEmptyString(value) || //
                comnUtils.isEmptyArray(value) ||
                comnUtils.isUndefined(value) ||
                comnUtils.isNull(value)
                    ? undefined
                    : (() => {
                          switch (_formFields[key]) {
                              case "text":
                                  return getUnFormattedValue(value, schema[key]);
                              case "number":
                                  if (isNaN(Number(String(value).replaceAll(",", "")))) return undefined;
                                  return Number(String(value).replaceAll(",", ""));
                              case "date":
                                  if (!dayjs(value).isValid()) return undefined;
                                  return dayjs(value).format("YYYY-MM-DD");
                              case "time":
                                  if (!dayjs(value).isValid()) return undefined;
                                  return dayjs(value).format("HH:mm:ss");
                              case "datetime":
                                  if (!dayjs(value).isValid()) return undefined;
                                  return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
                              default:
                                  return value;
                          }
                      })(),
            ]),
        );
    };

    const setSchemas = (names: string[], schemas: any) => {
        names.forEach((name) => {
            setSchema(name, schemas);
        });
    };
    const setSchemaAll = (schema: any) => {
        _setSchema(schema.schema);
    };

    const resetSchema = () => {
        _setSchema(schema);
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

    const clearValues = () => {
        Object.keys(_getValues()).forEach((name) => {
            setValue(name, null, { shouldValidate: isSubmitted });
        });
    };

    const _handleSubmit = (onValid?: (data: any) => void, onInvalid?: (data: any) => void) => {
        return handleSubmit(
            () => {
                if (!onValid) return;
                onValid(_getValues());
            },
            (error) => {
                if (!onInvalid) return;
                onInvalid(error);
            },
        );
    };

    const setValues = (values: TFormValues, part?: boolean) => {
        Object.keys(_schema).forEach((name) => {
            if (part === true && values[name] === undefined) return;
            _setValue(name, values[name]);
        });
    };

    const getFormValues = (name?: string) => {
        const _values = getValues();
        const temp: { [key: string]: any } = _values;

        Object.keys(_schema).forEach((name) => {
            switch (_schema[name].type) {
                case "daterange":
                case "timerange": {
                    temp[_schema[name].start?.name] = comnUtils.dateToString(
                        _values[_schema[name].start?.name],
                        _schema[name].type === "daterange" ? "date" : "time",
                    );
                    temp[_schema[name].end?.name] = comnUtils.dateToString(
                        _values[_schema[name].end?.name],
                        _schema[name].type === "daterange" ? "date" : "time",
                    );
                    break;
                }
                case "date":
                case "time":
                case "datetime": {
                    temp[name] = comnUtils.dateToString(_values[name], _schema[name].type);
                    break;
                }
                default: {
                    temp[name] = _values[name];
                }
            }
        });

        return temp;
    };

    /**
     *
     * @param s
     * @returns
     */
    const getSchema = (s: TFormControlSchema): any => {
        return Object.fromEntries(
            Object.entries(s).map(([key, value]) => {
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
                    key,
                    (() => {
                        switch (value.type) {
                            case "daterange":
                            case "timerange": {
                                const { start, end, ...rest } = value;

                                return {
                                    ...rest,
                                    invalid: errors[key],
                                    start: {
                                        ...value.start,
                                        invalid: errors[value.start.name],
                                        rules: getRules(start),
                                        control,
                                    },
                                    end: {
                                        ...value.end,
                                        invalid: errors[value.end.name],
                                        rules: getRules(end),
                                        control,
                                    },
                                };
                            }

                            default: {
                                const { min, max, minLength, pattern, validate, ...rest } = value;
                                return {
                                    ...rest,
                                    invalid: errors[key],
                                    name: key,
                                    control,
                                    rules: getRules(value),
                                };
                            }
                        }
                    })(),
                ];
            }),
        );
    };

    const setCheckAll = (name: string, check: boolean) => {
        const s = _schema[name];
        if (s === undefined || s.type !== "checkbox") {
            return;
        }
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
        getValue,
        getValues: _getValues,
        setValue: _setValue,
        setSchema,
        setSchemas,
        resetSchema,
        setEditable,
        setFocus,
        validate,
        clearValues,
        clearErrors,
        watch,
        setValues,
        errors,
        isSubmitted,
        setError,
        setErrors,
        reset,
        getFormValues,
        setSchemaAll,
        setCheckAll,
    };
};
