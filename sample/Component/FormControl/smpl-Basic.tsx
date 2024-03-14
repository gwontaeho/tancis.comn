import { useEffect, useState } from "react";
import { Sample } from "@/comn/components/_";
import { Group, Layout, FormControl, Button } from "@/comn/components";
import { useForm, TFormSchema, useResource } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils } from "@/comn/utils";

export const SampleFormControlBasic = () => {
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
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
            control: {
                label: "Form Control",
                type: "text",
                controlSize: 10,
                placeholder: "input text",
                onChange: (v: any) => {
                    form.setValue("value", v);
                },
            },
            value: {
                label: "Value(value)",
                type: "text",
                onChange: (v: any) => {
                    form.setValue("control", v);
                },
            },
            size: {
                label: "Size(size)",
                type: "select",
                options: [
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                    { label: "6", value: "6" },
                    { label: "8", value: "7" },
                    { label: "8", value: "8" },
                    { label: "9", value: "9" },
                    { label: "10", value: "10" },
                    { label: "11", value: "11" },
                    { label: "12", value: "12" },
                    { label: "auto", value: "auto" },
                    { label: "fit", value: "fit" },
                    { label: "full", value: "full" },
                ],
                onChange: (v: any) => {
                    form.setSchema("control", { size: v });
                },
            },
            label: {
                label: "Label(label)",
                type: "text",
                onChange: (v: any) => {
                    form.setSchema("control", { label: v });
                },
            },
            labelSize: {
                label: "Label Size(labelSize)",
                type: "select",
                options: [
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                    { label: "6", value: "6" },
                    { label: "8", value: "7" },
                    { label: "8", value: "8" },
                    { label: "9", value: "9" },
                    { label: "10", value: "10" },
                    { label: "11", value: "11" },
                    { label: "12", value: "12" },
                ],
                onChange: (v: any) => {
                    form.setSchema("control", { labelSize: v });
                },
            },
            labelYN: {
                label: "Label Y/N",
                type: "radio",
                options: [
                    { label: 'Y (label="값")', value: "Y" },
                    { label: "N (label=undefined)", value: "N" },
                ],
                onChange: (v: any) => {
                    if (v === "N") {
                        form.setSchema("control", { label: undefined });
                    } else {
                        form.setSchema("control", { label: form.getValue("label") });
                    }
                },
            },
            controlSize: {
                label: "Control Size(controlSize)",
                type: "select",
                options: [
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                    { label: "6", value: "6" },
                    { label: "8", value: "7" },
                    { label: "8", value: "8" },
                    { label: "9", value: "9" },
                    { label: "10", value: "10" },
                    { label: "11", value: "11" },
                    { label: "12", value: "12" },
                ],
                onChange: (v: any) => {
                    form.setSchema("control", { controlSize: v });
                },
            },
            maxLength: {
                label: "Max length(maxLength)",
                type: "number",
                onChange: (v: any) => {
                    form.setSchema("control", { maxLength: v });
                },
            },
            placeholder: {
                label: "Place Holder(placeholder)",
                type: "text",
                onChange: (v: any) => {
                    form.setSchema("control", { placeholder: v });
                },
            },
            letterCase: {
                label: "Letter Case(letterCase)",
                type: "select",
                options: [
                    { label: "Upper", value: "upper" },
                    { label: "Lower", value: "lower" },
                ],
                onChange: (v: any) => {
                    form.setSchema("control", { letterCase: v });
                },
            },
            imemode: {
                label: "Input Method Editor(imemode)",
                type: "select",
                options: [
                    { label: "number", value: "number" },
                    { label: "number+upper", value: "number+upper" },
                    { label: "number+lower", value: "number+lower" },
                ],
                onChange: (v: any) => {
                    form.setSchema("control", { imemode: v });
                },
            },
            required: {
                label: "Required",
                type: "radio",
                options: [
                    { label: "true", value: "Y" },
                    { label: "false", value: "N" },
                ],
                onChange: (v: any) => {
                    form.setSchema("control", { required: v === "Y" });
                },
            },
            message: {
                label: "Message",
                type: "text",
                onChange: (v: any) => {
                    form.setSchema("control", { message: v });
                },
            },
            error: {
                label: "Error",
                type: "text",
                onChange: (v: any) => {
                    form.setError("control", { message: v });
                },
            },
            readOnly: {
                label: "Read Only",
                type: "radio",
                options: [
                    { label: "true", value: "Y" },
                    { label: "false", value: "N" },
                ],
                onChange: (v: any) => {
                    form.setSchema("control", { readOnly: v === "Y" });
                },
            },
            disabled: {
                label: "Disabled",
                type: "radio",
                options: [
                    { label: "true", value: "Y" },
                    { label: "false", value: "N" },
                ],
                onChange: (v: any) => {
                    form.setSchema("control", { disabled: v === "Y" });
                },
            },
            edit: {
                label: "Edit",
                type: "radio",
                options: [
                    { label: "true", value: "Y" },
                    { label: "false", value: "N" },
                ],
                onChange: (v: any) => {
                    form.setSchema("control", { edit: v === "Y" });
                },
            },
            editColor: {
                label: "Text Color(edit=true, editColor)",
                type: "select",
                options: [
                    { label: "black", value: "black" },
                    { label: "white", value: "white" },
                    { label: "darkgray", value: "darkgray" },
                    { label: "gray", value: "gray" },
                    { label: "lightgray", value: "lightgray" },
                    { label: "blue", value: "blue" },
                    { label: "success", value: "success" },
                    { label: "error", value: "error" },
                    { label: "info", value: "info" },
                    { label: "warning", value: "warning" },
                ],
                onChange: (v: any) => {
                    form.setSchema("control", { editColor: v });
                },
            },
            color: {
                label: "Text Color(edit=false, color)",
                type: "select",
                options: [
                    { label: "black", value: "black" },
                    { label: "white", value: "white" },
                    { label: "darkgray", value: "darkgray" },
                    { label: "gray", value: "gray" },
                    { label: "lightgray", value: "lightgray" },
                    { label: "blue", value: "blue" },
                    { label: "success", value: "success" },
                    { label: "error", value: "error" },
                    { label: "info", value: "info" },
                    { label: "warning", value: "warning" },
                ],
                onChange: (v: any) => {
                    console.log(v);
                    form.setSchema("control", { color: v });
                },
            },
            bold: {
                label: "Text Bold(edit=false, bold)",
                type: "select",
                options: [
                    { label: "100", value: "100" },
                    { label: "300", value: "300" },
                    { label: "500", value: "500" },
                    { label: "700", value: "700" },
                    { label: "900", value: "900" },
                ],
                onChange: (v: any) => {
                    console.log(v);
                    form.setSchema("control", { bold: v });
                },
            },
            editBold: {
                label: "Text Bold(edit=true, editBold)",
                type: "select",
                options: [
                    { label: "100", value: "100" },
                    { label: "300", value: "300" },
                    { label: "500", value: "500" },
                    { label: "700", value: "700" },
                    { label: "900", value: "900" },
                ],
                onChange: (v: any) => {
                    console.log(v);
                    form.setSchema("control", { editBold: v });
                },
            },
            fontSize: {
                label: "Text Size(edit=false, fontSize)",
                type: "select",
                options: [
                    { label: "sm", value: "sm" },
                    { label: "base", value: "base" },
                    { label: "lg", value: "lg" },
                    { label: "xl", value: "xl" },
                    { label: "2xl", value: "2xl" },
                ],
                onChange: (v: any) => {
                    console.log(v);
                    form.setSchema("control", { fontSize: v });
                },
            },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: { text: "text", number: 9999.999, code: "A01", chechbox: ["A02"], startDt: comnUtils.getDate() },
    });

    useEffect(() => {
        console.log(form.schema.control);
        form.setValues(
            {
                size: form.schema.control.size || 12,
                label: form.schema.control.label,
                labelSize: form.schema.control.labelSize || 2,
                controlSize: form.schema.control.controlSize || 10,
                value: form.getValue("control"),
                labelYN: "Y",
                placeholder: form.schema.control.placeholder || "",
            },
            true,
        );
    }, []);

    //comnUtils.isEmpty()

    return (
        <Sample
            title="Form Component Basic"
            description="폼에서 사용하는 컴포넌트(Input, Select, Textarea...)에 대한 기본 사용방법"
        >
            <Sample.Section title="1. 컴포넌트 사용방법(기본)">
                <Layout direction="col">
                    <Sample.Section
                        title="1.1 <FormControl />"
                        description={<>- 컴포넌트(Input, Select, Textarea...) 단독으로 사용</>}
                    >
                        <Group>
                            <Group.Body>
                                <Group.Row>
                                    <Group.Control {...form.schema.control} />
                                </Group.Row>
                            </Group.Body>
                        </Group>

                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control {...form.schema.value} />
                                        <Group.Control {...form.schema.size} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.label} />
                                        <Group.Control {...form.schema.labelSize} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.labelYN} />
                                        <Group.Control {...form.schema.controlSize} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.maxLength} />
                                        <Group.Control {...form.schema.placeholder} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.letterCase} />
                                        <Group.Control {...form.schema.imemode} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.required} />
                                        <Group.Control {...form.schema.message} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.error} />
                                        <Group.Control {...form.schema.readOnly} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.edit} />
                                        <Group.Control {...form.schema.disabled} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.editColor} />
                                        <Group.Control {...form.schema.color} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.editBold} />
                                        <Group.Control {...form.schema.bold} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.fontSize} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
