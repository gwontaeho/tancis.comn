import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useGrid, useStore, usePopup, useToast, useModal } from "@/comn/hooks";
import { BASE, APIS, SF_TB_SRCH, SG_TB_LIST } from "./services/ComnCdService";

export const TbList = (props: any) => {
    const pgeUid = "tbLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    /*
     * 명명 규칙 (useForm)
     * prefix : "form_"
     * 카멜 표기법 사용, prefix 뒤에 대문자로 시작
     * 폼 사용 특성 : 검색(Srch), 등록,수정(Rgsr)
     * form_[폼 데이터 메타 조합 + 폼 사용 특성]
     * 예) 도시코드검색( form_tbSrch ) , 도시코드등록( form_CityCdRgsr )
     */
    const form = {
        tbSrch: useForm({
            defaultSchema: SF_TB_SRCH,
            defaultValues: { ...pgeStore?.form, ...getParams() } || {},
        }),
    };

    /*
     * 명명 규칙 (useWijmo)
     * prefix : "grid_"
     * 카멜 표기법 사용, prefix 뒤에 대문자로 시작
     * grid_[그리드 데이터 명 메타 조합]
     * 예) 도시코드( grid_CityCd )
     */
    const grid = {
        tbLst: useGrid({
            defaultSchema: SG_TB_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    /*
     * 명명 규칙 (useFetch)
     * prefix : "fetch_"
     * 카멜 표기법 사용, prefix 뒤에 대문자로 시작
     * fetch_[백앤드 api 컨트롤러 메소드 명]
     * 예) 도시코드목록조회( fetch_getTbLst )
     */
    const fetch = {
        getTbLst: useFetch({
            /*
             * api : 해당 fetch 가 실제 실행하는 API, Service 에 정의 후 사용
             * enabled : 해당 fetch 가 실행가능한 조건
             * key : 변경되었을때 fetch 가 재실행되는 key
             * showToast : fetch 의 성공 실패 결과를 Toast 메세지로 표시 여부, default : false
             */
            api: (page = grid.tbLst.page) => {
                return APIS.getTbLst(form.tbSrch.getValues(), page, grid.tbLst.size);
            },
            enabled: comnUtils.isEmpty(form.tbSrch.errors) && form.tbSrch.isSubmitted,
            key: [grid.tbLst.page, grid.tbLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.tbSrch.getValues(),
                    page: grid.tbLst.page,
                    size: grid.tbLst.size,
                });
            },
        }),
    };
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
            form.tbSrch.handleSubmit(
                () => {
                    grid.tbLst.setPage(0);
                    fetch.getTbLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.tbLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            modal.postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_tbLst: {
            cell: {
                tbId: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;

                                modal.postMessage({ code: value, label: rowValues.tbNm });
                                close();
                            }}
                        >
                            {props.value}
                        </a>
                    );
                },
            },
        },
    };

    useEffect(() => {
        handler.click_Btn_Srch();
        /* * */
        if (params?.multiple === true) {
            grid.tbLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_TB_LST")}
            description={t("T_TB_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_TB_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.tbSrch.schema.tbId}></Group.Control>
                                <Group.Control {...form.tbSrch.schema.tbNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.tbSrch.reset();
                                    }}
                                >
                                    {t("B_RESET")}
                                </Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    onClick={() => {
                                        handler.click_Btn_Srch();
                                    }}
                                >
                                    {t("B_SRCH")}
                                </Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Body>
                </Group>
            </form>

            <Group>
                <Group.Body>
                    {/* * */}
                    {params?.multiple === true && (
                        <Layout>
                            <Layout.Right>
                                <Button
                                    role="apply"
                                    onClick={() => {
                                        handler.click_Btn_Apply();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    )}
                    <Grid {...grid.tbLst.grid} data={fetch.getTbLst.data?.tbList} render={render.grid_tbLst} />
                </Group.Body>
            </Group>
        </Page>
    );
};
