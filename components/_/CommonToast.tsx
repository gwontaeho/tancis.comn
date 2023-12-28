import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { motion } from "framer-motion";

import { toastState } from "@/comn/recoil";
import classNames from "classnames";

export type ToastProps = {
    id: string;
    type?: "success" | "info" | "error" | "warning";
    content?: React.ReactNode;
};

const Toast = (props: ToastProps) => {
    const { id, content, type } = props;

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
            <div
                className={classNames("w-96 shadow border rounded bg-background", {
                    "border-success": type === "success",
                    "border-error": type === "error",
                    "border-info": type === "info",
                    "border-warning": type === "warning",
                })}
            >
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
        document.body,
    );
};
