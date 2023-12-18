import React from 'react'

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
    (props: TextAreaProps, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
        return <textarea {...props} ref={ref} className="input overflow-hidden" />
    }
)
