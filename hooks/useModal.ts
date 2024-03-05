import { v4 as uuid } from "uuid";
import { useSetRecoilState } from "recoil";
import { modalState } from "../features/recoil";
import { ModalProps } from "../components/_";

export const useModal = () => {
    const setModal = useSetRecoilState(modalState);

    const openModal = (props: ModalProps) => {
        setModal((prev) => [...prev, { ...props, id: props.id || uuid() }]);
    };

    const closeModal = (id?: string) => {
        setModal((prev) => (id === undefined ? [] : prev.filter((_) => _.id !== id)));
    };

    const postMessage = (data: any) => {
        if (window.opener) {
            window.opener.postMessage(data);
        }
        if (window.parent) {
            window.parent.postMessage(data);
        }
    };

    return { openModal, closeModal, postMessage };
};
