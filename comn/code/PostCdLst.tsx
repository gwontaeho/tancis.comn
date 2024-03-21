import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useGrid, useStore, usePopup, useToast, useModal } from "@/comn/hooks";
import { BASE, APIS, SG_POST_CD_LST, SF_POST_CD_SRCH } from "./services/ComnCdService";

export const PostCodeList = (props: any) => {
    const pgeUid = "postCdLst";
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
     * 예) 도시코드검색( form_CityCdSrch ) , 도시코드등록( form_CityCdRgsr )
     */
    const form = {
        postCdSrch: useForm({
            defaultSchema: SF_POST_CD_SRCH,
            // defaultValues: { ...pgeStore?.form, ...getParams() } || {},
            defaultValues: { ...pgeStore?.form } || {},
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
        postCdLst: useGrid({
            defaultSchema: SG_POST_CD_LST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };
    /*
     * 명명 규칙 (useFetch)
     * prefix : "fetch_"
     * 카멜 표기법 사용, prefix 뒤에 대문자로 시작
     * fetch_[백앤드 api 컨트롤러 메소드 명]
     * 예) 도시코드목록조회( fetch_GetCityCdLst )
     */
    const fetch = {
        getPostCdLst: useFetch({
            /*
             * api : 해당 fetch 가 실제 실행하는 API, Service 에 정의 후 사용
             * enabled : 해당 fetch 가 실행가능한 조건
             * key : 변경되었을때 fetch 가 재실행되는 key
             * showToast : fetch 의 성공 실패 결과를 Toast 메세지로 표시 여부, default : false
             */
            api: (page = grid.postCdLst.page) => {
                return APIS.getPostCdLst(form.postCdSrch.getValues(), page, grid.postCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.postCdSrch.errors) && form.postCdSrch.isSubmitted,
            key: [grid.postCdLst.page, grid.postCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.postCdSrch.getValues(),
                    page: grid.postCdLst.page,
                    size: grid.postCdLst.size,
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
            form.postCdSrch.handleSubmit(
                () => {
                    grid.postCdLst.setPage(0);
                    fetch.getPostCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.postCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.00004" });
                return;
            }

            modal.postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_PostCdLst: {
            cell: {
                wardPostCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;

                                console.log(value);
                                console.log(rowValues);
                                console.log(rowValues.regnPostNm);

                                modal.postMessage({
                                    code: value,
                                    label:
                                        rowValues.wardPostNm +
                                        ", " +
                                        rowValues.dstrPostNm +
                                        ", " +
                                        rowValues.regnPostNm,
                                    data: rowValues,
                                });
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
            grid.postCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_POST_CD_LST")}
            description={t("T_POST_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_POST_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.postCdSrch.schema.postTpCd}></Group.Control>
                                <Group.Control {...form.postCdSrch.schema.postCd} maxLength={5}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.postCdSrch.schema.postNm} size={10}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.postCdSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        handler.click_Btn_Srch();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Body>
                </Group>
            </form>

            <Group>
                <Group.Body>
                    <Group.Section>
                        <Grid
                            {...grid.postCdLst.grid}
                            data={fetch.getPostCdLst.data?.postCdList}
                            render={render.grid_PostCdLst}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>
        </Page>
    );
};
