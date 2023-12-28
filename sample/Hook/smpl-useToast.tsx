import { useToast } from "@/comn/hooks";
import { Button } from "@/comn/components";

export const SampleUseToast = () => {
    const toast = useToast();

    const withMessage = () => {
        toast.showToast({
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        });
    };
    const withSuccess = () => {
        toast.showToast({
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            type: "success",
        });
    };
    const withError = () => {
        toast.showToast({
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            type: "error",
        });
    };
    const withInfo = () => {
        toast.showToast({
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            type: "info",
        });
    };
    const withWarning = () => {
        toast.showToast({
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
            type: "warning",
        });
    };

    return (
        <div>
            <Button onClick={withMessage}>기본</Button>
            <Button onClick={withSuccess}>성공</Button>
            <Button onClick={withError}>에러</Button>
            <Button onClick={withInfo}>정보</Button>
            <Button onClick={withWarning}>경고</Button>
        </div>
    );
};
