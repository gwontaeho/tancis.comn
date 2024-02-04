import React, { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Layout, FormControl, Button } from "@/comn/components";
import Prism from "prismjs";
import { useForm, TFormSchema, useResource, usePopup } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils, comnEnvs } from "@/comn/utils";

export const SampleFormControlCheckbox = () => {
    const { openPopup } = usePopup();
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "cntyCd" },
            { area: "wrhsCd" },
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
            checkbox1: {
                label: "checkbox1",
                type: "checkbox",
                options: code,
                required: true,
            },
            checkbox2: {
                label: "checkbox2",
                type: "checkbox",
                area: "comnCd",
                comnCd: "COM_0100",
                required: true,
            },
            checkbox3: {
                label: "checkbox3",
                type: "checkbox",
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

    return (
        <Sample
            title="Form Control - Checkbox"
            description={<>폼에서 사용하는 Input Checkbox 컴포넌트(&lt;input type="checkbox" /&gt;에 대한 사용방법</>}
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
                                        <Group.Control label="checkbox" type="checkbox" size={1} options={code} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            size={1}
                                            controlSize={10}
                                            options={code}
                                            all={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            size={4}
                                            controlSize={10}
                                            options={code}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            size={8}
                                            options={code}
                                            all={true}
                                        />
                                        <Group.Control label="checkbox" type="checkbox" size={12} options={code} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            size={"fit"}
                                            options={code}
                                            all={true}
                                        />
                                        <Group.Control label="checkbox" type="checkbox" size={"full"} options={code} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" size={1} options={code} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            size={1}
                            controlSize={10}
                            options={code}
                            all={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            size={4}
                            controlSize={10}
                            options={code}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            size={8}
                            options={code}
                            all={true}
                        />
                        <Group.Control label="checkbox" type="checkbox" size={12} options={code} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            size={"fit"}
                            options={code}
                            all={true}
                        />
                        <Group.Control label="checkbox" type="checkbox" size={"full"} options={code} />
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
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            labelSize={1}
                                            all={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="checkbox" type="checkbox" options={code} labelSize={2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            labelSize={4}
                                            all={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="checkbox" type="checkbox" options={code} labelSize={8} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" options={code} labelSize={1} all={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" options={code} labelSize={2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" options={code} labelSize={4} all={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" options={code} labelSize={8} />
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
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            controlSize={1}
                                            all={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            controlSize={2}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            controlSize={4}
                                            all={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            controlSize={8}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" options={code} controlSize={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" options={code} controlSize={2} all={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" options={code} controlSize={4} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" options={code} controlSize={8} all={true} />
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
                        title="1.4 Value(value) "
                        description={
                            <>
                                - checkbox 의 value 를 설정
                                <br />
                                {`- Array<string>`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="checkbox" type="checkbox" value={["Y"]} options={code} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            value={["Y", "N"]}
                                            options={code}
                                            all={true}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {
    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" value={["Y"]} options={code} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            value={["Y", "N"]}
                            options={code}
                            all={true}
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
                        title="1.5 Read Only(readOnly) "
                        description={
                            <>
                                - checkbox 의 읽기전용 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            value={["Y"]}
                                            options={code}
                                            readOnly={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            value={["N"]}
                                            options={code}
                                            readOnly={false}
                                            all={true}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            value={["Y"]}
                            options={code}
                            readOnly={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            value={["N"]}
                            options={code}
                            readOnly={false}
                            all={true}
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
                                - checkbox 의 사용가능 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            value={["Y"]}
                                            disabled={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            value={["N"]}
                                            disabled={false}
                                            all={true}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={code}
                            value={["Y"]}
                            disabled={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={code}
                            value={["N"]}
                            disabled={false}
                            all={true}
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
                                - checkbox 의 필수 여부를 설정 ( default : false )
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
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            value={["Y"]}
                                            required={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            value={["N"]}
                                            required={false}
                                            all={true}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={code}
                            value={["Y"]}
                            required={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={code}
                            value={["N"]}
                            required={false}
                            all={true}
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
                                - checkbox 하단에 message 를 표시
                                <br />- "string"
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            value={["Y"]}
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
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={code}
                            value={["Y"]}
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
                                - checkbox 의 상세 조회 상태를 표시( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            value={["Y", "N"]}
                                            edit={false}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            value={["Y", "N"]}
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
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={code}
                            value={["Y", "N"]}
                            edit={false}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={code}
                            value={["Y", "N"]}
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
                                - checkbox 의 Options을 정의
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
                                            label="checkbox"
                                            type="checkbox"
                                            options={[
                                                { label: "Options 1", value: "1" },
                                                { label: "Options 2", value: "2" },
                                                { label: "Options 3", value: "3" },
                                                { label: "Options 4", value: "4" },
                                                { label: "Options 5", value: "5" },
                                            ]}
                                            value="3"
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={[
                                                { label: "Options 1", value: "1" },
                                                { label: "Options 2", value: "2" },
                                                { label: "Options 3", value: "3" },
                                                { label: "Options 4", value: "4" },
                                                { label: "Options 5", value: "5" },
                                            ]}
                                            value="3"
                                            all={true}
                                            controlSize={10}
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
                            label="checkbox"
                            type="checkbox"
                            options={[
                                { label: "Options 1", value: "1" },
                                { label: "Options 2", value: "2" },
                                { label: "Options 3", value: "3" },
                                { label: "Options 4", value: "4" },
                                { label: "Options 5", value: "5" },
                            ]}
                            value="3"
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={[
                                { label: "Options 1", value: "1" },
                                { label: "Options 2", value: "2" },
                                { label: "Options 3", value: "3" },
                                { label: "Options 4", value: "4" },
                                { label: "Options 5", value: "5" },
                            ]}
                            value="3"
                            all={true}
                            controlSize={10}
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
                                - 코드를 조회하여 checkbox 의 Options 을 정의
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
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            all={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            area="comnCd"
                                            comnCd="CAG_0018"
                                            all={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="checkbox" type="checkbox" area="wrhsCd" all={true} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="checkbox" type="checkbox" area="cntyCd" all={true} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
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
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            area="comnCd"
                            comnCd="COM_0100"
                            all={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            area="comnCd"
                            comnCd="CAG_0018"
                            all={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" area="wrhsCd" all={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="checkbox" type="checkbox" area="cntyCd" all={true} />
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
                        title="1.12 전체 선택 option (all) "
                        description={
                            <>
                                - checkbox 의 전체 선택 체크박스를 표시( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            value={["Y", "N"]}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="checkbox"
                                            type="checkbox"
                                            options={code}
                                            value={["Y", "N"]}
                                            all={true}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={code}
                            value={["Y", "N"]}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={code}
                            value={["Y", "N"]}
                            all={true}
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

            <Sample.Section title="2. 컴포넌트 사용방법(이벤트)">
                <Layout direction="col">
                    <Sample.Section
                        title="2.1 Change Event(onChange)"
                        description={
                            <>
                                - checkbox 의 Change Event Handler
                                <br />
                                - checkbox 의 value 를 parameter로 전달
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
                                            label="checkbox"
                                            type="checkbox"
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
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
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
                        title="2.2 Blur Event(onBlur)"
                        description={
                            <>
                                - checkbox 의 Blur Event Handler
                                <br />
                                - checkbox 의 blur event 를 parameter로 전달
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
                                            label="checkbox"
                                            type="checkbox"
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
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
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
                                            {...form.schema.checkbox1}
                                            onChange={(value) => {
                                                form.setSchema("checkbox2", { area: "comnCd", comnCd: "CAG_0018" });
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            {...form.schema.checkbox2}
                                            onChange={(value) => {
                                                form.setSchema("checkbox3", { area: "wrhsCd" });
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.checkbox3} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                            <Group.Footer>
                                <Layout>
                                    <Layout.Left>
                                        <Button
                                            onClick={() => {
                                                alert(form.getValue("checkbox1"));
                                            }}
                                        >
                                            Get Value
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                form.setValue("checkbox1", ["Y"]);
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

    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "cntyCd" },
            { area: "wrhsCd" },
        ],
    });

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    const SG_FORM: TFormSchema = {
        id: "form",
        schema: {
            checkbox1: {
                label: "checkbox1",
                type: "checkbox",
                options: code,
                required: true,
            },
            checkbox2: {
                label: "checkbox2",
                type: "checkbox",
                area: "comnCd",
                comnCd: "COM_0100",
                required: true,
            },
            checkbox3: {
                label: "checkbox3",
                type: "checkbox",
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
                            {...form.schema.checkbox1}
                            onChange={(value) => {
                                form.setSchema("checkbox2", { area: "comnCd", comnCd: "CAG_0018" });
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.checkbox2}
                            onChange={(value) => {
                                form.setSchema("checkbox3", { area: "wrhsCd" });
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.checkbox3} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
            <Group.Footer>
                <Layout>
                    <Layout.Left>
                        <Button
                            onClick={() => {
                                alert(form.getValue("checkbox1"));
                            }}
                        >
                            Get Value
                        </Button>
                        <Button
                            onClick={() => {
                                form.setValue("checkbox1", ["Y"]);
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
