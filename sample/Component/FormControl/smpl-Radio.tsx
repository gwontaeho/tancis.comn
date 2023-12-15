import { Page, Group } from "@/comn/components";
import { utils } from "@/comn/utils";

export const SampleFormControlRadio = () => {
    return (
        <Page>
            <Group>
                <form>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control type="radio" label="기본" options={utils.getMockOptions()} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control type="radio" label="code" area="currCd" />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control type="radio" label="필수" required={true} options={utils.getMockOptions()} />
                            <Group.Col>
                                <code>{`required={true}`}</code>
                            </Group.Col>
                        </Group.Row>

                        <Group.Row>
                            <Group.Control type="radio" label="에러" invalid={true} options={utils.getMockOptions()} />
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
