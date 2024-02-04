import React, { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Layout, FormControl, Button } from "@/comn/components";
import Prism from "prismjs";
import { useForm, TFormSchema, useResource, usePopup } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils, comnEnvs } from "@/comn/utils";

export const SampleFormControlFile = () => {
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

    const SF_FORM: TFormSchema = {
        id: "form",
        schema: {
            file1: {
                label: "file1",
                type: "file",
                controlSize: 10,
                required: true,
            },
            file2: {
                label: "file2",
                type: "file",
                controlSize: 10,
            },
            file3: {
                label: "file3",
                type: "file",
                controlSize: 10,
            },
        },
    };

    const form = useForm({
        defaultSchema: SF_FORM,
        defaultValues: {},
    });

    return (
        <Sample
            title="Form Control - File"
            description={<>폼에서 사용하는 File 컴포넌트(&lt;input type="file" /&gt;에 대한 사용방법</>}
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
                                        <Group.Control label="file" type="file" size={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" size={1} controlSize={10} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" size={4} controlSize={10} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" size={8} />
                                        <Group.Control label="file" type="file" size={12} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" size={"full"} />
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
                        <Group.Control label="file" type="file" size={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" size={1} controlSize={10} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" size={4} controlSize={10} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" size={8} />
                        <Group.Control label="file" type="file" size={12} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" size={"full"} />
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
                                        <Group.Control label="file" type="file" labelSize={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" labelSize={2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" labelSize={4} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" labelSize={8} />
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
                        <Group.Control label="file" type="file" labelSize={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" labelSize={2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" labelSize={4} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" labelSize={8} />
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
                                        <Group.Control label="file" type="file" controlSize={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" controlSize={2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" controlSize={4} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" controlSize={8} />
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
                        <Group.Control label="file" type="file" controlSize={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" controlSize={2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" controlSize={4} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" controlSize={8} />
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
                        title="1.4 Read Only(readOnly) "
                        description={
                            <>
                                - input file 의 읽기전용 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" readOnly={true} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" readOnly={false} />
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
                        <Group.Control label="file" type="file" readOnly={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" readOnly={false} />
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
                        title="1.5 Disabled (disabled) "
                        description={
                            <>
                                - input file 의 사용가능 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" disabled={true} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" disabled={false} />
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
                        <Group.Control label="file" type="file" disabled={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" disabled={false} />
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
                        title="1.6 Required (required) "
                        description={
                            <>
                                - input file 의 필수 여부를 설정 ( default : false )
                                <br />- 라벨 영역에 빨간색 * 표시
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" required={true} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="file"
                                            type="file"
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
                        <Group.Control label="file" type="file" required={true} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="file"
                            type="file"
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
                        title="1.7 Message (message) "
                        description={
                            <>
                                - input file 하단에 message 를 표시
                                <br />- "string"
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" message="Message를 표시 합니다." />
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
                        <Group.Control label="file" type="file" message="Message를 표시 합니다." />
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
                        title="1.8 Edit (edit) "
                        description={
                            <>
                                - input file 의 상세 조회 상태를 표시( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" edit={false} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" edit={true} />
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
                        <Group.Control label="file" type="file" edit={false} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="file" type="file" edit={true} />
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
                                - input file 의 왼쪽에 버튼 추가 기능
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
                                            label="file"
                                            type="file"
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
                            label="file"
                            type="file"
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
                                - input file 의 오른쪽에 버튼 추가 기능
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
                                            label="file"
                                            type="file"
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
                            label="file"
                            type="file"
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
                                - input file 의 오른쪽에 텍스트 추가 기능
                                <br />
                                {`- rightText`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="file" type="file" value={"100"} rightText="KG" />
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
                        <Group.Control label="file" type="file" value={"100"} rightText="KG" />
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
                                - input file 의 Change Event Handler
                                <br />
                                - input file 의 value 를 parameter로 전달
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
                                            label="file"
                                            type="file"
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
                            label="file"
                            type="file"
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
                                - input file 의 Focus Event Handler
                                <br />
                                - input file 의 focus event 를 parameter로 전달
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
                                            label="file"
                                            type="file"
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
                            label="file"
                            type="file"
                            value="focus event"
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
                                - input file 의 Blur Event Handler
                                <br />
                                - input file 의 blur event 를 parameter로 전달
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
                                            label="file"
                                            type="file"
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
                            label="file"
                            type="file"
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
                                            {...form.schema.file1}
                                            onChange={(value) => {
                                                console.log(value);
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.file2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.file3} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const SF_FORM: TFormSchema = {
        id: "form",
        schema: {
            file1: {
                label: "file1",
                type: "file",
                controlSize: 10,
                required: true,
            },
            file2: {
                label: "file2",
                type: "file",
                controlSize: 10,
            },
            file3: {
                label: "file3",
                type: "file",
                controlSize: 10,
            },
        },
    };

    const form = useForm({
        defaultSchema: SF_FORM,
        defaultValues: {},
    });

   
    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.file1}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.file2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.file3} />
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
