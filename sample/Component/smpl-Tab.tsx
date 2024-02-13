import { Sample } from "@/comn/components/_";
import { Tab, Layout, Button, Group } from "@/comn/components";
import { useTab } from "@/comn/hooks";

export const SampleTab = () => {
    const tab = useTab({
        defaultSchema: {
            id: "tab",
            schema: [{ label: "Tab 0" }, { label: "Tab 1" }, { label: "Tab 2" }],
        },
    });

    return (
        <Sample title="Tab & useTab" description="">
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Component", "Description"],
                        ["<Tab />", "Tab Root Component"],
                        ["<Tab.Panel />", "Tab Panel"],
                    ]}
                />
            </Sample.Section>

            <Sample.Section title="1. 기본 사용법" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Tab schema={[{ label: "Tab 0" }, { label: "Tab 1" }, { label: "Tab 2" }]}>
                            <Tab.Panel>Tab Panel 0</Tab.Panel>
                            <Tab.Panel>Tab Panel 1</Tab.Panel>
                            <Tab.Panel>Tab Panel 2</Tab.Panel>
                        </Tab>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <Tab schema={[{ label: "Tab 1" }, { label: "Tab 2" }, { label: "Tab 3" }]}>
            <Tab.Panel>Tab Panel 1</Tab.Panel>
            <Tab.Panel>Tab Panel 2</Tab.Panel>
            <Tab.Panel>Tab Panel 3</Tab.Panel>
        </Tab>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="2. 제어가 필요한 Tab 사용법" description="">
                <Layout direction="row">
                    <Group>
                        <Group.Body>
                            <Tab {...tab.tab}>
                                <Tab.Panel>Tab Panel 0</Tab.Panel>
                                <Tab.Panel>Tab Panel 1</Tab.Panel>
                                <Tab.Panel>Tab Panel 2</Tab.Panel>
                            </Tab>
                            <Layout>
                                <Layout.Left>
                                    <Button onClick={() => tab.setActive(2)}>active 2</Button>
                                    <Button onClick={() => tab.setLabel(2, "changed")}>change label 2</Button>
                                    <Button onClick={() => tab.setVisible(2, true)}>visible 2 true</Button>
                                    <Button onClick={() => tab.setVisible(2, false)}>visible 2 false</Button>
                                    <Button onClick={() => tab.setDisabled(1, true)}>disable 1 true</Button>
                                    <Button onClick={() => tab.setDisabled(1, false)}>disable 1 false</Button>
                                </Layout.Left>
                            </Layout>
                        </Group.Body>
                    </Group>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    const tab = useTab({
        defaultSchema: {
            id: "tab",
            schema: [{ label: "Tab 0" }, { label: "Tab 1" }, { label: "Tab 2" }],
        },
    });
    
    return (       
        <Group>
            <Group.Body>
                <Tab {...tab.tab}>
                    <Tab.Panel>Tab Panel 0</Tab.Panel>
                    <Tab.Panel>Tab Panel 1</Tab.Panel>
                    <Tab.Panel>Tab Panel 2</Tab.Panel>
                </Tab>
                <Layout>
                    <Layout.Left>
                        <Button onClick={() => tab.setActive(2)}>active 2</Button>
                        <Button onClick={() => tab.setLabel(2, "changed")}>change label 2</Button>
                        <Button onClick={() => tab.setVisible(2, true)}>visible 2 true</Button>
                        <Button onClick={() => tab.setVisible(2, false)}>visible 2 false</Button>
                        <Button onClick={() => tab.setDisabled(1, true)}>disable 1 true</Button>
                        <Button onClick={() => tab.setDisabled(1, false)}>disable 1 false</Button>
                    </Layout.Left>
                </Layout>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="3. 예제" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Group>
                            <Group.Header>Tab Sample Header</Group.Header>
                            <Group.Body>
                                <Tab
                                    {...tab.tab}
                                    onChange={(index) => {
                                        // 탭이 변경되었을때 index 번호와 onChange 이벤트를 호출
                                        console.log(index);
                                    }}
                                >
                                    <Tab.Panel>
                                        <Group.Section>Group Section 1</Group.Section>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <Group.Section>Group Section 2</Group.Section>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <Group.Section>Group Section 3</Group.Section>
                                    </Tab.Panel>
                                </Tab>
                            </Group.Body>
                            <Group.Footer>Tab Sample Footer</Group.Footer>
                        </Group>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    const {
        tab,
        setActive,
        setDisabled,
        setLabel,
        setVisible,
    } = useTab({
        defaultSchema: {
            id: "tab",
            schema: [
                { label: "Tab 0" },
                { label: "Tab 1" },
                { label: "Tab 2" },
            ],
        },
    });

    return (
        <Group>
            <Group.Header>Tab Sample Header</Group.Header>
            <Group.Body>
                 <Tab
                    {...tab}
                    onChange={(index) => {
                        // 탭이 변경되었을때 index 번호와 onChange 이벤트를 호출
                        console.log(index);
                    }}
                >
                    <Tab.Panel>
                        <Group.Section>Section 1</Group.Section>
                    </Tab.Panel>
                    <Tab.Panel>
                        <Group.Section>Section 2</Group.Section>
                    </Tab.Panel>
                    <Tab.Panel>
                        <Group.Section>Section 3</Group.Section>
                    </Tab.Panel>
                </Tab>
            </Group.Body>
            <Group.Footer>Tab Sample Footer</Group.Footer>
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
