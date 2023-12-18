import { Page, Group, FormControl } from '@/comn/components'

export const SampleFormControlText = () => {
    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Row>
                        <Group.Control label="기본" />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="마스크" mask="TEST 000" />
                        <Group.Col>
                            <code>{`mask="TEST 000"`}</code>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="" mask="TEST AAA" />
                        <Group.Col>
                            <code>{`mask="TEST AAA"`}</code>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="" mask="TEST aaa" />
                        <Group.Col>
                            <code>{`mask="TEST aaa"`}</code>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="" mask="TEST " exact={false} />
                        <Group.Col>
                            <code>{`mask="TEST" exact={false}`}</code>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="필수" required={true} />
                        <Group.Col>
                            <code>{`required={true}`}</code>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="최대 길이" maxLength={5} />
                        <Group.Col>
                            <code>{`maxLength={5}`}</code>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="왼쪽 버튼"
                            leftButton={{ icon: 'search', onClick: () => alert('click') }}
                        />
                        <Group.Col>
                            <code>{`leftButton={{icon:"search"}}`}</code>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="오른쪽 버튼"
                            rightButton={{ icon: 'search', onClick: () => alert('click') }}
                        />
                        <Group.Col>
                            <code>{`rightButton={{icon:"search"}}`}</code>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="오른쪽 문자열" rightText="sample" />
                        <Group.Col>
                            <code>{`rightText="sample"`}</code>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="대문자" letterCase="upper" defaultValue="UPPER" />
                        <Group.Col>
                            <code>{`letterCase="upper"`}</code>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="소문자" letterCase="lower" defaultValue="lower" />
                        <Group.Col>
                            <code>{`letterCase="lower"`}</code>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="에러" invalid={true} />
                        <Group.Col>
                            <code>{`invalid={true}`}</code>
                        </Group.Col>
                    </Group.Row>
                </Group.Body>
            </Group>
        </Page>
    )
}
