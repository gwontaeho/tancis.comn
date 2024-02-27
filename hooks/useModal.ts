import { v4 as uuid } from "uuid";
import { useSetRecoilState } from "recoil";

import { modalState } from "@/comn/features/recoil";
import { ModalProps } from "@/comn/components/_";

export const useModal = () => {
    const setModal = useSetRecoilState(modalState);

    /**
     * Open Modal
     * @param props
     */
    const openModal = (props: ModalProps) => {
        setModal((prev) => [...prev, { ...props, id: props.id || uuid() }]);
    };

    /**
     * Close All Modal
     */
    const closeModal = (id?: string) => {
        if (id === undefined) {
            setModal([]);
            return;
        }

        setModal((prev) =>
            prev.filter((_) => {
                return _.id !== id;
            }),
        );
    };

    /**
     * Post Message to Parent or Opener
     * @param data
     */
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
