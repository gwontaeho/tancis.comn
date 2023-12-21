import React from 'react'
import { useController, Control } from 'react-hook-form'

export type ControllerWrapperProps = {
    children: React.ReactElement
    control?: Control
    name?: string
    rules?: any
}

export const ControllerWrapper = (props: ControllerWrapperProps) => {
    const { children, control, name, rules, ...rest } = props

    const {
        field: { onChange, onBlur, value },
    } = useController({ name: name as string, control: control as Control, rules })

    return React.cloneElement(children, { ...rest, onChange, onBlur, value })
}
