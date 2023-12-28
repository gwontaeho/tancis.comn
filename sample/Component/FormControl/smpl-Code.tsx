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
            },
        },
    };
    const form = useForm({ defaultSchema: SCHEMA_FORM });

    return (
        <Page>
            <Group>
                <Group.Row>
                    <Group.Control {...form.schema.field1}></Group.Control>
                </Group.Row>
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
