import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useGrid, usePopup, useStore, useToast, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_AIRPT_CD_SRCH, SCHEMA_GRID_AIRPT_CD } from "./services/ComnCdService";

export const AirptCodeList = () => {
    const pgeUid = "IATA";
    const { t } = useTranslation();
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const { pgeStore, setStore } = useStore({ pgeUid });
    const params = getParams(); /* * */

    /**
     * form 초기화
     */
    const form = {
        airptCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_AIRPT_CD_SRCH,
            defaultValues: pgeStore?.form === undefined ? { regnNm: "", regnCd: "", cntyCd: "" } : pgeStore?.form,
        }),
    };

    /* AAAAA */

    /**
     * grid 초기화
     */
    const grid = {
        airptCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_AIRPT_CD,
            page: pgeStore?.page === undefined ? 0 : pgeStore?.page,
            size: pgeStore?.size === undefined ? 10 : pgeStore?.size,
        }),
    };

    /**
     * api 초기화
     */
    const fetch = {
        getAirptCdLst: useFetch({
            /**
             * fetching 시 실행되는 api
             */
            api: (page = grid.airptCdLst.page) =>
                APIS.getAirptCdLst(form.airptCdSrch.getValues(), page, grid.airptCdLst.size),

            /**
             * api가 참조하는 key
             */
            key: [grid.airptCdLst.page, grid.airptCdLst.size],

            /**
             * api가 key변화를 감지해 자동 실행되는 조건
             * enabled=true 항상
             */
            enabled: true,

            /**
             * on success callback
             */
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.airptCdSrch.getValues(),
                    page: grid.airptCdLst.page,
                    size: grid.airptCdLst.size,
                });
            },
        }),
    };

    const handler = {
        /**
         * 검색 버튼 click event handler
         */
        click_Btn_Srch: () => {
            form.airptCdSrch.handleSubmit(
                /**
                 * validation 성공 시
                 */
                () => {
                    fetch.getAirptCdLst.fetch(0);
                    grid.airptCdLst.setPage(0);
                },
                /**
                 * validation 실패 시
                 */
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.airptCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            modal.postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_AirptCdLst: {
            cell: {
                regnCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;

                                modal.postMessage({ code: value, label: rowValues.regnNm });
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
            grid.airptCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_AIRPT_CD_LST")}
            description={t("T_AIRPT_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_AIRPT_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.airptCdSrch.schema.cntyCd} controlSize={10}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.airptCdSrch.schema.regnCd}></Group.Control>
                                <Group.Control {...form.airptCdSrch.schema.regnNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.airptCdSrch.reset();
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
                    <Grid
                        {...grid.airptCdLst.grid}
                        data={fetch.getAirptCdLst.data?.regnCdList}
                        render={render.grid_AirptCdLst}
                    />
                </Group.Body>
            </Group>
        </Page>
    );
};
