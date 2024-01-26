import axios from "axios";
import { useModal } from "@/comn/hooks";
import { Button, Table, Tree } from "@/comn/components";
import { Sample } from "@/comn/components/_";
import { useEffect, useState } from "react";

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

    const withSizeSm = () => {
        modal.openModal({ size: "sm" });
    };
    const withSizeMd = () => {
        modal.openModal({ size: "md" });
    };
    const withSizeLg = () => {
        modal.openModal({ size: "lg" });
    };
    const withSizeXl = () => {
        modal.openModal({ size: "xl" });
    };

    const withComponent = () => {
        modal.openModal({ content: <div className="h-[2000px]">안녕123!1!</div> });
    };
    const widthDrag = () => {
        modal.openModal({ content: <div>안녕123!1!</div>, draggable: true });
    };

    return (
        <Sample title="useModal">
            <Sample.Section title="useModal(): UseModalReturn">
                <Sample.Table
                    data={[
                        ["Return", "Type", "Description"],
                        ["openModal", "", "Description"],
                        ["closeModal", "", "Description"],
                    ]}
                />
            </Sample.Section>
            <Sample.Section title="openModal(props: ModalProps): void">
                <Sample.Table
                    data={[
                        ["Arguments", "Type", "Default", "Description"],
                        ["props", "ModalProps", "", ""],
                        ["- id", "string", "", ""],
                        ["- content", "string", "", ""],
                        ["- backdrop", "boolean", "", ""],
                        ["- size", "", "", ""],
                        ["- onConfirm", "() => void", "", ""],
                        ["- onCancel", "() => void", "", ""],
                    ]}
                />
                <Sample.Code exec={withMessage}>{`/* open */

openModal({
    content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
})`}</Sample.Code>
                <Sample.Code exec={withOnConfirm}>{`/*  */

openModal({
    onConfirm: () => alert('confirm')
})`}</Sample.Code>
                <Sample.Code exec={withOnCancel}>{`/* */

openModal({
    onCancel: () => alert('cancel')
})`}</Sample.Code>
                <Sample.Code exec={withoutBackdrop}>{`/* */

openModal({
    backdrop: false
})}`}</Sample.Code>
                <Sample.Code exec={withSizeSm}>{`/* */

openModal({
    onCancel: () => alert('cancel')
})`}</Sample.Code>
                <Sample.Code exec={withComponent}>{`/* */

openModal({
    compo: () => alert('cancel')
})`}</Sample.Code>
                <Sample.Code exec={widthDrag}>{`/* */
                
openModal({
    onCancel: () => alert('cancel')
})`}</Sample.Code>
            </Sample.Section>

            <Sample.Section title="closeModal(): void">
                <Sample.Code exec={() => modal.closeModal()}>{`closeModal()`}</Sample.Code>
            </Sample.Section>
        </Sample>
    );
};

//     id?: string;
//     content?: React.ReactNode;
//     backdrop?: boolean;
//     size?: keyof typeof MODAL_SIZES;
//     onConfirm?: () => void;
//     onCancel?: () => void;

/* <div className="space-y-8">
<Table></Table>
<div>
    <Button onClick={withMessage}>기본</Button>
    <Button onClick={withOnConfirm}>onConfirm handler 추가</Button>
    <Button onClick={withOnCancel}>onCancel handler 추가</Button>
    <Button onClick={withoutBackdrop}>backdrop 제거</Button>
    <Button onClick={withSizeSm}>size sm</Button>
    <Button onClick={withSizeMd}>size md</Button>
    <Button onClick={withSizeLg}>size lg</Button>
    <Button onClick={withSizeXl}>size xl</Button>
    <Button onClick={withComponent}>컴포넌트 모달</Button>
</div>

<div className="text-[1.8rem]">useModal</div>
</div> */
