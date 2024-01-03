import { useState } from "react";
import * as rhf from "react-hook-form";
import { GroupControlProps } from "@/comn/components";

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
            setValue(name, values[name]);
        });
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
                    const { min, max, minLength, pattern, validate, required, maxLength } = args;
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

                            default: {
                                const { min, max, minLength, pattern, validate, ...rest } = value;

                                return {
                                    ...rest,
                                    ...register(key, getRules(value)),
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
        setValue,
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
    };
};
