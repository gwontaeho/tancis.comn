import { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Group, Layout, FormControl, Button } from "@/comn/components";
import { useForm, TFormSchema, useResource, useToast } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnEnvs, comnUtils } from "@/comn/utils";

export const GuideValidation = () => {
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "cgmePrcdCd", comnCd: "MER" },
            { area: "wrhsCd" },
        ],
    });

    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!

    const SF_SMPL: TFormSchema = {
        id: "smpl",
        schema: {
            text: {
                label: "text",
                type: "text",
                required: true,
                validate: (value: any) => {
                    if (value === "A01") return true;
                    return `[${value}]값이 유효하지 않습니다.`;
                },
                minLength: 3,
            },
            email: {
                label: "email",
                type: "text",
                required: true,
                pattern: { value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, message: "이메일 형식이 올바르지 않습니다" },
                controlSize: 10,
            },
            number: { label: "number", type: "number", required: true },
            password: { label: "password", type: "password", required: true },
            select: { label: "select", type: "select", area: "comnCd", comnCd: "COM_0100", required: true },
            radio: { label: "radio", type: "radio", area: "comnCd", comnCd: "COM_0100", required: true },
            checkbox: {
                label: "checkbox",
                type: "checkbox",
                area: "cgmePrcdCd",
                comnCd: "MER",
                all: true,
                required: true,
            },
            code: { label: "code", type: "code", area: "comnCd", comnCd: "COM_0100", maxLength: 3, required: true },
            date: { label: "date", type: "date", required: true },
            daterange: {
                label: "date range",
                type: "daterange",
                start: { name: "start", required: true },
                end: { name: "end", required: true },
                required: true,
                rangeButton: 0,
                controlSize: 10,
            },
        },
    };

    const form = {
        smpl: useForm({
            defaultSchema: SF_SMPL,
            defaultValues: {},
        }),
    };

    const handler = {
        saveSmpl: form.smpl.handleSubmit(
            (data) => {
                console.log(data);
            },
            (err) => {
                console.log(err);
                form.smpl.setFocus(err[0]);
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        ),
    };

    return (
        <Sample title="오류검증" description="Form, Grid Schema에 의한 오류검증 기본 사용방법">
            <Sample.Section title="오류검증 관련 속성">
                <Sample.Table
                    data={[
                        ["속성", "파라메터", "기본값", "내용"],
                        ["required", "boolean", "false", <>- 필수여부 오류검증</>],
                        ["min", "number", "", <>- 최소값 오류검증</>],
                        ["max", "number", "", <>- 최대값 오류검증</>],
                        ["minLength", "number", "", <>- 최소자리수 오류검증</>],
                        ["maxLength", "number", "", <>- 최대자리수 오류검증</>],
                        [
                            "validate",
                            "function",
                            "",
                            <>
                                - 함수형 오류검증
                                <br />- 컴포넌트의 값을 오류 검증하고 오류검증의 결과를 return 처리
                            </>,
                        ],
                        [
                            "pattern",
                            "정규식",
                            "",
                            <>
                                - 정규식 오류검증
                                <br />- 컴포넌트의 값을 정규식으로 검사하고 결과를 return
                            </>,
                        ],
                    ]}
                />
            </Sample.Section>
            <Sample.Section title="1. 사용방법(기본)">
                <Layout direction="col">
                    <Sample.Section
                        title="1.1 오류검증 설정을 스카마에 정의 후 폼의 handleSubmit 메소드를 이용하여 오류검증 실행"
                        description={<>-</>}
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control {...form.smpl.schema.text} />
                                        <Group.Control {...form.smpl.schema.number} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.smpl.schema.email} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.smpl.schema.password} />
                                        <Group.Control {...form.smpl.schema.select} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.smpl.schema.radio} />
                                        <Group.Control {...form.smpl.schema.checkbox} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.smpl.schema.code} />
                                        <Group.Control {...form.smpl.schema.date} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.smpl.schema.daterange} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                            <Group.Footer>
                                <Layout>
                                    <Layout.Left>
                                        <Button
                                            onClick={() => {
                                                handler.saveSmpl();
                                            }}
                                        >
                                            오류검증
                                        </Button>
                                    </Layout.Left>
                                </Layout>
                            </Group.Footer>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "cgmePrcdCd", comnCd: "MER" },
            { area: "wrhsCd" },
        ],
    });

    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!

    const SF_SMPL: TFormSchema = {
        id: "smpl",
        schema: {
            text: {
                label: "text",
                type: "text",
                required: true,
                validate: (value: any) => {
                    if (value === "A01") return true;
                    return \`[\${value}]값이 유효하지 않습니다.\`;
                },
                minLength: 3,
            },
            email: {
                label: "email",
                type: "text",
                required: true,
                pattern: { value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, message: "이메일 형식이 올바르지 않습니다" },
                controlSize: 10,
            },
            number: { label: "number", type: "number", required: true },
            password: { label: "password", type: "password", required: true },
            select: { label: "select", type: "select", area: "comnCd", comnCd: "COM_0100", required: true },
            radio: { label: "radio", type: "radio", area: "comnCd", comnCd: "COM_0100", required: true },
            checkbox: {
                label: "checkbox",
                type: "checkbox",
                area: "cgmePrcdCd",
                comnCd: "MER",
                all: true,
                required: true,
            },
            code: { label: "code", type: "code", area: "comnCd", comnCd: "COM_0100", maxLength: 3, required: true },
            date: { label: "date", type: "date", required: true },
            daterange: {
                label: "date range",
                type: "daterange",
                start: { name: "start", required: true },
                end: { name: "end", required: true },
                required: true,
                rangeButton: 0,
                controlSize: 10,
            },
        },
    };

    const form = {
        smpl: useForm({
            defaultSchema: SF_SMPL,
            defaultValues: {},
        }),
    };

    const handler = {
        saveSmpl: form.smpl.handleSubmit(
            (data) => {
                console.log(data);
            },
            (err) => {
                console.log(err);
                form.smpl.setFocus(err[0]);
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        ),
    };

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control {...form.smpl.schema.text} />
                        <Group.Control {...form.smpl.schema.number} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.smpl.schema.email} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.smpl.schema.password} />
                        <Group.Control {...form.smpl.schema.select} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.smpl.schema.radio} />
                        <Group.Control {...form.smpl.schema.checkbox} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.smpl.schema.code} />
                        <Group.Control {...form.smpl.schema.date} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.smpl.schema.daterange} />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
            <Group.Footer>
                <Layout>
                    <Layout.Left>
                        <Button
                            onClick={() => {
                                handler.saveSmpl();
                            }}
                        >
                            오류검증
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
