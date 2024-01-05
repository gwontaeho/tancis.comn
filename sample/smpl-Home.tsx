import { Page, Group, Layout, Divider, Text } from "@/comn/components";

export const SampleHome = () => {
    return (
        <Page>
            <Layout direction="row" gap={4}>
                <Group flex={2}>
                    <Group.Header>Notification</Group.Header>
                    <Group.Body>
                        <Layout gap={4}>
                            <Layout direction="row">
                                <Layout.Left>
                                    <Text href="a" size="xl">
                                        Customs Solution
                                    </Text>
                                </Layout.Left>
                                <Layout.Right>
                                    <Text>System</Text>
                                    <Text>24.08/2023 08:50:17</Text>
                                </Layout.Right>
                            </Layout>
                            <Text>
                                Through transparency and traceability, customs are now able to facilitate trade by
                                eliminating unnecessary interventions. Our customs management solution allows each and
                                every customs division to access and manage customs data in the same system. Provides
                                automated system features to the entire customs processes.
                            </Text>
                            <Divider />
                            <Layout gap={2}>
                                <Layout direction="row">
                                    <Layout.Left>
                                        <Text href="a">
                                            · TRA officers arrives in Korea for Korea Customs Week 2023
                                        </Text>
                                    </Layout.Left>
                                    <Layout.Right>
                                        <Text>26.04/2023 08:59:22</Text>
                                    </Layout.Right>
                                </Layout>
                                <Layout direction="row">
                                    <Layout.Left>
                                        <Text href="a">
                                            · TRA participated as the main exhibitor at Korea Customs Week 2023
                                        </Text>
                                    </Layout.Left>
                                    <Layout.Right>
                                        <Text>26.04/2023 08:59:22</Text>
                                    </Layout.Right>
                                </Layout>
                                <Layout direction="row">
                                    <Layout.Left>
                                        <Text href="a">· TRA officially launched the TANCIS</Text>
                                    </Layout.Left>
                                    <Layout.Right>
                                        <Text>26.04/2023 08:59:22</Text>
                                    </Layout.Right>
                                </Layout>
                                <Layout direction="row">
                                    <Layout.Left>
                                        <Text href="a">· TRA received a delegation from CUPIA and Korea Customs</Text>
                                    </Layout.Left>
                                    <Layout.Right>
                                        <Text>26.04/2023 08:59:22</Text>
                                    </Layout.Right>
                                </Layout>
                                <Layout direction="row">
                                    <Layout.Left>
                                        <Text href="a">
                                            · TRA officers arrives in Korea for Korea Customs Week 2023
                                        </Text>
                                    </Layout.Left>
                                    <Layout.Right>
                                        <Text>26.04/2023 08:59:22</Text>
                                    </Layout.Right>
                                </Layout>
                            </Layout>
                        </Layout>
                    </Group.Body>
                </Group>

                <Group flex={1}>
                    <Group.Header>Exchange Rates</Group.Header>
                    <Group.Body></Group.Body>
                </Group>
            </Layout>

            <Layout direction="row" gap={4}>
                <Group flex={2}>
                    <Group.Header>Information</Group.Header>
                    <Group.Body></Group.Body>
                    <Group.Footer></Group.Footer>
                </Group>

                <Group flex={1}>
                    <Group.Header>Pop-Up Zone</Group.Header>
                    <Group.Body>
                        <Layout gap={2}>
                            <Text>24.08/2023 08:50:17</Text>
                            <Text href="a">Customs Solution</Text>
                            <Text>
                                Through transparency and traceability, customs are now able to facilitate trade by
                                eliminating unnecessary interventions. Our customs management solution allows each and
                                every customs division to access and manage customs data in the same system. Provides
                                automated system features to the entire customs processes.
                            </Text>
                        </Layout>
                    </Group.Body>
                    <Group.Footer></Group.Footer>
                </Group>
            </Layout>

            <Group>
                <Group.Header>Responsible Agency</Group.Header>
                <Group.Body></Group.Body>
            </Group>
        </Page>
    );
};
