import { Layout, Tab } from "@/com/components";
import { SampleForm } from "./samp-Form";
import { SampleTree } from "./samp-Tree";

export const SampleTab = () => {
    return (
        <Layout>
            <Tab tab={["tab1", "tab2", "tab3"]}>
                <Tab.Panel>
                    <SampleForm />
                </Tab.Panel>
                <Tab.Panel>
                    <SampleForm />
                </Tab.Panel>
                <Tab.Panel>
                    <SampleTree />
                </Tab.Panel>
            </Tab>
        </Layout>
    );
};
