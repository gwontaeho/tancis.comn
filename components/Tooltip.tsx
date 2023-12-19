import React from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'

const SIZES = {
    1: 'w-1/12',
    2: 'w-2/12',
    3: 'w-3/12',
    4: 'w-4/12',
    5: 'w-5/12',
    6: 'w-6/12',
    7: 'w-7/12',
    8: 'w-8/12',
    9: 'w-9/12',
    10: 'w-10/12',
    11: 'w-11/12',
    12: 'w-full',
    fit: 'w-fit',
    full: 'w-full',
}

type TooltipProps = {
    children?: React.ReactNode
    content?: React.ReactNode
    enabled?: boolean
    mode?: 'default' | 'always'
    size?: keyof typeof SIZES
}

export const Tooltip = (props: TooltipProps) => {
    const { children, content, mode = 'default', enabled = true, size = 'fit' } = props

    return (
        <motion.div className={classNames('relative w-fit', SIZES[size])} whileHover="hover">
            {children}
            {enabled && content && (
                <motion.div
                    className="z-[9999] absolute flex bottom-full left-1/2 -translate-x-1/2 -translate-y-2 px-2 py-1 bg-invalid rounded shadow justify-center"
                    initial={{ opacity: mode === 'always' ? 1 : 0, pointerEvents: 'none' }}
                    variants={{ hover: { opacity: 1, pointerEvents: 'all' } }}
                >
                    <div className="absolute w-2 h-2 top-full -translate-y-1 rotate-45 bg-invalid" />
                    <div className="min-w-max text-white">{content}</div>
                    <div className="absolute w-full top-full h-2 left-1/2 -translate-x-1/2" />
                </motion.div>
            )}
        </motion.div>
    )
}
