import React from 'react'
import { Tree } from '@/comn/components'

type SampleProps = {
    children?: React.ReactNode
    title?: String
}

type SampleSectionProps = {
    children?: React.ReactNode
    title?: String
}
type SampleDocProps = {
    name: string
    code: string
    param?: any
    result?: any
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

const Doc = (props: SampleDocProps) => {
    const { name, code, param, result } = props
    return (
        <div className="space-y-4 bg-card p-4">
            <div className="text-[1.4rem]">{name}</div>
            <code className="block text-[1.2rem]">{code}</code>
            {param && (
                <div>
                    <div className="text-[1rem]">Parameters</div>
                    <Tree data={param} />
                </div>
            )}
            {result && (
                <div>
                    <div className="text-[1rem]">Return</div>
                    <Tree data={result} />
                </div>
            )}
        </div>
    )
}

Sample.Section = Section
Sample.Doc = Doc
