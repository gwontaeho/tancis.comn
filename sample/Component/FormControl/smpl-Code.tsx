import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, FormSchemaType } from "@/comn/hooks";

export const SampleFormControlCode = () => {
    const SCHEMA_FORM: FormSchemaType = {
        id: "form",
        schema: {
            field1: {
                type: "code",
                area: "cityCd",
                label: "Region Code",
                controlSize: 10,
                popupSize: "md",
            },
            field2: {
                type: "code",
                area: "comnCd",
                comnCd: "COM_0015",
                label: "Common Code",
                controlSize: 10,
                popupSize: "md",
            },
            field3: {
                type: "code",
                area: "cntyCd",
                label: "Country Code",
                controlSize: 10,
                popupSize: "md",
            },
            field4: {
                type: "code",
                area: "currCd",
                label: "Currency Code",
                controlSize: 10,
                popupSize: "md",
            },
            field5: {
                type: "code",
                area: "bankCd",
                label: "Bank Code",
                controlSize: 10,
                popupSize: "md",
            },
        },
    };
    const form = useForm({ defaultSchema: SCHEMA_FORM });

    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.field1}
                            popupParams={{
                                cntyCd: () => form.getValues("field3"),
                                regnCd: () => form.getValues("field1"),
                            }}
                        ></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field2}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field3}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field4}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field5}></Group.Control>
                    </Group.Row>
                </Group.Body>
            </Group>

            <Group bgColor={false}>
                <Layout direction="row">
                    <Layout.Right>
                        <Button
                            onClick={() => {
                                console.log(form.getValues());
                            }}
                        >
                            Value
                        </Button>
                    </Layout.Right>
                </Layout>
            </Group>
        </Page>
    );
};
