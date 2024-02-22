import React, { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Layout, FormControl, Button } from "@/comn/components";
import Prism from "prismjs";
import { useForm, TFormSchema, useResource, usePopup } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils, comnEnvs } from "@/comn/utils";

export const SampleFormControlSelect = () => {
    const { openPopup } = usePopup();
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "CGM0055" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "cntyCd" },
            { area: "wrhsCd" },
        ],
    });

    const [state, setState] = useState<any | {}>({});

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    const SG_FORM: TFormSchema = {
        id: "form",
        schema: {
            select1: {
                label: "select1",
                type: "select",
                options: code,
                required: true,
                editType: "both",
            },
            select2: {
                label: "select2",
                type: "select",
                area: "cntyCd",
                required: true,
                editType: "label",
            },
            select3: {
                label: "select3",
                type: "select",
                options: code,
                area: "cntyCd",
                required: true,
                editType: "value",
            },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: {},
    });

    return (
        <Sample
            title="Form Control - Select"
            description={<>폼에서 사용하는 Select 컴포넌트(&lt;select /&gt;에 대한 사용방법</>}
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
                                        <Group.Control label="select" type="select" size={1} options={code} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="select"
                                            type="select"
                                            size={1}
                                            controlSize={10}
                                            options={code}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="select"
                                            type="select"
                                            size={4}
                                            controlSize={10}
                                            options={code}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" size={8} options={code} />
                                        <Group.Control label="select" type="select" size={12} options={code} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" size={"fit"} options={code} />
                                        <Group.Control label="select" type="select" size={"full"} options={code} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="select" type="select" size={1} options={code} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            size={1}
                            controlSize={10}
                            options={code}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            size={4}
                            controlSize={10}
                            options={code}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" size={8} options={code} />
                        <Group.Control label="select" type="select" size={12} options={code} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" size={"fit"} options={code} />
                        <Group.Control label="select" type="select" size={"full"} options={code} />
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
                                        <Group.Control label="select" type="select" options={code} labelSize={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" options={code} labelSize={2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" options={code} labelSize={4} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" options={code} labelSize={8} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="select" type="select" options={code} labelSize={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" options={code} labelSize={2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" options={code} labelSize={4} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" options={code} labelSize={8} />
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
                                        <Group.Control label="select" type="select" options={code} controlSize={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" options={code} controlSize={2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" options={code} controlSize={4} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" options={code} controlSize={8} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="select" type="select" options={code} controlSize={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" options={code} controlSize={2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" options={code} controlSize={4} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" options={code} controlSize={8} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>

                    <Sample.Section title="1.4 Value(value) " description={<>- select 의 value 를 설정</>}>
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" value="01" options={code} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" value="02" options={code} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {
    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="select" type="select" value="01" options={code} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" value="02" options={code} />
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
                        title="1.5 Read Only(readOnly) "
                        description={
                            <>
                                - select 의 읽기전용 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="select"
                                            type="select"
                                            value="01"
                                            options={code}
                                            readOnly={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="select"
                                            type="select"
                                            value="02"
                                            options={code}
                                            readOnly={false}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            value="01"
                            options={code}
                            readOnly={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            value="02"
                            options={code}
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
                        title="1.6 Disabled (disabled) "
                        description={
                            <>
                                - select 의 사용가능 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="select"
                                            type="select"
                                            options={code}
                                            value="01"
                                            disabled={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="select"
                                            type="select"
                                            options={code}
                                            value="02"
                                            disabled={false}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
                            value="01"
                            disabled={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
                            value="02"
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
                        title="1.7 Required (required) "
                        description={
                            <>
                                - select 의 필수 여부를 설정 ( default : false )
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
                                            label="select"
                                            type="select"
                                            options={code}
                                            value="01"
                                            required={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="select"
                                            type="select"
                                            options={code}
                                            value="02"
                                            required={false}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
                            value="01"
                            required={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
                            value="02"
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
                        title="1.8 Message (message) "
                        description={
                            <>
                                - select 하단에 message 를 표시
                                <br />- "string"
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="select"
                                            type="select"
                                            options={code}
                                            value="01"
                                            message="Message를 표시 합니다."
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
                            value="01"
                            message="Message를 표시 합니다."
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
                        title="1.9 Edit (edit) "
                        description={
                            <>
                                - select 의 상세 조회 상태를 표시( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="select"
                                            type="select"
                                            options={code}
                                            value="01"
                                            edit={false}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="select"
                                            type="select"
                                            options={code}
                                            value="02"
                                            edit={true}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
                            value="01"
                            edit={false}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
                            value="02"
                            edit={true}
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
                        title="1.10 Options (options) "
                        description={
                            <>
                                - select 의 Options을 정의
                                <br />
                                {`- Array<{label:string, value:string}>`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="select"
                                            type="select"
                                            options={[
                                                { label: "Options 1", value: "1" },
                                                { label: "Options 2", value: "2" },
                                                { label: "Options 3", value: "3" },
                                                { label: "Options 4", value: "4" },
                                                { label: "Options 5", value: "5" },
                                            ]}
                                            value="3"
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
                            label="select"
                            type="select"
                            options={[
                                { label: "Options 1", value: "1" },
                                { label: "Options 2", value: "2" },
                                { label: "Options 3", value: "3" },
                                { label: "Options 4", value: "4" },
                                { label: "Options 5", value: "5" },
                            ]}
                            value="3"
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
                        title="1.11 코드 조회 (area , comnCd) "
                        description={
                            <>
                                - 코드를 조회하여 select 의 Options 을 정의
                                <br />- useResource Hook 필요
                                <br />- area : 조회할 코드명 (Code 컴포넌트 참조)
                                <br />- comnCd : area="comnCd" 공통 코드일 경우 공통코드그룹 ID
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" area="comnCd" comnCd="CGM0055" />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" area="comnCd" comnCd="CAG_0018" />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" area="wrhsCd" />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" area="cntyCd" />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "CGM0055" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "cntyCd" },
            { area: "wrhsCd" },
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="select" type="select" area="comnCd" comnCd="CGM0055" />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" area="comnCd" comnCd="CAG_0018" />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" area="wrhsCd" />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" area="cntyCd" />
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
                        title="1.12 선택 Option (select) "
                        description={
                            <>
                                - Select 컴포넌트 옵션중 "선택" 의 표시 여부 결정 ( default : true )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" options={code} select={false} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="select" type="select" options={code} select={true} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="select" type="select" options={code} select={false} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="select" type="select" options={code} select={true} />
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
                                - select 의 왼쪽에 버튼 추가 기능
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
                                            label="select"
                                            type="select"
                                            options={code}
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

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
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
                                - select 의 오른쪽에 버튼 추가 기능
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
                                            label="select"
                                            type="select"
                                            options={code}
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

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
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
                </Layout>
            </Sample.Section>

            <Sample.Section title="3. 컴포넌트 사용방법(이벤트)">
                <Layout direction="col">
                    <Sample.Section
                        title="3.1 Change Event(onChange)"
                        description={
                            <>
                                - select 의 Change Event Handler
                                <br />
                                - select 의 value 를 parameter로 전달
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
                                            label="select"
                                            type="select"
                                            options={code}
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

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
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
                        title="3.2 Blur Event(onBlur)"
                        description={
                            <>
                                - select 의 Blur Event Handler
                                <br />
                                - select 의 blur event 를 parameter로 전달
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
                                            label="select"
                                            type="select"
                                            options={code}
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

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
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
                                            {...form.schema.select1}
                                            onChange={(value) => {
                                                form.setSchema("select2", { area: "comnCd", comnCd: "CAG_0018" });
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            {...form.schema.select2}
                                            onChange={(value) => {
                                                form.setSchema("select3", { area: "wrhsCd" });
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.select3} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "CGM0055" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "cntyCd" },
            { area: "wrhsCd" },
        ],
    });

    const code = [
        { label: "Code 1", value: "01" },
        { label: "Code 2", value: "02" },
    ];

    const SG_FORM: TFormSchema = {
        id: "form",
        schema: {
            select1: {
                label: "select1",
                type: "select",
                options: code,
                required: true,
            },
            select2: {
                label: "select2",
                type: "select",
                area: "comnCd",
                comnCd: "CGM0055",
                required: true,
            },
            select3: {
                label: "select3",
                type: "select",
                options: code,
                area: "cntyCd",
                required: true,
            },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: {},
    });

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
                            {...form.schema.select1}
                            onChange={(value) => {
                                form.setSchema("select2", { area: "comnCd", comnCd: "CAG_0018" });
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.select2}
                            onChange={(value) => {
                                form.setSchema("select3", { area: "wrhsCd" });
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.select3} />
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
