import { Sample } from "@/comn/components/_";
import { Tab, Layout, Button, Group } from "@/comn/components";
import { useTab } from "@/comn/hooks";

export const SampleTab = () => {
    const { tab, setActive, setDisabled, setLabel, setVisible } = useTab({
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
                    <Sample.Section title="Result">
                        <Tab {...tab}>
                            <Tab.Panel>Tab Panel 0</Tab.Panel>
                            <Tab.Panel>Tab Panel 1</Tab.Panel>
                            <Tab.Panel>Tab Panel 2</Tab.Panel>
                        </Tab>
                        <Button onClick={() => setActive(2)}>active 2</Button>
                        <Button onClick={() => setLabel(2, "changed")}>change label 2</Button>
                        <div className="flex gap-1">
                            <Button onClick={() => setVisible(2, true)}>visible 2 true</Button>
                            <Button onClick={() => setVisible(2, false)}>visible 2 false</Button>
                        </div>
                        <div className="flex gap-1">
                            <Button onClick={() => setDisabled(1, true)}>disable 1 true</Button>
                            <Button onClick={() => setDisabled(1, false)}>disable 1 false</Button>
                        </div>
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
        <Tab {...tab}>
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

            <Sample.Section title="3. 예제" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Group>
                            <Group.Header>Tab Sample Header</Group.Header>
                            <Group.Body>
                                <Tab {...tab}>
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
    return (
        <Group>
            <Group.Header>Tab Sample Header</Group.Header>
            <Group.Body>
                <Tab
                    schema={[
                        { label: "Tab 0" },
                        { label: "Tab 1" },
                        { label: "Tab 2" },
                    ]}
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
