import classNames from 'classnames'

type DividerProps = {
    orientation?: 'vertical' | 'horizontal'
}

export const Divider = (props: DividerProps) => {
    const { orientation = 'horizontal' } = props
    return <hr className={classNames(orientation === 'vertical' && 'border-l h-auto')} />
}
