import React, { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Layout, FormControl, Button } from "@/comn/components";
import Prism from "prismjs";
import { useForm, TFormSchema, useResource, usePopup } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils, comnEnvs } from "@/comn/utils";

export const SampleFormControlText = () => {
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
            text1: {
                label: "text1",
                type: "text",
                controlSize: 10,
                size: 6,
                required: true,
                placeholder: "0000000-0000-0-000000",
                mask: [
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    "-",
                    /\d/,
                    "-",
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                ],
            },
            text2: {
                label: "text2",
                maxLength: 30,
                leftButton: {
                    icon: "search",
                    onClick: () => {
                        console.log("click");
                    },
                },
            },
            text3: {
                label: "text3",
                rightButton: {
                    icon: "search",
                    onClick: () => {
                        console.log("click");
                    },
                },
            },
            text4: {
                label: "text4",
            },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: {},
    });

    return (
        <Sample
            title="Form Control - Text"
            description={<>폼에서 사용하는 Text 컴포넌트(&lt;input type="text" /&gt;에 대한 사용방법</>}
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
                                        <Group.Control label="text" type="text" value={"size 1"} size={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="text"
                                            type="text"
                                            value={"size 1"}
                                            size={1}
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="text"
                                            type="text"
                                            value={"size 4"}
                                            size={4}
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"size 8"} size={8} />
                                        <Group.Control label="text" type="text" value={"size 12"} size={12} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"size fit"} size={"fit"} />
                                        <Group.Control label="text" type="text" value={"size full"} size={"full"} />
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
                        <Group.Control label="text" type="text" value={"size 1"} size={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="text"
                            type="text"
                            value={"size 1"}
                            size={1}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="text"
                            type="text"
                            value={"size 4"}
                            size={4}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" value={"size 8"} size={8} />
                        <Group.Control label="text" type="text" value={"size 12"} size={12} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" value={"size fit"} size={"fit"} />
                        <Group.Control label="text" type="text" value={"size full"} size={"full"} />
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
                                        <Group.Control label="text" type="text" value={"size 1"} labelSize={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"size 2"} labelSize={2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"size 4"} labelSize={4} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"size 8"} labelSize={8} />
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
                        <Group.Control label="text" type="text" value={"size 1"} labelSize={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" value={"size 2"} labelSize={2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" value={"size 4"} labelSize={4} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" value={"size 8"} labelSize={8} />
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
                                        <Group.Control label="text" type="text" value={"size 1"} controlSize={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"size 2"} controlSize={2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"size 4"} controlSize={4} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"size 8"} controlSize={8} />
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
                        <Group.Control label="text" type="text" value={"size 1"} controlSize={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" value={"size 2"} controlSize={2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" value={"size 4"} controlSize={4} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" value={"size 8"} controlSize={8} />
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
                                - input text 안의 글자의 최대 길이
                                <br />- number
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"1"} maxLength={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"5"} maxLength={5} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"10"} maxLength={10} />
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
                        <Group.Control label="text" type="text" value={"1"} maxLength={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" value={"5"} maxLength={5} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" value={"10"} maxLength={10} />
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
                                - input text 의 Place Holder 를 설정
                                <br />- string
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" placeholder="insert text" />
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
                        <Group.Control label="text" type="text" placeholder="insert text" />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="1.6 Value(value) " description={<>- input text 의 value 를 설정</>}>
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value="text value" />
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
                        <Group.Control label="text" type="text" value="text value" />
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
                        title="1.7 Letter Case(letterCase) "
                        description={
                            <>
                                - input text 의 대소문자 여부를 설정
                                <br />- "lower" | "upper"{" "}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" letterCase="upper" />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" letterCase="lower" />
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
                        <Group.Control label="text" type="text" letterCase="upper" />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" letterCase="lower" />
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
                        title="1.8 Read Only(readOnly) "
                        description={
                            <>
                                - input text 의 읽기전용 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value="readonly true" readOnly={true} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="text"
                                            type="text"
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
                        <Group.Control label="text" type="text" value="readonly true" readOnly={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="text"
                            type="text"
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
                        title="1.9 Disabled (disabled) "
                        description={
                            <>
                                - input text 의 사용가능 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value="disabled true" disabled={true} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="text"
                                            type="text"
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
                        <Group.Control label="text" type="text" value="disabled true" disabled={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="text"
                            type="text"
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
                        title="1.10 Required (required) "
                        description={
                            <>
                                - input text 의 필수 여부를 설정 ( default : false )
                                <br />- 라벨 영역에 빨간색 * 표시
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value="required true" required={true} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="text"
                                            type="text"
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
                        <Group.Control label="text" type="text" value="required true" required={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="text"
                            type="text"
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
                        title="1.11 Message (message) "
                        description={
                            <>
                                - input text 하단에 message 를 표시
                                <br />- "string"
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="text"
                                            type="text"
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
                            label="text"
                            type="text"
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
                        title="1.12 Edit (edit) "
                        description={
                            <>
                                - input text 의 상세 조회 상태를 표시( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value="edit false" edit={false} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value="edit true" edit={true} />
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
                        <Group.Control label="text" type="text" value="edit false" edit={false} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="text" type="text" value="edit true" edit={true} />
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
                                - input text 의 왼쪽에 버튼 추가 기능
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
                                            label="text"
                                            type="text"
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
                            label="text"
                            type="text"
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
                                - input text 의 오른쪽에 버튼 추가 기능
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
                                            label="text"
                                            type="text"
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
                            label="text"
                            type="text"
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
                                - input text 의 오른쪽에 텍스트 추가 기능
                                <br />
                                {`- rightText`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="text" type="text" value={"100"} rightText="KG" />
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
                        <Group.Control label="text" type="text" value={"100"} rightText="KG" />
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
                        title="2.4 Mask(mask)"
                        description={
                            <>
                                - input text 데이터 패턴을 정규식의으로 정의
                                <br />
                                - 영어 대문자 : /[A-Z]/
                                <br />
                                - 영어 소문자 : /[a-z]/
                                <br />
                                - 영어 대문자 범위 : /[A-C]/
                                <br />
                                - 영어 소문자 범위 : /[a-c]/
                                <br />
                                - 특정 영어 대문자 : /[A,D,Y]/
                                <br />
                                - 특정 영어 소문자 : /[a,d,y]/
                                <br />
                                - 특정 숫자 : /[1,5,3]/
                                <br />
                                - 고정 문자 : "문자" ( - , _ 등)
                                <br />
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="text"
                                            type="text"
                                            placeholder="00000000-0000-0-000000"
                                            mask={[
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                "-",
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                "-",
                                                /\d/,
                                                "-",
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                                /\d/,
                                            ]}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="text"
                                            type="text"
                                            placeholder="[A-Z][A-C]-[a-z][a-c]-[A,D,F]"
                                            mask={[/[A-Z]/, /[A-C]/, "-", /[a-z]/, /[a-c]/, "-", /[A,D,F]/]}
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
                            label="text"
                            type="text"
                            placeholder="00000000-0000-0-000000"
                            mask={[
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                "-",
                                /\d/,
                                "-",
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                                /\d/,
                            ]}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="text"
                            type="text"
                            placeholder="[A-Z][A-C]-[a-z][a-c]-[A,D,F]"
                            mask={[/[A-Z]/, /[A-C]/, "-", /[a-z]/, /[a-c]/, "-", /[0-5]/]}
                            exact={false}
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

            <Sample.Section title="3. 컴포넌트 사용방법(이벤트)">
                <Layout direction="col">
                    <Sample.Section
                        title="3.1 Change Event(onChange)"
                        description={
                            <>
                                - input text 의 Change Event Handler
                                <br />
                                - input text 의 value 를 parameter로 전달
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
                                            label="text"
                                            type="text"
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
                            label="text"
                            type="text"
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
                                - input text 의 Focus Event Handler
                                <br />
                                - input text 의 focus event 를 parameter로 전달
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
                                            label="text"
                                            type="text"
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
                            label="text"
                            type="text"
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
                                - input text 의 Blur Event Handler
                                <br />
                                - input text 의 blur event 를 parameter로 전달
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
                                            label="text"
                                            type="text"
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
                            label="text"
                            type="text"
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
                                            {...form.schema.text1}
                                            onChange={(value) => {
                                                form.setValue("textarea", value);
                                                form.setSchema("text1", { message: "change..." });
                                            }}
                                            onFocus={(e) => {
                                                form.setValue("textarea", "focus");
                                                form.setSchema("text1", { message: "focus..." });
                                                form.setSchemas(["text2", "text3"], {
                                                    disabled: true,
                                                });
                                            }}
                                            onBlur={(e) => {
                                                form.setValue("textarea", "blur");
                                                form.setSchema("text1", { message: "blur..." });
                                                form.setSchemas(["text2", "text3"], {
                                                    disabled: false,
                                                });
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.text2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.text3} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            {...form.schema.text4}
                                            onBlur={() => {
                                                form.setFocus("text1");
                                            }}
                                            rightButton={{
                                                icon: "search",
                                                onClick: () => {
                                                    openPopup({
                                                        url: `${comnEnvs.base_comn}/comn/ppup/coCdPpup`,
                                                        callback: ({ data }) => {
                                                            form.setValue("text4", data.coNm);
                                                        },
                                                    });
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

    const SG_FORM: TFormSchema = {
        id: "form",
        schema: {
            text1: {
                label: "text1",
                type: "text",
                controlSize: 10,
                size: 6,
                required: true,
                placeholder: "0000000-0000-0-000000",
                mask: [
                    /\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/,/\d/,"-",/\d/,"-",/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,
                ],
            },
            text2: {
                label: "text2",
                maxlemgth: 30,
                leftButton: {
                    icon: "search",
                    onClick: () => {
                        console.log("click");
                    },
                },
            },
            text3: {
                label: "text3",
                rightButton: {
                    icon: "search",
                    onClick: () => {
                        console.log("click");
                    },
                },
            },
            text4: {
                label: "text4",
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
                            {...form.schema.text1}
                            onChange={(value) => {
                                form.setValue("textarea", value);
                                form.setSchema("text1", { message: "change..." });
                            }}
                            onFocus={(e) => {
                                form.setValue("textarea", "focus");
                                form.setSchema("text1", { message: "focus..." });
                                form.setSchemas(["text2", "text3"], {
                                    disabled: true,
                                });
                            }}
                            onBlur={(e) => {
                                form.setValue("textarea", "blur");
                                form.setSchema("text1", { message: "blur..." });
                                form.setSchemas(["text2", "text3"], {
                                    disabled: false,
                                });
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.text2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.text3} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.text4}
                            rightButton={{
                                icon: "search",
                                onClick: () => {
                                    openPopup({
                                        url: \`${comnEnvs.base_comn}/comn/ppup/coCdPpup\`,
                                        callback: ({ data }) => {
                                            form.setValue("text4", data.coNm);
                                        },
                                    });
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
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
