import { useEffect } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Button, Table, Layout } from "@/comn/components";
import { TFormSchema, TFormValues } from "@/comn/hooks";
import { useForm, useResource } from "@/comn/hooks";

const SCHEMA: TFormSchema = {
    id: "Form",
    schema: {
        text: { type: "text", label: "Text", required: true },
        number: { type: "number", label: "Number", required: true },
        date: { type: "date", label: "Date" },
        time: { type: "time", label: "Time" },
    },
};

export const SampleUseForm = () => {
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0014" },
            { area: "comnCd", comnCd: "COM_0015" },
            { area: "currCd" },
            { area: "cityCd" },
            { area: "portAirptCd" },
            { area: "test" },
        ],
    });

    const {
        schema,
        getValues,
        getValue,
        setValues,
        setValue,
        clearValues,
        setSchema,
        setSchemas,
        resetSchema,
        setEditable,
        validate,
        clearErrors,
        errors,
        handleSubmit,
    } = useForm({
        defaultSchema: SCHEMA,
    });

    const newValues = {
        text: "Text",
        number: 123456,
        date: new Date(),
    };

    return (
        <Sample title="useForm">
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Parameters", "Description"],
                        ["defaultSchema", ""],
                        ["defaultValues", ""],
                    ]}
                />
                <Sample.Table
                    data={[
                        ["Returns", "Description"],
                        ["schema", "state"],
                        ["handleSubmit", "function"],
                        ["getValue", ""],
                        ["getValues", ""],
                        ["setValue", ""],
                        ["setValues", ""],
                        ["clearValues", ""],
                        ["setSchema", ""],
                        ["setSchemas", ""],
                        ["resetSchema", ""],
                        ["setEditable", ""],
                        ["setFocus", ""],
                        ["validate", ""],
                        ["clearErrors", ""],
                        ["watch", ""],
                        ["errors", ""],
                        ["isSubmitted", ""],
                        ["setError", ""],
                        ["setErrors", ""],
                        ["reset", ""],
                    ]}
                />
            </Sample.Section>

            <Sample.Section title="1. Get Value" description="다음은 Form의 값을 가져오는 예제입니다">
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...schema.text} />
                                <Group.Control {...schema.number} />
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...schema.date} />
                                <Group.Control {...schema.time} />
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                </Group>
                <Layout>
                    <Sample.Section>
                        <div className="flex flex-col gap-2">
                            <Sample.Button onClick={() => console.log(getValues())}>getValues</Sample.Button>
                            <Sample.Button onClick={() => console.log(getValue("text"))}>getValue</Sample.Button>
                        </div>
                    </Sample.Section>

                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    const { getValues, getValue } = useForm({
        defaultSchema: SCHEMA,
    });

    return (
        <>
            <button onClick={() => console.log(getValues())}>getValues</button>
            <button onClick={() => console.log(getValue("text"))}>getValue</button>
        </>
    );
};
                    `}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="2. Set Value" description="다음은 Form의 값을 설정하는 예제입니다">
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...schema.text} />
                                <Group.Control {...schema.number} />
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...schema.date} />
                                <Group.Control {...schema.time} />
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                </Group>
                <Layout>
                    <Sample.Section>
                        <div className="flex flex-col gap-2">
                            <Sample.Button onClick={() => setValues(newValues)}>setValues</Sample.Button>
                            <Sample.Button onClick={() => setValue("text", "Changed")}>setValue</Sample.Button>
                            <Sample.Button onClick={() => clearValues()}>clearValues</Sample.Button>
                        </div>
                    </Sample.Section>

                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    const { setValues, setValue, clearValues } = useForm({
        defaultSchema: SCHEMA,
    });

    const newValues = {
        text: "Text",
        number: 123456,
        date: new Date()
    };

    return (
        <>
            <button onClick={() => setValues(newValues)}>setValues</button>
            <button onClick={() => setValue("text", "Changed)}>setValue</button>
            <button onClick={() => clearValues()}>setValue</button>
        </>
    );
};
                    `}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="3. Change Schema" description="다음은 Form의 Schema를 변경하는 예제입니다">
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...schema.text} />
                                <Group.Control {...schema.number} />
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...schema.date} />
                                <Group.Control {...schema.time} />
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                </Group>
                <Layout direction="col">
                    <Sample.Section>
                        <div className="flex flex-wrap gap-4">
                            <Sample.Button onClick={() => setSchema("text", { type: "select" })}>
                                Text를 select로 변경
                            </Sample.Button>
                            <Sample.Button onClick={() => setSchemas(["number", "date"], { type: "select" })}>
                                Number, Date를 select로 변경
                            </Sample.Button>
                            <Sample.Button onClick={() => resetSchema()}>스키마 Reset</Sample.Button>
                            <Sample.Button onClick={() => setEditable(false)}>Edit false</Sample.Button>
                            <Sample.Button onClick={() => setEditable(true)}>Edit true</Sample.Button>
                            <Sample.Button onClick={() => setEditable("text", true)}>Text Edit true</Sample.Button>
                            <Sample.Button onClick={() => setEditable("text", false)}>Text Edit false</Sample.Button>
                        </div>
                    </Sample.Section>

                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    const { setSchema, setSchemas, resetSchema, setEditable } = useForm({
        defaultSchema: SCHEMA,
    });

    return (
        <>
            <button onClick={() => setSchema("text", { type: "select" })}>Text를 select로 변경</button>
            <button onClick={() => setSchemas(["number", "date"], { type: "select" })}>Number, Date를 select로 변경</button>
            <button onClick={() => resetSchema()}>스키마 Reset</button>
            <button onClick={() => setEditable(false)}>Edit false</button>
            <button onClick={() => setEditable(true)}>Edit true</button>
            <button onClick={() => setEditable("text", true)}>Text Edit true</button>
            <button onClick={() => setEditable("text", true)}>Text Edit false</button>
        </>
    );
};
                    `}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="4. Error" description="">
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...schema.text} />
                                <Group.Control {...schema.number} />
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...schema.date} />
                                <Group.Control {...schema.time} />
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                </Group>
                <Layout>
                    <Sample.Section>
                        <div className="flex flex-col flex-wrap gap-4">
                            <p className="text-lg">
                                validate()는 스키마에 정리된 규칙에 따라 폼을 검증하고 각 항목에 에러를 전달합니다
                                <br />
                                발생된 에러는 errors객체로 return됩니다
                            </p>
                            <Sample.Button onClick={() => validate()}>validate</Sample.Button>
                            <Sample.Button onClick={() => clearErrors()}>clearErrors</Sample.Button>
                            <p>{JSON.stringify(errors)}</p>
                        </div>
                    </Sample.Section>

                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    const { validate, clearErrors, errors } = useForm({
        defaultSchema: SCHEMA,
    });

    return (
        <>
            <button onClick={() => validate()}>validate</button>
            <button onClick={() => clearErrors()}>clearErrors</button>
            <p>{JSON.stringify(errors)}</p>
        </>
    );
};
                    `}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="5. Submit" description="">
                <form onSubmit={handleSubmit(console.log, console.log)}>
                    <Group>
                        <Group.Body>
                            <Group.Section>
                                <Group.Row>
                                    <Group.Control {...schema.text} />
                                    <Group.Control {...schema.number} />
                                </Group.Row>
                                <Group.Row>
                                    <Group.Control {...schema.date} />
                                    <Group.Control {...schema.time} />
                                </Group.Row>
                            </Group.Section>
                        </Group.Body>
                        <Group.Footer>
                            <Button type="submit">submit</Button>
                        </Group.Footer>
                    </Group>
                </form>

                <Layout>
                    <Sample.Section title="1. form 내부 버튼을 이용한 Submit">
                        <div className="flex flex-col flex-wrap gap-4">
                            <p className="text-lg">
                                handleSubmit()은 2개의 인자를 받으며 함수를 return합니다
                                <br />
                                <br />
                                이 함수는 폼을 검증하고,
                                <br />
                                성공 시 첫번째 인자로 전달된 callback을
                                <br />
                                실패 시 두번째 인자로 전달된 callback을 호출합니다
                                <br />
                                <br />
                                다음 예제에서는 form태그 onSubmit이벤트에 handleSubmit을 핸들러로 연결하고, form내부
                                button으로 submit을 발동합니다
                                <br />
                                <br />
                                성공 시, 실패 시 validate의 결과를 콘솔에 출력합니다
                            </p>
                            <p>{JSON.stringify(errors)}</p>
                        </div>
                    </Sample.Section>

                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    const { handleSubmit, errors } = useForm({
        defaultSchema: SCHEMA,
    });

    return (
        <form onSubmit={handleSubmit(console.log, console.log)}>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control {...schema.text} />
                            <Group.Control {...schema.number} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...schema.date} />
                            <Group.Control {...schema.time} />
                        </Group.Row>
                    </Group.Section>
                </Group.Body>
                <Group.Footer>
                    <Button type="submit">submit</Button>
                </Group.Footer>
            </Group>
        </form>
    );
};
                    `}</Sample.Code>
                    </Sample.Section>
                </Layout>
                <Layout>
                    <Sample.Section title="2. form 외부에서 Submit">
                        <div className="flex flex-col flex-wrap gap-4">
                            <p className="text-lg">
                                다음 예제에서는 form 태그 외부에서 handleSubmit의 return 함수를 호출하여 submit을
                                발동시킵니다
                            </p>
                            <Sample.Button onClick={() => handleSubmit(console.log, console.log)()}>
                                handleSubmit
                            </Sample.Button>
                            <p>{JSON.stringify(errors)}</p>
                        </div>
                    </Sample.Section>

                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    const { handleSubmit, errors } = useForm({
        defaultSchema: SCHEMA,
    });

    const handleClick = () => {
        handleSubmit(console.log, console.log)()
    }

    return (
        <>
            <button onClick={handleClick}>handleSubmit</button>
            <p>{JSON.stringify(errors)}</p>
        </>
    );
};
                    `}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
