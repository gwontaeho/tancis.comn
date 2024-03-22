import React, { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, Layout, FormControl, Button } from "@/comn/components";
import Prism from "prismjs";
import { useForm, TFormSchema, useResource, usePopup, useModal } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnUtils, comnEnvs } from "@/comn/utils";

/*
value + 라벨 
="label +"
*/

const SF_FORM: TFormSchema = {
    id: "form",
    schema: {
        field1: {
            type: "code",
            area: "cityCd",
            label: "Region Code",
            popupSize: "md",
            exact: false,
        },
        field100: {
            type: "code",
            area: "cityCd",
            label: "Region Code",
            popupSize: "md",
        },
        field2: {
            type: "code",
            area: "comnCd",
            comnCd: "CGM0055",
            label: "Common Code",
            popupSize: "md",
        },
        field3: {
            type: "code",
            area: "cntyCd",
            label: "Country Code",
            popupSize: "md",
        },
        field4: {
            type: "code",
            area: "currCd",
            label: "Currency Code",
            maxLength: 3,
            popupSize: "md",
        },
        field5: {
            type: "code",
            area: "bnkCd",
            label: "Bank Code",
            popupSize: "md",
        },
        field6: {
            type: "code",
            area: "portCd",
            label: "Port Code",
            popupSize: "md",
        },
        field7: {
            type: "code",
            area: "airptCd",
            label: "Airport Code",
            popupSize: "md",
        },
        field8: {
            type: "code",
            area: "portAirptCd",
            label: "Port/Airport Code",
            popupSize: "md",
        },
        field9: {
            type: "code",
            area: "coCd",
            label: "Company Code",
            popupSize: "md",
        },
        field10: {
            type: "code",
            area: "prcssStatCd",
            label: "Processing Status Code",
            popupSize: "md",
        },
        field11: {
            type: "code",
            area: "orgCd",
            label: "Organization Code",
            popupSize: "md",
            popupParams: {
                orgCd: ["OGAM0010"],
            },
        },
        field12: {
            type: "code",
            area: "wrhsCd",
            label: "WareHouse Code",
            popupSize: "md",
            popupParams: {
                wrhsOprtTpCd: ["WT", "WI", "TO"],
                cstmOfceCd: ["TZDL"],
            },
        },
        field13: {
            type: "code",
            area: "coDclaCd",
            label: "Company Declare Code",
            popupSize: "md",
        },
        field14: {
            type: "code",
            area: "orgDeptCd",
            label: "Organization Department Code",
            popupSize: "md",
        },
        field15: {
            type: "code",
            area: "cstmCd",
            label: "Customs Code",
            popupSize: "md",
        },
        field16: {
            type: "code",
            area: "vhclBodyCd",
            label: "Vehicle Body Code",
            popupSize: "md",
        },
        field17: {
            type: "code",
            area: "vhclCtgrCd",
            label: "Vehicle Category Code",
            popupSize: "md",
        },
        field18: {
            type: "code",
            area: "vhclClrCd",
            label: "Vehicle Color Code",
            popupSize: "md",
        },
        field19: {
            type: "code",
            area: "vhclFlCd",
            label: "Vehicle Fuel Code",
            popupSize: "md",
        },
        field20: {
            type: "code",
            area: "vhclMkerCd",
            label: "Vehicle Maker Code",
            popupSize: "md",
        },
        field21: {
            type: "code",
            area: "vhclImpCntyCd",
            label: "Vehicle Import Country Code",
            popupSize: "md",
        },
        field22: {
            type: "code",
            area: "vhclInsrTpCd",
            label: "Vehicle Insurance Type Code",
            popupSize: "md",
        },
        field23: {
            type: "code",
            area: "vhclMdlCd",
            label: "Vehicle Model Code",
            popupSize: "md",
        },
        field24: {
            type: "code",
            area: "vhclMdlNoCd",
            label: "Vehicle Model Number Code",
            popupSize: "md",
        },
        field25: {
            type: "code",
            area: "vhclHlpnCtgrCd",
            label: "Vehicle Holder Category Code",
            popupSize: "md",
        },
        field26: {
            type: "code",
            area: "vhclPrplTpCd",
            label: "Vehicle Propeller Type Code",
            popupSize: "md",
        },
        field27: {
            type: "code",
            area: "vhclTrmssnTpCd",
            label: "Vehicle Transmission Type Code",
            popupSize: "md",
        },
        field28: {
            type: "code",
            area: "vhclUseCd",
            label: "Vehicle Use Code",
            popupSize: "md",
        },
        field29: {
            type: "code",
            area: "coCdDtl",
            label: "Company Code Detail",
            popupSize: "md",
        },
        field30: {
            type: "code",
            area: "cgmePrcdCd",
            comnCd: "CGM001",
            label: "Cargo Code",
            popupSize: "md",
        },
        field31: {
            type: "code",
            area: "hsCd",
            label: "HS Code",
            popupSize: "md",
        },
        field32: {
            type: "code",
            area: "dgt3CntyCd",
            label: "Digit3 Country Code",
            popupSize: "md",
        },
        field33: {
            type: "code",
            area: "cstmOfcrCd",
            label: "Customs Officers Code",
            popupSize: "md",
        },
        field34: {
            type: "code",
            area: "carrCd",
            label: "Carrier Code",
            popupSize: "md",
        },
        field35: {
            type: "code",
            area: "tinNo",
            label: "TIN Number",
            popupSize: "md",
        },
    },
};

