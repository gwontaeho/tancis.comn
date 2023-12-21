import React from 'react'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>, ref: React.ForwardedRef<HTMLTextAreaElement>) => {
        return <textarea {...props} ref={ref} className="input overflow-hidden" />
    }
)
