import React from 'react'
import { IconButton } from '@/comn/components/IconButton'

type InputPasswordProps = React.InputHTMLAttributes<HTMLInputElement>

export const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
    (props: InputPasswordProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const [show, setShow] = React.useState(false)
        return (
            <div className="w-full relative flex items-center">
                <input {...props} ref={ref} type={show ? 'text' : 'password'} autoComplete="off" className="input" />
                <IconButton
                    onClick={() => setShow((prev) => !prev)}
                    icon={show ? 'eyeSlash' : 'eye'}
                    size="sm"
                    className="absolute right-1"
                />
            </div>
        )
    }
)