export const SampleFormControlCode = () => {
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!

    useResource({
        defaultSchema: [
            { area: "cityCd" },
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "comnCd", comnCd: "COM_0015" },
            { area: "cntyCd" },
            { area: "dgt3CntyCd" },
            { area: "currCd" },
            { area: "bnkCd" },
            { area: "portCd" },
            { area: "airptCd" },
            { area: "portAirptCd" },
            { area: "coCd" },
            { area: "prcssStatCd" },
            { area: "orgCd" },
            { area: "wrhsCd" },
            { area: "carrCd" },
            { area: "coDclaCd" },
            { area: "orgDeptCd" },
            { area: "cstmCd" },
            { area: "cstmOfcrCd" },
            { area: "vhclBodyCd" },
            { area: "vhclCtgrCd" },
            { area: "vhclClrCd" },
            { area: "vhclFlCd" },
            { area: "vhclMkerCd" },
            { area: "vhclImpCntyCd" },
            { area: "vhclInsrTpCd" },
            { area: "vhclMdlCd" },
            { area: "vhclMdlNoCd" },
            { area: "vhclHlpnCtgrCd" },
            { area: "vhclPrplTpCd" },
            { area: "vhclTrmssnTpCd" },
            { area: "vhclUseCd" },
            { area: "coCdDtl" },
            { area: "hsCd" },
            { area: "cgmePrcdCd", comnCd: "CGM0100" },
            { area: "tinNo" },
        ],
    });

    const form = useForm({ defaultSchema: SF_FORM, defaultValues: {} });

    return (
        <Sample
            title="Form Control - Code"
            description={
                <>
                    - 폼에서 사용하는 Code 컴포넌트에 대한 사용방법
                    <br />- 코드를 조회하고 자동완성하고 팝업으로 조회기능 제공
                </>
            }
        >
            <Sample.Section title="Code 컴포넌트 지원 목록">
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.schema.field1}></Group.Control>
                                <Group.Label label="지역 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/cityCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field100}></Group.Control>
                                <Group.Label label="지역 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/cityCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field2}></Group.Control>
                                <Group.Label label="공통 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/comnCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field3}></Group.Control>
                                <Group.Label label="국가 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/cntyCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field32}></Group.Control>
                                <Group.Label label="국가 코드(3자리)"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/dgt3CntyCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field4}></Group.Control>
                                <Group.Label label="통화 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/currCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field5}></Group.Control>
                                <Group.Label label="은행 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/bnkCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field6}></Group.Control>
                                <Group.Label label="항구 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/portCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field7}></Group.Control>
                                <Group.Label label="공항 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/airptCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field8}></Group.Control>
                                <Group.Label label="항구/공항 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/portAirptCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field9}></Group.Control>
                                <Group.Label label="회사 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/coCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field10}></Group.Control>
                                <Group.Label label="처리상태 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/prcssStatPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field11}></Group.Control>
                                <Group.Label label="기관 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/orgCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field12}></Group.Control>
                                <Group.Label label="보세창고 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/wrhsCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field34}></Group.Control>
                                <Group.Label label="운송사 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/carrCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control
                                    {...form.schema.field13}
                                    callback={(data) => {
                                        console.log(data);
                                    }}
                                    popupParams={{
                                        coDclaTpCd: ["AL", "BK"],
                                    }}
                                ></Group.Control>
                                <Group.Label label="업체신고 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/coDclaCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field14}></Group.Control>
                                <Group.Label label="기관부서 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/orgDeptCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field15}></Group.Control>
                                <Group.Label label="세관 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/cstmCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field33}></Group.Control>
                                <Group.Label label="세관 직원 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/cstmOfcrCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field16}></Group.Control>
                                <Group.Label label="차량차체 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclBodyCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field17}></Group.Control>
                                <Group.Label label="차량카테고리 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclCtgrCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field18}></Group.Control>
                                <Group.Label label="차량색상 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclClrCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field19}></Group.Control>
                                <Group.Label label="차량연료유형 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclFlCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field20}></Group.Control>
                                <Group.Label label="차량제조사 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclMkerCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field21}></Group.Control>
                                <Group.Label label="차량수입위치 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclImpCntyCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field22}></Group.Control>
                                <Group.Label label="차량보험유형 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclInsrTpCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field23}></Group.Control>
                                <Group.Label label="차량모델 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclMdlCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field24}></Group.Control>
                                <Group.Label label="차량모델넘버 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclMdlNoCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field25}></Group.Control>
                                <Group.Label label="차량소유자카테고리 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclHlpnCtgrCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field26}></Group.Control>
                                <Group.Label label="차량추진기유형 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclPrplTpCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field27}></Group.Control>
                                <Group.Label label="차량변속기유형 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclTrmssnTpCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field28}></Group.Control>
                                <Group.Label label="차량사용 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/vhclUseCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control
                                    type="text"
                                    label="Company Code Detail"
                                    value={"140521043"}
                                    rightButton={{
                                        icon: "search",
                                        onClick: () => {
                                            modal.openModal({
                                                url: `${process.env.REACT_APP_BASE_COMN}/comn/ppup/coCdDtl`,
                                                params: { coTin: "140521043" },
                                                size: "md",
                                            });
                                        },
                                    }}
                                />
                                <Group.Label label="업체상세정보 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/CoCdDtl</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field30}></Group.Control>
                                <Group.Label label=""></Group.Label>
                                <Group.Col>
                                    <Group.Any></Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control
                                    {...form.schema.field31}
                                    callback={(data) => {
                                        console.log(data);
                                    }}
                                ></Group.Control>
                                <Group.Label label="HS 코드"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/hsCdPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.schema.field35}></Group.Control>
                                <Group.Label label="TIN 번호"></Group.Label>
                                <Group.Col>
                                    <Group.Any>/comn/comn/ppup/tinNoPpup</Group.Any>
                                </Group.Col>
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                </Group>
                <Sample.Section title="Source Code">
                    <Sample.Code>{`
const Sample = () => {

    const SF_FORM: TFormSchema = {
        id: "form",
        schema: {
            field1: {
                type: "code",
                area: "cityCd",
                label: "Region Code",
                
                popupSize: "md",
            },
            field2: {
                type: "code",
                area: "comnCd",
                comnCd: "COM_0015",
                label: "Common Code",
                
                popupSize: "md",
            },
            field3: {
                type: "code",
                area: "cntyCd",
                label: "Country Code",
                popupSize: "md",
            },
            field4: {
                type: "code",
                area: "currCd",
                label: "Currency Code",
                
                popupSize: "md",
            },
            field5: {
                type: "code",
                area: "bnkCd",
                label: "Bank Code",
                
                popupSize: "md",
            },
            field6: {
                type: "code",
                area: "portCd",
                label: "Port Code",
                
                popupSize: "md",
            },
            field7: {
                type: "code",
                area: "airptCd",
                label: "Airport Code",
                
                popupSize: "md",
            },
            field8: {
                type: "code",
                area: "portAirptCd",
                label: "Port/Airport Code",
                
                popupSize: "md",
            },
            field9: {
                type: "code",
                area: "coCd",
                label: "Company Code",
                
                popupSize: "md",
            },
            field10: {
                type: "code",
                area: "prcssStatCd",
                label: "Processing Status Code",
                
                popupSize: "md",
            },
            field11: {
                type: "code",
                area: "orgCd",
                label: "Organization Code",
                
                popupSize: "md",
            },
            field12: {
                type: "code",
                area: "wrhsCd",
                label: "WareHouse Code",
                
                popupSize: "md",
            },
            field13: {
                type: "code",
                area: "coDclaCd",
                label: "Company Declare Code",
                
                popupSize: "md",
            },
            field14: {
                type: "code",
                area: "orgDeptCd",
                label: "Organization Department Code",
                
                popupSize: "md",
            },
            field15: {
                type: "code",
                area: "cstmCd",
                label: "Customs Code",
                
                popupSize: "md",
            },
            field16: {
                type: "code",
                area: "vhclBodyCd",
                label: "Vehicle Body Code",
                
                popupSize: "md",
            },
            field17: {
                type: "code",
                area: "vhclCtgrCd",
                label: "Vehicle Category Code",
                
                popupSize: "md",
            },
            field18: {
                type: "code",
                area: "vhclClrCd",
                label: "Vehicle Color Code",
                
                popupSize: "md",
            },
            field19: {
                type: "code",
                area: "vhclFlCd",
                label: "Vehicle Fuel Code",
                
                popupSize: "md",
            },
            field20: {
                type: "code",
                area: "vhclMkerCd",
                label: "Vehicle Maker Code",
                
                popupSize: "md",
            },
            field21: {
                type: "code",
                area: "vhclImpCntyCd",
                label: "Vehicle Import Country Code",
                
                popupSize: "md",
            },
            field22: {
                type: "code",
                area: "vhclInsrTpCd",
                label: "Vehicle Insurance Type Code",
                
                popupSize: "md",
            },
            field23: {
                type: "code",
                area: "vhclMdlCd",
                label: "Vehicle Model Code",
                
                popupSize: "md",
            },
            field24: {
                type: "code",
                area: "vhclMdlNoCd",
                label: "Vehicle Model Number Code",
                
                popupSize: "md",
            },
            field25: {
                type: "code",
                area: "vhclHlpnCtgrCd",
                label: "Vehicle Holder Category Code",
                
                popupSize: "md",
            },
            field26: {
                type: "code",
                area: "vhclPrplTpCd",
                label: "Vehicle Propeller Type Code",
                
                popupSize: "md",
            },
            field27: {
                type: "code",
                area: "vhclTrmssnTpCd",
                label: "Vehicle Transmission Type Code",
                
                popupSize: "md",
            },
            field28: {
                type: "code",
                area: "vhclUseCd",
                label: "Vehicle Use Code",
                
                popupSize: "md",
            },
            field29: {
                type: "code",
                area: "coCdDtl",
                label: "Company Code Detail",
                maxLength: 9,
                popupSize: "md",
            },
            field30: {
                type: "code",
                area: "cgmePrcdCd",
                comnCd: "CGM001",
                label: "Cargo Code",
                popupSize: "md",
            },
            field31: {
                type: "code",
                area: "hsCd",
                label: "HS Code",
                popupSize: "md",
            },
            field32: {
                type: "code",
                area: "dgt3CntyCd",
                label: "Digit3 Country Code",
                popupSize: "md",
            },
            field34: {
                type: "code",
                area: "carrCd",
                label: "Carrier Code",
                popupSize: "md",
            },
            field35: {
                type: "code",
                area: "tinNo",
                label: "Tin Number",
                popupSize: "md",
            },
        },
    };
    
    export const SampleFormControlCode = () => {
        useResource({
            defaultSchema: [
                { area: "cityCd" },
                { area: "comnCd", comnCd: "COM_0100" },
                { area: "comnCd", comnCd: "CAG_0018" },
                { area: "comnCd", comnCd: "CAG_0006" },
                { area: "comnCd", comnCd: "COM_0015" },
                { area: "cntyCd" },
                { area: "currCd" },
                { area: "bnkCd" },
                { area: "portCd" },
                { area: "airptCd" },
                { area: "portAirptCd" },
                { area: "coCd" },
                { area: "prcssStatCd" },
                { area: "orgCd" },
                { area: "wrhsCd" },
                { area: "carrCd" },
                { area: "coDclaCd" },
                { area: "orgDeptCd" },
                { area: "cstmCd" },
                { area: "cstmOfcrCd" },
                { area: "vhclBodyCd" },
                { area: "vhclCtgrCd" },
                { area: "vhclClrCd" },
                { area: "vhclFlCd" },
                { area: "vhclMkerCd" },
                { area: "vhclImpCntyCd" },
                { area: "vhclInsrTpCd" },
                { area: "vhclMdlCd" },
                { area: "vhclMdlNoCd" },
                { area: "vhclHlpnCtgrCd" },
                { area: "vhclPrplTpCd" },
                { area: "vhclTrmssnTpCd" },
                { area: "vhclUseCd" },
                { area: "coCdDtl" },
                { area: "tinNo" },
            ],
        });
    
        const form = useForm({ defaultSchema: SF_FORM, defaultValues: {} });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control {...form.schema.field1}></Group.Control>
                        <Group.Label label="지역 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/cntyCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field2}></Group.Control>
                        <Group.Label label="공통 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/comnCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field3}></Group.Control>
                        <Group.Label label="국가 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/cntyCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field32}></Group.Control>
                        <Group.Label label="국가 코드(3자리)"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/dgt3CntyCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field4}></Group.Control>
                        <Group.Label label="통화 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/currCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field5}></Group.Control>
                        <Group.Label label="은행 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/bnkCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field6}></Group.Control>
                        <Group.Label label="항구 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/portCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field7}></Group.Control>
                        <Group.Label label="공항 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/airptCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field8}></Group.Control>
                        <Group.Label label="항구/공항 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/portAirptCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field9}></Group.Control>
                        <Group.Label label="회사 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/coCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field10}></Group.Control>
                        <Group.Label label="처리상태 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/prcssStatPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field11}></Group.Control>
                        <Group.Label label="기관 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/orgCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field12}></Group.Control>
                        <Group.Label label="보세창고 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/wrhsCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field34}></Group.Control>
                        <Group.Label label="운송사 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/carrCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            {...form.schema.field13}
                            callback={(data) => {
                                console.log(data);
                            }}
                            popupParams={{
                                coDclaTpCd: ["AL","BK"],
                            }}
                        ></Group.Control>
                        <Group.Label label="업체신고 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/coDclaCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field14}></Group.Control>
                        <Group.Label label="기관부서 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/orgDeptCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field15}></Group.Control>
                        <Group.Label label="세관 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/cstmCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field33}></Group.Control>
                        <Group.Label label="세관 직원 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/cstmOfcrCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field16}></Group.Control>
                        <Group.Label label="차량차체 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclBodyCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field17}></Group.Control>
                        <Group.Label label="차량카테고리 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclCtgrCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field18}></Group.Control>
                        <Group.Label label="차량색상 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclClrCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field19}></Group.Control>
                        <Group.Label label="차량연료유형 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclFlCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field20}></Group.Control>
                        <Group.Label label="차량제조사 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclMkerCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field21}></Group.Control>
                        <Group.Label label="차량수입위치 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclImpCntyCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field22}></Group.Control>
                        <Group.Label label="차량보험유형 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclInsrTpCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field23}></Group.Control>
                        <Group.Label label="차량모델 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclMdlCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field24}></Group.Control>
                        <Group.Label label="차량모델넘버 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclMdlNoCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field25}></Group.Control>
                        <Group.Label label="차량소유자카테고리 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclHlpnCtgrCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field26}></Group.Control>
                        <Group.Label label="차량추진기유형 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclPrplTpCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field27}></Group.Control>
                        <Group.Label label="차량변속기유형 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclTrmssnTpCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field28}></Group.Control>
                        <Group.Label label="차량사용 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/vhclUseCdPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field29}></Group.Control>
                        <Group.Label label="업체상세정보 코드"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/CoCdDtl</Group.Any>
                        </Group.Col>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field35}></Group.Control>
                        <Group.Label label="TIN 번호"></Group.Label>
                        <Group.Col>
                            <Group.Any>/comn/comn/ppup/tinNoPpup</Group.Any>
                        </Group.Col>
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                </Sample.Section>
            </Sample.Section>
            <Sample.Section title="1. 컴포넌트 사용방법(기본)">
                <Layout direction="col">
                    <Sample.Section
                        title="1.1 Size(size) "
                        description={
                            <>
                                - Form Control 사이즈 조절
                                <br />- size : 1 ~ 12 | "fit" | "full"
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            size={1}
                                            value="A01"
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            size={1}
                                            controlSize={10}
                                            value="A01"
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            size={4}
                                            controlSize={10}
                                            value="A01"
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            size={8}
                                            value="A01"
                                        />
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            size={12}
                                            value="A01"
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            size={"fit"}
                                            value="A01"
                                        />
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            size={"full"}
                                            value="A01"
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            size={1}
                            value="A01"
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            size={1}
                            controlSize={10}
                            value="A01"
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            size={4}
                            controlSize={10}
                            value="A01"
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            size={8}
                            value="A01"
                        />
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            size={12}
                            value="A01"
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            size={"fit"}
                            value="A01"
                        />
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            size={"full"}
                            value="A01"
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.2 Label Size(labelSize) "
                        description={
                            <>
                                - 라벨 영역의 사이즈 조절 (default : 2)
                                <br />- labelSize : 1 ~ 12
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            value="A01"
                                            labelSize={1}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            value="A01"
                                            labelSize={2}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            value="A01"
                                            labelSize={4}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            value="A01"
                                            labelSize={8}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            value="A01"
                            labelSize={1}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            value="A01"
                            labelSize={2}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            value="A01"
                            labelSize={4}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            value="A01"
                            labelSize={8}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.3 Control Size(controlSize) "
                        description={
                            <>
                                - Form Comtrol 영역의 사이즈 조절 (default : 4)
                                <br />- controlSize : 1 ~ 12
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            value="A01"
                                            controlSize={1}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            value="A01"
                                            controlSize={2}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            value="A01"
                                            controlSize={4}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            value="A01"
                                            controlSize={8}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });


    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            value="A01"
                            controlSize={1}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            value="A01"
                            controlSize={2}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            value="A01"
                            controlSize={4}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            value="A01"
                            controlSize={8}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.4 Max Length(maxLength) "
                        description={
                            <>
                                - input code 안의 글자의 최대 길이(코드의 길이를 지정, 필수)
                                <br />- number
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            value="A01"
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });


    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            value="A01"
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.5 Place Holder(placeholder) "
                        description={
                            <>
                                - input code 의 Place Holder 를 설정
                                <br />- string
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control label="code" type="code" placeholder="insert code" />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control label="code" type="code" placeholder="insert code" />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="1.6 Value(value) " description={<>- input code 의 value 를 설정</>}>
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            value="A01"
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            value="A01"
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.7 Read Only(readOnly) "
                        description={
                            <>
                                - input code 의 읽기전용 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            readOnly={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            readOnly={false}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            readOnly={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            readOnly={false}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.8 Disabled (disabled) "
                        description={
                            <>
                                - input code 의 사용가능 여부를 설정 ( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            disabled={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            disabled={false}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            disabled={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            disabled={false}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.9 Required (required) "
                        description={
                            <>
                                - input code 의 필수 여부를 설정 ( default : false )
                                <br />- 라벨 영역에 빨간색 * 표시
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            required={true}
                                        />
                                    </Group.Row>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            required={false}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            required={true}
                        />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            required={false}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.10 Message (message) "
                        description={
                            <>
                                - input code 하단에 message 를 표시
                                <br />- "string"
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            maxLength={3}
                                            message="Message를 표시 합니다."
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            maxLength={3}
                            message="Message를 표시 합니다."
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.11 Edit (edit) "
                        description={
                            <>
                                - input code 의 상세 조회 상태를 표시( default : false )
                                <br />- true | false
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            value="A01"
                                            maxLength={3}
                                            edit={false}
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
                                            edit={true}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            value="A01"
                            maxLength={3}
                            edit={false}
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
                            edit={true}
                        />
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

            <Sample.Section title="2. 컴포넌트 사용방법(추가)">
                <Layout direction="col">
                    <Sample.Section
                        title="2.1 Left Button(leftButton)"
                        description={
                            <>
                                - input code 의 왼쪽에 버튼 추가 기능
                                <br />
                                {`- leftButton={ icon , onClick}`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            value="A01"
                                            maxLength={3}
                                            leftButton={{
                                                icon: "search",
                                                onClick: () => {
                                                    alert("left button Click");
                                                },
                                            }}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            value="A01"
                            leftButton={{
                                icon: "search",
                                onClick: () => {
                                    alert("left button Click");
                                },
                            }}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="2.2 Right Button(rightButton)"
                        description={
                            <>
                                - input code 의 오른쪽에 버튼 추가 기능
                                <br />
                                {`- rightButton={ icon , onClick}`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            value="A01"
                                            maxLength={3}
                                            rightButton={{
                                                icon: "search",
                                                onClick: () => {
                                                    alert("right button Click");
                                                },
                                            }}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            value="A01"
                            maxLength={3}
                            rightButton={{
                                icon: "search",
                                onClick: () => {
                                    alert("right button Click");
                                },
                            }}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="2.3 Right Text(rightText)"
                        description={
                            <>
                                - input code 의 오른쪽에 텍스트 추가 기능
                                <br />
                                {`- rightText`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            value="A01"
                                            maxLength={3}
                                            rightText="Code"
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            value="A01"
                            maxLength={3}
                            rightText="Code"
                        />
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

            <Sample.Section title="3. 컴포넌트 사용방법(이벤트)">
                <Layout direction="col">
                    <Sample.Section
                        title="3.1 Change Event(onChange)"
                        description={
                            <>
                                - input code 의 Change Event Handler
                                <br />
                                - input code 의 value 를 parameter로 전달
                                <br />
                                {`- onChange={(e)=>{})}`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            value="A01"
                                            maxLength={3}
                                            onChange={(value) => {
                                                console.log(value);
                                            }}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            value="A01"
                            maxLength={3}
                            onChange={(value) => {
                                console.log(value);
                            }}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="3.2 Focus Event(onFocus)"
                        description={
                            <>
                                - input code 의 Focus Event Handler
                                <br />
                                - input code 의 focus event 를 parameter로 전달
                                <br />
                                {`- onFocus={(e)=>{})}`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            value="A01"
                                            maxLength={3}
                                            onFocus={(e) => {
                                                console.log(e);
                                            }}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            value="A01"
                            maxLength={3}
                            onFocus={(e) => {
                                console.log(e);
                            }}
                        />
                    </Group.Row>
                </Group.Section>
            </Group.Body>
        </Group>
    );
};

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="3.3 Blur Event(onBlur)"
                        description={
                            <>
                                - input code 의 Blur Event Handler
                                <br />
                                - input code 의 blur event 를 parameter로 전달
                                <br />
                                {`- onBlur={(e)=>{})}`}
                            </>
                        }
                    >
                        <Group>
                            <Group.Body>
                                <Group.Section>
                                    <Group.Row>
                                        <Group.Control
                                            label="code"
                                            type="code"
                                            area="comnCd"
                                            comnCd="COM_0100"
                                            value="A01"
                                            maxLength={3}
                                            onBlur={(e) => {
                                                console.log(e);
                                            }}
                                        />
                                    </Group.Row>
                                </Group.Section>
                            </Group.Body>
                        </Group>
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
const Sample = () => {

    useResource({
        defaultSchema: [            
            { area: "comnCd", comnCd: "COM_0100" },          
        ],
    });

    return (
        <Group>
            <Group.Body>
                <Group.Section>
                    <Group.Row>
                        <Group.Control
                            label="code"
                            type="code"
                            area="comnCd"
                            comnCd="COM_0100"
                            value="A01"
                            maxLength={3}
                            onBlur={(e) => {
                                console.log(e);
                            }}
                        />
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
