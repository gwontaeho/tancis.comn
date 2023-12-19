import { Tree } from '@/comn/components'

export const makeDoc = (name: string, fn: string, param?: any) => {
    return (
        <div className="space-y-4 bg-card p-4">
            <div className="text-[1.4rem]">{name}</div>
            <code className="block text-[1.2rem]">{fn}</code>
            {param && (
                <div>
                    <div className="text-[1rem]">Parameters</div>
                    <Tree data={param} />
                </div>
            )}
        </div>
    )
}
