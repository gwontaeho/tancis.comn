import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useGrid, usePopup, useStore, useToast, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_PRCSS_STAT_CD_SRCH, SCHEMA_GRID_PRCSS_STAT_CD } from "./services/ComnCdService";

export const ProcessingStatusCodeList = (props: any) => {
    const pgeUid = "prcssStatCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        prcssStatCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_PRCSS_STAT_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        prcssStatCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_PRCSS_STAT_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getPrcssStatCdLst: useFetch({
            api: (page = grid.prcssStatCdLst.page) => {
                return APIS.getPrcssStatCdLst(form.prcssStatCdSrch.getValues(), page, grid.prcssStatCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.prcssStatCdSrch.errors) && form.prcssStatCdSrch.isSubmitted,
            key: [grid.prcssStatCdLst.page, grid.prcssStatCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.prcssStatCdSrch.getValues(),
                    page: grid.prcssStatCdLst.page,
                    size: grid.prcssStatCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.prcssStatCdSrch.handleSubmit(
                () => {
                    grid.prcssStatCdLst.setPage(0);
                    fetch.getPrcssStatCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.prcssStatCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "에러\n에러\n" });
                return;
            }

            postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_PrcssStatCdLst: {
            cell: {
                item: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;

                                postMessage({ code: value, label: rowValues.itemNm });
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
            grid.prcssStatCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_PRCSS_STAT_CD_LST")}
            description={t("T_PRCSS_STAT_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_PRCSS_STAT_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.prcssStatCdSrch.schema.item}></Group.Control>
                                <Group.Control {...form.prcssStatCdSrch.schema.itemNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.prcssStatCdSrch.reset();
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
                        {...grid.prcssStatCdLst.grid}
                        data={fetch.getPrcssStatCdLst.data?.prcssStatCdList}
                        render={render.grid_PrcssStatCdLst}
                    />
                </Group.Body>
            </Group>
            {comnUtils.isPopup() && (
                <Layout.Right>
                    <Button role="close" onClick={close}></Button>
                </Layout.Right>
            )}
        </Page>
    );
};
