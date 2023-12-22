import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { Control } from 'react-hook-form'
import { Icon } from '@/comn/components'
import { ControllerWrapper } from '@/comn/components/_'

export type InputDateProps = {
    name?: string
    value?: Date | null
    control?: Control
    onChange?: (...args: any) => void
}

const InputDateMain = (props: InputDateProps) => {
    const { value, onChange, ...rest } = props
    const [_value, _setValue] = React.useState<Date | null | undefined>(value)

    React.useEffect(() => {
        if (value?.getTime() === _value?.getTime()) return
        _setValue(value)
    }, [value])

    React.useEffect(() => {
        if (!onChange) return
        if (value?.getTime() === _value?.getTime()) return
        onChange(_value)
    }, [_value])

    const _onChange = (date: Date) => {
        _setValue(date)
    }

    return (
        <div className="relative w-full [&>div]:w-full">
            <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
            <ReactDatePicker
                {...rest}
                selected={_value}
                onChange={_onChange}
                autoComplete="off"
                className="input pl-5"
                portalId="root"
                popperProps={{ strategy: 'fixed' }}
            />
        </div>
    )
}

export const InputDate = (props: InputDateProps) => {
    console.log(props)
    if (props.control && props.name)
        return (
            <ControllerWrapper {...props}>
                <InputDateMain />
            </ControllerWrapper>
        )

    return <InputDateMain {...props} />
}
