import { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Group, Layout, FormControl, Button, Page } from "@/comn/components";
import { TFormSchema, useForm, useModal, useToast, usePopup } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils } from "@/comn/utils";

export const SampleUsePopup = () => {
    const popup = usePopup();

    return (
        <Sample title="usePopup" description="Popup 창을 표시하기 위한 Hook">
            <Sample.Section title="1. openPopup() : Popup 창을 Open">
                <Sample.Table
                    data={[
                        ["Parameter", "Type", "Default", "Description"],
                        ["- id", "string", "", "팝업창 식별자"],
                        ["- url", "string", "", "팝업창 주소"],
                        ["- params", "object", "", "팝업창으로 보낼 Parameter"],
                        ["- layout", `"main" | "popup"`, "", "팝업창의 레이아웃을 Popup , Main 으로 구분"],
                        [
                            "- size",
                            `"sm" | "md" | "lg"`,
                            "",
                            "팝업창 사이즈 ( sm : 800 * 600 , md : 1000 * 7000 , lg : 1200 * 800 )",
                        ],
                        [
                            "- callback",
                            "function",
                            "",
                            "팝업창에서 부모창으로 postMessage 할 경우 실행될 CallBack 함수",
                        ],
                    ]}
                />
            </Sample.Section>
            <Sample.Section title="2. close() : 팝업창에서 현재 자기창을 Close"></Sample.Section>
            <Sample.Section title="3. closePopup() : 특정 id 의 팝업창을 식별하여 Close">
                <Sample.Table
                    data={[
                        ["Parameter", "Type", "Default", "Description"],
                        ["- id", "string", "", "팝업창 식별자"],
                    ]}
                />
            </Sample.Section>
            <Sample.Section title="4. getParams() : 부모창에서 보낸 Parameter 를 가져옴"></Sample.Section>
            <Sample.Section title="5. postMessage() : 팝업창에서 부모창으로 데이터를 보냄">
                <Sample.Table
                    data={[
                        ["Parameter", "Type", "Default", "Description"],
                        ["- data", "object", "", "부모창으로 보낼 object"],
                    ]}
                />
            </Sample.Section>
            <Sample.Section title="6. 사용방법">
                <Layout direction="col">
                    <Sample.Section title="6.1 Import">
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
// usePopup Hook import                             
import { usePopup } from "@/comn/hooks";
                            `}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="6.2 선언">
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const popup = usePopup(); // Popup Hook !== Popup Hook ==!
                            `}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="6.3 사용">
                        <Group>
                            <Group.Body>
                                <Button
                                    onClick={() => {
                                        // popup 레이아웃으루 팝업창 Open
                                        popup.openPopup({
                                            id: "popup1",
                                            url: "/comn/smpl/hooks/usePopupWindow",
                                            size: "md",
                                            layout: "popup",
                                            params: { text: "text", number: 99999 },
                                            callback: (data: any) => {
                                                console.log(data);
                                            },
                                        });
                                    }}
                                >
                                    Popup Open (popup)
                                </Button>

                                <Button
                                    onClick={() => {
                                        // main 레이아웃으루 팝업창 Open
                                        popup.openPopup({
                                            id: "popup2",
                                            url: "/comn/smpl/hooks/usePopupWindow",
                                            size: "md",
                                            layout: "main",
                                            params: { text: "text", number: 99999 },
                                            callback: (data: any) => {
                                                console.log(data);
                                            },
                                        });
                                    }}
                                >
                                    Popup Open (main)
                                </Button>

                                <Button
                                    onClick={() => {
                                        // popup1 팝업창을 닫기
                                        popup.closePopup("popup1");
                                    }}
                                >
                                    Popup Close
                                </Button>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
// 부모창 컴포넌트
const Sample = () => {

    const popup = usePopup();

    return (<Group>
                <Group.Body>
                    <Button
                        onClick={() => {
                            // popup 레이아웃으루 팝업창 Open
                            popup.openPopup({
                                id: "popup1",
                                url: "/comn/smpl/hooks/usePopupWindow",
                                size: "md",
                                layout: "popup",
                                params: { text: "text", number: 99999 },
                                callback: (data: any) => {
                                    console.log(data);
                                },
                            });
                        }}
                    >
                        Popup Open (popup)
                    </Button>

                    <Button
                        onClick={() => {
                            // main 레이아웃으루 팝업창 Open
                            popup.openPopup({
                                id: "popup2",
                                url: "/comn/smpl/hooks/usePopupWindow",
                                size: "md",
                                layout: "main",
                                params: { text: "text", number: 99999 },
                                callback: (data: any) => {
                                    console.log(data);
                                },
                            });
                        }}
                    >
                        Popup Open (main)
                    </Button>

                    <Button
                        onClick={() => {
                            // popup1 팝업창을 닫기
                            popup.closePopup("popup1");
                        }}
                    >
                        Popup Close
                    </Button>
                </Group.Body>
            </Group>);
};

// 팝업창 컴포넌트
export const SampleUsePopupWindow = () => {
    const popup = usePopup();

    // 부모창에서 보낸 Parameter를 가져옴
    const params = popup.getParams();

    const handler = {
        // 부모창으로 데이터를 보냄
        postMessage: () => {
            popup.postMessage({ text: "text", number: 99999 });
        },
        // 팝업창 닫기
        closePopup: () => {
            popup.close();
        },
    };

    return (
        <Page title="Popup Window">
            <Group>
                <Group.Body>
                    <Group.Row>
                        <Group.Label label="text"></Group.Label>
                        <Group.Col>
                            {/* 부모창에서 받은 데이터 표시 */}
                            <Group.Any>{params?.text}</Group.Any>
                        </Group.Col>
                        <Group.Label label="number"></Group.Label>
                        <Group.Col>
                            {/* 부모창에서 받은 데이터 표시 */}
                            <Group.Any>{params?.number}</Group.Any>
                        </Group.Col>
                    </Group.Row>
                </Group.Body>
            </Group>
            <Layout>
                <Layout.Left>
                    <Button
                        onClick={() => {
                            // 부모창으로 데이터를 보냄
                            handler.postMessage();
                        }}
                    >
                        Post Message
                    </Button>
                </Layout.Left>
                <Layout.Right>
                    <Button role="close" onClick={handler.closePopup}></Button>
                </Layout.Right>
            </Layout>
        </Page>
    );
};`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};

export const SampleUsePopupWindow = () => {
    const popup = usePopup();

    // 부모창에서 보낸 Parameter를 가져옴
    const params = popup.getParams();

    const handler = {
        // 부모창으로 데이터를 보냄
        postMessage: () => {
            popup.postMessage({ text: "text", number: 99999 });
        },
        // 팝업창 닫기
        closePopup: () => {
            popup.close();
        },
    };

    return (
        <Page title="Popup Window">
            <Group>
                <Group.Body>
                    <Group.Row>
                        <Group.Label label="text"></Group.Label>
                        <Group.Col>
                            {/* 부모창에서 받은 데이터 표시 */}
                            <Group.Any>{params?.text}</Group.Any>
                        </Group.Col>
                        <Group.Label label="number"></Group.Label>
                        <Group.Col>
                            {/* 부모창에서 받은 데이터 표시 */}
                            <Group.Any>{params?.number}</Group.Any>
                        </Group.Col>
                    </Group.Row>
                </Group.Body>
            </Group>
            <Layout>
                <Layout.Left>
                    <Button
                        onClick={() => {
                            // 부모창으로 데이터를 보냄
                            handler.postMessage();
                        }}
                    >
                        Post Message
                    </Button>
                </Layout.Left>
                <Layout.Right>
                    <Button role="close" onClick={handler.closePopup}></Button>
                </Layout.Right>
            </Layout>
        </Page>
    );
};
