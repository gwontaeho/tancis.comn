import { useNavigate } from "react-router-dom";
import { Page, Wijmo, Group, Layout, Tab, Button } from "@/comn/components";
import { useForm, usePopup, TFormValues, TFormSchema } from "@/comn/hooks";

export const SCHEMA_FORM: TFormSchema = {
    id: "form",
    schema: {
        con1: { type: "text", label: "검색조건 1" },
    },
};

export const SampleCommonPopup = (props: any) => {
    const { openPopup, postMessage } = usePopup();

    const _form = useForm({ defaultSchema: SCHEMA_FORM });

    const onSubmit = (data: TFormValues) => {
        postMessage(data);
    };

    return (
        <Page>
            <Page.Navigation base="/sample/pages" nodes={[{ path: "/", label: "List" }, { label: "Regist" }]} />
            <Page.Header title="Common Code Popup Sample" description="Common Code Popup Sample" />
            <form onSubmit={_form.handleSubmit(onSubmit)}>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control
                                {..._form.schema.con1}
                                rightButton={{
                                    icon: "search",
                                    onClick: () => {
                                        openPopup({ url: "/" });
                                    },
                                }}
                            ></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Layout.Right>
                        <Button type="submit">검색</Button>
                    </Layout.Right>
                </Group>
            </form>
        </Page>
    );
};
