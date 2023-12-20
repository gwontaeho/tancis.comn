import { Sample } from '@/comn/components/_'
import { Icon, IconsType } from '@/comn/components'
import { icons } from '@/comn/assets/icons'

export const SampleIcon = () => {
    const handleClick = (icon: any) => {
        navigator.clipboard.writeText(`<Icon icon="${icon}" />`)
    }

    return (
        <Sample title="Icon">
            <div className="grid grid-cols-8 gap-2">
                {(Object.keys(icons) as IconsType[]).map((icon) => {
                    return (
                        <div
                            key={`smpl-icon-${icon}`}
                            className="border rounded p-1 flex flex-col items-center justify-center space-y-2"
                            onClick={() => handleClick(icon)}
                        >
                            <div className="font-mono">{icon}</div>
                            <Icon icon={icon} />
                        </div>
                    )
                })}
            </div>
        </Sample>
    )
}
