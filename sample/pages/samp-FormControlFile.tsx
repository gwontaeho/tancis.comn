import { Page, Group } from "@/com/components";

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
                            <Group.Control type="file" label="최대 길이" maxLength={5} />
                            <Group.Col>
                                <code>{`maxLength={5}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="file"
                                label="왼쪽 버튼"
                                leftButton={{ icon: "search", onClick: () => alert("click") }}
                            />
                            <Group.Col>
                                <code>{`leftButton={{icon:"search"}}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="file"
                                label="오른쪽 버튼"
                                rightButton={{ icon: "search", onClick: () => alert("click") }}
                            />
                            <Group.Col>
                                <code>{`rightButton={{icon:"search"}}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control type="file" label="에러" invalid={true} />
                            <Group.Col>
                                <code>{`invalid={true}`}</code>
                            </Group.Col>
                        </Group.Row>
                    </Group.Body>
                </form>
            </Group>
        </Page>
    );
};
