import { Fragment, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import { IconButton, Button } from "@/comn/components";
import { modalState } from "@/comn/features/recoil";

const MODAL_SIZES = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-[70vw]",
    xl: "max-w-[90vw]",
};

export type ModalProps = {
    id?: string;
    content?: React.ReactNode;
    backdrop?: boolean;
    draggable?: boolean;
    size?: keyof typeof MODAL_SIZES;
    onConfirm?: () => void;
    onCancel?: () => void;
};

const Modal = (props: ModalProps) => {
    const { id, onConfirm, onCancel, content, draggable = false, backdrop = true, size = "sm" } = props;

    const ref = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    const setModal = useSetRecoilState(modalState);

    const handleClose = () => {
        setModal((prev) => prev.filter((v) => id !== v.id));
    };

    const handleCancel = () => {
        if (onCancel instanceof Function) onCancel();
        handleClose();
    };

    const handleConfirm = () => {
        if (onConfirm instanceof Function) onConfirm();
        handleClose();
    };

    console.log(content);

    return createPortal(
        <Fragment key={id}>
            {backdrop && (
                <motion.div
                    className="fixed w-screen h-screen z-[9998] top-0 left-0"
                    initial={{ opacity: 0 }}
                    animate={{ background: "#00000080", opacity: 0.8 }}
                    transition={{ duration: 0.1 }}
                    onClick={() => handleClose()}
                />
            )}
            <Draggable nodeRef={ref} disabled={!draggable} handle=".handle" positionOffset={{ x: "-50%", y: "-50%" }}>
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    className={classNames(
                        "fixed flex flex-col top-1/2 left-1/2 w-full max-h-[90vh] border rounded bg-uf-background z-[9999]",
                        MODAL_SIZES[size],
                    )}
                >
                    <div
                        className={classNames("handle flex items-center justify-between px-4 h-16", {
                            "cursor-move": draggable,
                        })}
                    >
                        <div className="text-lg">{t("L_ALT")}</div>
                        <IconButton icon="close" onClick={() => handleClose()} />
                    </div>
                    <div className="p-4 flex-1 overflow-auto">{typeof content === "string" ? t(content) : content}</div>
                    <div className="p-4 flex space-x-2 justify-end">
                        <Button onClick={() => handleCancel()} role="close"></Button>
                        {onConfirm && <Button onClick={() => handleConfirm()} role="ok"></Button>}
                    </div>
                </motion.div>
            </Draggable>
        </Fragment>,
        document.body,
    );
};

export const CommonModal = () => {
    const modal = useRecoilValue(modalState);

    useEffect(() => {
        if (modal.length) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
    }, [modal]);

    return (
        <Fragment>
            {modal.map((props) => {
                return <Modal key={props.id} {...props} />;
            })}
        </Fragment>
    );
};
