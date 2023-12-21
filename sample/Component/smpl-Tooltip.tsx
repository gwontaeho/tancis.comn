import { useState } from 'react'
import { Table, Tooltip } from '@/comn/components'
import { Sample } from '@/comn/components/_'

export const SampleTooltip = () => {
    const [enabled, setEnabled] = useState(true)

    return (
        <Sample
            title="Tooltip"
            description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
        >
            <Sample.Section title="<Tooltip />">
                <Sample.Table
                    data={[
                        ['Properties', 'Type', 'Default', 'Description'],
                        ['content?', 'ReactNode', '', ''],
                        ['enabled?', 'boolean', 'true', ''],
                        ['mode?', 'default | always', 'default', ''],
                        ['size?', 'sizes', '', ''],
                    ]}
                />
                <Sample.Code>{`<Tooltip content="sample">
    <div>hover here</div>
</Tooltip>`}</Sample.Code>
                <Tooltip content="sample">
                    <div>hover here</div>
                </Tooltip>
                <Sample.Code>{`<Tooltip content="sample" mode="always">
    <div>mode always</div>
</Tooltip>`}</Sample.Code>
                <Tooltip content="sample" mode="always">
                    <div>mode always</div>
                </Tooltip>
            </Sample.Section>
        </Sample>
    )
}
// type TooltipProps = {
//     children?: React.ReactNode
//     content?: React.ReactNode
//     enabled?: boolean
//     mode?: 'default' | 'always'
//     size?: keyof typeof SIZES
// }
