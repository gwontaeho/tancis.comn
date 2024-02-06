import { useEffect } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Button, Table, Layout } from "@/comn/components";
import { TFormSchema, TFormValues } from "@/comn/hooks";
import { useForm, useResource } from "@/comn/hooks";

const SCHEMA: TFormSchema = {
    id: "Form",
    schema: {
        text: { type: "text", label: "Text" },
        number: { type: "number", label: "number" },
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

    const { schema } = useForm({
        defaultSchema: SCHEMA,
    });

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
                        ["resetSchema", ""],
                    ]}
                />
            </Sample.Section>

            <Sample.Section title="1. useForm + Components">
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
                    <Sample.Section title="Schema">
                        <Sample.Code>
                            {`
const SCHEMA: TFormSchema = {
    id: "Form",
    schema: {
        text: { type: "text", label: "Text" },
        number: { type: "number", label: "number" },
        date: { type: "date", label: "Date" },
        time: { type: "time", label: "Time" },
    },
};

`}
                        </Sample.Code>
                    </Sample.Section>

                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    const { schema } = useForm({
        defaultSchema: SCHEMA,
    });

    return (
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
    );
};
                    `}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="2. ">
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
                        <Sample.Button></Sample.Button>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    const { schema } = useForm({
        defaultSchema: SCHEMA,
    });

    return (
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
    );
};
                    `}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
