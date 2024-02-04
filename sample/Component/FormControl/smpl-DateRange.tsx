import React, { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Layout, FormControl, Button } from "@/comn/components";
import Prism from "prismjs";
import { useForm, TFormSchema, useResource, usePopup } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils, comnEnvs } from "@/comn/utils";

export const SampleFormControlDateRange = () => {
    const { openPopup } = usePopup();
    const SF_FORM: TFormSchema = {
        id: "form",
        schema: {
            daterange1: {
                type: "daterange",
                label: "dateramge11",
                start: { name: "start1", defaultValue: comnUtils.getDate() },
                end: { name: "end1", defaultValue: comnUtils.getDate() },
                rangeButton: 0,
                controlSize: 10,
            },
            daterange2: {
                type: "daterange",
                label: "dateramge12",
                start: { name: "start2", defaultValue: comnUtils.getDate() },
                end: { name: "end2", defaultValue: comnUtils.getDate() },
                rangeButton: 1,
                controlSize: 10,
            },
            daterange3: {
                type: "daterange",
                label: "dateramge13",
                start: { name: "start3", defaultValue: comnUtils.getDate() },
                end: { name: "end3", defaultValue: comnUtils.getDate() },
                rangeButton: 2,
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
            title="Form Control - DateRange"
            description={<>폼에서 사용하는 DateRange 컴포넌트(&lt;input type="daterange" /&gt;에 대한 사용방법</>}
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
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            size={10}
                                            controlSize={10}
                                            rangeButton={0}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            size={8}
                                            controlSize={10}
                                            rangeButton={1}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            size={6}
                                            controlSize={10}
                                            rangeButton={2}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            size={8}
                                            controlSize={10}
                                        />
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            size={12}
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            size={"fit"}
                                            controlSize={10}
                                        />
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            size={"full"}
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
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            size={10}
                            controlSize={10}
                            rangeButton={0}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            size={8}
                            controlSize={10}
                            rangeButton={1}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            size={6}
                            controlSize={10}
                            rangeButton={2}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            size={8}
                            controlSize={10}
                        />
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            size={12}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            size={"fit"}
                            controlSize={10}
                        />
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            size={"full"}
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
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            labelSize={1}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            labelSize={2}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            labelSize={4}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
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
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            labelSize={1}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            labelSize={2}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            labelSize={4}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
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
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            controlSize={1}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            controlSize={2}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            controlSize={4}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
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
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            controlSize={1}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            controlSize={2}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            controlSize={4}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
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
                                - input daterange 의 Place Holder 를 설정
                                <br />- string
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{
                                                name: "start",
                                                placeholder: "insert start date",
                                            }}
                                            end={{
                                                name: "end",
                                                placeholder: "insert end date",
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
                            label="daterange"
                            type="daterange"
                            start={{
                                name: "start",
                                placeholder: "insert start date",
                            }}
                            end={{
                                name: "end",
                                placeholder: "insert end date",
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
                        title="1.5 Value(value) "
                        description={
                            <>
                                - input daterange 의 value 를 설정
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
                                            label="daterange"
                                            type="daterange"
                                            value={comnUtils.getDate({ y: -1, m: 1, d: 10 })}
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate({ y: 1, m: 1, d: 1 }) }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate({ y: 1, m: 1, d: 1 }) }}
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
                            label="daterange"
                            type="daterange"
                            value={comnUtils.getDate({ y: -1, m: 1, d: 10 })}
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate({ y: 1, m: 1, d: 1 }) }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate({ y: 1, m: 1, d: 1 }) }}
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
                        title="1.6 Read Only(readOnly) "
                        description={
                            <>
                                - input daterange 의 읽기전용 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate(), readOnly: true }}
                                            end={{ name: "end", value: comnUtils.getDate(), readOnly: true }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
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
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate(), readOnly: true }}
                            end={{ name: "end", value: comnUtils.getDate(), readOnly: true }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
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
                                - input daterange 의 사용가능 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate(), disabled: true }}
                                            end={{ name: "end", value: comnUtils.getDate(), disabled: true }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
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
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate(), disabled: true }}
                            end={{ name: "end", value: comnUtils.getDate(), disabled: true }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
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
                                - input daterange 의 필수 여부를 설정 ( default : false )
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
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            required={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
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
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            required={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
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
                                - input daterange 하단에 message 를 표시
                                <br />- "string"
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
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
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
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
                        title="1.10 Edit (edit) "
                        description={
                            <>
                                - input daterange 의 상세 조회 상태를 표시( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            edit={false}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
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
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            edit={false}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
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
                        title="1.11 Range Button (rangeButton) "
                        description={
                            <>
                                - input daterange 의 기간 설정을 위한 버튼 표시 타입
                                <br />- 0 | 1 | 2
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            rangeButton={0}
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            rangeButton={1}
                                            controlSize={10}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
                                            rangeButton={2}
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
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
                            edit={false}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="daterange"
                            type="daterange"
                            start={{ name: "start", value: comnUtils.getDate() }}
                            end={{ name: "end", value: comnUtils.getDate() }}
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
                </Layout>
            </Sample.Section>

            <Sample.Section title="2. 컴포넌트 사용방법(추가)">
                <Layout direction="col">
                    <Sample.Section
                        title="2.1 Left Button(leftButton)"
                        description={
                            <>
                                - input daterange 의 왼쪽에 버튼 추가 기능
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
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
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
                            label="daterange"
                            type="daterange"
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
                                - input daterange 의 오른쪽에 버튼 추가 기능
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
                                            label="daterange"
                                            type="daterange"
                                            start={{ name: "start", value: comnUtils.getDate() }}
                                            end={{ name: "end", value: comnUtils.getDate() }}
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
                            label="daterange"
                            type="daterange"
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
                                - input daterange 의 Change Event Handler
                                <br />
                                - input daterange 의 value 를 parameter로 전달
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
                                            label="daterange"
                                            type="daterange"
                                            start={{
                                                name: "start",
                                                value: comnUtils.getDate(),
                                                onChange: (e: any) => {
                                                    console.log(e);
                                                },
                                            }}
                                            end={{
                                                name: "end",
                                                value: comnUtils.getDate(),
                                                onChange: (e: any) => {
                                                    console.log(e);
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
                            label="daterange"
                            type="daterange"
                            start={{
                                name: "start",
                                value: comnUtils.getDate(),
                                onChange: (e: any) => {
                                    console.log(e);
                                },
                            }}
                            end={{
                                name: "end",
                                value: comnUtils.getDate(),
                                onChange: (e: any) => {
                                    console.log(e);
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
                        title="3.2 Blur Event(onBlur)"
                        description={
                            <>
                                - input daterange 의 Blur Event Handler
                                <br />
                                - input daterange 의 blur event 를 parameter로 전달
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
                                            label="daterange"
                                            type="daterange"
                                            start={{
                                                name: "start",
                                                value: comnUtils.getDate(),
                                                onBlur: (e: any) => {
                                                    console.log(e);
                                                },
                                            }}
                                            end={{
                                                name: "end",
                                                value: comnUtils.getDate(),
                                                onBlur: (e: any) => {
                                                    console.log(e);
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
                            label="daterange"
                            type="daterange"
                            start={{
                                name: "start",
                                value: comnUtils.getDate(),
                                onBlur: (e: any) => {
                                    console.log(e);
                                },
                            }}
                            end={{
                                name: "end",
                                value: comnUtils.getDate(),
                                onBlur: (e: any) => {
                                    console.log(e);
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
            <Sample.Section title="4. 컴포넌트 사용방법(스키마사용)">
                <Layout direction="col">
                    <Sample.Section title="4.1 스키마를 이용한 컴포넌트 사용 예시">
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control {...form.schema.daterange1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.daterange2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.daterange3} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                            <Group.Footer>
                                <Layout>
                                    <Layout.Left>
                                        <Button
                                            onClick={() => {
                                                console.log(form.getValues());
                                            }}
                                        >
                                            Get Value
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                form.setValues({
                                                    start1: "2020-01-01",
                                                    start2: "2020-01-01",
                                                    start3: "2020-01-01",
                                                    end1: "2020-12-31",
                                                    end2: "2020-12-31",
                                                    end3: "2020-12-31",
                                                });
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

    const SF_FORM: TFormSchema = {
        id: "form",
        schema: {
            daterange1: {
                type: "daterange",
                label: "dateramge11",
                start: { name: "start1", defaultValue: comnUtils.getDate() },
                end: { name: "end1", defaultValue: comnUtils.getDate() },
                rangeButton: 0,
                controlSize: 10,
            },
            daterange2: {
                type: "daterange",
                label: "dateramge12",
                start: { name: "start2", defaultValue: comnUtils.getDate() },
                end: { name: "end2", defaultValue: comnUtils.getDate() },
                rangeButton: 1,
                controlSize: 10,
            },
            daterange3: {
                type: "daterange",
                label: "dateramge13",
                start: { name: "start3", defaultValue: comnUtils.getDate() },
                end: { name: "end3", defaultValue: comnUtils.getDate() },
                rangeButton: 2,
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
                            {...form.schema.daterange1}
                            start={{ value: comnUtils.getDate() }}
                            end={{ value: comnUtils.getDate() }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.daterange2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.daterange3} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
            <Group.Footer>
                <Layout>
                    <Layout.Left>
                        <Button
                            onClick={() => {
                                console.log(form.getValues());
                            }}
                        >
                            Get Value
                        </Button>
                        <Button
                            onClick={() => {
                                form.setValues({
                                    start1: "2020-01-01",
                                    start2: "2020-01-01",
                                    start3: "2020-01-01",
                                    end1: "2020-12-31",
                                    end2: "2020-12-31",
                                    end3: "2020-12-31",
                                });
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
