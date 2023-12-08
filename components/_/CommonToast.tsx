import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { motion } from "framer-motion";

import { toastState } from "@/com/recoil";

export type ToastProps = {
    id: string;
    content?: React.ReactNode;
};

const Toast = (props: ToastProps) => {
    const { id, content } = props;

    const setToast = useSetRecoilState(toastState);

    const handleClose = () => {
        setToast((prev) => prev.filter((v) => id !== v.id));
    };

    useEffect(() => {
        const sto = setTimeout(() => {
            handleClose();
        }, 2000);

        return () => {
            clearTimeout(sto);
        };
    }, []);

    return (
        <motion.div initial={{ translateX: 30, opacity: 0.5 }} animate={{ translateX: 0, opacity: 1 }}>
            <div className="w-96 shadow border rounded bg-background">
                <div className="p-4">{content}</div>
            </div>
        </motion.div>
    );
};

export const CommonToast = () => {
    const toast = useRecoilValue(toastState);

    return createPortal(
        <div className="fixed right-4 bottom-4 space-y-2">
            {toast.map((props) => {
                return <Toast key={props.id} {...props} />;
            })}
        </div>,
        document.body
    );
};
