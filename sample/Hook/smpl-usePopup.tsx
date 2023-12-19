import { usePopup } from '@/comn/hooks'
import { Button } from '@/comn/components'
import { makeDoc } from '@/comn/sample/makeDoc'

export const SampleUsePopupTarget = () => {
    const popup = usePopup()

    const postMessageToParent = () => {
        popup.postMessage('message')
        popup.close()
    }

    return (
        <div>
            {(() => {
                try {
                    return JSON.stringify(popup.getParams())
                } catch (error) {
                    return null
                }
            })()}
            <Button onClick={postMessageToParent}>부모 callback 실행</Button>
        </div>
    )
}

export const SampleUsePopup = () => {
    const popup = usePopup()

    const FOR_SAMPLE = { url: '/comn/smpl/hooks/usePopupTarget' }

    const open = () => {
        popup.openPopup({ ...FOR_SAMPLE })
    }

    const withParams = () => {
        popup.openPopup({ ...FOR_SAMPLE, params: { test1: 1, test2: 2 } })
    }

    const withCallback = () => {
        popup.openPopup({ ...FOR_SAMPLE, id: 'sample', callback: (data) => alert(data) })
    }

    const closeAll = () => {
        popup.closePopup()
    }

    const withId = () => {
        popup.openPopup({ ...FOR_SAMPLE, id: 'test' })
    }

    const closeId = () => {
        popup.closePopup('test')
    }

    return (
        <div>
            <Button onClick={open}>팝업창 열기</Button>
            <Button onClick={withParams}>params 추가</Button>
            <Button onClick={withCallback}>callback 추가</Button>
            <Button onClick={closeAll}>팝업 전체 닫기</Button>
            <Button onClick={withId}>팝업 열기 id="test"</Button>
            <Button onClick={closeId}>팝업 닫기 id="test"</Button>

            <div className="space-y-16">
                <div className="text-[1.8rem]">usePopup</div>

                {makeDoc('openPopup', 'openPopup(popupProps: PopupProps): void', openPopupParams)}
                {makeDoc('closePopup', 'closePopup(id? string): void', closePopupParams)}
                {makeDoc('getParams', 'getParams(): void')}
                {makeDoc('postMessage', 'postMessage(data: any): void', postMessageParams)}
                {makeDoc('close', 'close(): void')}
            </div>
        </div>
    )
}

const openPopupParams = [
    {
        name: 'popupProps: object',
        open: true,
        children: [
            { name: 'id?: string' },
            { name: 'url?: string' },
            { name: 'params?: any' },
            { name: 'layout?: main | popup' },
            { name: 'callback?: (data: any) => void' },
        ],
    },
]
const closePopupParams = [{ name: 'id?: string' }]
const postMessageParams = [{ name: 'data: any' }]

// return { openPopup, closePopup, getParams, postMessage, close }
