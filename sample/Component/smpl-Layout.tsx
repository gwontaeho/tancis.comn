import { Sample } from "@/comn/components/_";
import { Grid, Page, Group, Layout, Button } from "@/comn/components";
import { useGrid } from "@/comn/hooks";

export const SampleLayout = () => {
    const { grid } = useGrid({
        defaultSchema: {
            id: "test",
            options: {
                index: true,
                radio: true,
                checkbox: true,
                pagination: "in",
                height: 300,
            },
            head: [
                {
                    colspan: 2,
                    cells: [{ binding: "text", colspan: 2, width: 300 }],
                },
                {
                    id: "id",
                    cells: [{ binding: "number", width: 100 }],
                },
            ],
            body: [
                { colspan: 2, cells: [{ binding: "text" }, { binding: "text" }] },
                {
                    cells: [{ binding: "number" }],
                },
            ],
        },
    });

    return (
        <Sample title="Layout" description="레이아웃">
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Component", "Description"],
                        ["<Layout />", ""],
                        ["<Layout.Left />", ""],
                        ["<Layout.Right />", ""],
                    ]}
                />
            </Sample.Section>

            <Sample.Section title="1. 사용법" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Layout>
                            <Button>1</Button>
                            <Button>2</Button>
                            <Button>3</Button>
                        </Layout>
                        <Layout direction="col">
                            <Button>1</Button>
                            <Button>2</Button>
                            <Button>3</Button>
                        </Layout>
                        <Layout.Left>
                            <Button>1</Button>
                            <Button>2</Button>
                            <Button>3</Button>
                        </Layout.Left>
                        <Layout.Right>
                            <Button>1</Button>
                            <Button>2</Button>
                            <Button>3</Button>
                        </Layout.Right>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <>
            {/* 수평 방향  */}
            <Layout>
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
            </Layout>

            {/* 수직 방향 */}
            <Layout direction="col">
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
            </Layout>
            
            {/* 수평 왼쪽 정렬 */}
            <Layout.Left>
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
            </Layout.Left>

            {/* 수평 오른쪽 정렬 */}
            <Layout.Right>
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
            </Layout.Right>
        </>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="2. " description="Layout">
                <Sample.Section title="Result">
                    <Page>
                        <Layout gap={4}>
                            {/* 2개 Group 영역 분리 */}
                            <Group>
                                <Group.Body>
                                    <Group.Section>
                                        <Group.Row>
                                            <Group.Control label="Text" type="text" />
                                            <Group.Control label="Number" type="number" />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control label="Date" type="date" />
                                            <Group.Control controlSize={6} type="select" />
                                        </Group.Row>
                                        <Group.Row>
                                            {/* Col 내부 영역 분리 */}
                                            <Group.Col colSize={6}>
                                                <Layout>
                                                    <Button>1</Button>
                                                    <Button>2</Button>
                                                    <Button>3</Button>
                                                </Layout>
                                            </Group.Col>
                                            <Group.Col colSize={6}>
                                                <Layout.Right>
                                                    <Button>1</Button>
                                                    <Button>2</Button>
                                                </Layout.Right>
                                            </Group.Col>
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Col>
                                                <Layout direction="col">
                                                    <Button>1</Button>
                                                    <Button>2</Button>
                                                    <Button>3</Button>
                                                </Layout>
                                            </Group.Col>
                                        </Group.Row>
                                    </Group.Section>
                                </Group.Body>
                            </Group>
                            <Group>
                                <Group.Body>
                                    <Group.Section>
                                        <Group.Row>
                                            <Group.Control label="Text" type="text" controlSize={10} />
                                        </Group.Row>
                                    </Group.Section>
                                </Group.Body>
                            </Group>
                        </Layout>
                    </Page>
                </Sample.Section>

                <Sample.Section title="Code">
                    <Sample.Code>{`
const Sample = () => {
    return (
        <Page>
            <Layout gap={4}>
                {/* 2개 Group 영역 분리 */}
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control label="Text" type="text" />
                                <Group.Control label="Number" type="number" />
                            </Group.Row>
                            <Group.Row>
                                <Group.Control label="Date" type="date" />
                                <Group.Control controlSize={6} type="select" />
                            </Group.Row>
                            <Group.Row>
                                {/* Col 내부 영역 분리 */}
                                <Group.Col colSize={6}>
                                    <Layout>
                                        <Button>1</Button>
                                        <Button>2</Button>
                                        <Button>3</Button>
                                    </Layout>
                                </Group.Col>
                                <Group.Col colSize={6}>
                                    <Layout.Right>
                                        <Button>1</Button>
                                        <Button>2</Button>
                                    </Layout.Right>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Col>
                                    <Layout direction="col">
                                        <Button>1</Button>
                                        <Button>2</Button>
                                        <Button>3</Button>
                                    </Layout>
                                </Group.Col>
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                </Group>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control label="Text" type="text" controlSize={10} />
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                </Group>
            </Layout>
        </Page>
    );
};

`}</Sample.Code>
                </Sample.Section>
            </Sample.Section>
        </Sample>
    );
};
