import { useEffect } from "react";
import { Page, Group, Button, Layout, Table, FormControl, IconButton } from "@/comn/components";
import { FormSchemaType, FormValuesType } from "@/comn/hooks";
import { useForm } from "@/comn/hooks";

const SCHEMA_SEARCH: FormSchemaType = {
    id: "search",
    schema: {
        text: {
            type: "text",
            label: "text",
            mask:'aaa',
            validate: (value: any) => value === "test" || "test를 써주세요",
            mask: "aaa-000",
        },
        number: { type: "number", label: "number", min: 3 },
        password: { type: "password", label: "password", required: true },
        textarea: {
            type: "textarea",
            label: "textarea",
            minLength: 3,
            leftButton: { icon: "left", onClick: () => {} },
            rightButton: { icon: "left", onClick: () => {} },
        },
        select: { type: "select", label: "select", required: true },
        checkbox: { type: "checkbox", label: "checkbox", all: true, required: true },
        radio: { type: "radio", label: "radio", required: true },
        date: { type: "date", label: "date", required: true },
        time: { type: "time", label: "time", required: true },
        datetime: { type: "datetime", label: "datetime", required: true },
        file: { type: "file", label: "file", multiple: true, required: true },
        code: { type: "code", label: "code", comnCd: "COM_0015", area: "comnCd", required: true },
        daterange: {
            type: "daterange",
            label: "daterange",
            start: { name: "startdate", required: true },
            end: { name: "enddate", required: true },
            rangeButton: 0,
        },
        timerange: {
            type: "timerange",
            label: "timerange",
            start: { name: "starttime", required: true },
            end: { name: "endtime", required: true },
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

export const SampleUseForm = () => {
    console.log("render");

    const {
        schema,
        setSchema,
        setValues,
        setEditable,
        getValues,
        handleSubmit,
        setValue,
        resetSchema,
        clearValues,
        clearErrors,
        watch,
        reset,
        isSubmitted,
        setFocus,
        validate,
    } = useForm({
        defaultSchema: SCHEMA_SEARCH,
        defaultValues: { code: "A01", radio: "1" },
    });

    const text = watch(["text"]);

    const onSubmit = (data: FormValuesType) => {
        console.log(data);
        console.log("a");
    };
    const onSubmit2 = (data: FormValuesType) => {
        console.log(data);
        console.log("b");
    };

    useEffect(() => {}, []);

    const etr = (v: any) => {
        setEditable(v);
    };

    return (
        <Page>
            <Group>
                <Group.Header title="Form" />
                <form>
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
                        <Group.Row>
                            <Group.Control {...schema.time} />
                            <Group.Control {...schema.datetime} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...schema.daterange} controlSize={10} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...schema.timerange} controlSize={10} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...schema.file} />
                            <Group.Control {...schema.code} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Label label="combine" />
                            <Group.Col combine={true}>
                                <Group.Control type="text" />
                                <Group.Control type="text" />
                                <Group.Control type="text" />
                                <Button>combine</Button>
                            </Group.Col>
                        </Group.Row>
                    </Group.Body>
                    <button onClick={handleSubmit(onSubmit)}>asd</button>
                    <button onClick={handleSubmit(onSubmit2)}>asdadasd</button>
                </form>
            </Group>

            <Table>
                <Table.Tr>
                    <Table.Th width={300}>
                        <Button
                            onClick={() => {
                                console.log(getValues());
                                // alert(JSON.stringify(getValues()))
                            }}
                        >
                            <code>getValues()</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                setValue("checkbox", ["1", "2"]);
                            }}
                        >
                            <code>setValue()</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                setValues({ text: "text", number: "001" });
                            }}
                        >
                            <code>{`setValues()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                clearValues();
                            }}
                        >
                            <code>{`clearValues()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                setEditable(true);
                            }}
                        >
                            <code>setEditable(true)</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                setEditable(false);
                            }}
                        >
                            <code>setEditable(false)</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                setSchema("datetime", { disabled: true });
                            }}
                        >
                            <code>{`setSchema("text", { disabled: true })`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                resetSchema();
                            }}
                        >
                            <code>{`resetSchema()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                validate();
                            }}
                        >
                            <code>{`validate()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                validate("text");
                            }}
                        >
                            <code>{`validate("text")`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                clearErrors();
                            }}
                        >
                            <code>{`clearErrors()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                clearErrors("text");
                            }}
                        >
                            <code>{`clearErrors("text")`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button onClick={handleSubmit((e) => console.log(e))}>
                            <code>{`handleSubmit(() => {})`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button onClick={() => reset()}>
                            <code>{`reset()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <code>{`const text = watch(["text"])`}</code>
                    </Table.Th>
                    <Table.Td>text : {text}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <code>{`isSubmitted`}</code>
                    </Table.Th>
                    <Table.Td>isSubmitted : {String(isSubmitted)}</Table.Td>
                </Table.Tr>
            </Table>
        </Page>
    );
};

// return {
//     schema: getSchema(_schema),
//     setSchema,
//     resetSchema,
//     setEditable,
//     getValues,
//     setValue,
//     setFocus,
//     handleSubmit,
//     validate,
//     clearValues,
//     clearErrors,
//     watch,
//     setValues,
//     errors,
//     isSubmitted,
// };
