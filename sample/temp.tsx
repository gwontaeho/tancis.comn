import { useEffect, useRef } from "react";
import { Page, Button, Group, Layout } from "../components";

export const Temp = () => {
    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control />
                            <Group.Control />
                            <Group.Control />
                        </Group.Row>
                    </Group.Section>
                </Group.Body>
            </Group>
            <Layout direction="row">
                <Layout.Left>
                    <Button as="close"></Button>
                    <Button as="close"></Button>
                </Layout.Left>
                <Layout.Right>
                    <Button as="close"></Button>
                </Layout.Right>
            </Layout>
        </Page>
    );
};
