import { v4 as uuid } from 'uuid'
import { useSetRecoilState } from 'recoil'
import { ModalProps } from '@/comn/components/_'
import { modalState } from '@/comn/recoil'

type OpenModalArgs = Omit<ModalProps, 'id'>

export const useModal = () => {
    const setModal = useSetRecoilState(modalState)

    /**
     * open modal
     */
    const openModal = (props: OpenModalArgs) => {
        setModal((prev) => [...prev, { ...props, id: uuid() }])
    }

    /**
     * close all modal
     */
    const closeModal = () => {
        setModal([])
    }

    return { openModal, closeModal }
}
