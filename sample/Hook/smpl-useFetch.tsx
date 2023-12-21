import { useFetch } from '@/comn/hooks'
import { Sample } from '@/comn/components/_'

// type UseFetchProps = {
//     api: ApiType | ApiType[]
//     key?: any[]
//     enabled?: boolean
//     notifyStatus?: boolean
//     onSuccess?: (data?: any) => void
//     onError?: (error?: any) => void
// }

// type UseFetchReturn = {
//     data: any
//     fetch: (...args: any) => void
//     isLoading: boolean
//     isSuccess: boolean
//     isError: boolean
// }

export const SampleUseFetch = () => {
    const a = (asd: any) => {}

    return (
        <Sample title="useFetch">
            <Sample.Section>
                {/* <Sample.Doc
                    name="useFetch"
                    code="useFetch(props: UseFetchProps): UseFetchReturn"
                    param={useFetchParams}
                    result={useFetchReturn}
                /> */}
            </Sample.Section>
        </Sample>
    )
}
const useFetchParams = [
    {
        name: 'props: object',
        open: true,
        children: [
            { name: 'api?: ApiType | ApiType[]' },
            { name: 'key?: any[]' },
            { name: 'enabled?: boolean' },
            { name: 'notifyStatus?: boolean' },
            { name: 'onSuccess?: (data: any) => void' },
            { name: 'onError?: (data: any) => void' },
        ],
    },
]

const useFetchReturn = [
    {
        name: 'return: object',
        open: true,
        children: [
            { name: 'data: any' },
            { name: 'fetch: (...args: any) => void' },
            { name: 'isLoading: boolean' },
            { name: 'isSuccess: boolean' },
            { name: 'isError: boolean' },
        ],
    },
]
