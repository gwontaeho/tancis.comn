import { useNavigate, useParams } from "react-router-dom";
import { useWijmo, useFetch } from "@/com/hooks";
import { Page, Wijmo, Group, Layout, Button, Tab } from "@/com/components";
import { SCHEMA_GRID_COMPONENTS, APIS } from "./SampleService";

/**
 * 샘플 상세 페이지
 */
export const SampleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const grid1 = useWijmo({ defaultSchema: SCHEMA_GRID_COMPONENTS });

    const {
        isSuccess,
        data: [group, components],
    } = useFetch({
        api: [() => APIS.getComponentGroup(id), () => APIS.getComponents(id)],
        enabled: true,
    });

    console.log(isSuccess);

    if (!isSuccess) return null;

    return (
        <Page>
            <Page.Navigation base="/page/sample" nodes={[{ path: "/", label: "List" }, { label: "Detail" }]} />
            <Page.Header title="Sample Detail" description="Sample Detail Description" />

            <Group>
                <Group.Body>
                    <Group.Row>
                        <Group.Col label="id">{group.id}</Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Col label="text">{group.textField}</Group.Col>
                        <Group.Col label="password">{group.passwordField}</Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Col label="integer">{group.integerField}</Group.Col>
                        <Group.Col label="select">{group.selectField}</Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Col label="date">{group.dateField}</Group.Col>
                        <Group.Col label="radio">{group.radioField}</Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Col label="textarea">{group.textareaField}</Group.Col>
                    </Group.Row>
                </Group.Body>

                <Layout direction="row">
                    <Layout.Left>
                        <Button onClick={() => navigate("/sample/pages")}>목록</Button>
                    </Layout.Left>
                    <Layout.Right>
                        <Button onClick={() => navigate(`/sample/pages/${id}/update`)}>수정</Button>
                    </Layout.Right>
                </Layout>
            </Group>

            <Group>
                <Tab tab={["첫번째"]}>
                    <Tab.Panel>{/* <Wijmo {...grid1.grid} data={components} /> */}</Tab.Panel>
                </Tab>
            </Group>
        </Page>
    );
};
