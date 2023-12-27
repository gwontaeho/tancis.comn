import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { utils } from "@/comn/utils";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, useStore, usePopup, useToast } from "@/comn/hooks";
import { APIS, SCHEMA_FORM_CITY_CD, SCHEMA_GRID_CITY_CD } from "./ComnCdService";

export const CityCodeList = (props: any) => {
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: "cityCdLst" });
    const toast = useToast();
    /*
     * 명명 규칙 (useForm)
     * prefix : "form_"
     * 카멜 표기법 사용, prefix 뒤에 대문자로 시작
     * 폼 사용 특성 : 검색(Srch), 등록,수정(Rgsr)
     * form_[폼 데이터 메타 조합 + 폼 사용 특성]
     * 예) 도시코드검색( form_CityCdSrch ) , 도시코드등록( form_CityCdRgsr )
     */
    const form_CityCdSrch = useForm({ defaultSchema: SCHEMA_FORM_CITY_CD, values: pgeStore?.form || {} });

    const { close, postMessage, getParams } = usePopup();
    /*
     * 명명 규칙 (useWijmo)
     * prefix : "grid_"
     * 카멜 표기법 사용, prefix 뒤에 대문자로 시작
     * grid_[그리드 데이터 명 메타 조합]
     * 예) 도시코드( grid_CityCd )
     */
    const grid_CityCdLst = useWijmo({
        defaultSchema: SCHEMA_GRID_CITY_CD((data: any) => {
            if (!utils.isPopup()) return;
            postMessage({ code: data.value, label: data.rowValues.regnNm });
            close();
        }),
        page: pgeStore?.page,
        size: pgeStore?.size,
    });

    /*
     * 명명 규칙 (useFetch)
     * prefix : "fetch_"
     * 카멜 표기법 사용, prefix 뒤에 대문자로 시작
     * fetch_[백앤드 api 컨트롤러 메소드 명]
     * 예) 도시코드목록조회( fetch_GetCityCdLst )
     */
    const fetch_GetCityCdLst = useFetch({
        /*
         * api : 해당 fetch 가 실제 실행하는 API, Service 에 정의 후 사용
         * enabled : 해당 fetch 가 실행가능한 조건
         * key : 변경되었을때 fetch 가 재실행되는 key
         * showToast : fetch 의 성공 실패 결과를 Toast 메세지로 표시 여부, default : false
         */
        api: () => APIS.getCityCdLst(form_CityCdSrch.getValues(), grid_CityCdLst.page, grid_CityCdLst.size),
        enabled: utils.isEmpty(form_CityCdSrch.errors) && form_CityCdSrch.isSubmitted,
        key: [grid_CityCdLst.page, grid_CityCdLst.size],
        showToast: true,
    });
    /*
     * 이벤트 핸들러
     */
    const handler = {
        /*
         * 이벤트 handler
         * [이벤트 타입]_[이벤트 대상 타입(대상명)]_[대상명]
         * 이벤트 타입 : click , change , blur , focus...
         * 이벤트 대상 타입 : Btn(버튼) , Grid
         * 이
         */
        click_Btn_Srch: () => {
            form_CityCdSrch.handleSubmit(
                () => {
                    setStore("cityCdLst", {
                        form: form_CityCdSrch.getValues(),
                        page: grid_CityCdLst.page,
                        size: grid_CityCdLst.size,
                    });
                    fetch_GetCityCdLst.fetch();
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            );
        },
        //click_Grid_CityCdLst: ( field : )=>{

        /*
         * check : 체크, 검사
         *
         */
    };

    useEffect(() => {
        utils.setValuesFromParams(form_CityCdSrch, getParams());
    }, []);

    return (
        <Page>
            <Page.Header title={t("T_CITY_CD_LST")} description={t("T_CITY_CD_LST")} />

            <Group>
                <Group.Body>
                    <Group.Row>
                        <Group.Control {...form_CityCdSrch.schema.cntyCd}></Group.Control>
                        <Group.Control {...form_CityCdSrch.schema.regnCd}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form_CityCdSrch.schema.regnNm} controlSize={10}></Group.Control>
                    </Group.Row>
                </Group.Body>
                <Layout direction="row">
                    <Layout.Left>
                        <Button onClick={form_CityCdSrch.reset}>{t("B_RESET")}</Button>
                    </Layout.Left>
                    <Layout.Right>
                        <Button onClick={handler.click_Srch}>{t("B_SRCH")}</Button>
                    </Layout.Right>
                </Layout>
            </Group>

            <Group>
                <Wijmo {...grid_CityCdLst.grid} data={fetch_GetCityCdLst.data} />
            </Group>
            <Layout.Right>
                <Button onClick={close}>{t("B_CLS")}</Button>
            </Layout.Right>
        </Page>
    );
};
