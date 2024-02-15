import { Fragment, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import { IconButton, Button } from "@/comn/components";
import { modalState } from "@/comn/features/recoil";
import { v4 as uuid } from "uuid";

const MODAL_SIZES = {
    sm: "max-w-[30vw]",
    md: "max-w-[70vw] max-h-[70vh] min-h-[60vh]",
    lg: "max-w-[80vw] max-h-[80vh] min-h-[70vh]",
    xl: "max-w-[90vw] max-h-[90vh] min-h-[80vh]",
};

const MODAL_LAYOUTS = {
    popup: "?ppup=Y",
    main: "",
};

export type ModalProps = {
    id?: string;
    content?: React.ReactNode;
    backdrop?: boolean;
    draggable?: boolean;
    size?: keyof typeof MODAL_SIZES;
    title?: string;
    url?: string;
    layout?: keyof typeof MODAL_LAYOUTS;
    params?: any;
    callback?: (arg?: any) => void;
    onConfirm?: (arg?: any) => void;
    onCancel?: (arg?: any) => void;
};

const Modal = (props: ModalProps) => {
    const {
        id = uuid(),
        url,
        title,
        content,
        draggable = false,
        backdrop = true,
        size = url ? "lg" : "sm",
        layout = "popup",
        params,
        callback,
        onConfirm,
        onCancel,
    } = props;

    const ref = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const setModal = useSetRecoilState(modalState);

    const paramsQuery = params ? "params=" + encodeURIComponent(JSON.stringify(params)) : "";

    useEffect(() => {
        if (url) {
            window.addEventListener("message", handleMessage);
        }

        return () => {
            if (url) {
                window.removeEventListener("message", handleMessage);
            }
        };
    }, []);

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

    const handleMessage = (event: any) => {
        if (event.source.name !== id) return;
        if (!callback) return;
        callback(event.data);
    };

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
                        "fixed flex flex-col top-1/2 left-1/2 w-full h-auto border rounded bg-uf-background z-[9999]",
                        MODAL_SIZES[size],
                    )}
                >
                    <div
                        className={classNames("handle flex items-center justify-between px-4 h-12", {
                            "cursor-move": draggable,
                        })}
                    >
                        <div className="text-lg">{title ? t(title) : url ? "" : t("L_ALT")}</div>
                        <IconButton icon="close" onClick={() => handleClose()} />
                    </div>

                    <div className="p-4 flex-1 overflow-auto h-full flex">
                        {url ? (
                            <div className="flex-1">
                                <iframe
                                    src={url + MODAL_LAYOUTS[layout] + "&" + paramsQuery}
                                    name={id}
                                    className="w-full min-h-full"
                                    title={"modal" + id}
                                />
                            </div>
                        ) : typeof content === "string" ? (
                            t(content)
                        ) : (
                            <div className="flex-1">{content}</div>
                        )}
                    </div>

                    <div className="px-4 h-12 flex space-x-2 items-center justify-end">
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
