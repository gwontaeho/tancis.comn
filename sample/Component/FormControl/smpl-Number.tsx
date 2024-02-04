import React, { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Layout, FormControl, Button } from "@/comn/components";
import Prism from "prismjs";
import { useForm, TFormSchema, useResource, usePopup } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils, comnEnvs } from "@/comn/utils";

export const SampleFormControlNumber = () => {
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
            number1: {
                label: "number1",
                type: "number",
                thousandSeparator: true,
                decimalScale: 3,
                required: true,
            },
            number2: {
                label: "number2",
                type: "number",
                thousandSeparator: true,
                decimalScale: 3,
            },
            number3: {
                label: "number3",
                type: "number",
                thousandSeparator: true,
                decimalScale: 3,
            },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: {},
    });

    return (
        <Sample
            title="Form Control - Number"
            description={<>폼에서 사용하는 Number 컴포넌트(&lt;input type="number" /&gt;에 대한 사용방법</>}
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
                                        <Group.Control label="number" type="number" placeholder={"size 1"} size={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            placeholder="size 1"
                                            thousandSeparator={true}
                                            size={1}
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            thousandSeparator={true}
                                            placeholder="size 4"
                                            size={4}
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            placeholder="size 8"
                                            thousandSeparator={true}
                                            size={8}
                                        />
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            placeholder="size 12"
                                            thousandSeparator={true}
                                            size={12}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            size={"fit"}
                                            thousandSeparator={true}
                                            placeholder="size fit"
                                        />
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            size={"full"}
                                            thousandSeparator={true}
                                            placeholder="size full"
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
                        <Group.Control label="number" type="number" placeholder={"size 1"} size={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="number"
                            type="number"
                            placeholder="size 1"
                            thousandSeparator={true}
                            size={1}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="number"
                            type="number"
                            thousandSeparator={true}
                            placeholder="size 4"
                            size={4}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="number"
                            type="number"
                            placeholder="size 8"
                            thousandSeparator={true}
                            size={8}
                        />
                        <Group.Control
                            label="number"
                            type="number"
                            placeholder="size 12"
                            thousandSeparator={true}
                            size={12}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="number"
                            type="number"
                            size={"fit"}
                            thousandSeparator={true}
                            placeholder="size fit"
                        />
                        <Group.Control
                            label="number"
                            type="number"
                            size={"full"}
                            thousandSeparator={true}
                            placeholder="size full"
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
                                            label="number"
                                            type="number"
                                            value={1}
                                            labelSize={1}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={2}
                                            labelSize={2}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={4}
                                            labelSize={4}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={8}
                                            labelSize={8}
                                            thousandSeparator={true}
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
                        <Group.Control label="number" type="number" value={1} labelSize={1} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="number" type="number" value={2} labelSize={2} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="number" type="number" value={4} labelSize={4} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="number" type="number" value={8} labelSize={8} thousandSeparator={true} />
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
                                            label="number"
                                            type="number"
                                            value={1}
                                            controlSize={1}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={2}
                                            controlSize={2}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={4}
                                            controlSize={4}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={8}
                                            controlSize={8}
                                            thousandSeparator={true}
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
                        <Group.Control label="number" type="number" value={1} controlSize={1} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="number" type="number" value={2} controlSize={2} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="number" type="number" value={4} controlSize={4} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="number" type="number" value={8} controlSize={8} thousandSeparator={true} />
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
                                - input number 안의 글자의 최대 길이
                                <br />- number
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={1}
                                            maxLength={1}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={5}
                                            maxLength={5}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={10}
                                            maxLength={10}
                                            thousandSeparator={true}
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
                        <Group.Control label="number" type="number" value={1} maxLength={1} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="number" type="number" value={5} maxLength={5} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="number" type="number" value={10} maxLength={10} thousandSeparator={true} />
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
                                - input number 의 Place Holder 를 설정
                                <br />- string
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            placeholder="insert number"
                                            thousandSeparator={true}
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
                        <Group.Control label="number" type="number" placeholder="insert number" thousandSeparator={true} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="1.6 Value(value) " description={<>- input number 의 value 를 설정</>}>
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value="99999"
                                            thousandSeparator={true}
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
                        <Group.Control label="number" type="number" value="99999" thousandSeparator={true} />
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
                                - input number 의 읽기전용 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value="99999"
                                            readOnly={true}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value="99999"
                                            readOnly={false}
                                            thousandSeparator={true}
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
                        <Group.Control label="number" type="number" value="99999" readOnly={true} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="number" type="number" value="99999" readOnly={false} thousandSeparator={true} />
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
                                - input number 의 사용가능 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={99999}
                                            disabled={true}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={99999}
                                            disabled={false}
                                            thousandSeparator={true}
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
                        <Group.Control label="number" type="number" value={99999} disabled={true} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="number" type="number" value={99999} disabled={false} thousandSeparator={true} />
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
                                - input number 의 필수 여부를 설정 ( default : false )
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
                                            label="number"
                                            type="number"
                                            value={99999}
                                            required={true}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={99999}
                                            required={false}
                                            thousandSeparator={true}
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
                        <Group.Control label="number" type="number" value={99999} required={true} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="number"
                            type="number"
                            value={99999}
                            required={false}
                            thousandSeparator={true}
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
                                - input number 하단에 message 를 표시
                                <br />- "string"
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={99999}
                                            message="Message를 표시 합니다."
                                            thousandSeparator={true}
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
                            label="number"
                            type="number"
                            value={99999}
                            message="message를 표시 합니다."
                            thousandSeparator={true}
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
                                - input number 의 상세 조회 상태를 표시( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={99999}
                                            edit={false}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={99999}
                                            edit={true}
                                            thousandSeparator={true}
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
                        <Group.Control label="number" type="number" value={99999} edit={false} thousandSeparator={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="number" type="number" value={99999} edit={true} thousandSeparator={true} />
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
                        title="1.12 천단위 구분자 (thousandSeparator) "
                        description={
                            <>
                                - input number 의 value 에 천단위 마다 콤마를 표시( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={99999}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={99999}
                                            thousandSeparator={false}
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
                            label="number"
                            type="number"
                            value={99999}
                            thousandSeparator={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="number"
                            type="number"
                            value={99999}
                            thousandSeparator={false}
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
                        title="1.13 소숫점 자리수 (decimalScale) "
                        description={
                            <>
                                - input number 의 value 소수점 자리수를 정의( default : 제한 없음 )
                                <br />- number
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={99999.9999999}
                                            thousandSeparator={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={99999.99999}
                                            thousandSeparator={true}
                                            decimalScale={3}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="number"
                                            type="number"
                                            value={99999.9999999999}
                                            thousandSeparator={false}
                                            decimalScale={5}
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
                            label="number"
                            type="number"
                            value={99999.9999999}
                            thousandSeparator={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="number"
                            type="number"
                            value={99999.99999}
                            thousandSeparator={true}
                            decimalScale={3}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="number"
                            type="number"
                            value={99999.9999999999}
                            thousandSeparator={false}
                            decimalScale={5}
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

            <Sample.Section title="2. 컴포넌트 사용방법(추가)">
                <Layout direction="col">
                    <Sample.Section
                        title="2.1 Left Button(leftButton)"
                        description={
                            <>
                                - input number 의 왼쪽에 버튼 추가 기능
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
                                            label="number"
                                            type="number"
                                            value={""}
                                            thousandSeparator={true}
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
                            label="number"
                            type="number"
                            value={""}
                            thousandSeparator={true}
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
                                - input number 의 오른쪽에 버튼 추가 기능
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
                                            label="number"
                                            type="number"
                                            value={""}
                                            thousandSeparator={true}
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
                            label="number"
                            type="number"
                            value={""}
                            thousandSeparator={true}
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
                                - input number 의 오른쪽에 텍스트 추가 기능
                                <br />
                                {`- rightText`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="number" type="number" value={"100"} rightText="KG" />
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
                        <Group.Control label="number" type="number" value={"100"} rightText="KG" />
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
                                - input number 의 Change Event Handler
                                <br />
                                - input number 의 value 를 parameter로 전달
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
                                            label="number"
                                            type="number"
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
                            label="number"
                            type="number"
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
                                - input number 의 Focus Event Handler
                                <br />
                                - input number 의 focus event 를 parameter로 전달
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
                                            label="number"
                                            type="number"
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
                            label="number"
                            type="number"
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
                                - input number 의 Blur Event Handler
                                <br />
                                - input number 의 blur event 를 parameter로 전달
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
                                            label="number"
                                            type="number"
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
                            label="number"
                            type="number"
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
                                            {...form.schema.number1}
                                            placeholder="숫자를 입력하세요"
                                            onChange={(value) => {
                                                form.setValue(
                                                    "number3",
                                                    (form.getValue("number1") || 0) + (form.getValue("number2") || 0),
                                                );
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            {...form.schema.number2}
                                            placeholder="숫자를 입력하세요"
                                            onChange={(value) => {
                                                form.setValue(
                                                    "number3",
                                                    (form.getValue("number1") || 0) + (form.getValue("number2") || 0),
                                                );
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            {...form.schema.number3}
                                            placeholder="number1 과 number2의 합 표시"
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
            number1: {
                label: "number1",
                type: "number",
                thousandSeparator: true,
                decimalScale: 3,
                required: true,
            },
            number2: {
                label: "number2",
                type: "number",
                thousandSeparator: true,
                decimalScale: 3,
            },
            number3: {
                label: "number3",
                type: "number",
                thousandSeparator: true,
                decimalScale: 3,
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
                            {...form.schema.number1}
                            placeholder="숫자를 입력하세요"
                            onChange={(value) => {
                                form.setValue(
                                    "number3",
                                    (form.getValue("number1") || 0) + (form.getValue("number2") || 0),
                                );
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.number2}
                            placeholder="숫자를 입력하세요"
                            onChange={(value) => {
                                form.setValue(
                                    "number3",
                                    (form.getValue("number1") || 0) + (form.getValue("number2") || 0),
                                );
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.number3}
                            placeholder="number1 과 number2의 합 표시"
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
