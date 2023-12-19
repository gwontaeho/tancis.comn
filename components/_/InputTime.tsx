import { useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import { ControllerWrapper } from './ControllerWrapper'
import { Control } from 'react-hook-form'
import { Icon } from '@/comn/components'

export type InputTimeProps = {
    name?: string
    value?: Date | null
    onChange?: (...args: any) => void
    control?: Control
}

export const InputTimeMain = (props: InputTimeProps) => {
    const { value, onChange, ...rest } = props
    const dateFormat = 'HH:mm'

    const [_value, _setValue] = useState<Date | null | undefined>(value)

    useEffect(() => {
        if (value?.getTime() === _value?.getTime()) return
        _setValue(value)
    }, [value])

    useEffect(() => {
        if (!onChange) return
        if (value?.getTime() === _value?.getTime()) return
        onChange(_value)
    }, [_value])

    const _onChange = (date: Date) => {
        _setValue(date)
    }

    return (
        <div className="relative w-full [&>div]:w-full">
            <Icon icon="clock" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
            <ReactDatePicker
                {...rest}
                selected={_value}
                onChange={_onChange}
                dateFormat={dateFormat}
                showTimeSelect
                showTimeSelectOnly
                autoComplete="off"
                timeIntervals={5}
                className="input pl-5"
                popperProps={{ strategy: 'fixed' }}
            />
        </div>
    )
}

export const InputTime = (props: InputTimeProps) => {
    if (props.control && props.name)
        return (
            <ControllerWrapper {...props} control={props.control} name={props.name}>
                <InputTimeMain />
            </ControllerWrapper>
        )

    return <InputTimeMain {...props} />
}
