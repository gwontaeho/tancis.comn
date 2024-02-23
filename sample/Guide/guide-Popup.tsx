import { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Group, Layout, FormControl, Button } from "@/comn/components";
import { useForm, TFormSchema, useResource, useModal, TOption } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnEnvs, comnUtils } from "@/comn/utils";

export const GuidePopup = () => {
    useResource({
        defaultSchema: [{ area: "comnCd", comnCd: "CGM0055" }, { area: "wrhsCd" }],
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
            select1: { label: "select 1", type: "select", area: "comnCd", comnCd: "CGM0055" },
            select2: { label: "select 2", type: "select", options: code },
            radio: { label: "radio", type: "radio", area: "comnCd", comnCd: "CGM0055" },
            checkbox1: {
                label: "checkbox",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CGM0055",
                all: true,
            },
            checkbox2: {
                label: "checkbox(excludes)",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CGM0055",
                /* 
                    코드 데이터 제외
                    제외할 코드 value 를 배열로 기재
                */
                excludes: ["AP", "ER"],
                all: true,
                controlSize: 10,
            },
            checkbox3: {
                label: "checkbox(includes)",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CGM0055",
                /* 
                    코드 데이터 추가
                    추가할 코드 데이터를 배열{ label , value }의 형태로 지정
                */
                includes: [
                    { value: "01", label: "추가 코드 01 " },
                    { value: "02", label: "추가 코드 02 " },
                ],
                all: true,
                controlSize: 10,
            },
            checkbox4: {
                label: "checkbox(filter)",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CGM0055",
                all: true,
                controlSize: 10,
                /* 
                    코드 데이터 필터링
                    코드 데이터를 필터링할 함수를 선언 (import 추가 필요)
                    return 이 false 이면 코드데이터에서 제외하고 보여줌
                    import { TOption } from "@/comn/hooks"; 
                    filter : ( item : TOption ) => {                        
                        return boolean 
                    }
                */
                filter: (item: TOption) => {
                    return item.value.startsWith("A");
                },
            },
            code: { label: "code", type: "code", area: "wrhsCd", maxLength: 5 },
        },
    };

    const form = useForm({
        defaultSchema: SF_FORM,
        defaultValues: {},
    });

    return (
        <Sample title="코드데이터(팝업) 사용" description="코드데이터(코드팝업)에 대한 기본 사용방법">
            <Sample.Section title="사용가능 코드 데이터 목록">
                <Sample.Table
                    data={[
                        ["번호", "데이터명", "area", "팝업창 주소(공통 변수 comnEnvs 사용)"],
                        ["1", "공통코드", "comnCd", "comnEnvs.popup.comnCd"],
                        ["2", "국가코드", "cntyCd", "comnEnvs.popup.cntyCd"],
                        ["3", "통화코드", "currCd", "comnEnvs.popup.currCd"],
                        ["4", "은행코드", "bnkCd", "comnEnvs.popup.bnkCd"],
                        ["5", "항구/공항코드", "portAirptCd", "comnEnvs.popup.portAirptCd"],
                        ["6", "항구코드", "portCd", "comnEnvs.popup.portCd"],
                        ["7", "공항코드", "airptCd", "comnEnvs.popup.airptCd"],
                        ["8", "도시코드", "cityCd", "comnEnvs.popup.cityCd"],
                        ["9", "업체코드", "coCd", "comnEnvs.popup.coCd"],
                        ["10", "처리상태코드", "prcssStat", "comnEnvs.popup.prcssStat"],
                        ["11", "기관정보", "orgCd", "comnEnvs.popup.orgCd"],
                        ["12", "업체상세정보", "CoCdDtl", "comnEnvs.popup.CoCdDtl"],
                        ["13", "업체신고코드", "coDclaCd", "comnEnvs.popup.coDclaCd"],
                        ["14", "기관부서정보", "orgDeptCd", "comnEnvs.popup.orgDeptCd"],
                        ["15", "창고정보", "wrhsCd", "comnEnvs.popup.wrhsCd"],
                        ["16", "세관정보", "cstmCd", "comnEnvs.popup.cstmCd"],
                        ["17", "차량차체정보", "vhclBodyCd", "comnEnvs.popup.vhclBodyCd"],
                        ["18", "차량카테고리", "vhclCtgrCd", "comnEnvs.popup.vhclCtgrCd"],
                        ["19", "차량색상", "vhclClrCd", "comnEnvs.popup.vhclClrCd"],
                        ["20", "차량연료유형", "vhclFlCd", "comnEnvs.popup.vhclFlCd"],
                        ["21", "차량수입위치", "vhclImpCntyCd", "comnEnvs.popup.vhclImpCntyCd"],
                        ["22", "차량보험유형", "vhclInsrTpCd", "comnEnvs.popup.vhclInsrTpCd"],
                        ["23", "차량제조사", "vhclMkerCd", "comnEnvs.popup.vhclMkerCd"],
                        ["24", "차량모델", "vhclMdlCd", "comnEnvs.popup.vhclMdlCd"],
                        ["25", "차량모델넘버", "vhclMdlNoCd", "comnEnvs.popup.vhclMdlNoCd"],
                        ["26", "차량소유자카테고리", "vhclHlpnCtgrCd", "comnEnvs.popup.vhclHlpnCtgrCd"],
                        ["27", "차량추진기유형", "vhclPrplTpCd", "comnEnvs.popup.vhclPrplTpCd"],
                        ["28", "차량변속기유형", "vhclTrmssnTpCd", "comnEnvs.popup.vhclTrmssnTpCd"],
                        ["29", "차량사용", "vhclUseCd", "comnEnvs.popup.vhclUseCd"],
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
                                <br />- excludes : 코드 데이터에서 제외할 코드(value)를 지정 가능
                                <br />- includes : 코드 데이터에 추가할 코드( &#123; label, value &#125; )를 지정 가능
                                <br />- filter : 함수의 return 을 통하여 제외할 코드를 지정 가능
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
                                                        url: comnEnvs.popup.hsCd,
                                                        draggable: true,
                                                        params: { multiple: true },
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
                                        <Group.Control {...form.schema.checkbox1} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.checkbox2} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.checkbox3} />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control {...form.schema.checkbox4} />
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

    useResource({
        defaultSchema: [{ area: "comnCd", comnCd: "CGM0055" }, { area: "wrhsCd" }],
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
            select1: { label: "select 1", type: "select", area: "comnCd", comnCd: "CGM0055" },
            select2: { label: "select 2", type: "select", options: code },
            radio: { label: "radio", type: "radio", area: "comnCd", comnCd: "CGM0055" },
            checkbox1: {
                label: "checkbox",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CGM0055",
                all: true,
            },
            checkbox2: {
                label: "checkbox(excludes)",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CGM0055",
                /* 
                    코드 데이터 제외
                    제외할 코드 value 를 배열로 기재
                */
                excludes: ["AP", "ER"],
                all: true,
                controlSize: 10,
            },
            checkbox3: {
                label: "checkbox(includes)",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CGM0055",
                /* 
                    코드 데이터 추가
                    추가할 코드 데이터를 배열{ label , value }의 형태로 지정
                */
                includes: [
                    { value: "01", label: "추가 코드 01 " },
                    { value: "02", label: "추가 코드 02 " },
                ],
                all: true,
                controlSize: 10,
            },
            checkbox4: {
                label: "checkbox(filter)",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CGM0055",
                all: true,
                controlSize: 10,
                /* 
                    코드 데이터 필터링
                    코드 데이터를 필터링할 함수를 선언 (import 추가 필요)
                    return 이 false 이면 코드데이터에서 제외하고 보여줌
                    import { TOption } from "@/comn/hooks"; 
                    filter : ( item : TOption ) => {                        
                        return boolean 
                    }
                */
                filter: (item: TOption) => {
                    // A 로 시작하는 코드를 제외하고 보여줌
                    return item.value.startsWith("A");
                },
            },
            code: { label: "code", type: "code", area: "wrhsCd", maxLength: 5 },
        },
    };

    const form = useForm({
        defaultSchema: SF_FORM,
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
                        <Group.Control {...form.schema.checkbox1} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.checkbox2} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.checkbox3} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.checkbox4} />
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
