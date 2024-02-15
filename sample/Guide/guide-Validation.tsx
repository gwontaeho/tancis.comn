import { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Group, Layout, FormControl, Button } from "@/comn/components";
import { useForm, TFormSchema, useResource, useModal } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnEnvs, comnUtils } from "@/comn/utils";

export const GuideValidation = () => {
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "wrhsCd" },
        ],
    });

    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    const SF_FORM: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text", type: "text" },
            select1: { label: "select 1", type: "select", area: "comnCd", comnCd: "COM_0100" },
            select2: { label: "select 2", type: "select", options: code },
            radio: { label: "radio", type: "radio", area: "comnCd", comnCd: "CAG_0018" },
            checkbox: {
                label: "checkbox",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CAG_0006",
                all: true,
            },
            code: { label: "code", type: "code", area: "wrhsCd", maxLength: 5 },
        },
    };

    const form = useForm({
        defaultSchema: SF_FORM,
        defaultValues: {},
    });

    return (
        <Sample title="오류검증" description="Form, Grid Schema에 의한 오류검증 기본 사용방법">
            <Sample.Section title="오류검증 관련 속성">
                <Sample.Table
                    data={[
                        ["속성", "파라메터", "기본값", "사용 방법"],
                        ["required", "false", "true", "comnCd", "comnEnvs.popup.comnCd"],
                    ]}
                />
            </Sample.Section>
            <Sample.Section title="1. 사용방법(기본)">
                <Layout direction="col">
                    <Sample.Section
                        title="1.1 코드 데이터를 사용하는 컴포넌트에 area , comnCd 속성을 이용해 사용"
                        description={
                            <>
                                - area : 코드성 데이터 구분
                                <br />- comnCd : area 가 comnCd(공통코드)인 경우 공통코드 그룹ID를 추가로 기재하여 사용
                                <br />- useResource : 컴포넌트 상단에 코드 재사용을 위해 컴포넌트에서 사용하는 모든
                                코드성 데이터 선언
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            {...form.schema.text}
                                            rightButton={{
                                                icon: "search",
                                                onClick: () => {
                                                    // 팝업창을 호출하여 사용하는 경우
                                                    modal.openModal({
                                                        url: comnEnvs.popup.wrhsCd,
                                                        draggable: true,
                                                        // modal 창에서 postMessage 메서드 실행시 call back 함수
                                                        callback: (data) => {
                                                            // form에 값 세팅
                                                            form.setValue("text", data.code);
                                                            // modal 창 닫기
                                                            modal.closeModal();
                                                        },
                                                    });
                                                },
                                            }}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.select1} />
                                        <Group.Control {...form.schema.select2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.radio} />
                                        <Group.Control {...form.schema.checkbox} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.code} />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    // 코드성 데이터 리소스 정의
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "wrhsCd" },
        ],
    });

    // 사용자 코드 정의( options에 사용)
    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    // form 스키마 정의 (area , comnCd 등을 정의)
    const SF_FORM: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text", type: "text" },
            select1: { label: "select 1", type: "select", area: "comnCd", comnCd: "COM_0100" },
            select2: { label: "select 2", type: "select", options: code },
            radio: { label: "radio", type: "radio", area: "comnCd", comnCd: "CAG_0018" },
            checkbox: {
                label: "checkbox",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CAG_0006",
                all: true,
            },
            code: { label: "code", type: "code", area: "wrhsCd", maxLength: 5 },
        },
    };

    const form = useForm({
        defaultSchema: SG_FORM,
        defaultValues: {},
    });
    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.text}
                            rightButton={{
                                icon: "search",
                                onClick: () => {
                                    modal.openModal({
                                        url: comnEnvs.popup.wrhsCd,
                                        draggable: true,
                                        // modal 창에서 postMessage 메서드 실행시 call back 함수
                                        callback: (data) => {
                                            // form에 값 세팅
                                            form.setValue("text", data.code);
                                            // modal 창 닫기
                                            modal.closeModal();
                                        },
                                    });
                                },
                            }}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.select1} />
                        <Group.Control {...form.schema.select2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.radio} />
                        <Group.Control {...form.schema.checkbox} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.code} />
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
            </Sample.Section>
        </Sample>
    );
};
