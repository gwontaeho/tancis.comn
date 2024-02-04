import { Sample } from "@/comn/components/_";
import { Tab, Layout } from "@/comn/components";
import { useTab } from "@/comn/hooks";

export const SampleTab = () => {
    return (
        <Sample title="Tab" description="">
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Component", "Description"],
                        ["<Tab />", "Tab Root Component"],
                        ["<Tab.Panel />", "Tab Panel"],
                    ]}
                />
            </Sample.Section>

            <Sample.Section title="1. 사용법" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Tab schema={[{ label: "Tab 1" }, { label: "Tab 2" }, { label: "Tab 3" }]}>
                            <Tab.Panel>Tab Panel 1</Tab.Panel>
                            <Tab.Panel>Tab Panel 2</Tab.Panel>
                            <Tab.Panel>Tab Panel 3</Tab.Panel>
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

            <Sample.Section title="2. " description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Tab schema={[{ label: "Tab 1" }, { label: "Tab 2" }, { label: "Tab 3" }]}>
                            <Tab.Panel>Tab Panel 1</Tab.Panel>
                            <Tab.Panel>Tab Panel 2</Tab.Panel>
                            <Tab.Panel>Tab Panel 3</Tab.Panel>
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
        </Sample>
    );
};
