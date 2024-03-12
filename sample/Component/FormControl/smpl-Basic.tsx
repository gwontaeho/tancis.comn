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
                    { label: "Y", value: "Y" },
                    { label: "N (undefined)", value: "N" },
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
            option: {
                label: "Property",
                required: true,
                type: "select",
                options: [
                    { label: "type", value: "type" },
                    { label: "size", value: "size" },
                    { label: "labelSize", value: "labelSize" },
                    { label: "controlSize", value: "controlSize" },
                    { label: "maxLength", value: "maxLength" },
                    { label: "placeholder", value: "placeholder" },
                    { label: "value", value: "value" },
                    { label: "letterCase", value: "letterCase" },
                    { label: "readOnly", value: "readOnly" },
                    { label: "required", value: "required" },
                    { label: "message", value: "message" },
                    { label: "edit", value: "edit" },
                ],
            },
            onChange: (v: any) => {},
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
                                        <Group.Control {...form.schema.placeholder} />
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
