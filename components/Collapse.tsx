import React, { useRef, useEffect } from 'react'

type CollapseProps = {
    children?: React.ReactNode
    open?: boolean
}

export const Collapse = (props: CollapseProps) => {
    const { children, open } = props

    const outer = useRef<HTMLDivElement>(null)
    const inner = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (outer.current === null) return
        if (inner.current === null) return

        if (open) {
            outer.current.classList.add('transition-[height]')
            outer.current.style.height = `${inner.current.clientHeight}px`
        } else outer.current.style.height = '0'
    }, [open])

    useEffect(() => {
        if (outer.current === null) return
        if (inner.current === null) return

        const ro = new ResizeObserver((entries) => {
            requestAnimationFrame(() => {
                entries.forEach((value) => {
                    if (outer.current === null) return
                    if (inner.current === null) return

                    if (outer.current.ariaExpanded === 'false') return
                    outer.current.classList.remove('transition-[height]')
                    outer.current.style.height = `${value.contentRect.height}px`
                    setTimeout(() => {
                        if (!outer.current) return
                        outer.current.classList.add('transition-[height]')
                    }, 150)
                })
            })
        })
        ro.observe(inner.current)

        return () => {
            ro.disconnect()
        }
    }, [])

    return (
        <div ref={outer} aria-expanded={open} className="overflow-hidden">
            <div ref={inner}>{children}</div>
        </div>
    )
}
