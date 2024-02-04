import React, { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Layout, FormControl, Button } from "@/comn/components";
import Prism from "prismjs";
import { useForm, TFormSchema, useResource, usePopup } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils, comnEnvs } from "@/comn/utils";

export const SampleFormControlDate = () => {
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
            date1: {
                label: "date1",
                type: "date",
                controlSize: 10,
                required: true,
            },
            date2: {
                label: "date2",
                type: "date",
                controlSize: 10,
            },
            text: {
                label: "text",
                type: "text",
                controlSize: 10,
            },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: { date1: comnUtils.getDate(), date2: comnUtils.getDate() },
    });

    return (
        <Sample
            title="Form Control - Text"
            description={<>폼에서 사용하는 Text 컴포넌트(&lt;input type="date" /&gt;에 대한 사용방법</>}
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
                                        <Group.Control label="date" type="date" value={"2024-01-01"} size={1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={"2024-01-01"}
                                            size={1}
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={"2024-01-01"}
                                            size={4}
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="date" type="date" value={"2024-01-01"} size={8} />
                                        <Group.Control label="date" type="date" value={"2024-01-01"} size={12} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="date" type="date" value={"2024-01-01"} size={"fit"} />
                                        <Group.Control label="date" type="date" value={"2024-01-01"} size={"full"} />
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
                        <Group.Control label="date" type="date" value={"2024-01-01"} size={1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={"2024-01-01"}
                            size={1}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={"2024-01-01"}
                            size={4}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="date" type="date" value={"2024-01-01"} size={8} />
                        <Group.Control label="date" type="date" value={"2024-01-01"} size={12} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="date" type="date" value={"2024-01-01"} size={"fit"} />
                        <Group.Control label="date" type="date" value={"2024-01-01"} size={"full"} />
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
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            labelSize={1}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            labelSize={2}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            labelSize={4}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
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
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            labelSize={1}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            labelSize={2}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            labelSize={4}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            labelSize={8}
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
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            controlSize={1}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            controlSize={2}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            controlSize={4}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
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
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            controlSize={1}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            controlSize={2}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            controlSize={4}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            controlSize={8}
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
                        title="1.4 Place Holder(placeholder) "
                        description={
                            <>
                                - input date 의 Place Holder 를 설정
                                <br />- string
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="date" type="date" placeholder="insert date" />
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
                        <Group.Control label="date" type="date" placeholder="insert date" />
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
                        title="1.5 Value(value) "
                        description={
                            <>
                                - input date 의 value 를 설정
                                <br />- string (YYYY-MM-DD) | Date
                                <br />
                                {`- comnUtils.getDate({ y : 년도 offset , m : 월 offset , d : 일 offset}) 사용`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate({ y: -1, m: 1, d: 10 })}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control label="date" type="date" value={"2020-01-01"} />
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
                            label="date"
                            type="date"
                            value={comnUtils.getDate({ y: -1, m: 1, d: 10 })}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="date" type="date" value={"2020-01-01"} />
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
                        title="1.6 Read Only(readOnly) "
                        description={
                            <>
                                - input date 의 읽기전용 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            readOnly={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
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
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            readOnly={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
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
                        title="1.7 Disabled (disabled) "
                        description={
                            <>
                                - input date 의 사용가능 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            disabled={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
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
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            disabled={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
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
                        title="1.8 Required (required) "
                        description={
                            <>
                                - input date 의 필수 여부를 설정 ( default : false )
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
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            required={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
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
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            required={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
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
                        title="1.9 Message (message) "
                        description={
                            <>
                                - input date 하단에 message 를 표시
                                <br />- "string"
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
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
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
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
                        title="1.10 Edit (edit) "
                        description={
                            <>
                                - input date 의 상세 조회 상태를 표시( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            edit={false}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            edit={true}
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
                        <Group.Control label="date" type="date" value={comnUtils.getDate()} edit={false} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="date" type="date" value={comnUtils.getDate()} edit={true} />
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
                                - input date 의 왼쪽에 버튼 추가 기능
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
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
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
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
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
                                - input date 의 오른쪽에 버튼 추가 기능
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
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
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
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
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
                                - input date 의 Change Event Handler
                                <br />
                                - input date 의 value 를 parameter로 전달
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
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            onChange={(value) => {
                                                // ( a , b )
                                                // -1 : a > b
                                                // 1 : a < b
                                                // 0 : a === b
                                                console.log(comnUtils.compareDate(comnUtils.getDate(), value));
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
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            onChange={(value) => {
                                // ( a , b )
                                // -1 : a > b
                                // 1 : a < b
                                // 0 : a === b
                                console.log(comnUtils.compareDate(comnUtils.getDate(), value));
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
                                - input date 의 Blur Event Handler
                                <br />
                                - input date 의 blur event 를 parameter로 전달
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
                                            label="date"
                                            type="date"
                                            value={comnUtils.getDate()}
                                            onBlur={(e) => {
                                                console.log(e.target.value);
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
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            onBlur={(e) => {
                                console.log(e.target.value);
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
                                            {...form.schema.date1}
                                            value={comnUtils.getDate()}
                                            onChange={(value) => {
                                                let date1 = form.getValue("date1");
                                                let date2 = form.getValue("date2");
                                                let result = comnUtils.compareDate(date1, date2);
                                                if (result === -1) {
                                                    form.setValue("text", "date1 이 date2 보다 큼");
                                                } else if (result === 1) {
                                                    form.setValue("text", "date2 이 date1 보다 큼");
                                                } else {
                                                    form.setValue("text", "date1 과 date2 가 동일");
                                                }
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            {...form.schema.date2}
                                            value={comnUtils.getDate()}
                                            onChange={(value) => {
                                                let date1 = form.getValue("date1");
                                                let date2 = form.getValue("date2");
                                                let result = comnUtils.compareDate(date1, date2);
                                                if (result === -1) {
                                                    form.setValue("text", "date1 이 date2 보다 큼");
                                                } else if (result === 1) {
                                                    form.setValue("text", "date2 이 date1 보다 큼");
                                                } else {
                                                    form.setValue("text", "date1 과 date2 가 동일");
                                                }
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.text} />
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
            date1: {
                label: "date1",
                type: "date",
                controlSize: 10,
                required: true,
            },
            date2: {
                label: "date2",
                type: "date",
                controlSize: 10,
            },
            text: {
                label: "text",
                type: "text",
                controlSize: 10,
            },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: { date1: comnUtils.getDate(), date2: comnUtils.getDate() },
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.date1}
                            value={comnUtils.getDate()}
                            onChange={(value) => {
                                let date1 = form.getValue("date1");
                                let date2 = form.getValue("date2");
                                let result = comnUtils.compareDate(date1, date2);
                                if (result === -1) {
                                    form.setValue("text", "date1 이 date2 보다 큼");
                                } else if (result === 1) {
                                    form.setValue("text", "date2 이 date1 보다 큼");
                                } else {
                                    form.setValue("text", "date1 과 date2 가 동일");
                                }
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.date2}
                            value={comnUtils.getDate()}
                            onChange={(value) => {
                                let date1 = form.getValue("date1");
                                let date2 = form.getValue("date2");
                                let result = comnUtils.compareDate(date1, date2);
                                if (result === -1) {
                                    form.setValue("text", "date1 이 date2 보다 큼");
                                } else if (result === 1) {
                                    form.setValue("text", "date2 이 date1 보다 큼");
                                } else {
                                    form.setValue("text", "date1 과 date2 가 동일");
                                }
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.text} />
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
