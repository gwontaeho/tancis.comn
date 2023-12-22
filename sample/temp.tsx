import { useEffect, useRef } from 'react'

export const Temp = () => {
    const ref = useRef<HTMLDivElement>(null)

    return (
        <div ref={ref} className="space-y-8">
            <div className="flex"></div>
        </div>
    )
}
