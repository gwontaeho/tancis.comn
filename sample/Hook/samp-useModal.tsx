import { useModal } from "@/com/hooks";
import { Button } from "@/com/components";

export const SampleUseModal = () => {
    const modal = useModal();

    const withMessage = () => {
        modal.openModal({ content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry" });
    };

    const withComponent = () => {
        modal.openModal({ content: <div>안녕</div> });
    };

    return (
        <div>
            <Button onClick={withMessage}>메세지 모달 열기</Button>
            <Button onClick={withComponent}>컴포넌트 모달 열기</Button>
        </div>
    );
};
