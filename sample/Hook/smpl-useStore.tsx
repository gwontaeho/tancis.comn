import { useStore } from '@/comn/hooks'
import { Sample } from '@/comn/components/_'

export const SampleUseStore = () => {
    const a = useStore()

    console.log(a)

    // store: _store, pgeStore: props?.pgeUid && _store[props.pgeUid], getStore, setStore

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
            <Sample.Section title="getStore(pgeUid?: string): StoreValue">
                <Sample.Table
                    data={[
                        ['Arguments', 'Type', 'Default', 'Description'],
                        ['pgeUid?', 'string', '', ''],
                    ]}
                />
                <Sample.Code>{`const store = getStore()`}</Sample.Code>
                <Sample.Code>{`const store = getStore("sample")`}</Sample.Code>
            </Sample.Section>
            <Sample.Section title="setStore(pageUid: string, value: any): void">
                <Sample.Table
                    data={[
                        ['Arguments', 'Type', 'Default', 'Description'],
                        ['pageUid', 'string', '', ''],
                        ['value', 'any', '', ''],
                    ]}
                />
                <Sample.Code>{`useStore()`}</Sample.Code>
            </Sample.Section>
        </Sample>
    )
}
