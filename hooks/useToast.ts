import { v4 as uuid } from 'uuid'
import { useSetRecoilState } from 'recoil'
import { toastState } from '@/comn/recoil'

type toastProps = {
    content?: string
    type?: string
    onConfirm?: Function
    onCancel?: Function
}

export const useToast = () => {
    const setToast = useSetRecoilState(toastState)

    const showToast = (props: toastProps) => {
        const { content, type, onConfirm, onCancel } = props || {}

        setToast((prev) => [
            ...prev,
            {
                id: uuid(),
                isOpen: true,
                content,
                type,
                onConfirm,
                onCancel,
            },
        ])
    }

    const hideToast = () => {
        setToast([])
    }

    return { showToast, hideToast }
}
