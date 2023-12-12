import { useState } from "react";
import * as rhf from "react-hook-form";
import { GroupControlProps } from "@/com/components";

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
        reset,
        clearErrors,
        watch,
        formState: { errors, isSubmitted },
    } = rhf.useForm<FormValuesType>({ values });

    const { id, schema } = defaultSchema;
    const [_schema, _setSchema] = useState<FormControlSchemaType>(schema);

    const setSchema = (name: string, value: any) => {
        _setSchema((prev) => ({ ...prev, [name]: { ...prev[name], ...value } }));
    };

    const resetSchema = () => {
        _setSchema(schema);
        reset();
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

    const validate = (name: FormFieldValueType) => {
        if (name in _schema) trigger(name, { shouldFocus: true });
        else trigger();
    };

    const clearValues = () => {
        reset();
    };

    const setValues = (values: FormValuesType) => {
        reset(values);
    };

    const getSchema = (s: FormControlSchemaType): any => {
        if (!s) return undefined;
        return Object.fromEntries(
            Object.entries(s).map(([key, value]: any) => {
                return [
                    key,
                    value.type === "date" ||
                    value.type === "time" ||
                    value.type === "datetime" ||
                    value.type === "daterange" ||
                    value.type === "timerange"
                        ? {
                              ...value,
                              //   name: key,
                              ...register(key),

                              invalid: errors[key],
                          }
                        : {
                              ...value,
                              ...register(key),
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
        register,
        handleSubmit,
        validate,
        clearValues,
        clearErrors,
        watch,
        setValues,
        errors,
        isSubmitted,
    };
};
