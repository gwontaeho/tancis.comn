import { Page, Group } from "@/com/components";

export const SampleFormControlTime = () => {
    return (
        <Page>
            <Group>
                <form>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control type="time" label="기본" />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control type="time" label="필수" required={true} />
                            <Group.Col>
                                <code>{`required={true}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="time"
                                label="왼쪽 버튼"
                                leftButton={{ icon: "search", onClick: () => alert("click") }}
                            />
                            <Group.Col>
                                <code>{`leftButton={{icon:"search"}}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="time"
                                label="오른쪽 버튼"
                                rightButton={{ icon: "search", onClick: () => alert("click") }}
                            />
                            <Group.Col>
                                <code>{`rightButton={{icon:"search"}}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control type="time" label="에러" invalid={true} />
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
