import React, { useEffect } from 'react'
import classNames from 'classnames'
import { v4 as uuid } from 'uuid'

type TabProps = {
    children?: React.ReactNode
    schema: any[]
    value?: number
    onChange?: (index: number) => void
}

type TabPanelProps = {
    children?: React.ReactNode
    isActive?: Boolean
}

export const Tab = (props: TabProps) => {
    const { children, schema, value, onChange } = props

    const [_value, _setValue] = React.useState<number>(() => {
        if (value !== undefined) return value
        if (schema.some((_) => _.active)) return schema.findIndex((_) => _.active)
        return 0
    })

    useEffect(() => {
        if (value === undefined) return
        if (value === _value) return
        _setValue(value)
    }, [value])

    const handleClickTab = (i: number) => {
        _setValue(i)
        if (onChange) onChange(i)
    }

    return (
        <div className="space-y-4">
            <div className="border-b flex">
                {schema.map(({ label, disabled, visible }, i) => {
                    if (visible === false) return null
                    return (
                        <button
                            key={uuid()}
                            className={classNames('truncate max-w-xs h-10 px-2 text-lg font-semibold', {
                                'text-blue': _value === i,
                                'text-disabled/40': disabled,
                            })}
                            onClick={() => !disabled && handleClickTab(i)}
                        >
                            {label}
                        </button>
                    )
                })}
            </div>
            <div>
                {React.Children.map(children, (child: any, i) => {
                    return React.cloneElement(child, { isActive: _value === i })
                })}
            </div>
        </div>
    )
}

const TabPanel = (props: TabPanelProps) => {
    const { children, isActive } = props
    return <div hidden={!isActive}>{children}</div>
}

Tab.Panel = TabPanel
