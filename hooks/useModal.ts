import { v4 as uuid } from "uuid";
import { useSetRecoilState } from "recoil";
import { ModalProps } from "@/comn/components/_";
import { modalState } from "@/comn/recoil";

export const useModal = () => {
    const setModal = useSetRecoilState(modalState);

    const openModal = (props: ModalProps) => {
        setModal((prev) => [...prev, { ...props, id: uuid() }]);
    };

    const closeModal = () => {
        setModal([]);
    };

    return { openModal, closeModal };
};
