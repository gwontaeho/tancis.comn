import { v4 as uuid } from "uuid";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/comn/features/recoil";

type ShowToastArgs = {
    content?: string;
    type?: "success" | "info" | "error" | "warning";
    onConfirm?: Function;
    onCancel?: Function;
};

type UseToastReturn = {
    showToast: (args: ShowToastArgs) => void;
    hideToast: () => void;
};

export const useToast = (): UseToastReturn => {
    const setToast = useSetRecoilState(toastState);

    const showToast = (args: ShowToastArgs) => {
        const { content, type, onConfirm, onCancel } = args || {};

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
        ]);
    };

    const hideToast = () => {
        setToast([]);
    };

    return { showToast, hideToast };
};
