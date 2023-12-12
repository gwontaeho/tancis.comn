import { Page, Group } from "@/com/components";

export const SampleFormControlRange = () => {
    return (
        <Page>
            <Group>
                <form>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control
                                type="range"
                                label="기본"
                                schema={{ start: { type: "date" }, end: { type: "date" } }}
                            />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="range"
                                label="필수"
                                required={true}
                                schema={{ start: { type: "date" }, end: { type: "date" } }}
                            />
                            <Group.Col>
                                <code>{`required={true}`}</code>
                            </Group.Col>
                        </Group.Row>

                        <Group.Row>
                            <Group.Control
                                type="range"
                                label="왼쪽 버튼"
                                leftButton={{ icon: "search", onClick: () => alert("click") }}
                                schema={{ start: { type: "date" }, end: { type: "date" } }}
                            />
                            <Group.Col>
                                <code>{`leftButton={{icon:"search"}}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="range"
                                label="오른쪽 버튼"
                                rightButton={{ icon: "search", onClick: () => alert("click") }}
                                schema={{ start: { type: "date" }, end: { type: "date" } }}
                            />
                            <Group.Col>
                                <code>{`rightButton={{icon:"search"}}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="range"
                                label="오른쪽 버튼"
                                rightButton={{ icon: "search", onClick: () => alert("click") }}
                                schema={{ start: { type: "date" }, end: { type: "date" } }}
                                rangebutton={0}
                                controlSize={6}
                            />
                            <Group.Col>
                                <code>{`rightButton={{icon:"search"}}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="range"
                                label="오른쪽 버튼"
                                rightButton={{ icon: "search", onClick: () => alert("click") }}
                                schema={{ start: { type: "date" }, end: { type: "date" } }}
                                rangebutton={1}
                                controlSize={6}
                            />
                            <Group.Col>
                                <code>{`rightButton={{icon:"search"}}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="range"
                                label="오른쪽 버튼"
                                rightButton={{ icon: "search", onClick: () => alert("click") }}
                                schema={{ start: { type: "date" }, end: { type: "date" } }}
                                rangebutton={2}
                                controlSize={6}
                            />
                            <Group.Col>
                                <code>{`rangebutton={2}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="range"
                                label="에러"
                                invalid={true}
                                schema={{ start: { type: "date" }, end: { type: "date" } }}
                            />
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
