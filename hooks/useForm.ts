import { useState } from "react";
import * as rhf from "react-hook-form";
import dayjs from "dayjs";
import { GroupControlProps } from "@/comn/components";
import { comnUtils } from "@/comn/utils";

// export type TFormRules = Partial<{
//     required: Boolean | string;
//     min: any;
//     max: any;
//     maxLength: any;
//     minLength: any;
//     pattern: any;
//     validate: any;
// }>;

export type TFormFieldName = string;
export type TFormFieldValue = any;
export type TFormValues = Record<TFormFieldName, TFormFieldValue>;
export type TFormSchema = { id: string; schema: TFormControlSchema };
type TFormControlSchema = Record<string, GroupControlProps>;

type UseFormProps = { defaultSchema: TFormSchema; values?: any; defaultValues?: any };

export const useForm = (props: UseFormProps) => {
    const { defaultSchema, defaultValues } = props;
    const { id, schema } = defaultSchema;

    const {
        control,
        register,
        getValues,
        setValue,
        setFocus,
        handleSubmit,
        trigger,
        clearErrors,
        watch,
        reset,
        setError,
        formState: { errors, isSubmitted },
    } = rhf.useForm<TFormValues>({ defaultValues });

    /**
     * 스키마
     */
    const [_schema, _setSchema] = useState<TFormControlSchema>(schema);

    /**
     * 스키마에 등록된
     * field-type object
     */
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

    /**
     * set value
     */
    const _setValue = (name: any, value: any) => {
        const s = _schema[name] || {};

        switch (s.type) {
            case "time": {
                const next = new Date(dayjs().format("YYYY-MM-DD") + " " + value);
                if (!dayjs(next).isValid()) return;
                setValue(name, next);
                return;
            }
            case "date":
            case "datetime": {
                const next = new Date(value);
                if (!dayjs(next).isValid()) return;
                setValue(name, next);
                return;
            }
            case "number":
                const converted = Number(String(value).replaceAll(",", ""));
                if (isNaN(converted)) {
                    setValue(name, undefined);
                    return;
                }
                if (s.thousandSeparator) {
                    setValue(name, converted.toLocaleString("ko-KR"));
                    return;
                }
                setValue(name, converted);
                return;
            default:
                setValue(name, value);
                return;
        }
    };

    const setSchema = (name: string, value: any) => {
        _setSchema((prev) => ({ ...prev, [name]: { ...prev[name], ...value } }));
    };

    const _getValues = (arg?: any) => {
        return Object.fromEntries(
            Object.entries<any>(getValues(arg))
                .map(([key, value]) => [
                    key,
                    comnUtils.isUndefined(value) || //
                    comnUtils.isEmptyString(value) ||
                    comnUtils.isEmptyArray(value)
                        ? null
                        : value,
                ])
                .map(([key, value]) => {
                    return [
                        key,
                        (() => {
                            switch (_formFields[key]) {
                                case "date":
                                    if (!dayjs(value).isValid()) return null;
                                    return dayjs(value).format("YYYY-MM-DD");
                                case "time":
                                    if (!dayjs(value).isValid()) return null;
                                    return dayjs(value).format("HH:mm:ss");
                                case "datetime":
                                    if (!dayjs(value).isValid()) return null;
                                    return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
                                default:
                                    return value;
                            }
                        })(),
                    ];
                }),
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
        Object.keys(_schema).forEach((name) => {
            setValue(name, null);
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
                                    setValue,
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

                            case "date":
                            case "time":
                            case "datetime":
                            case "code":
                            case "file":
                            case "select":
                            case "radio":
                            case "checkbox": {
                                const { min, max, minLength, pattern, validate, ...rest } = value;

                                return {
                                    ...rest,
                                    invalid: errors[key],
                                    name: key,
                                    control,
                                    setValue,
                                    rules: getRules(value),
                                };
                            }

                            case "number": {
                                const { min, max, minLength, pattern, validate, ...rest } = value;

                                return {
                                    ...rest,
                                    ...register(key, {
                                        ...getRules(value),
                                        setValueAs: (v) => {
                                            if (comnUtils.isEmptyString(v) || comnUtils.isUndefined(v)) return null;
                                            return Number(String(v).replaceAll(",", ""));
                                        },
                                    }),
                                    invalid: errors[key],
                                };
                            }

                            default: {
                                const { min, max, minLength, pattern, validate, ...rest } = value;

                                return {
                                    ...rest,
                                    ...register(key, { ...getRules(value) }),
                                    invalid: errors[key],
                                };
                            }
                        }
                    })(),
                ];
            }),
        );
    };

    return {
        schema: getSchema(_schema),
        handleSubmit: _handleSubmit,
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
        reset,
        getFormValues,
        setSchemaAll,
    };
};
