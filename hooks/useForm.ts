import { useState } from "react";
import * as rhf from "react-hook-form";
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
    const { defaultSchema, values, defaultValues } = props;

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
    } = rhf.useForm<TFormValues>({ values, defaultValues });

    const { id, schema } = defaultSchema;
    const [_schema, _setSchema] = useState<TFormControlSchema>(schema);

    const _setValue = (name: any, value: any) => {
        const s = _schema[name] || {};

        switch (s.type) {
            case "number":
                const converted = Number(String(value).replaceAll(",", ""));

                console.log(converted);
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

    const setSchemas = (names: string[], schemas: any) => {
        names.forEach((name) => {
            setSchema(name, schemas);
        });
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
                                    getValues,
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
                            case "checkbox": {
                                const { min, max, minLength, pattern, validate, ...rest } = value;

                                return {
                                    ...rest,
                                    invalid: errors[key],
                                    name: key,
                                    control,
                                    getValues,
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
                                            return Number(String(v).replaceAll(",", ""));
                                        },
                                    }),
                                    invalid: errors[key],
                                    getValues,
                                };
                            }

                            default: {
                                const { min, max, minLength, pattern, validate, ...rest } = value;

                                return {
                                    ...rest,
                                    ...register(key, { ...getRules(value) }),
                                    invalid: errors[key],
                                    getValues,
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
        setSchema,
        setSchemas,
        resetSchema,
        setEditable,
        getValues,
        setValue: _setValue,
        setFocus,
        handleSubmit,
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
    };
};
