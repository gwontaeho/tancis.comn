import React, { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Layout, FormControl, Button } from "@/comn/components";
import Prism from "prismjs";
import { useForm, TFormSchema, useResource, usePopup } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils, comnEnvs } from "@/comn/utils";

export const SampleFormControlTextarea = () => {
    const { openPopup } = usePopup();
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
        ],
    });

    const [state, setState] = useState<any | {}>({});

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    const SG_FORM: TFormSchema = {
        id: "form",
        schema: {
            textarea1: {
                label: "textarea1",
                type: "textarea",
                required: true,
                placeholder: "insert textarea",
            },
            textarea2: {
                label: "textarea2",
                type: "textarea",
                maxLength: 30,
                placeholder: "insert textarea",
            },
            textarea3: {
                label: "textarea3",
                type: "textarea",
            },
            textarea4: {
                type: "text",
                label: "textarea4",
            },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: {},
    });

    return (
        <Sample
            title="Form Control - Textarea"
            description={<>폼에서 사용하는 Textarea 컴포넌트(&lt;type="textarea" /&gt;에 대한 사용방법</>}
        >
            <Sample.Section title="1. 컴포넌트 사용방법(기본)">
                <Layout direction="col">
                    <Sample.Section
                        title="1.1 Size(size) "
                        description={
                            <>
                                - Form Control 사이즈 조절
                                <br />- size : 1 ~ 12 | "fit" | "full"
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="textarea" type="textarea" value={"size 1"} size={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size 1"}
                                            size={1}
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size 4"}
                                            size={4}
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="textarea" type="textarea" value={"size 8"} size={8} />
                                        <Group.Control label="textarea" type="textarea" value={"size 12"} size={12} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size fit"}
                                            size={"fit"}
                                        />
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size full"}
                                            size={"full"}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>               
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"size 1"} size={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value={"size 1"}
                            size={1}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value={"size 4"}
                            size={4}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"size 8"} size={8} />
                        <Group.Control label="textarea" type="textarea" value={"size 12"} size={12} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"size fit"} size={"fit"} />
                        <Group.Control label="textarea" type="textarea" value={"size full"} size={"full"} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.2 Label Size(labelSize) "
                        description={
                            <>
                                - 라벨 영역의 사이즈 조절 (default : 2)
                                <br />- labelSize : 1 ~ 12
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size 1"}
                                            labelSize={1}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size 2"}
                                            labelSize={2}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size 4"}
                                            labelSize={4}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size 8"}
                                            labelSize={8}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"size 1"} labelSize={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"size 2"} labelSize={2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"size 4"} labelSize={4} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"size 8"} labelSize={8} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.3 Control Size(controlSize) "
                        description={
                            <>
                                - Form Comtrol 영역의 사이즈 조절 (default : 4)
                                <br />- controlSize : 1 ~ 12
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size 1"}
                                            controlSize={1}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size 2"}
                                            controlSize={2}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size 4"}
                                            controlSize={4}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={"size 8"}
                                            controlSize={8}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"size 1"} controlSize={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"size 2"} controlSize={2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"size 4"} controlSize={4} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"size 8"} controlSize={8} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.4 Max Length(maxLength) "
                        description={
                            <>
                                - textarea 안의 글자의 최대 길이
                                <br />- number
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="textarea" type="textarea" maxLength={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="textarea" type="textarea" value={"5"} maxLength={5} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="textarea" type="textarea" value={"10"} maxLength={10} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"1"} maxLength={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"5"} maxLength={5} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"10"} maxLength={10} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.5 Place Holder(placeholder) "
                        description={
                            <>
                                - textarea 의 Place Holder 를 설정
                                <br />- string
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="textarea" type="textarea" placeholder="insert textarea" />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" placeholder="insert textarea" />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="1.6 Value(value) " description={<>- textarea 의 value 를 설정</>}>
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="textarea" type="textarea" value="textarea value" />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value="textarea value" />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>

                    <Sample.Section
                        title="1.7 Read Only(readOnly) "
                        description={
                            <>
                                - textarea 의 읽기전용 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value="readonly true"
                                            readOnly={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value="readonly false"
                                            readOnly={false}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value="readonly true" readOnly={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value="readonly false"
                            readOnly={false}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.8 Disabled (disabled) "
                        description={
                            <>
                                - textarea 의 사용가능 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value="disabled true"
                                            disabled={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value="disabled false"
                                            disabled={false}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value="disabled true" disabled={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value="disabled false"
                            disabled={false}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.9 Required (required) "
                        description={
                            <>
                                - textarea 의 필수 여부를 설정 ( default : false )
                                <br />- 라벨 영역에 빨간색 * 표시
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value="required true"
                                            required={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value="required false"
                                            required={false}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value="required true" required={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value="required false"
                            required={false}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.10 Message (message) "
                        description={
                            <>
                                - textarea 하단에 message 를 표시
                                <br />- "string"
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value=""
                                            message="Message를 표시 합니다."
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value=""
                            message="message를 표시 합니다."
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.11 Edit (edit) "
                        description={
                            <>
                                - textarea 의 상세 조회 상태를 표시( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value="edit false"
                                            edit={false}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="textarea" type="textarea" value="edit true" edit={true} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value="edit false" edit={false} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value="edit true" edit={true} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.12 Rows (rows) "
                        description={
                            <>
                                - textarea 의 Rows 를 설정
                                <br />- number
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="textarea" type="textarea" value="edit false" rows={10} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value="edit false" rows={10} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="2. 컴포넌트 사용방법(추가)">
                <Layout direction="col">
                    <Sample.Section
                        title="2.1 Left Button(leftButton)"
                        description={
                            <>
                                - textarea 의 왼쪽에 버튼 추가 기능
                                <br />
                                {`- leftButton={ icon , onClick}`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={""}
                                            leftButton={{
                                                icon: "search",
                                                onClick: () => {
                                                    alert("left button Click");
                                                },
                                            }}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value={""}
                            leftButton={{
                                icon: "search",
                                onClick: () => {
                                    alert("left button Click");
                                },
                            }}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="2.2 Right Button(rightButton)"
                        description={
                            <>
                                - textarea 의 오른쪽에 버튼 추가 기능
                                <br />
                                {`- rightButton={ icon , onClick}`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value={""}
                                            rightButton={{
                                                icon: "search",
                                                onClick: () => {
                                                    alert("right button Click");
                                                },
                                            }}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value={""}
                            rightButton={{
                                icon: "search",
                                onClick: () => {
                                    alert("right button Click");
                                },
                            }}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="2.3 Right Text(rightText)"
                        description={
                            <>
                                - textarea 의 오른쪽에 텍스트 추가 기능
                                <br />
                                {`- rightText`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="textarea" type="textarea" value={"100"} rightText="KG" />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="textarea" type="textarea" value={"100"} rightText="KG" />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="3. 컴포넌트 사용방법(이벤트)">
                <Layout direction="col">
                    <Sample.Section
                        title="3.1 Change Event(onChange)"
                        description={
                            <>
                                - textarea 의 Change Event Handler
                                <br />
                                - textarea 의 value 를 parameter로 전달
                                <br />
                                {`- onChange={(e)=>{})}`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value="change event"
                                            onChange={(value) => {
                                                console.log(value);
                                            }}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value="change event"
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="3.2 Focus Event(onFocus)"
                        description={
                            <>
                                - textarea 의 Focus Event Handler
                                <br />
                                - textarea 의 focus event 를 parameter로 전달
                                <br />
                                {`- onFocus={(e)=>{})}`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value="focus event"
                                            onFocus={(e) => {
                                                console.log(e);
                                            }}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value="change event"
                            onFocus={(e) => {
                                console.log(e);
                            }}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="3.3 Blur Event(onBlur)"
                        description={
                            <>
                                - textarea 의 Blur Event Handler
                                <br />
                                - textarea 의 blur event 를 parameter로 전달
                                <br />
                                {`- onBlur={(e)=>{})}`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="textarea"
                                            type="textarea"
                                            value="blur event"
                                            onBlur={(e) => {
                                                console.log(e);
                                            }}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value="blur event"
                            onBlur={(e) => {
                                console.log(e);
                            }}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="4. 컴포넌트 사용방법(스키마사용)">
                <Layout direction="col">
                    <Sample.Section title="4.1 스키마를 이용한 컴포넌트 사용 예시">
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            {...form.schema.textarea1}
                                            onChange={(value) => {
                                                form.setValue("textarea2", value);
                                                form.setSchema("textarea1", { message: "change..." });
                                            }}
                                            onFocus={(e) => {
                                                form.setValue("textarea2", "focus");
                                                form.setSchema("textarea1", { message: "focus..." });
                                                form.setSchemas(["textarea2", "textarea3"], {
                                                    disabled: true,
                                                    required: true,
                                                });
                                            }}
                                            onBlur={(e) => {
                                                form.setValue("textarea2", "blur");
                                                form.setSchema("textarea1", { message: "blur..." });
                                                form.setSchemas(["textarea2", "textarea3"], {
                                                    disabled: false,
                                                    required: false,
                                                    maxLength: 10,
                                                });
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.textarea2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.textarea3} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                            <Group.Footer>
                                <Layout>
                                    <Layout.Left>
                                        <Button
                                            onClick={() => {
                                                alert(form.getValue("textarea1"));
                                            }}
                                        >
                                            Get Value
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                form.setValue("textarea1", "1234567");
                                            }}
                                        >
                                            Set Value
                                        </Button>
                                    </Layout.Left>
                                </Layout>
                            </Group.Footer>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const SG_FORM: TFormSchema = {
        id: "form",
        schema: {
            textarea1: {
                label: "textarea1",
                type: "textarea",
                required: true,
                placeholder: "insert textarea",
            },
            textarea2: {
                label: "textarea2",
                type: "textarea",
                maxLength: 30,
                placeholder: "insert textarea",
            },
            textarea3: {
                label: "textarea3",
                type: "textarea",
            },
            
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: {},
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.textarea1}
                            onChange={(value) => {
                                form.setValue("textarea2", value);
                                form.setSchema("textarea1", { message: "change..." });
                            }}
                            onFocus={(e) => {
                                form.setValue("textarea2", "focus");
                                form.setSchema("textarea1", { message: "focus..." });
                                form.setSchemas(["textarea2", "textarea3"], {
                                    disabled: true,
                                });
                            }}
                            onBlur={(e) => {
                                form.setValue("textarea2", "blur");
                                form.setSchema("textarea1", { message: "blur..." });
                                form.setSchemas(["textarea2", "textarea3"], {
                                    disabled: false,
                                });
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.textarea2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.textarea3} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.textarea4} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
            <Group.Footer>
                <Layout>
                    <Layout.Left>
                        <Button
                            onClick={() => {
                                alert(form.getValue("textarea1"));
                            }}
                        >
                            Get Value
                        </Button>
                        <Button
                            onClick={() => {
                                form.setValue("textarea1", "1234567");
                            }}
                        >
                            Set Value
                        </Button>
                    </Layout.Left>
                </Layout>
            </Group.Footer>
        </Group>
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
