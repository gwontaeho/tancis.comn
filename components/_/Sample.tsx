import React from 'react'

type SampleProps = {
    children?: React.ReactNode
    title?: String
}

type SampleSectionProps = {
    children?: React.ReactNode
    title?: String
}

export const Sample = (props: SampleProps) => {
    const { children, title } = props

    return (
        <div className="space-y-8">
            {title && <div className="text-[1.8rem]">{title}</div>}
            {children}
        </div>
    )
}

const Section = (props: SampleSectionProps) => {
    const { children, title } = props

    return (
        <div className="space-y-2">
            {title && <div className="text-[1.4rem]">{title}</div>}
            {children}
        </div>
    )
}

Sample.Section = Section
