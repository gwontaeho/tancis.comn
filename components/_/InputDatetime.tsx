import { useState, useEffect } from 'react'
import ReactDatePicker from 'react-datepicker'
import { Icon } from '@/comn/components'

type InputDateTimeProps = {
    value?: Date | null
    onChange?: (date?: Date | null) => void
}

export const InputDatetime = (props: InputDateTimeProps) => {
    const { value, onChange, ...rest } = props
    const dateFormat = 'MM/dd/yyyy HH:mm'

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
            <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
            <ReactDatePicker
                {...rest}
                selected={_value}
                onChange={_onChange}
                dateFormat={dateFormat}
                autoComplete="off"
                showTimeSelect
                timeIntervals={5}
                className="input pl-5"
                popperProps={{ strategy: 'fixed' }}
            />
        </div>
    )
}
