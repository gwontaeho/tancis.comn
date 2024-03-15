import { useReducer, useState, useMemo, useEffect } from "react";
import * as reacthookform from "react-hook-form";
import { comnUtils } from "@/comn/utils";
import lodash from "lodash";

export type TFormFieldName = string;
export type TFormFieldValue = any;
export type TFormValues = Record<TFormFieldName, TFormFieldValue>;
export type TFormSchema = { id: string; schema: TFormControlSchema };
type TFormControlSchema = Record<string, any>;
type UseFormProps = { defaultSchema: TFormSchema; defaultValues?: TFormValues };

const getFields = (arg: any, control: any) => {
    return Object.entries(lodash.cloneDeep(arg)).reduce((prev: any, curr: any) => {
        const next = { ...prev };
        const { type, start, end } = curr[1];
        switch (type) {
            case "daterange":
            // @ts-ignore
            case "timerange":
                let childType;
                if (type === "daterange") childType = "date";
                if (type === "timerange") childType = "time";
                start.type = childType;
                start._parent = curr[0];
                start.control = control;
                end.type = childType;
                end._parent = curr[0];
                end.control = control;
                next[start.name] = start;
                next[end.name] = end;
            default:
                next[curr[0]] = curr[1];
                next[curr[0]].name = curr[0];
                next[curr[0]].control = control;
        }
        return next;
    }, {});
};

const reducer = (state: any, { type, payload }: any) => {
    switch (type) {
        case "setSchema": {
            const nextState = { ...state };
            const { name, value } = payload;
            const target = { ...nextState[name], ...value };
            nextState[name] = target;
            if (target._parent) {
                nextState[target._parent][name] = target;
            }
            return nextState;
        }
        case "setSchemas": {
            const nextState = { ...state };
            const { names, value } = payload;
            for (const name of names) {
                const target = { ...nextState[name], ...value };
                nextState[name] = target;
                if (target._parent) {
                    nextState[target._parent][name] = target;
                }
            }
            return nextState;
        }
        case "resetSchema": {
            const { schema, arg, control } = payload;
            return getFields(arg || schema, control);
        }
        case "setEditable": {
            const nextState = { ...state };
            const { arg, value } = payload;
            if (value === undefined) {
                for (const name in nextState) {
                    nextState[name].edit = Boolean(arg);
                }
            }
            if (typeof arg === "string") {
                nextState[arg].edit = Boolean(value);
            }
            return nextState;
        }
    }
};

const initializer = (arg: any) => {
    return getFields(arg.schema, arg.control);
};

let temp: any;

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
    } = reacthookform.useForm({
        mode: "onSubmit",
        criteriaMode: "all",
        reValidateMode: "onChange",
        defaultValues:
            defaultValues &&
            Object.fromEntries(
                Object.entries(defaultValues).map(([key, value]) => {
                    return [key, comnUtils.getFormattedValue(value, schema[key])];
                }),
            ),
    });

    const [fields, dispatch] = useReducer(reducer, { schema, control }, initializer);

    /**
     * ### Form Control 의 구조변경
     * - name : 필드명 (string)
     * - value : 변경할 스키마 (object)
     * - setSchema( "필드명" , { type : "text" , readOnly : true })
     */
    const setSchema = (name: string, value: any) => {
        dispatch({ type: "setSchema", payload: { name, value } });
    };
    const setSchemas = (names: string[], value: any) => {
        dispatch({ type: "setSchemas", payload: { names, value } });
    };
    const resetSchema = (arg?: any) => {
        dispatch({ type: "resetSchema", payload: { schema, arg, control } });
    };
    const setEditable = (arg: any, value?: any) => {
        dispatch({ type: "setEditable", payload: { arg, value } });
    };

    /**
     * ### Form 의 필드 값을 전체(일부) return
     * - return : any
     * - getValues( "필드명" )
     * - getValues( ["필드명","필드명"] )
     */
    const _getValues = (arg?: string | string[]) => {
        if (typeof arg === "string") {
            return comnUtils.getUnformattedValue(getValues(arg), fields[arg]);
        }
        if (Array.isArray(arg)) {
            return getValues(arg).reduce((prev: any, curr: any, index: any) => {
                prev[arg[index]] = comnUtils.getUnformattedValue(curr, fields[arg[index]]);
                return prev;
            }, {});
        }
        return Object.entries(getValues()).reduce((prev: any, curr: any) => {
            prev[curr[0]] = comnUtils.getUnformattedValue(curr[1], fields[curr[0]]);
            return prev;
        }, {});
    };
    /**
     * ### Form 의 특정 필드 값을 return
     * - name : 필드명
     * - alt? : 해당 필드의 값이 empty 일때 대체해서 return 할 값
     */
    const _getValue = (name: string, alt?: any) => {
        const value = comnUtils.getUnformattedValue(getValues(name), fields[name]);
        if (alt && comnUtils.isEmpty(value)) return alt;
        return value;
    };
    const _setValue = (name: string, value: any) => {
        setValue(name, comnUtils.getFormattedValue(value, fields[name]), { shouldValidate: isSubmitted });
    };
    const _setValues = (values: TFormValues, _?: boolean) => {
        Object.keys(values).forEach((name) => {
            let value = values[name];
            _setValue(name, value);
        });
    };
    const _clearValues = () => {
        Object.keys(getValues()).forEach((name) => {
            setValue(name, undefined, { shouldValidate: isSubmitted });
        });
    };

    const validate = (name?: TFormFieldValue) => {
        if (name in fields) trigger(name, { shouldFocus: true });
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

    const setErrors = (errors: any) => {
        if (errors === undefined || errors === null) return;
        Object.keys(fields).forEach((name) => {
            if (errors[name] === undefined || errors[name] === null) return;
            setError(name, { message: errors[name], type: "error" });
        });
    };

    const _setFocus = (name: string) => {
        setFocus(name);
    };

    const SCHEMA = Object.entries(fields).reduce((prev: any, curr: any) => {
        const next = { ...prev };
        const type = curr[1].type;
        if (type === "timerange" || type === "daterange") {
            next.start = { ...next.start, invalid: errors[next.start.name] };
            next.end = { ...next.end, invalid: errors[next.end.name] };
        }
        return { ...next, [curr[0]]: { ...curr[1], invalid: errors[curr[0]] } };
    }, {});

    console.log(SCHEMA);

    return {
        schema: SCHEMA,
        handleSubmit: _handleSubmit,
        getValue: _getValue,
        getValues: _getValues,
        setFocus: _setFocus,
        setValue: _setValue,
        setValues: _setValues,
        clearValues: _clearValues,
        setSchema,
        setSchemas,
        resetSchema,
        setEditable,

        validate,
        clearErrors,
        watch,
        errors,
        isSubmitted,
        isError: !comnUtils.isEmpty(errors),
        setError,
        setErrors,
        reset,
    };
};
