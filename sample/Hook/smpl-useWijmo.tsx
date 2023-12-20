import { utils } from '@/comn/utils'
import { useWijmo, WijmoSchemaType } from '@/comn/hooks'
import { Page, Group, Wijmo } from '@/comn/components'

const defaultSchema: WijmoSchemaType = {
    id: 'grid',
    options: { checkbox: true, pagination: 'in', add: true, remove: true },
    head: [
        { cells: [{ header: 'aaa', binding: 'id', colspan: 3 }, { header: 'a' }, { header: 'b' }, { header: 'c' }] },
        { cells: [{ header: 'd', binding: 'a' }] },
        { cells: [{ header: 'e', binding: 'b' }] },
    ],
    body: [
        {
            colspan: 3,
            cells: [
                {
                    binding: 'id',
                    colspan: 3,
                    onClick: (ctx: any) => {
                        console.log(ctx)
                    },
                },
            ],
        },
        {
            cells: [{ binding: 'a' }],
        },
        {
            cells: [{ binding: 'd', type: 'date' }],
        },
    ],
}

const data = utils.getMockData({ totCnt: 34 })

export const SampleUseWijmo = () => {
    const { grid } = useWijmo({ defaultSchema })

    return (
        <Page>
            <Group>
                <Wijmo {...grid} />
            </Group>
        </Page>
    )
}
