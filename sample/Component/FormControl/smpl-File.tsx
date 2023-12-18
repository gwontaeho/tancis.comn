import { Page, Group } from "@/comn/components";

export const SampleFormControlFile = () => {
    return (
        <Page>
            <Group>
                <form>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control type="file" label="기본" />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control type="file" label="필수" required={true} />
                            <Group.Col>
                                <code>{`required={true}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control type="file" label="멀티" multiple={true} />
                            <Group.Col>
                                <code>{`multiple={true}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control type="file" label="최대 개수" multiple={true} maxLength={2} />
                            <Group.Col>
                                <code>{`multiple={true} maxLength={2}`}</code>
                            </Group.Col>
                        </Group.Row>
                    </Group.Body>
                </form>
            </Group>
        </Page>
    );
};
