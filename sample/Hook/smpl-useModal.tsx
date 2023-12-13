import { useModal } from "@/comn/hooks";
import { Button } from "@/comn/components";

// export type ModalProps = {
//     id?: string;
//     content?: React.ReactNode;
//     backdrop?: boolean;
//     size?: keyof typeof MODAL_SIZES;
//     onConfirm?: () => void;
//     onCancel?: () => void;
// };

export const SampleUseModal = () => {
    const modal = useModal();

    const withMessage = () => {
        modal.openModal({ content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" });
    };

    const withOnConfirm = () => {
        modal.openModal({ onConfirm: () => alert("confirm") });
    };

    const withOnCancel = () => {
        modal.openModal({ onCancel: () => alert("cancel") });
    };

    const withoutBackdrop = () => {
        modal.openModal({ backdrop: false });
    };

    const withSize = () => {
        modal.openModal({ onCancel: () => alert("cancel") });
    };

    const withComponent = () => {
        modal.openModal({ content: <div>안녕</div> });
    };

    return (
        <div>
            <Button onClick={withMessage}>기본</Button>
            <Button onClick={withOnConfirm}>onConfirm handler 추가</Button>
            <Button onClick={withOnCancel}>onCancel handler 추가</Button>
            <Button onClick={withoutBackdrop}>backdrop 제거</Button>
            <Button onClick={withComponent}>컴포넌트 모달</Button>
        </div>
    );
};
