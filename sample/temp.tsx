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
                    <Button role="close" variant="underlined" />
                    <Button role="close"></Button>
                </Layout.Left>
                <Layout.Right>
                    <Button></Button>
                    <Button color="gray">qwd</Button>
                    <Button color="gray" variant="outlined">
                        qwd
                    </Button>
                    <Button color="error" variant="outlined">
                        qwdqwd
                    </Button>
                    <Button color="gray">qwd</Button>
                </Layout.Right>
            </Layout>
        </Page>
    );
};
