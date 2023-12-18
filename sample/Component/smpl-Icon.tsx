import { Icon, IconsType } from '@/comn/components'
import { icons } from '@/comn/assets/icons'

export const SampleIcon = () => {
    const handleClick = (icon: any) => {
        navigator.clipboard.writeText(`<Icon icon="${icon}" />`)
    }

    return (
        <div className="grid grid-cols-12 gap-2">
            {(Object.keys(icons) as IconsType[]).map((icon) => {
                return (
                    <div
                        key={`smpl-icon-${icon}`}
                        className="border rounded p-2 flex flex-col items-center justify-center space-y-4"
                        onClick={() => handleClick(icon)}
                    >
                        <div className="font-mono">{icon}</div>
                        <Icon icon={icon} />
                        <button className="hover:bg-black/10 w-full font-mono py-2 rounded">copy</button>
                    </div>
                )
            })}
        </div>
    )
}
