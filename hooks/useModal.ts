import { v4 as uuid } from "uuid";
import { useSetRecoilState } from "recoil";
import { ModalProps } from "@/com/components/_";
import { modalState } from "@/com/recoil";

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
