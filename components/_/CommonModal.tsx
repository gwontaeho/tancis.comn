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
import { useNavigate } from "react-router-dom";

const MODAL_SIZES = {
    xs: "max-w-[30vw]",
    sm: "max-w-[50vw] max-h-[50vh] min-h-[30vh]",
    md: "max-w-[70vw] max-h-[90vh] min-h-[90vh]",
    lg: "max-w-[80vw] max-h-[90vh] min-h-[90vh]",
    xl: "max-w-[90vw] max-h-[90vh] min-h-[90vh]",
};

export type ModalProps = {
    id?: string;
    content?: React.ReactNode;
    type?: "deleted";
    backdrop?: boolean;
    draggable?: boolean;
    close?: boolean;
    title?: string;
    url?: string;
    params?: any;
    size?: keyof typeof MODAL_SIZES;
    layout?: "popup" | "main";
    callback?: (arg?: any) => void;
    onConfirm?: (arg?: any) => void;
    onCancel?: (arg?: any) => void;
};

const Modal = (props: ModalProps) => {
    const {
        id = uuid(),
        url,
        title,
        type,
        content,
        draggable = false,
        backdrop = true,
        size = url ? "xl" : "xs",
        layout = "popup",
        params,
        close = true,
        callback,
        onConfirm,
        onCancel,
    } = props;

    const ref = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const setModal = useSetRecoilState(modalState);
    const navigate = useNavigate();

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

        if (type === "deleted") {
            navigate(-1);
        }
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

    const paramsQuery = params ? "&params=" + encodeURIComponent(JSON.stringify(params)) : "";

    /**
     *
     *
     *
     *
     *
     */

    let IFRAME_URL;
    if (url) {
        const isPopup = layout === "popup";
        const hasOriginQuery = url.split("/").pop()?.includes("?");
        const hasExtraQuery = Boolean(params) || isPopup;

        const QUERY_SIGN = hasExtraQuery ? "?" : "";
        const PARAMS_QUERY = params ? "&params=" + encodeURIComponent(JSON.stringify(params)) : "";
        const LAYOUT_QUERY = isPopup ? "&ppup=Y" : "";

        IFRAME_URL = (hasOriginQuery ? url : url + QUERY_SIGN) + PARAMS_QUERY + LAYOUT_QUERY;
    }

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
                        className={classNames(
                            "handle flex items-center justify-between ",
                            typeof content === "string" ? "px-2 py-2" : "px-1 py-1",
                            {
                                "cursor-move": draggable,
                            },
                        )}
                    >
                        <div className="text-lg px-2">
                            {url || typeof content !== "string" ? "" : title ? t(title) : t("L_ALT")}
                        </div>
                        <IconButton icon="close" onClick={() => handleClose()} />
                    </div>

                    <div className={typeof content === "string" ? "p-3" : "p-1" + " flex-1 overflow-auto h-full flex"}>
                        {type === "deleted" ? (
                            <pre>{t("msg.com.00117")}</pre>
                        ) : url ? (
                            <div className="flex-1">
                                <iframe src={IFRAME_URL} name={id} className="w-full min-h-full" title={"modal" + id} />
                            </div>
                        ) : typeof content === "string" ? (
                            <pre>{t(content)}</pre>
                        ) : (
                            <div className="flex-1 px-1">{content}</div>
                        )}
                    </div>

                    {(close !== false || onConfirm !== undefined) && (
                        <div className={"px-2 py-2 h-12 flex space-x-1 items-center justify-end"}>
                            {close !== false && <Button onClick={() => handleCancel()} role="close"></Button>}
                            {onConfirm && <Button onClick={() => handleConfirm()} role="ok"></Button>}
                        </div>
                    )}
                </motion.div>
            </Draggable>
        </Fragment>,
        document.body,
    );
};

const CommonModal = () => {
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

export default CommonModal;
