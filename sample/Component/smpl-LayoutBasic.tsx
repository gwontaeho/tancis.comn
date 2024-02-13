import { useState } from "react";
import { Sample } from "@/comn/components/_";
import {
    Group,
    Layout,
    FormControl,
    Button,
    Grid,
    Icon,
    IconButton,
    Tooltip,
    Text,
    Tree,
    Tab,
    Table,
    Page,
} from "@/comn/components";
import { useForm, TFormSchema, useResource } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnEnvs, comnUtils } from "@/comn/utils";

export const SampleLayoutBasic = () => {
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "wrhsCd" },
        ],
    });

    const [state, setState] = useState<any | {}>({});

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    const SF_FORM: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text", type: "text", required: true },
            number: { label: "number", type: "number", thousandSeparator: true, decimalScale: 3, required: true },
            password: { label: "password", type: "password" },
            textarea: { label: "textarea", type: "textarea", controlSize: 10 },
            select: { label: "select", type: "select", options: code, required: true },
            radio: { label: "radio", type: "radio", area: "comnCd", comnCd: "COM_0100", controlSize: 10 },
            checkbox: {
                label: "checkbox",
                type: "checkbox",
                area: "comnCd",
                comnCd: "COM_0100",
                controlSize: 10,
                all: true,
            },
            date: { label: "date", type: "date", controlSize: 2, required: true },
            time: { label: "time", type: "time", controlSize: 2 },
            datetime: { label: "datetime", type: "datetime", controlSize: 2 },
            daterange: {
                label: "daterange",
                type: "daterange",
                start: { name: "startDt" },
                end: { name: "endDt" },
                rangeButton: 0,
                controlSize: 10,
            },
            timerange: { label: "timerange", type: "timerange", start: { name: "startTm" }, end: { name: "endTm" } },
            code: { label: "code", type: "code", area: "comnCd", comnCd: "COM_0100", maxLength: 3 },
        },
    };

    const form = useForm({
        defaultSchema: SF_FORM,
        defaultValues: {},
    });

    return (
        <Sample title="Layout Component Basic" description="화면의 레이아웃을 구성하는 컴포넌트에 대한 기본 사용방법">
            <Sample.Section title="1. 컴포넌트 사용방법(기본)">
                <Layout direction="col">
                    <Sample.Section title="1.1 Import" description={<>- Layout Component 를 Import</>}>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
// 필요한 컴포넌트들만 선택적으로 import 해서 사용                            
// Layout , Form Component Full Import                             
import { Group, Layout, FormControl, Button , Grid , Icon , IconButton , Tooltip , Text , Tree , Tab , Table , Page } from "@/comn/components";

// Form Component Full Import                             
import { Group , FormControl } from "@/comn/components";

// Layout Component Full Import                             
import { Group, Layout, Button , Grid , Icon , IconButton , Tooltip , Text , Tree , Tab , Table , Page } from "@/comn/components";

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.2 페이지 기본 구성"
                        description={
                            <>
                                - {`<Page>화면구성 컴포넌트</Page>로 구성`}
                                <br />- Group 별로 화면에서 Shadow를 가진 박스형태의 영역을 구성
                            </>
                        }
                    >
                        <Page
                            id="화면 ID"
                            title="화면명"
                            description="화면 설명(필요시 기재)"
                            navigation={{
                                base: comnEnvs.base, // 시스템 기본 경로
                                nodes: [
                                    { path: "/path1", label: "경로 1" },
                                    { path: "/path1/path2", label: "경로 2" },
                                    { path: "/path1/path2/path3", label: "경로 3" },
                                ],
                            }}
                        >
                            <Group>Group 1</Group>
                            <Group>Group 2</Group>
                            <Group>Group 3</Group>
                        </Page>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {
    return (
        <Page
            id="화면 ID"
            title="화면명"
            description="화면 설명(필요시)"
            navigation={{
                base: comnEnvs.base, // 시스템 기본 경로
                nodes: [
                    { path: "/path1", label: "경로 1" },
                    { path: "/path1/path2", label: "경로 2" },
                    { path: "/path1/path2/path3", label: "경로 3" },
                ],
            }}
        >
            <Group>Group 1</Group>
            <Group>Group 2</Group>
            <Group>Group 3</Group>
        </Page>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>

                    <Layout direction="col">
                        <Sample.Section
                            title="1.3 Group 컴포넌트 구성"
                            description={
                                <>
                                    - Group.Header, Group.Body , Group.Footer 로 구성
                                    <br />
                                    - Group.Title 컴포넌트로 제목글 표시(titleSize)
                                    <br />- Group.Body 안에 영역별로 Group.Section 으로 구분
                                    <br />- Group.Row 안에 Group.Control 로 컴포넌트 구성(라벨+폼컴포넌트)
                                    <br />- label 속성이 undefined 인 경우 라벨 없이 컴포넌트만 구성
                                    <br />- Label 과 컴포넌트 따로 구성이 필요한 경우 Group.Label , Group.Col 사용
                                    <br />- Group.Col 의 combine 속성으로 컴포넌트 그룹화 가능
                                    <br />- Layout 컴포넌트를 사용해 멀티 Row 형식으로 구성 가능
                                    <br />- Tab, Tab.Panel 을 사용해 탭으로 구분 가능
                                </>
                            }
                        >
                            <Page
                                id="화면 ID"
                                title="화면명"
                                description="화면 설명(필요시 기재)"
                                navigation={{
                                    base: comnEnvs.base, // 시스템 기본 경로
                                    nodes: [
                                        { path: "/path1", label: "경로 1" },
                                        { path: "/path1/path2", label: "경로 2" },
                                        { path: "/path1/path2/path3", label: "경로 3" },
                                    ],
                                }}
                            >
                                <Group>
                                    <Group.Header>
                                        <Group.Title title="Title 1" titleSize={1}></Group.Title>
                                    </Group.Header>
                                    <Group.Body>
                                        <Group.Title title="Section 1" titleSize={2}></Group.Title>
                                        <Group.Section>
                                            <Group.Row>
                                                <Group.Control {...form.schema.text}></Group.Control>
                                                <Group.Control {...form.schema.number}></Group.Control>
                                            </Group.Row>
                                            <Group.Row>
                                                <Group.Label
                                                    label={<FormControl {...form.schema.select} />}
                                                    required={true}
                                                ></Group.Label>
                                                <Group.Col>
                                                    <FormControl {...form.schema.text} />
                                                </Group.Col>
                                                <Group.Label label={"L_MRN"} required={true}></Group.Label>
                                                <Group.Col>
                                                    <FormControl {...form.schema.text} />
                                                    <Group.Any>-</Group.Any>
                                                    <FormControl {...form.schema.select} />
                                                    <Button icon="search">버튼</Button>
                                                </Group.Col>
                                            </Group.Row>
                                            <Group.Row>
                                                <Group.Label
                                                    label={<FormControl {...form.schema.select} />}
                                                    required={true}
                                                ></Group.Label>
                                                <Group.Col padding={0}>
                                                    <Layout direction="col" gap={0}>
                                                        <Layout direction="row" gap={0}>
                                                            <Group.Control {...form.schema.text} label={undefined} />
                                                            <Group.Control {...form.schema.select} label={undefined} />
                                                            <Group.Any>
                                                                <Button> 버튼</Button>
                                                            </Group.Any>
                                                        </Layout>
                                                        <Layout direction="row" gap={0}>
                                                            <Group.Control {...form.schema.text} label={undefined} />
                                                            <Group.Control {...form.schema.select} label={undefined} />
                                                            <Group.Any>
                                                                <Button> 버튼</Button>
                                                            </Group.Any>
                                                        </Layout>
                                                    </Layout>
                                                </Group.Col>
                                                <Group.Label label={"L_MRN"} required={true}></Group.Label>
                                                <Group.Field combine={true}>
                                                    <FormControl {...form.schema.text} />
                                                    <Group.Any>-</Group.Any>
                                                    <FormControl {...form.schema.select} />
                                                    <Button icon="search">버튼</Button>
                                                </Group.Field>
                                            </Group.Row>
                                        </Group.Section>

                                        <Group.Title title="Section 2" titleSize={2}></Group.Title>
                                        <Group.Section>
                                            <Group.Row>
                                                <Group.Control {...form.schema.text} controlSize={2}></Group.Control>
                                                <Group.Control {...form.schema.number} controlSize={2}></Group.Control>
                                                <Group.Control {...form.schema.select} controlSize={2}></Group.Control>
                                            </Group.Row>
                                        </Group.Section>

                                        <Group.Title title="Section 3" titleSize={2}></Group.Title>
                                        <Tab schema={[{ label: "Tab 1" }, { label: "Tab 2" }, { label: "Tab 3" }]}>
                                            <Tab.Panel>
                                                <Group.Title title="Tab Section 1" titleSize={3}></Group.Title>
                                                <Group.Section>
                                                    <Group.Row>
                                                        <Group.Control {...form.schema.text}></Group.Control>
                                                        <Group.Control {...form.schema.number}></Group.Control>
                                                    </Group.Row>
                                                </Group.Section>
                                            </Tab.Panel>
                                            <Tab.Panel>
                                                <Group.Title title="Tab Section 2" titleSize={3}></Group.Title>
                                                <Group.Section>
                                                    <Group.Row>
                                                        <Group.Control {...form.schema.text}></Group.Control>
                                                        <Group.Control {...form.schema.number}></Group.Control>
                                                    </Group.Row>
                                                </Group.Section>
                                            </Tab.Panel>
                                            <Tab.Panel>
                                                <Group.Title title="Tab Section 3" titleSize={3}></Group.Title>
                                                <Group.Section>
                                                    <Group.Row>
                                                        <Group.Control {...form.schema.text}></Group.Control>
                                                        <Group.Control {...form.schema.number}></Group.Control>
                                                    </Group.Row>
                                                </Group.Section>
                                            </Tab.Panel>
                                        </Tab>
                                    </Group.Body>
                                    <Group.Footer>
                                        <Layout>
                                            <Layout.Left>
                                                <Button>버튼</Button>
                                            </Layout.Left>
                                            <Layout.Right>
                                                <Button>버튼</Button>
                                            </Layout.Right>
                                        </Layout>
                                    </Group.Footer>
                                </Group>
                            </Page>
                            <Sample.Section title="Source Code">
                                <Sample.Code>{`
const Sample = () => {
    
    const SF_FORM: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text", type: "text", required: true },
            number: { label: "number", type: "number", thousandSeparator: true, decimalScale: 3, required: true },    
            select: { label: "select", type: "select", options: code, required: true },
        },
    };

    const form = useForm({
        defaultSchema: SF_FORM,
        defaultValues: {},
    });

    return (
            <Page
            id="화면 ID"
            title="화면명"
            description="화면 설명(필요시 기재)"
            navigation={{
                base: comnEnvs.base, // 시스템 기본 경로
                nodes: [
                    { path: "/path1", label: "경로 1" },
                    { path: "/path1/path2", label: "경로 2" },
                    { path: "/path1/path2/path3", label: "경로 3" },
                ],
            }}
        >
            <Group>
                <Group.Header>
                    <Group.Title title="Title 1" titleSize={1}></Group.Title>
                </Group.Header>
                <Group.Body>
                    <Group.Title title="Section 1" titleSize={2}></Group.Title>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control {...form.schema.text}></Group.Control>
                            <Group.Control {...form.schema.number}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Label
                                label={<FormControl {...form.schema.select} />}
                                required={true}
                            ></Group.Label>
                            <Group.Col>
                                <FormControl {...form.schema.text} />
                            </Group.Col>
                            <Group.Label label={"L_MRN"} required={true}></Group.Label>
                            <Group.Col>
                                <FormControl {...form.schema.text} />
                                <Group.Any>-</Group.Any>
                                <FormControl {...form.schema.select} />
                                <Button icon="search">버튼</Button>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row>
                            <Group.Label
                                label={<FormControl {...form.schema.select} />}
                                required={true}
                            ></Group.Label>
                            <Group.Col padding={0}>
                                <Layout direction="col" gap={0}>
                                    <Layout direction="row" gap={0}>
                                        <Group.Control {...form.schema.text} label={undefined} />
                                        <Group.Control {...form.schema.select} label={undefined} />
                                        <Group.Any>
                                            <Button> 버튼</Button>
                                        </Group.Any>
                                    </Layout>
                                    <Layout direction="row" gap={0}>
                                        <Group.Control {...form.schema.text} label={undefined} />
                                        <Group.Control {...form.schema.select} label={undefined} />
                                        <Group.Any>
                                            <Button> 버튼</Button>
                                        </Group.Any>
                                    </Layout>
                                </Layout>
                            </Group.Col>
                            <Group.Label label={"L_MRN"} required={true}></Group.Label>
                            <Group.Field combine={true}>
                                <FormControl {...form.schema.text} />
                                <Group.Any>-</Group.Any>
                                <FormControl {...form.schema.select} />
                                <Button icon="search">버튼</Button>
                            </Group.Field>
                        </Group.Row>
                    </Group.Section>

                    <Group.Title title="Section 2" titleSize={2}></Group.Title>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control {...form.schema.text} controlSize={2}></Group.Control>
                            <Group.Control {...form.schema.number} controlSize={2}></Group.Control>
                            <Group.Control {...form.schema.select} controlSize={2}></Group.Control>
                        </Group.Row>
                    </Group.Section>

                    <Group.Title title="Section 3" titleSize={2}></Group.Title>
                    <Tab schema={[{ label: "Tab 1" }, { label: "Tab 2" }, { label: "Tab 3" }]}>
                        <Tab.Panel>
                            <Group.Title title="Tab Section 1" titleSize={3}></Group.Title>
                            <Group.Section>
                                <Group.Row>
                                    <Group.Control {...form.schema.text}></Group.Control>
                                    <Group.Control {...form.schema.number}></Group.Control>
                                </Group.Row>
                            </Group.Section>
                        </Tab.Panel>
                        <Tab.Panel>
                            <Group.Title title="Tab Section 2" titleSize={3}></Group.Title>
                            <Group.Section>
                                <Group.Row>
                                    <Group.Control {...form.schema.text}></Group.Control>
                                    <Group.Control {...form.schema.number}></Group.Control>
                                </Group.Row>
                            </Group.Section>
                        </Tab.Panel>
                        <Tab.Panel>
                            <Group.Title title="Tab Section 3" titleSize={3}></Group.Title>
                            <Group.Section>
                                <Group.Row>
                                    <Group.Control {...form.schema.text}></Group.Control>
                                    <Group.Control {...form.schema.number}></Group.Control>
                                </Group.Row>
                            </Group.Section>
                        </Tab.Panel>
                    </Tab>
                </Group.Body>
                <Group.Footer>
                    <Layout>
                        <Layout.Left>
                            <Button>버튼</Button>
                        </Layout.Left>
                        <Layout.Right>
                            <Button>버튼</Button>
                        </Layout.Right>
                    </Layout>
                </Group.Footer>
            </Group>
        </Page>
    );
};

`}</Sample.Code>
                            </Sample.Section>
                        </Sample.Section>
                    </Layout>
                </Layout>
            </Sample.Section>
            <Sample.Section title="2. 컴포넌트 사용방법(기본+제어)">
                <Layout direction="col">
                    <Sample.Section
                        title="2.1 <FormControl /> + state"
                        description={<>- FormControl 을 state 를 통한 제어</>}
                    >
                        <Group>
                            <Group.Body>
                                <FormControl type="text" value={state.text} size={5} />
                                <FormControl
                                    type="number"
                                    value={state.number}
                                    thousandSeparator={true}
                                    decimalScale={3}
                                />
                                <FormControl type="password" value={state.password} size={6} />
                                <FormControl type="textarea" value={state.textarea} />
                                <FormControl type="select" options={code} value={state.select} />
                                <FormControl type="radio" options={code} value={state.radio} />
                                <FormControl type="checkbox" options={code} all={true} value={state.checkbox} />
                                <FormControl type="date" value={state.date} />
                                <FormControl type="time" value={state.time} />
                                <FormControl type="datetime" value={state.datetime} />
                                <FormControl type="daterange" />
                                <FormControl type="timerange" />
                                <FormControl
                                    type="code"
                                    area="comnCd"
                                    comnCd="COM_0100"
                                    value={state.code}
                                    size={4}
                                    maxLength={3}
                                />
                                <FormControl type="file" />
                            </Group.Body>
                            <Group.Footer>
                                <Layout>
                                    <Layout.Left>
                                        <Button
                                            onClick={() => {
                                                setState({
                                                    text: "text",
                                                    number: 9999.999,
                                                    password: "password",
                                                    textarea: "textarea",
                                                    select: "Y",
                                                    radio: "Y",
                                                    checkbox: ["Y", "N"],
                                                    date: comnUtils.getDate(),
                                                    time: comnUtils.getDate(),
                                                    datetime: comnUtils.getDate(),
                                                    code: "A01",
                                                });
                                            }}
                                        >
                                            값 세팅
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setState({});
                                            }}
                                        >
                                            값 초기화
                                        </Button>
                                    </Layout.Left>
                                </Layout>
                            </Group.Footer>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    const [state, setState] = useState<any | {}>({});
    useResource({
        defaultSchema: [{ area: "comnCd", comnCd: "COM_0100" }],
    });

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];
    return (
        <Group>
            <Group.Body>
                <FormControl type="text" value={state.text} size={5} />
                <FormControl
                    type="number"
                    value={state.number}
                    thousandSeparator={true}
                    decimalScale={3}
                />
                <FormControl type="password" value={state.password} size={6} />
                <FormControl type="textarea" value={state.textarea} />
                <FormControl type="select" options={code} value={state.select} />
                <FormControl type="radio" options={code} value={state.radio} />
                <FormControl type="checkbox" options={code} all={true} value={state.checkbox} />
                <FormControl type="date" value={state.date} />
                <FormControl type="time" value={state.time} />
                <FormControl type="datetime" value={state.datetime} />
                <FormControl type="daterange" />
                <FormControl type="timerange" />
                <FormControl type="code" area="comnCd" comnCd="COM_0100" value={state.code} size={4} maxLength={3} />
                <FormControl type="file" />
            </Group.Body>
            <Group.Footer>
                <Layout>
                    <Layout.Left>
                        <Button
                            onClick={() => {
                                setState({
                                    text: "text",
                                    number: 9999.999,
                                    password: "password",
                                    textarea: "textarea",
                                    select: "Y",
                                    radio: "Y",
                                    checkbox: ["Y", "N"],
                                    date: comnUtils.getDate(),
                                    time: comnUtils.getDate(),
                                    datetime: comnUtils.getDate(),
                                    code: "A01",
                                });
                            }}
                        >
                            값 세팅
                        </Button>
                        <Button
                            onClick={() => {
                                setState({});
                            }}
                        >
                            값 초기화
                        </Button>
                    </Layout.Left>
                </Layout>
            </Group.Footer>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>

                    <Layout direction="col">
                        <Sample.Section
                            title="2.2 <Group.Control /> + state"
                            description={<>- Group.Control 을 state 로 제어</>}
                        >
                            <Group>
                                <Group.Body>
                                    <Group.Section>
                                        <Group.Row>
                                            <Group.Control
                                                label="text"
                                                type="text"
                                                value={state.text}
                                                controlSize={10}
                                                size={6}
                                                required={true}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="number"
                                                type="number"
                                                value={state.number}
                                                thousandSeparator={true}
                                                decimalScale={3}
                                                required={true}
                                            />
                                            <Group.Control label="password" type="password" value={state.password} />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="textarea"
                                                type="textarea"
                                                value={state.textarea}
                                                controlSize={10}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="select"
                                                value={state.select}
                                                options={code}
                                                controlSize={10}
                                                required={true}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="radio"
                                                type="radio"
                                                options={code}
                                                controlSize={10}
                                                value={state.radio}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="checkbox"
                                                type="checkbox"
                                                options={code}
                                                all={true}
                                                controlSize={10}
                                                value={state.checkbox}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="date"
                                                type="date"
                                                value={state.date}
                                                controlSize={2}
                                                required={true}
                                            />
                                            <Group.Control
                                                label="time"
                                                type="time"
                                                value={state.time}
                                                controlSize={2}
                                            />
                                            <Group.Control
                                                label="datetime"
                                                type="datetime"
                                                value={state.datetime}
                                                controlSize={2}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control label="daterange" type="daterange" controlSize={10} />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="timerange"
                                                type="timerange"
                                                controlSize={10}
                                                size={9}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="code"
                                                type="code"
                                                area="comnCd"
                                                comnCd="COM_0100"
                                                value={state.code}
                                                maxLength={3}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control labelSize={6} label="file" type="file" />
                                        </Group.Row>
                                    </Group.Section>
                                </Group.Body>
                                <Group.Footer>
                                    <Layout>
                                        <Layout.Left>
                                            <Button
                                                onClick={() => {
                                                    setState({
                                                        text: "text",
                                                        number: 9999.999,
                                                        password: "password",
                                                        textarea: "textarea",
                                                        select: "Y",
                                                        radio: "Y",
                                                        checkbox: ["Y", "N"],
                                                        date: comnUtils.getDate(),
                                                        time: comnUtils.getDate(),
                                                        datetime: comnUtils.getDate(),
                                                        code: "A01",
                                                    });
                                                }}
                                            >
                                                값 세팅
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    setState({});
                                                }}
                                            >
                                                값 초기화
                                            </Button>
                                        </Layout.Left>
                                    </Layout>
                                </Group.Footer>
                            </Group>
                            <Sample.Section title="Source Code">
                                <Sample.Code>{`
const Sample = () => {
    const [state, setState] = useState<any | {}>({});
    useResource({
        defaultSchema: [{ area: "comnCd", comnCd: "COM_0100" }],
    });

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];
    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="text"
                            type="text"
                            value={state.text}
                            controlSize={10}
                            size={6}
                            required={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="number"
                            type="number"
                            value={state.number}
                            thousandSeparator={true}
                            decimalScale={3}
                            required={true}
                        />
                        <Group.Control label="password" type="password" value={state.password} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value={state.textarea}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            value={state.select}
                            options={code}
                            controlSize={10}
                            required={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="radio"
                            type="radio"
                            options={code}
                            controlSize={10}
                            value={state.radio}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={code}
                            all={true}
                            controlSize={10}
                            value={state.checkbox}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={state.date}
                            controlSize={2}
                            required={true}
                        />
                        <Group.Control
                            label="time"
                            type="time"
                            value={state.time}
                            controlSize={2}
                        />
                        <Group.Control
                            label="datetime"
                            type="datetime"
                            value={state.datetime}
                            controlSize={2}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="daterange" type="daterange" controlSize={10} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="timerange"
                            type="timerange"
                            controlSize={10}
                            size={9}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            value={state.code}
                            maxLength={3}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control labelSize={6} label="file" type="file" />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
            <Group.Footer>
                <Layout>
                    <Layout.Left>
                        <Button
                            onClick={() => {
                                setState({
                                    text: "text",
                                    number: 9999.999,
                                    password: "password",
                                    textarea: "textarea",
                                    select: "Y",
                                    radio: "Y",
                                    checkbox: ["Y", "N"],
                                    date: comnUtils.getDate(),
                                    time: comnUtils.getDate(),
                                    datetime: comnUtils.getDate(),
                                    code: "A01",
                                });
                            }}
                        >
                            값 세팅
                        </Button>
                        <Button
                            onClick={() => {
                                setState({});
                            }}
                        >
                            값 초기화
                        </Button>
                    </Layout.Left>
                </Layout>
            </Group.Footer>
        </Group>
    );
};

`}</Sample.Code>
                            </Sample.Section>
                        </Sample.Section>
                    </Layout>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
