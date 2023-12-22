import React from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { v4 as uuid } from 'uuid'
import { InputDateProps } from '@/comn/components/_'
import { Control } from 'react-hook-form'
import { FormControl } from '@/comn/components'

const RANGE_BUTTON_OPTIONS: RangeButtonOptionType[][] = [
    [
        { label: '-3M', unit: 'M', value: -3 },
        { label: '-1M', unit: 'M', value: -1 },
        { label: '-1W', unit: 'w', value: -1 },
        { label: '0', unit: 'd', value: 1 },
        { label: '+1W', unit: 'w', value: 1 },
        { label: '+1M', unit: 'M', value: 1 },
        { label: '+3M', unit: 'M', value: 3 },
    ],
    [
        { label: '+1D', unit: 'd', value: 1 },
        { label: '+1W', unit: 'w', value: 1 },
        { label: '+1M', unit: 'M', value: 1 },
        { label: '+2M', unit: 'M', value: 2 },
        { label: '+3M', unit: 'M', value: 3 },
        { label: '+6M', unit: 'M', value: 6 },
        { label: '+12M', unit: 'M', value: 12 },
    ],
    [
        { label: '-1M', unit: 'M', value: -1 },
        { label: '-1W', unit: 'w', value: -1 },
        { label: 'Today', unit: 'd', value: 1 },
        { label: '+1W', unit: 'w', value: 1 },
    ],
]

type DateUnitType = 'M' | 'w' | 'd' | 'h'
type RangeButtonOptionType = { unit: DateUnitType; label: string; value: number }

export type InputDaterangeProps = {
    start?: InputDateProps
    end?: InputDateProps
    rangeButton?: 0 | 1 | 2
    control?: Control
    setValue?: any
}

export const InputDaterange = (props: InputDaterangeProps) => {
    const [_startValue, _setStartValue] = React.useState<any>()
    const [_endValue, _setEndValue] = React.useState<any>()

    React.useEffect(() => {
        if (!props.start?.onChange) return
        if (String(props.start.value) === String(_startValue)) return
        props.start.onChange(_startValue)
    }, [_startValue])

    React.useEffect(() => {
        if (!props.end?.onChange) return
        if (String(props.end.value) === String(_endValue)) return
        props.end.onChange(_endValue)
    }, [_endValue])

    const _handleClickButton = (unit: DateUnitType, value: number) => {
        const today = new Date()
        if (value > 0) {
            _setStartValue(today)
            _setEndValue(dayjs(today).add(value, unit).toDate())
            if (props.setValue) {
                if (props.start) props.setValue(props.start.name, today)
                if (props.end) props.setValue(props.end.name, dayjs(today).add(value, unit).toDate())
            }
        } else {
            _setStartValue(dayjs(today).add(value, unit).toDate())
            _setEndValue(today)
            if (props.setValue) {
                if (props.start) props.setValue(props.start.name, dayjs(today).add(value, unit).toDate())
                if (props.end) props.setValue(props.end.name, today)
            }
        }
    }

    const _onChangeStart = (v: any) => {
        _setStartValue(v)
    }

    const _onChangeEnd = (v: any) => {
        _setEndValue(v)
    }

    return (
        <div className="w-full flex">
            <div className="w-full [&_input]:rounded-r-none">
                <FormControl
                    type="date"
                    {...props.start}
                    control={props.control}
                    value={_startValue}
                    onChange={_onChangeStart}
                />
            </div>
            <div className="flex items-center justify-center min-w-[1.25rem] h-7 bg-header border-y">-</div>
            <div
                className={classNames('w-full [&_input]:rounded-l-none', {
                    '[&_input]:rounded-r-none': props.rangeButton !== undefined,
                })}
            >
                <FormControl
                    type="date"
                    {...props.end}
                    control={props.control}
                    value={_endValue}
                    onChange={_onChangeEnd}
                />
            </div>
            {props.rangeButton !== undefined && (
                <div className="flex divide-x bg-header text-sm border-y border-r rounded-r h-7">
                    {RANGE_BUTTON_OPTIONS[props.rangeButton].map((props: RangeButtonOptionType) => {
                        const { unit, label, value } = props
                        return (
                            <button
                                key={uuid()}
                                type="button"
                                className="px-2"
                                onClick={() => _handleClickButton(unit, value)}
                            >
                                {label}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
