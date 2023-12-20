import { Sample } from '@/comn/components/_'
import { useTab } from '@/comn/hooks/useTab'
import { Tab } from '@/comn/components'

export const SampleUseTab = () => {
    const { tab, value, setActive, setDisabled, setVisible, setLabel } = useTab({
        defaultSchema: {
            id: 'tabid',
            schema: [
                { label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
                { label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
                { label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
                { label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry' },
            ],
        },
    })

    return (
        <Sample title="useTab">
            <Tab {...tab}></Tab>
            <button onClick={() => setActive(2)}>asd</button>
            <button onClick={() => setDisabled(2, true)}>asd</button>
            <button onClick={() => setVisible(2, false)}>asd</button>
            <button onClick={() => setLabel(2, 'afsffwfq')}>asd</button>
        </Sample>
    )
}
