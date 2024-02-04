import { Sample } from "@/comn/components/_";
import { Page, Group, Layout } from "@/comn/components";

export const SamplePage = () => {
    return (
        <Sample title="Page" description="">
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Props", "Description"],
                        ["id", ""],
                        ["title", ""],
                        ["description", ""],
                        ["navigation", ""],
                    ]}
                />
            </Sample.Section>

            <Sample.Section title="1. " description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Page
                            title="Page Title"
                            description="Page Description"
                            navigation={{
                                base: "/",
                                nodes: [
                                    { path: "/node1", label: "node1" },
                                    { path: "/node2", label: "node2" },
                                ],
                            }}
                        >
                            <Group>
                                <Group.Header>Group Header</Group.Header>
                                <Group.Body>
                                    <Group.Section>Group Section 1</Group.Section>
                                    <Group.Section>Group Section 2</Group.Section>
                                    <Group.Section>Group Section 3</Group.Section>
                                </Group.Body>
                                <Group.Footer>Group Footer</Group.Footer>
                            </Group>
                        </Page>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <Page
            title="Page Title"
            description="Page Description"
            navigation={{
                base: "/",
                nodes: [
                    { path: "/node1", label: "node1" },
                    { path: "/node2", label: "node2" },
                ],
            }}
        >
            <Group>
                <Group.Header>Group Header</Group.Header>
                <Group.Body>
                    <Group.Section>Group Section 1</Group.Section>
                    <Group.Section>Group Section 2</Group.Section>
                    <Group.Section>Group Section 3</Group.Section>
                </Group.Body>
                <Group.Footer>Group Footer</Group.Footer>
            </Group>
        </Page>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
