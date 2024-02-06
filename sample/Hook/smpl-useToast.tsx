import { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Group, Layout, FormControl, Button, Page } from "@/comn/components";
import { TFormSchema, useForm, useModal, useToast } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils } from "@/comn/utils";

export const SampleUseToast = () => {
    const toast = useToast(); // Toast Hook !==Toast Hook ==!

    return (
        <Sample title="useToast" description="Toast 창을 표시하기 위한 Hook">
            <Sample.Section title="1. showToast() : Toast 메세지를 표시">
                <Sample.Table
                    data={[
                        ["Parameter", "Type", "Default", "Description"],
                        ["- type", `"success" | "info" | "error" | "warning"`, "", "메세지의 성격에 따라서 type 지정"],
                        ["- content", "string", "", "Toast 메세지에 표시될 메세지"],
                    ]}
                />
            </Sample.Section>
            <Sample.Section title="2. hideToast() : Toast 메세지를 숨김"></Sample.Section>
            <Sample.Section title="3. 사용방법">
                <Layout direction="col">
                    <Sample.Section title="3.1 Import">
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
// useToast Hook import                             
import { useToast } from "@/comn/hooks";
                            `}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="3.2 선언">
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const toast = useToast(); // Toast Hook !== Toast 메세지 Hook ==!
                            `}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="3.3 사용">
                        <Group>
                            <Group.Body>
                                <Button
                                    onClick={() => {
                                        // Show Toast ( success )
                                        toast.showToast({ type: "success", content: "Success Message" });
                                    }}
                                >
                                    Show Toast(success)
                                </Button>
                                <Button
                                    onClick={() => {
                                        // Show Toast ( info )
                                        toast.showToast({ type: "info", content: "Info Message" });
                                    }}
                                >
                                    Show Toast(info)
                                </Button>
                                <Button
                                    onClick={() => {
                                        // Show Toast ( error )
                                        toast.showToast({ type: "error", content: "Error Message" });
                                    }}
                                >
                                    Show Toast(error)
                                </Button>
                                <Button
                                    onClick={() => {
                                        // Show Toast ( warning )
                                        toast.showToast({ type: "warning", content: "Warning Message" });
                                    }}
                                >
                                    Show Toast(warning)
                                </Button>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const toast = useToast(); // Toast Hook !==Toast Hook ==!

    return (<Group>
                <Group.Body>
                    <Button
                        onClick={() => {
                            // Show Toast ( success )
                            toast.showToast( { type : "success" , content : "Success Message"})
                        }}
                    >
                        Show Toast(success)
                    </Button>
                    <Button
                        onClick={() => {
                            // Show Toast ( info )
                            toast.showToast( { type : "info" , content : "Info Message"})
                        }}
                    >
                        Show Toast(info)
                    </Button>
                    <Button
                        onClick={() => {
                            // Show Toast ( error )
                            toast.showToast( { type : "error" , content : "Error Message"})
                        }}
                    >
                        Show Toast(error)
                    </Button>
                    <Button
                        onClick={() => {
                            // Show Toast ( warning )
                            toast.showToast( { type : "warning" , content : "Warning Message"})
                        }}
                    >
                        Show Toast(warning)
                    </Button>

                    
                </Group.Body>
            </Group>);
};

                            `}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
