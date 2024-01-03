import { useEffect } from "react";
import { Group, Button, Layout, FormControl } from "@/comn/components";
import { TFormSchema, TFormValues } from "@/comn/hooks";
import { useForm } from "@/comn/hooks";

const SCHEMA_SEARCH: TFormSchema = {
    id: "search",
    schema: {
        text: { type: "text", label: "text", required: true },
        number: { type: "number", label: "number" },
        password: { type: "password", label: "password" },
        textarea: {
            type: "textarea",
            label: "textarea",
            leftButton: { icon: "left", onClick: () => {} },
            rightButton: { icon: "left", onClick: () => {} },
        },
        select: { type: "select", label: "select" },
        checkbox: { type: "checkbox", label: "checkbox" },
        radio: { type: "radio", label: "radio" },
        date: { type: "date", label: "date" },
        time: { type: "time", label: "time" },
        datetime: { type: "datetime", label: "datetime" },
        file: { type: "file", multiple: true },
        daterange: {
            type: "daterange",
            label: "daterange",
            start: { name: "start" },
            end: { name: "end" },
            rangeButton: 0,
        },
        timerange: {
            type: "timerange",
            label: "timerange",
            start: { name: "start" },
            end: { name: "end" },
            rangeButton: 0,
        },
    },
};

const OPTION = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
];

export const SampleForm = () => {
    const {
        schema,
        setSchema,
        setFocus,
        setEditable,
        getValues,
        handleSubmit,
        setValue,
        clearErrors,
        resetSchema,
        validate,
        clearValues,
    } = useForm({
        defaultSchema: SCHEMA_SEARCH,
    });

    const onSubmit = (data: TFormValues) => {
        console.log(data);
    };

    useEffect(() => {}, []);

    const etr = (v: any) => {
        setEditable(v);
    };

    return (
        <Layout>
            <Group>
                <Group.Header title="Form" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...schema.text} />
                            <Group.Control {...schema.number} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...schema.password} />
                            <Group.Control {...schema.textarea} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...schema.select} options={OPTION} />
                            <Group.Control {...schema.checkbox} options={OPTION} />
                        </Group.Row>

                        <Group.Row>
                            <Group.Control {...schema.radio} options={OPTION} />
                            <Group.Control {...schema.date} />
                        </Group.Row>
                        {/* <Group.Row>
                            <Group.Control {...schema.time} />
                            <Group.Control {...schema.datetime} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...schema.daterange} controlSize={10} />
                        </Group.Row> */}
                        <Group.Row>
                            <Group.Control {...schema.daterange} controlSize={10} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...schema.file} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Col>
                                <Button type="submit">submit</Button>
                            </Group.Col>
                        </Group.Row>
                    </Group.Body>
                </form>
            </Group>
            <button onClick={(e) => console.log(getValues())}>asd</button>
            <button onClick={(e) => console.log(setValue("date", new Date()))}>asd</button>
            <button onClick={(e) => setSchema("text", { type: "select" })}>asd</button>
            <button onClick={(e) => setEditable(true)}>asd</button>
            <button onClick={(e) => setEditable(false)}>asd</button>
            <button onClick={(e) => setValue("date", new Date())}>sv</button>
        </Layout>
    );
};
