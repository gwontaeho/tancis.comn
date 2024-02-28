import { useEffect, useState } from "react";
import { Sample } from "@/comn/components/_";
import { Group, Layout, FormControl, Button, Grid } from "@/comn/components";
import { useForm, TFormSchema, useResource, useToast, TGridSchema, useGrid } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { api } from "@/comn";

export const APIS = {
    // Get Repacking Item Application List !== 재포장 품목 신청서 목록 조회 ==!
    getRpckItmAppList: (data: any, page: number, size: number) => {
        return api.get(
            `${process.env.REACT_APP_API_SAMPLE}/api/v1/cgme/wrhs/rpck/rpck-itm-app?page=${page}&size=${size}`,
            {
                params: comnUtils.toGetParams(data),
            },
        );
    },
};

const code = [
    { label: "Y", value: "Y" },
    { label: "N", value: "N" },
];

export const SG_RPCK_ITM_APP_LIST: TGridSchema = {
    id: "grid",
    options: {
        checkbox: true, //체크박스 보이기 숨기기, default : false
        pagination: "in", // 그리드 데이터 페이징 "out" : 데이터를 외부에서 페이징해서 가져오는 경우 , "in" : 데이터를 전체 가져와서 그리드 내부에서 페이징 및 편집
        index: true, // 그리드 번호  index : true ( asc )  , index : "DESC" ( desc 역순 )
        edit: true, // 그리드 편집 가능 여부 , default : false
        height: 300,
    },
    head: [
        { cells: [{ header: "text", binding: "text", required: true, width: 150 }] },
        { cells: [{ header: "number", binding: "number", required: true, width: 150 }] },
        { cells: [{ header: "date", binding: "date", required: true, width: 150 }] },
        { cells: [{ header: "select", binding: "select", required: true, width: 150 }] },
        { cells: [{ header: "checkbox", binding: "checkbox", required: true, width: 150 }] },
        { cells: [{ header: "radio", binding: "radio", required: true, width: 150 }] },
        { cells: [{ header: "code", binding: "code", required: true, width: "2*" }] },
    ],
    body: [
        { cells: [{ binding: "text", type: "text", required: true }] },
        { cells: [{ binding: "number", type: "number" }] },
        { cells: [{ binding: "date", type: "date" }] },
        { cells: [{ binding: "select", type: "select", options: code }] },
        { cells: [{ binding: "checkbox", type: "checkbox", options: code }] },
        { cells: [{ binding: "radio", type: "radio", options: code }] },
        { cells: [{ binding: "code", type: "code", area: "comnCd", comnCd: "CGM0055" }] },
    ],
};

export const GuideValidation = () => {
    useResource({
        defaultSchema: [{ area: "comnCd", comnCd: "CGM0055" }, { area: "wrhsCd" }],
    });

    const [gridData, setGridData] = useState(comnUtils.getGridData([{}, {}, {}]));

    const grid = {
        // Repacking Item Application List !== 재포장 품목 신청서 목록 ==!
        sample: useGrid({
            defaultSchema: SG_RPCK_ITM_APP_LIST,
        }),
    };

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
            select: {
                label: "select",
                type: "select",
                area: "comnCd",
                comnCd: "CGM0055",
                required: true,
                editType: "both",
            },
            radio: { label: "radio", type: "radio", area: "comnCd", comnCd: "CGM0055", required: true },
            checkbox: {
                label: "checkbox",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CGM0055",
                all: true,
                required: true,
            },
            code: { label: "code", type: "code", area: "comnCd", comnCd: "CGM0055", maxLength: 3, required: true },
            date: { label: "date", type: "date", required: true },
            daterange: {
                label: "date range",
                type: "daterange",
                start: { name: "start", required: true },
                end: { name: "end", required: true },
                required: true,
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

    useEffect(() => {
        //
    }, []);

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
                        title="1.1 Form 오류검증"
                        description={
                            <>- 오류검증 설정을 스카마에 정의 후 폼의 handleSubmit 메소드를 이용하여 오류검증 실행</>
                        }
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
                                        <Group.Control {...form.smpl.schema.select} select={false} />
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
                                        <Group.Control {...form.smpl.schema.daterange} />
                                    </Group.Row>
                                    <Group.Row>
                                        {/* Status !== 상태 ==! */}
                                        <Group.Label label={"L_STTS"} />
                                        <Group.Col colSize={10}>
                                            <Layout gap={0}>
                                                <FormControl {...form.smpl.schema.text} />
                                                &nbsp;[
                                                <FormControl {...form.smpl.schema.date} />]
                                            </Layout>
                                        </Group.Col>
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                            <Group.Footer>
                                <Layout>
                                    <Layout.Left>
                                        <Button
                                            onClick={() => {
                                                //form.smpl.setValues({ start: "2020-01-01", end: "2020-01-01" });
                                                form.smpl.setEditable(false);
                                                //handler.saveSmpl();
                                            }}
                                        >
                                            오류검증
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                console.log(form.smpl.getValues());
                                                //handler.saveSmpl();
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

    /* 코드성 데이터 리소스 사용 선언 */
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

    /* 폼 스키마 선언(오류검증) */
    const SF_SMPL: TFormSchema = {
        id: "smpl",
        schema: {
            text: {
                label: "text",
                type: "text",
                // 필수값 오류검증
                required: true,
                // 함수형 오류검증
                validate: (value: any) => {
                    if (value === "A01") return true;
                    return \`[\${value}]값이 유효하지 않습니다.\`;
                },
                // 최소자리수 오류검증
                minLength: 3,
            },
            email: {
                label: "email",
                type: "text",
                // 필수값 오류검증
                required: true,
                // 정규식 오류검증(이메일)
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
                    <Sample.Section title="1.2 그리드 오류검증" description={<>-</>}>
                        <Group>
                            <Group.Body>
                                <Grid {...grid.sample.grid} data={gridData} />
                            </Group.Body>
                            <Group.Footer>
                                <Layout>
                                    <Layout.Left>
                                        <Button
                                            onClick={() => {
                                                console.log(grid.sample.validate());
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

    
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
