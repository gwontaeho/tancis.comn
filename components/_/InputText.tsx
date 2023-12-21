import React from 'react'
import { FormattedInput, FormattedInputProps } from '@/comn/components/_'

export const InputText = React.forwardRef<HTMLInputElement, FormattedInputProps>(
    (props: FormattedInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        return <FormattedInput {...props} ref={ref} type="text" autoComplete="off" className="input" />
    }
)
