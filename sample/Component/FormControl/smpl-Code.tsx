import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, TFormSchema } from "@/comn/hooks";

export const SampleFormControlCode = () => {
    const SCHEMA_FORM: TFormSchema = {
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
                area: "bnkCd",
                label: "Bank Code",
                controlSize: 10,
                popupSize: "md",
            },
            field6: {
                type: "code",
                area: "portCd",
                label: "Port Code",
                controlSize: 10,
                popupSize: "md",
            },
            field7: {
                type: "code",
                area: "airptCd",
                label: "Airport Code",
                controlSize: 10,
                popupSize: "md",
            },
            field8: {
                type: "code",
                area: "portAirptCd",
                label: "Port/Airport Code",
                controlSize: 10,
                popupSize: "md",
            },
            field9: {
                type: "code",
                area: "coCd",
                label: "Company Code",
                controlSize: 10,
                popupSize: "md",
            },
            field10: {
                type: "code",
                area: "prcssStatCd",
                label: "Processing Status Code",
                controlSize: 10,
                popupSize: "md",
            },
            field11: {
                type: "code",
                area: "orgCd",
                label: "Organization Code",
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
                        <Group.Control {...form.schema.field1}></Group.Control>
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
                    <Group.Row>
                        <Group.Control {...form.schema.field6}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field7}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field8}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field9}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field10}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field11}></Group.Control>
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
