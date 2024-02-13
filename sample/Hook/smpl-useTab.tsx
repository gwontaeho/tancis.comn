import { Sample } from "@/comn/components/_";
import { useTab } from "@/comn/hooks/useTab";
import { Tab, Group } from "@/comn/components";

export const SampleUseTab = () => {
    const { tab, value, setActive, setDisabled, setVisible, setLabel } = useTab({
        defaultSchema: {
            id: "tabid",
            schema: [
                { label: "Lorem Ipsum" },
                { label: "simply dummy text" },
                { label: "printing" },
                { label: "industry" },
            ],
        },
    });

    return (
        <>
            <Sample title="useTab">
                <Group>
                    <Group.Body>
                        <Tab {...tab}>
                            <Tab.Panel>
                                <Group.Section>1111</Group.Section>
                            </Tab.Panel>
                            <Tab.Panel>
                                <Group.Section>2222</Group.Section>
                            </Tab.Panel>
                            <Tab.Panel>
                                <Group.Section>3333</Group.Section>
                            </Tab.Panel>
                            <Tab.Panel>
                                <Group.Section>4444</Group.Section>
                            </Tab.Panel>
                        </Tab>
                    </Group.Body>
                </Group>

                <Tab
                    {...tab}
                    onChange={(index) => {
                        console.log(index);
                    }}
                >
                    <Tab.Panel>첫번째 탭</Tab.Panel>
                    <Tab.Panel>두번째 탭</Tab.Panel>
                    <Tab.Panel>세번째 탭</Tab.Panel>
                    <Tab.Panel>네번째 탭</Tab.Panel>
                </Tab>

                <Sample.Section title="useTab(props: UseTabProps): UseTabReturn">
                    <Sample.Table
                        data={[
                            ["Parameters", "Type", "Default", "Description"],
                            ["props", "UseTabProps", "", ""],
                            ["- id", "", "", ""],
                            ["- url", "", "", ""],
                            ["- params", "", "", ""],
                            ["- layout", "", "", ""],
                            ["- size", "", "", ""],
                            ["- callback", "", "", ""],
                        ]}
                    />
                    <Sample.Code>{`/* */

openPopup({
    url: "/comn/smpl/hooks/usePopupTarget"
});`}</Sample.Code>
                </Sample.Section>

                <Sample.Section title="setActive(index: number): void">
                    <Sample.Table
                        data={[
                            ["Parameters", "Type", "Default", "Description"],
                            ["index", "number", "", ""],
                        ]}
                    />
                    <Sample.Code exec={() => setActive(1)}>{`/* */

setActive(1);`}</Sample.Code>
                </Sample.Section>

                <Sample.Section title="setDisabled(index: number, status: boolean): void">
                    <Sample.Table
                        data={[
                            ["Parameters", "Type", "Default", "Description"],
                            ["index", "number", "", ""],
                            ["status", "boolean", "", ""],
                        ]}
                    />
                    <Sample.Code exec={() => setDisabled(2, true)}>{`/* */

setDisabled(2, true);`}</Sample.Code>
                    <Sample.Code exec={() => setDisabled(2, false)}>{`/* */

setDisabled(2, false);`}</Sample.Code>
                </Sample.Section>

                <Sample.Section title="setDisabled(index: number, status: boolean): void">
                    <Sample.Table
                        data={[
                            ["Parameters", "Type", "Default", "Description"],
                            ["index", "number", "", ""],
                            ["status", "boolean", "", ""],
                        ]}
                    />
                    <Sample.Code exec={() => setVisible(2, true)}>{`/* */

setVisible(2, true);`}</Sample.Code>
                    <Sample.Code exec={() => setVisible(2, false)}>{`/* */

setVisible(2, false);`}</Sample.Code>
                </Sample.Section>

                <Sample.Section title="setDisabled(index: number, status: boolean): void">
                    <Sample.Table
                        data={[
                            ["Parameters", "Type", "Default", "Description"],
                            ["index", "number", "", ""],
                            ["status", "boolean", "", ""],
                        ]}
                    />
                    <Sample.Code exec={() => setLabel(2, "changed")}>{`/* */

setLabel(2, "changed");`}</Sample.Code>
                    <Sample.Code exec={() => setLabel(2, "changed changed")}>{`/* */

setLabel(2, "changed changed");`}</Sample.Code>
                </Sample.Section>
            </Sample>
        </>
    );
};
