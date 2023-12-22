import { useState } from 'react'
import * as rhf from 'react-hook-form'
import { GroupControlProps } from '@/comn/components'

export type FormRulesType = Partial<{
    required: Boolean | string
    min: any
    max: any
    maxLength: any
    minLength: any
    pattern: any
    validate: any
}>

export type FormFieldNameType = string
export type FormFieldValueType = any
export type FormValuesType = Record<FormFieldNameType, FormFieldValueType>
export type FormSchemaType = { id: string; schema: FormControlSchemaType }
type FormControlSchemaType = Record<string, GroupControlProps>
type UseFormProps = { defaultSchema: FormSchemaType; values?: object }

export const useForm = (props: UseFormProps) => {
    const { defaultSchema, values } = props

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
    } = rhf.useForm<FormValuesType>({ values })

    const { id, schema } = defaultSchema
    const [_schema, _setSchema] = useState<FormControlSchemaType>(schema)

    const setSchema = (name: string, value: any) => {
        _setSchema((prev) => ({ ...prev, [name]: { ...prev[name], ...value } }))
    }

    const setSchemas = (names: string[], schemas: any) => {
        names.forEach((name) => {
            setSchema(name, schemas)
        })
    }

    const resetSchema = () => {
        _setSchema(schema)
    }

    const setEditable = <T>(arg: T, value?: boolean) => {
        if (value === undefined)
            return _setSchema((prev) =>
                Object.fromEntries(
                    Object.entries(prev).map((_) => {
                        return [_[0], { ..._[1], edit: !!arg }]
                    })
                )
            )

        if (typeof arg === 'string') {
            _setSchema((prev) => ({ ...prev, [arg]: { ...prev[arg], edit: value } }))
        }
    }

    const validate = (name?: FormFieldValueType) => {
        if (name in _schema) trigger(name, { shouldFocus: true })
        else trigger(undefined, { shouldFocus: true })
    }

    const clearValues = () => {
        Object.keys(_schema).forEach((name) => {
            setValue(name, null)
        })
    }

    const setValues = (values: FormValuesType, part?: boolean) => {
        Object.keys(_schema).forEach((name) => {
            if (part === true && values[name] === undefined) return
            setValue(name, values[name])
        })
    }

    const getSchema = (s: FormControlSchemaType): any => {
        if (!s) return undefined
        return Object.fromEntries(
            Object.entries(s).map(([key, value]: any) => {
                const { min, max, minLength, pattern, validate, ...rest } = value

                const getRules = (data: any) => {
                    const { min, max, minLength, maxLength, pattern, validate, required } = data
                    return { min, max, minLength, maxLength, pattern, validate, required }
                }

                switch (value.type) {
                    case 'daterange':
                    case 'timerange':
                        return [
                            key,
                            {
                                ...rest,
                                invalid: errors[key],
                                name: key,
                                control,
                                getValues,
                                setValue,
                                start: {
                                    ...value.start,
                                    invalid: errors[value.start.name],
                                    rules: getRules(value.start),
                                },
                                end: { ...value.end, invalid: errors[value.end.name], rules: getRules(value.end) },
                            },
                        ]

                    case 'date':
                    case 'time':
                    case 'datetime':
                    case 'code':
                    case 'file':
                    case 'checkbox':
                        return [
                            key,
                            {
                                ...rest,
                                invalid: errors[key],
                                name: key,
                                control,
                                getValues,
                                setValue,
                                rules: getRules(value),
                            },
                        ]

                    default:
                        /**
                         * text
                         * number
                         * password
                         * select
                         * radio
                         * textarea
                         */

                        console.log([
                            key,
                            {
                                ...rest,
                                ...register(key, getRules(value)),
                                invalid: errors[key],
                                getValues,
                            },
                        ])
                        return [
                            key,
                            {
                                ...value,
                                ...register(key, getRules(value)),
                                invalid: errors[key],
                                getValues,
                            },
                        ]
                }
            })
        )
    }

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
        reset,
    }
}
