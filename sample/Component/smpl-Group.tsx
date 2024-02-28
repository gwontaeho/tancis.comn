import { Sample } from "@/comn/components/_";
import { FormControl, Group, Layout } from "@/comn/components";

export const SampleGroup = () => {
    return (
        <Sample
            title="Group"
            description="Group 컴포넌트는 Page 컴포넌트 하위에 기능이나 의미적인 구분을 위한 태그로 사용합니다"
        >
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Component", "Description"],
                        ["<Group />", ""],
                        ["<Group.Header />", ""],
                        ["<Group.Body />", ""],
                        ["<Group.Footer />", ""],
                        ["<Group.Section />", ""],
                        ["<Group.Title />", ""],
                        ["<Group.Row />", ""],
                        ["<Group.Col />", ""],
                        ["<Group.Label />", ""],
                        ["<Group.Control />", ""],
                    ]}
                />
            </Sample.Section>

            <Sample.Section
                title="1. 기본 구조"
                description="Group태그는 구분이 가능한 영역을 만들며 Header - Body - Footer로 구성되어있습니다"
            >
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Group>
                            <Group.Header>Group Header</Group.Header>
                            <Group.Body>
                                <Group.Section>Group Section 1</Group.Section>
                                <Group.Section>Group Section 2</Group.Section>
                                <Group.Section>Group Section 3</Group.Section>
                            </Group.Body>
                            <Group.Footer>Group Footer</Group.Footer>
                        </Group>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <Group>
            <Group.Header>Group Header</Group.Header>
            <Group.Body>
                <Group.Section>Group Section 1</Group.Section>
                <Group.Section>Group Section 2</Group.Section>
                <Group.Section>Group Section 3</Group.Section>
            </Group.Body>
            <Group.Footer>Group Footer</Group.Footer>
        </Group>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="2. Form" description="Group -> Body -> Section 내부에 Row단위로 작성합니다">
                <Layout direction="row">
                    <Sample.Section
                        title="Result"
                        description="각 Row는 12개의 Column으로 구성되어 컴포넌트의 Size props로 조절할 수 있습니다"
                    >
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
                                        <Group.Label label="Label" />
                                        <Group.Col colSize={6}>col with size 6</Group.Col>
                                        <Group.Label label="Label" type="text" labelSize={4} />
                                    </Group.Row>
                                    <Group.Row />
                                    <Group.Row>
                                        <Group.Label labelSize={1} />
                                        <Group.Col colSize={1} />
                                        <Group.Label labelSize={1} />
                                        <Group.Col colSize={1} />
                                        <Group.Label labelSize={1} />
                                        <Group.Col colSize={1} />
                                        <Group.Label labelSize={1} />
                                        <Group.Col colSize={1} />
                                        <Group.Label labelSize={1} />
                                        <Group.Col colSize={1} />
                                        <Group.Label labelSize={1} />
                                        <Group.Col colSize={1} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
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
                        <Group.Label label="Label" />
                        <Group.Col colSize={6}>col with size 6</Group.Col>
                        <Group.Label label="Label" type="text" labelSize={4} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
    </Group>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="3. Group Cell">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    {/* Row 1 */}
                                    <Group.Cell root>
                                        <Group.Cell header required>
                                            Label
                                        </Group.Cell>
                                        <Group.Cell size={4}>
                                            <FormControl />
                                        </Group.Cell>
                                        <Group.Cell header required></Group.Cell>
                                        <Group.Cell size={4}></Group.Cell>
                                    </Group.Cell>

                                    {/* Row 2 */}
                                    <Group.Cell root>
                                        <Group.Cell size={2} header></Group.Cell>
                                        <Group.Cell size={10}>
                                            <Group.Cell size={10}>
                                                <Group.Cell header></Group.Cell>
                                                <Group.Cell size={8}>
                                                    <Group.Cell size={8}></Group.Cell>
                                                    <Group.Cell size={8}></Group.Cell>
                                                </Group.Cell>
                                            </Group.Cell>
                                            <Group.Cell size={10}></Group.Cell>
                                        </Group.Cell>
                                    </Group.Cell>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    {/* Row 1 */}
                    <Group.Cell root>
                        <Group.Cell header required>
                            Label
                        </Group.Cell>
                        <Group.Cell size={4}>
                            <FormControl />
                        </Group.Cell>
                        <Group.Cell header required></Group.Cell>
                        <Group.Cell size={4}></Group.Cell>
                    </Group.Cell>

                    {/* Row 2 */}
                    <Group.Cell root>
                        <Group.Cell size={2} header></Group.Cell>
                        <Group.Cell size={10}>
                            <Group.Cell size={10}>
                                <Group.Cell header></Group.Cell>
                                <Group.Cell size={8}>
                                    <Group.Cell size={8}></Group.Cell>
                                    <Group.Cell size={8}></Group.Cell>
                                </Group.Cell>
                            </Group.Cell>
                            <Group.Cell size={10}></Group.Cell>
                        </Group.Cell>
                    </Group.Cell>
                </Group.Section>
            </Group.Body>
    </Group>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
