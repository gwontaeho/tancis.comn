import { usePopup } from '@/comn/hooks'
import { Button } from '@/comn/components'

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
        </div>
    )
}
