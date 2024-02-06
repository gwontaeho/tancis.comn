import { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Group, Layout, FormControl, Button, Page } from "@/comn/components";
import { TFormSchema, useForm, useModal, useToast } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils } from "@/comn/utils";

export const SampleUseModal = () => {
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!

    return (
        <Sample title="useModal" description="Modal Popup 창을 표시하기 위한 Hook">
            <Sample.Section title="1. Hook 사용방법">
                <Layout direction="col">
                    <Sample.Section title="1.1 Import">
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
// useModal Hook import                             
import { useModal } from "@/comn/hooks";
                            `}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="1.2 선언">
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
                            `}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="1.3 사용" description={<>3.1 System Alert , Confirm 용도</>}>
                        <Group>
                            <Group.Body>
                                <Button
                                    onClick={() => {
                                        // 닫기 버튼만 있는 Modal
                                        modal.openModal({ content: "Modal Window" });
                                    }}
                                >
                                    Modal Open(기본)
                                </Button>

                                <Button
                                    onClick={() => {
                                        // 닫기 버튼만 있는 Modal, 제목 변경
                                        modal.openModal({ content: "Modal Window", title: "T_WARN" });
                                    }}
                                >
                                    Modal Open(제목변경)
                                </Button>

                                <Button
                                    onClick={() => {
                                        // 닫기 버튼만 있는 Modal, 제목 변경, 배경 없음
                                        modal.openModal({ content: "Modal Window", title: "T_WARN", backdrop: false });
                                    }}
                                >
                                    Modal Open(제목변경, 배경없음)
                                </Button>

                                <Button
                                    onClick={() => {
                                        // 닫기 버튼만 있는 Modal, 제목 변경, 배경 없음 , 드래그 가능
                                        modal.openModal({
                                            content: "Modal Window",
                                            title: "T_WARN",
                                            backdrop: false,
                                            draggable: true,
                                        });
                                    }}
                                >
                                    Modal Open(제목변경, 배경없음, 드래그 가능)
                                </Button>
                                <Button
                                    onClick={() => {
                                        // 닫기 버튼 이벤트 연결
                                        modal.openModal({
                                            content: "Modal Window",
                                            onCancel: () => {
                                                console.log("cancel click");
                                            },
                                        });
                                    }}
                                >
                                    Modal Open(닫기버튼 이벤트)
                                </Button>
                                <Button
                                    onClick={() => {
                                        // 닫기 버튼 이벤트 연결
                                        modal.openModal({
                                            content: "Modal Window",
                                            // 닫기버튼 클릭
                                            onCancel: () => {
                                                console.log("cancel click");
                                            },
                                            // 확인버튼 클릭
                                            onConfirm: () => {
                                                console.log("confirm click");
                                            },
                                        });
                                    }}
                                >
                                    Modal Open(닫기, 확인 버튼)
                                </Button>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!

    return (<Group>
        <Group.Body>
            <Button
                onClick={() => {
                    // 닫기 버튼만 있는 Modal
                    modal.openModal({ content: "Modal Window" });
                }}
            >
                Modal Open(기본)
            </Button>

            <Button
                onClick={() => {
                    // 닫기 버튼만 있는 Modal, 제목 변경
                    modal.openModal({ content: "Modal Window", title: "T_WARN" });
                }}
            >
                Modal Open(제목변경)
            </Button>

            <Button
                onClick={() => {
                    // 닫기 버튼만 있는 Modal, 제목 변경, 배경 없음
                    modal.openModal({ content: "Modal Window", title: "T_WARN", backdrop: false });
                }}
            >
                Modal Open(제목변경, 배경없음)
            </Button>

            <Button
                onClick={() => {
                    // 닫기 버튼만 있는 Modal, 제목 변경, 배경 없음 , 드래그 가능
                    modal.openModal({
                        content: "Modal Window",
                        title: "T_WARN",
                        backdrop: false,
                        draggable: true,
                    });
                }}
            >
                Modal Open(제목변경, 배경없음, 드래그 가능)
            </Button>
            <Button
                onClick={() => {
                    // 닫기 버튼 이벤트 연결
                    modal.openModal({
                        content: "Modal Window",
                        onCancel: () => {
                            console.log("cancel click");
                        },
                    });
                }}
            >
                Modal Open(닫기버튼 이벤트)
            </Button>
            <Button
                onClick={() => {
                    // 닫기 버튼 이벤트 연결
                    modal.openModal({
                        content: "Modal Window",
                        // 닫기버튼 클릭
                        onCancel: () => {
                            console.log("cancel click");
                        },
                        // 확인버튼 클릭
                        onConfirm: () => {
                            console.log("confirm click");
                        },
                    });
                }}
            >
                Modal Open(닫기, 확인 버튼)
            </Button>
        </Group.Body>
    </Group>);
};

                            `}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title=""
                        description={
                            <>
                                3.2 Modal Popup 용도
                                <br />- Modal로 컴포넌트를 띄우고 값과 handler 를 주고 받는 Sample
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Button
                                    onClick={() => {
                                        const handleSave = (data: any) => {
                                            // Modal 창에서 받은 데이터 확인
                                            console.log(data);
                                            // 모든 Modal 창 닫기
                                            modal.closeModal();
                                        };
                                        modal.openModal({
                                            content: (
                                                <ModalSample
                                                    data={{ text: "text", number: 9999 }}
                                                    handleSave={handleSave}
                                                />
                                            ),
                                            size: "lg",
                                            draggable: true,
                                        });
                                    }}
                                >
                                    Modal Open(Window)
                                </Button>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!

    return (<Group>
        <Group.Body>
            <Button
                onClick={() => {
                    const handleSave = (data: any) => {
                        // Modal 창에서 받은 데이터 확인
                        console.log(data);
                        // 모든 Modal 창 닫기
                        modal.closeModal();
                    };
                    modal.openModal({
                        content: (
                            <ModalSample
                                data={{ text: "text", number: 9999 }}
                                handleSave={handleSave}
                            />
                        ),
                        size: "lg",
                        draggable: true,
                    });
                }}
            >
                Modal Open(Window)
            </Button>
        </Group.Body>
    </Group>);
};

// Modal로 띄울 컴포넌트
export const ModalSample = (props: any) => {
    const { data, handleSave } = props;

    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!

    const SG_FORM: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text", type: "text" },
            number: { label: "number", type: "number", thousandSeparator: true },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: { ...data },
    });

    const handler = {
        saveSample: form.handleSubmit(
            (data) => {
                handleSave(data);
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        ),
    };

    return (
        <>
            <Page title={"Modal Window"}>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.schema.text} />
                                <Group.Control {...form.schema.number} />
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                    <Group.Footer>
                        <Layout>
                            <Layout.Left></Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="save"
                                    onClick={() => {
                                        handler.saveSample();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Footer>
                </Group>
            </Page>
        </>
    );
};

                            `}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};

export const ModalSample = (props: any) => {
    const { data, handleSave } = props;

    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!

    const SG_FORM: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text", type: "text" },
            number: { label: "number", type: "number", thousandSeparator: true },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: { ...data },
    });

    const handler = {
        saveSample: form.handleSubmit(
            (data) => {
                handleSave(data);
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        ),
    };

    return (
        <>
            <Page title={"Modal Window"}>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.schema.text} />
                                <Group.Control {...form.schema.number} />
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                    <Group.Footer>
                        <Layout>
                            <Layout.Left></Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="save"
                                    onClick={() => {
                                        handler.saveSample();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Footer>
                </Group>
            </Page>
        </>
    );
};
