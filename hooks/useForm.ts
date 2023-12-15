import { useState } from "react";
import * as rhf from "react-hook-form";
import { GroupControlProps } from "@/comn/components";

export type FormRulesType = Partial<{
    required: Boolean;
    min: number;
    max: number;
    maxLength: number;
    minLength: number;
    pattern: RegExp;
    validate: (value: FormFieldValueType, formValues: FormValuesType) => void;
}>;
export type FormFieldNameType = string;
export type FormFieldValueType = any;
export type FormValuesType = Record<FormFieldNameType, FormFieldValueType>;
export type FormSchemaType = { id: string; schema: FormControlSchemaType };
type FormControlSchemaType = Record<string, GroupControlProps>;
type UseFormProps = { defaultSchema: FormSchemaType; values?: object };

export const useForm = (props: UseFormProps) => {
    const { defaultSchema, values } = props;

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
        formState: { errors, isSubmitted },
    } = rhf.useForm<FormValuesType>({ values });

    const { id, schema } = defaultSchema;
    const [_schema, _setSchema] = useState<FormControlSchemaType>(schema);

    const setSchema = (name: string, value: any) => {
        _setSchema((prev) => ({ ...prev, [name]: { ...prev[name], ...value } }));
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
                    })
                )
            );

        if (typeof arg === "string") {
            _setSchema((prev) => ({ ...prev, [arg]: { ...prev[arg], edit: value } }));
        }
    };

    const validate = (name?: FormFieldValueType) => {
        if (name in _schema) trigger(name, { shouldFocus: true });
        else trigger();
    };

    const clearValues = () => {
        Object.keys(_schema).forEach((name) => {
            setValue(name, null);
        });
    };

    const setValues = (values: FormValuesType) => {
        Object.keys(_schema).forEach((name) => {
            setValue(name, values[name]);
        });
    };

    const getSchema = (s: FormControlSchemaType): any => {
        if (!s) return undefined;
        return Object.fromEntries(
            Object.entries(s).map(([key, value]: any) => {
                const { min, max, minLength, pattern, validate, required } = value;

                const rules = {} as any;
                if (required) rules.required = required;
                if (value.maxLength) rules.maxLength = value.maxLength;
                if (value.disabled) rules.disabled = value.disabled;
                if (min) rules.min = min;
                if (max) rules.max = max;
                if (minLength) rules.minLength = minLength;
                if (pattern) rules.pattern = pattern;
                if (validate) rules.validate = validate;

                if (
                    value.type === "date" ||
                    value.type === "time" ||
                    value.type === "datetime" ||
                    value.type === "daterange" ||
                    value.type === "timerange" ||
                    value.type === "code"
                )
                    return [
                        key,
                        {
                            ...value,
                            name: key,
                            setValue,
                            control,
                            rules,
                            invalid: errors[key],
                        },
                    ];

                return [
                    key,
                    {
                        ...value,
                        ...register(key, rules),
                        invalid: errors[key],
                    },
                ];
            })
        );
    };

    return {
        schema: getSchema(_schema),
        setSchema,
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
        reset,
    };
};
