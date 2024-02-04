import React, { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Layout, FormControl, Button } from "@/comn/components";
import Prism from "prismjs";
import { useForm, TFormSchema, useResource } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils } from "@/comn/utils";

export const SampleFormControlBasic = () => {
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

    const SG_FORM: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text", type: "text", controlSize: 10, size: 6, required: true },
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
            file: { label: "file", type: "file", labelSize: 6 },
        },
    };

    const SG_FORM_AFTER: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text 2", type: "text", required: true, readOnly: true },
            number: { label: "number 2", type: "number", required: true, thousandSeparator: false, decimalScale: 2 },
            password: { label: "password 2", type: "text", required: true },
            textarea: { label: "textarea 2", type: "textarea", required: true, rows: 10 },
            select: { label: "select 2", type: "select", required: true },
            radio: {
                label: "radio 2",
                type: "radio",
                area: "comnCd",
                comnCd: "CAG_0006",
                controlSize: 10,
                required: true,
            },
            checkbox: {
                label: "checkbox 2",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CAG_0006",
                required: true,
            },
            date: { label: "date 2", type: "date", controlSize: 2, required: true },
            time: { label: "time 2", type: "time", controlSize: 2, required: true },
            datetime: { label: "datetime", type: "datetime", controlSize: 2 },
            daterange: {
                label: "daterange 2",
                type: "daterange",
                start: { name: "startDt" },
                end: { name: "endDt" },
                rangeButton: 0,
                controlSize: 10,
            },
            timerange: {
                label: "timerange 2",
                type: "timerange",
                start: { name: "startTm" },
                end: { name: "endTm" },
                required: true,
            },
            code: { label: "code 2", type: "code", area: "comnCd", comnCd: "CAG_0006", maxLength: 3, required: true },
            file: { label: "file 2", type: "file", labelSize: 6, required: true },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: { text: "text", number: 9999.999, code: "A01", chechbox: ["A02"], startDt: comnUtils.getDate() },
    });

    return (
        <Sample
            title="Form Component Basic"
            description="폼에서 사용하는 컴포넌트(Input, Select, Textarea...)에 대한 기본 사용방법"
        >
            <Sample.Section title="1. 컴포넌트 사용방법(기본)">
                <Layout direction="col">
                    <Sample.Section
                        title="1.1 <FormControl />"
                        description={<>- 컴포넌트(Input, Select, Textarea...) 단독으로 사용</>}
                    >
                        <Group>
                            <Group.Body>
                                <FormControl type="text" value={"text"} size={5} />
                                <FormControl
                                    type="number"
                                    value={"9999.999"}
                                    thousandSeparator={true}
                                    decimalScale={3}
                                />
                                <FormControl type="password" value={"password"} size={6} />
                                <FormControl type="textarea" value={"textarea"} />
                                <FormControl type="select" options={code} />
                                <FormControl type="radio" options={code} />
                                <FormControl type="checkbox" options={code} all={true} />
                                <FormControl type="date" value={comnUtils.getDate()} />
                                <FormControl type="time" value={comnUtils.getDate()} />
                                <FormControl type="datetime" value={comnUtils.getDate()} />
                                <FormControl type="daterange" />
                                <FormControl type="timerange" />
                                <FormControl
                                    type="code"
                                    area="comnCd"
                                    comnCd="COM_0100"
                                    value="A01"
                                    size={4}
                                    maxLength={3}
                                />
                                <FormControl type="file" />
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {
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
                <FormControl type="text" value={"text"} size={5} />
                <FormControl
                    type="number"
                    value={"9999.999"}
                    thousandSeparator={true}
                    decimalScale={3}
                />
                <FormControl type="password" value={"password"} size={6} />
                <FormControl type="textarea" value={"textarea"} />
                <FormControl type="select" options={code} />
                <FormControl type="radio" options={code} />
                <FormControl type="checkbox" options={code} all={true} />
                <FormControl type="date" value={comnUtils.getDate()} />
                <FormControl type="time" value={comnUtils.getDate()} />
                <FormControl type="datetime" value={comnUtils.getDate()} />
                <FormControl type="daterange" />
                <FormControl type="timerange" />
                <FormControl type="code" area="comnCd" comnCd="COM_0100" value="A01" size={4}  maxLength={3} />
                <FormControl type="file" />
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>

                    <Layout direction="col">
                        <Sample.Section
                            title="1.2 <Group.Control />"
                            description={
                                <>
                                    - 라벨과 같이 사용 가능(label이 없을시 Form Control만 표시)
                                    <br />
                                    - 라벨, 폼컨트롤 사이즈 조절 가능(labelSize , controlSize)
                                    <br />- 라벨 지정가능(label)
                                </>
                            }
                        >
                            <Group>
                                <Group.Body>
                                    <Group.Section>
                                        <Group.Row>
                                            <Group.Control
                                                label="text"
                                                type="text"
                                                value={"text"}
                                                controlSize={10}
                                                size={6}
                                                required={true}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="number"
                                                type="number"
                                                value={"9999.999"}
                                                thousandSeparator={true}
                                                decimalScale={3}
                                                required={true}
                                            />
                                            <Group.Control label="password" type="password" value={"password"} />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="textarea"
                                                type="textarea"
                                                value={"textarea"}
                                                controlSize={10}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="select"
                                                type="select"
                                                options={code}
                                                controlSize={10}
                                                required={true}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control label="radio" type="radio" options={code} controlSize={10} />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="checkbox"
                                                type="checkbox"
                                                options={code}
                                                all={true}
                                                controlSize={10}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control
                                                label="date"
                                                type="date"
                                                value={comnUtils.getDate()}
                                                controlSize={2}
                                                required={true}
                                            />
                                            <Group.Control
                                                label="time"
                                                type="time"
                                                value={comnUtils.getDate()}
                                                controlSize={2}
                                            />
                                            <Group.Control
                                                label="datetime"
                                                type="datetime"
                                                value={comnUtils.getDate()}
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
                                                value="A01"
                                                maxLength={3}
                                            />
                                        </Group.Row>
                                        <Group.Row>
                                            <Group.Control labelSize={6} label="file" type="file" />
                                        </Group.Row>
                                    </Group.Section>
                                </Group.Body>
                            </Group>
                            <Sample.Section title="Source Code">
                                <Sample.Code>{`
const Sample = () => {
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
                            value={"text"}
                            controlSize={10}
                            size={6}
                            required={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="number"
                            type="number"
                            value={"9999.999"}
                            thousandSeparator={true}
                            decimalScale={3}
                            required={true}
                        />
                        <Group.Control label="password" type="password" value={"password"} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="textarea"
                            type="textarea"
                            value={"textarea"}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="select"
                            type="select"
                            options={code}
                            controlSize={10}
                            required={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control label="radio" type="radio" options={code} controlSize={10} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="checkbox"
                            type="checkbox"
                            options={code}
                            all={true}
                            controlSize={10}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="date"
                            type="date"
                            value={comnUtils.getDate()}
                            controlSize={2}
                            required={true}
                        />
                        <Group.Control
                            label="time"
                            type="time"
                            value={comnUtils.getDate()}
                            controlSize={2}
                        />
                        <Group.Control
                            label="datetime"
                            type="datetime"
                            value={comnUtils.getDate()}
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
                            value="A01"
                            maxLength={3}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control labelSize={6} label="file" type="file" />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
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

            <Sample.Section title="3. 컴포넌트 사용방법(Schema, useForm 사용)">
                <Layout direction="col">
                    <Sample.Section
                        title="3.1 <Group.Control /> + Schema + useForm(Hook)"
                        description={
                            <>
                                - Form Schema 를 정의 하고 컴포넌트에 주입
                                <br />- FormControl(Group.Control) 컴포넌트에 Schema 주입
                                <br />- useForm을 이용한 Form Component 제어(값변경, Schema 변경)
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control {...form.schema.text} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.number} />
                                        <Group.Control {...form.schema.password} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.textarea} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.select} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.radio} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.checkbox} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.date} />
                                        <Group.Control {...form.schema.time} />
                                        <Group.Control {...form.schema.datetime} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.daterange} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.timerange} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.code} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.file} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                            <Group.Footer>
                                <Layout>
                                    <Layout.Left>
                                        <Button
                                            onClick={() => {
                                                form.setValues({
                                                    text: "text",
                                                    number: 9999.999,
                                                    password: "password",
                                                    textarea: "textarea",
                                                    select: "Y",
                                                    radio: "A03",
                                                    checkbox: ["A01", "A02"],
                                                    date: comnUtils.getDate(),
                                                    time: comnUtils.getDate(),
                                                    startDt: comnUtils.getDate(),
                                                    endDt: comnUtils.getDate(),
                                                    startTm: comnUtils.getDate(),
                                                    endTm: comnUtils.getDate(),
                                                    datetime: comnUtils.getDate(),
                                                    code: "A01",
                                                });
                                            }}
                                        >
                                            값 세팅(전체)
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                form.clearValues();
                                            }}
                                        >
                                            값 초기화
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                form.setValue("text", "12345");
                                            }}
                                        >
                                            값 세팅(부분)
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                form.setValues(
                                                    {
                                                        text: "text",
                                                        number: 9999.999,
                                                        password: "password",
                                                        textarea: "textarea",
                                                        select: "N",
                                                        radio: "A04",
                                                        code: "A02",
                                                    },
                                                    true,
                                                );
                                            }}
                                        >
                                            값 세팅(부분)
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                form.setSchema("text", { readOnly: true });
                                            }}
                                        >
                                            스키마 변경(부분)
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                form.setSchemaAll(SG_FORM_AFTER);
                                            }}
                                        >
                                            스키마 변경(전체)
                                        </Button>
                                    </Layout.Left>
                                </Layout>
                            </Group.Footer>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    // state 선언
    const [state, setState] = useState<any | {}>({});

    // 코드, Resource 선언
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "wrhsCd" },
        ],
    });

    // 테스트 코드 선언
    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    // 스키마
    const SG_FORM: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text", type: "text", controlSize: 10, size: 6, required: true },
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
            file: { label: "file", type: "file", labelSize: 6 },
        },
    };

    // 변경 스키마
    const SG_FORM_AFTER: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text 2", type: "text", required: true, readOnly: true },
            number: { label: "number 2", type: "number", required: true, thousandSeparator: false, decimalScale: 2 },
            password: { label: "password 2", type: "text", required: true },
            textarea: { label: "textarea 2", type: "textarea", required: true, rows: 10 },
            select: { label: "select 2", type: "select", required: true },
            radio: {
                label: "radio 2",
                type: "radio",
                area: "comnCd",
                comnCd: "CAG_0006",
                controlSize: 10,
                required: true,
            },
            checkbox: {
                label: "checkbox 2",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CAG_0006",
                required: true,
            },
            date: { label: "date 2", type: "date", controlSize: 2, required: true },
            time: { label: "time 2", type: "time", controlSize: 2, required: true },
            datetime: { label: "datetime", type: "datetime", controlSize: 2 },
            daterange: {
                label: "daterange 2",
                type: "daterange",
                start: { name: "startDt" },
                end: { name: "endDt" },
                rangeButton: 0,
                controlSize: 10,
            },
            timerange: {
                label: "timerange 2",
                type: "timerange",
                start: { name: "startTm" },
                end: { name: "endTm" },
                required: true,
            },
            code: { label: "code 2", type: "code", area: "comnCd", comnCd: "CAG_0006", maxLength: 3, required: true },
            file: { label: "file 2", type: "file", labelSize: 6, required: true },
        },
    };

    // useForm Hook 생성
    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: { text: "text", number: 9999.999, code: "A01", chechbox: ["A02"], startDt: comnUtils.getDate() },
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control {...form.schema.text} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.number} />
                        <Group.Control {...form.schema.password} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.textarea} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.select} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.radio} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.checkbox} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.date} />
                        <Group.Control {...form.schema.time} />
                        <Group.Control {...form.schema.datetime} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.daterange} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.timerange} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.code} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.file} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
            <Group.Footer>
                <Layout>
                    <Layout.Left>
                        <Button
                            onClick={() => {
                                form.setValues({
                                    text: "text",
                                    number: 9999.999,
                                    password: "password",
                                    textarea: "textarea",
                                    select: "Y",
                                    radio: "A03",
                                    checkbox: ["A01", "A02"],
                                    date: comnUtils.getDate(),
                                    time: comnUtils.getDate(),
                                    startDt: comnUtils.getDate(),
                                    endDt: comnUtils.getDate(),
                                    startTm: comnUtils.getDate(),
                                    endTm: comnUtils.getDate(),
                                    datetime: comnUtils.getDate(),
                                    code: "A01",
                                });
                            }}
                        >
                            값 세팅(전체)
                        </Button>
                        <Button
                            onClick={() => {
                                form.clearValues();
                            }}
                        >
                            값 초기화
                        </Button>
                        <Button
                            onClick={() => {
                                form.setValue("text", "12345");
                            }}
                        >
                            값 세팅(부분)
                        </Button>
                        <Button
                            onClick={() => {
                                form.setValues(
                                    {
                                        text: "text",
                                        number: 9999.999,
                                        password: "password",
                                        textarea: "textarea",
                                        select: "N",
                                        radio: "A04",
                                        code: "A02",
                                    },
                                    true,
                                );
                            }}
                        >
                            값 세팅(부분)
                        </Button>
                        <Button
                            onClick={() => {
                                form.setSchema("text", { readOnly: true });
                            }}
                        >
                            스키마 변경(부분)
                        </Button>
                        <Button
                            onClick={() => {
                                form.setSchemaAll(SG_FORM_AFTER);
                            }}
                        >
                            스키마 변경(전체)
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
            </Sample.Section>
        </Sample>
    );
};
