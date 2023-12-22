import { useStore } from '@/comn/hooks'
import { Sample } from '@/comn/components/_'

export const SampleUseStore = () => {
    const s = useStore({ pgeUid: 'sample' })

    console.log(s)

    return (
        <Sample title="useStore">
            <Sample.Section title="useStore(props: UserStoreProps): UseStoreReturn">
                <Sample.Table
                    data={[
                        ['Arguments', 'Type', 'Default', 'Description'],
                        ['store', 'any', '', ''],
                        ['pgeStore', 'any', '', ''],
                        ['getStore', '() => void', '', ''],
                        ['setStore', '() => void', '', ''],
                    ]}
                />
                <Sample.Code>{`useStore()`}</Sample.Code>
            </Sample.Section>
            <Sample.Section title="getStore(pgeUid?: StoreKey): StoreValue | Record<StoreKey, StoreValue>">
                <Sample.Table
                    data={[
                        ['Arguments', 'Type', 'Default', 'Description'],
                        ['pgeUid?', 'string', '', ''],
                    ]}
                />
                <Sample.Code exec={() => console.log(s.getStore())}>{`const store = getStore()`}</Sample.Code>
                <Sample.Code
                    exec={() => console.log(s.getStore('sample'))}
                >{`const store = getStore("sample")`}</Sample.Code>
            </Sample.Section>
            <Sample.Section title="setStore(pageUid: StoreKey, value: StoreValue): void">
                <Sample.Table
                    data={[
                        ['Arguments', 'Type', 'Default', 'Description'],
                        ['pageUid', 'string', '', ''],
                        ['value', 'any', '', ''],
                    ]}
                />
                <Sample.Code exec={() => console.log(s.setStore('sample', new Date()))}>{`setStore()`}</Sample.Code>
                <Sample.Code
                    exec={() =>
                        console.log(
                            s.setStore('sample', (prev: any) => ({ ...prev, [new Date().getTime()]: new Date() }))
                        )
                    }
                >{`setStore()`}</Sample.Code>
            </Sample.Section>
        </Sample>
    )
}
