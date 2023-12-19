import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import { v4 as uuid } from 'uuid'
import { Collapse, Icon } from '@/comn/components'

type TreeItemProps = {
    children?: React.ReactNode
    name: string
    parent: string[]
    _key: string
    open?: boolean
    checkbox?: boolean
}

type TreeProps = {
    data?: any
}

const TreeItem = (props: TreeItemProps) => {
    const { children, name, parent, _key, checkbox = false, open = false } = props

    const childrenRef = useRef<HTMLUListElement>(null)
    const [_open, _setOpen] = useState<boolean>(open)

    const handleClick = () => {
        _setOpen((prev) => !prev)
    }

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            parent.forEach((_) => {
                ;(document.getElementsByName(_)[0] as HTMLInputElement).indeterminate = true
            })
        }

        if (children) {
            if (childrenRef.current === null) return
            Array.from(childrenRef.current.getElementsByTagName('input')).forEach((_) => {
                _.checked = e.target.checked
                _.indeterminate = false
            })
        }
    }

    return (
        <li className="font-mono">
            <button
                className={classNames('h-7 flex items-center space-x-1.5', { 'ml-[1.125rem]': !children })}
                onClick={handleClick}
            >
                {children && <Icon icon="right" size="xs" className={classNames('transition')} />}
                {checkbox && (
                    <input
                        name={_key}
                        type="checkbox"
                        className="w-3"
                        onClick={(e) => e.stopPropagation()}
                        onChange={handleCheck}
                    />
                )}
                <p>{name}</p>
            </button>
            {Array.isArray(children) && (
                <Collapse open={_open}>
                    <ul ref={childrenRef} className="pl-[1.125rem]">
                        {children.map((child) => {
                            return <TreeItem _key={child.key} {...child} />
                        })}
                    </ul>
                </Collapse>
            )}
        </li>
    )
}

export const Tree = (props: TreeProps) => {
    const { data } = props

    const dataWithKey = (data: any, parent: any = []) => {
        return data.map((_: any) => {
            let withKey = { ..._ }
            const key = uuid()
            withKey.key = key
            withKey.parent = parent
            if (_.children) withKey.children = dataWithKey(_.children, [...parent, key])
            return withKey
        })
    }

    return (
        <ul className="w-fit">
            {dataWithKey(data)?.map((child: any) => {
                return <TreeItem _key={child.key} {...child} />
            })}
        </ul>
    )
}
