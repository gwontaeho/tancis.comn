import { Page, Group } from "@/comn/components";
import { utils } from "@/comn/utils";

export const SampleFormControlSelect = () => {
    return (
        <Page>
            <Group>
                <form>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control type="select" label="기본" options={utils.getMockOptions()} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="select"
                                label="필수"
                                required={true}
                                options={utils.getMockOptions()}
                            />
                            <Group.Col>
                                <code>{`required={true}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="select"
                                label="왼쪽 버튼"
                                leftButton={{ icon: "search", onClick: () => alert("click") }}
                                options={utils.getMockOptions()}
                            />
                            <Group.Col>
                                <code>{`leftButton={{icon:"search"}}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="select"
                                label="오른쪽 버튼"
                                rightButton={{ icon: "search", onClick: () => alert("click") }}
                                options={utils.getMockOptions()}
                            />
                            <Group.Col>
                                <code>{`rightButton={{icon:"search"}}`}</code>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control type="select" label="에러" invalid={true} options={utils.getMockOptions()} />
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
