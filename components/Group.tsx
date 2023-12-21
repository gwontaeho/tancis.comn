import React, { forwardRef } from 'react'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'
import { FormControl, FormControlProps } from '@/comn/components'

const SIZES = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
}

type GroupHeaderProps = {
    title?: string
    description?: string
    titleSize?: 1 | 2 | 3
}

type GroupLabelProps = FormControlProps & {
    label?: React.ReactNode
    labelSize?: keyof typeof SIZES
    required?: boolean
}

export type GroupControlProps = GroupLabelProps & { controlSize?: keyof typeof SIZES; _GroupColChild?: any }

type GroupColProps = GroupLabelProps & { children?: React.ReactNode; colSize?: keyof typeof SIZES; combine?: boolean }

type GroupProps = React.HTMLAttributes<HTMLDivElement> & { bgColor?: boolean }

export const Group = (props: GroupProps) => {
    const { children, className, bgColor = true } = props
    return (
        <div className={classNames('rounded  p-4 space-y-4 w-full', bgColor && 'shadow bg-card', className)}>
            {children}
        </div>
    )
}

const GroupHeader = (props: GroupHeaderProps) => {
    const { title, description, titleSize = 1 } = props
    const { t } = useTranslation()
    const sizes = { 3: 'text-lg', 2: 'text-xl', 1: 'text-2xl' }

    return (
        <div className="w-full">
            {title && <div className={sizes[titleSize] + ' font-semibold'}>{t(title)}</div>}
            {description && <p>{t(description)}</p>}
        </div>
    )
}

const GroupBody = (props: { children?: React.ReactNode }) => {
    const { children } = props
    return <div className="w-full">{children}</div>
}

const GroupRow = (props: { children?: React.ReactNode }) => {
    const { children } = props
    return (
        <div className="w-full grid grid-cols-1 min-h-[2.5rem] border-x border-b first:border-t sm:grid-cols-12">
            {children}
        </div>
    )
}

const GroupLabel = forwardRef((props: GroupLabelProps, ref) => {
    const { t } = useTranslation()
    const { label, labelSize = 2, ...rest } = props
    return (
        <div
            className={classNames(
                'font-semibold relative flex items-center p-1 break-all bg-header sm:border-x first:border-l-0 last:border-r-0 first:last:border-r',
                SIZES[labelSize]
            )}
        >
            {props.type ? <FormControl ref={ref} {...rest} /> : typeof label === 'string' ? t(label) : label}
            {props.required && (
                <span
                    className={classNames('text-invalid ml-0.5', {
                        'absolute top-0 right-0.5': props.type,
                    })}
                >
                    *
                </span>
            )}
        </div>
    )
})

const GroupControl = forwardRef((props: GroupControlProps, ref) => {
    const { labelSize, label, controlSize = 4, _GroupColChild, ...rest } = props

    return (
        <>
            {!_GroupColChild && label !== undefined && (
                <GroupLabel required={props.required} label={label} labelSize={labelSize} />
            )}
            {_GroupColChild ? (
                <FormControl ref={ref} {...rest} />
            ) : (
                <div className={classNames('p-1 flex items-center', SIZES[controlSize])}>
                    <FormControl ref={ref} {...rest} />
                </div>
            )}
        </>
    )
})

const GroupCol = (props: GroupColProps) => {
    const { children, required, label, labelSize, combine = false, colSize = 4 } = props
    return (
        <>
            {label && <GroupLabel required={required} label={label} labelSize={labelSize} />}

            {combine ? (
                <div className={classNames('p-1 flex items-center', SIZES[colSize])}>
                    <div className="flex border rounded divide-x overflow-hidden">
                        {React.Children.map(children, (child: any) => {
                            return (
                                <div className="[&_*]:border-none [&_*]:rounded-none">
                                    {React.cloneElement(child, { _GroupColChild: true })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <div className={classNames('p-1 flex items-center space-x-1', SIZES[colSize])}>
                    {React.Children.map(children, (child: any) => {
                        return React.cloneElement(child, { _GroupColChild: true })
                    })}
                </div>
            )}
        </>
    )
}

Group.Header = GroupHeader
Group.Body = GroupBody
Group.Row = GroupRow
Group.Col = GroupCol
Group.Label = GroupLabel
Group.Control = GroupControl
