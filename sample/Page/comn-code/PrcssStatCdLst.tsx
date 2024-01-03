import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_PRCSS_STAT_CD_SRCH, SCHEMA_GRID_PRCSS_STAT_CD } from "./ComnCdService";

export const ProcessingStatusCodeList = (props: any) => {
    const pgeUid = "prcssStatCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        prcssStatCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_PRCSS_STAT_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        prcssStatCdLst: useWijmo({
            defaultSchema: SCHEMA_GRID_PRCSS_STAT_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getPrcssStatCdLst: useFetch({
            api: (page = grid.prcssStatCdLst.page) => {
                return APIS.getPortAirptCdLst(form.prcssStatCdSrch.getValues(), page, grid.prcssStatCdLst.size);
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
        click_Grid_PrcssStatCdLst: {
            item: (data: any) => {
                if (!comnUtils.isPopup()) return;
                postMessage({ code: data.value, label: data.rowValues.itemNm });
                close();
            },
        },
    };

    useEffect(() => {
        handler.click_Btn_Srch();
    }, []);

    return (
        <Page>
            <Page.Navigation base={comnEnvs.base} nodes={[...BASE.nodes, { label: "T_PRCSS_STAT_CD_LST" }]} />
            <Page.Header title={t("T_PRCSS_STAT_CD_LST")} description={t("T_PRCSS_STAT_CD_LST")} />
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.prcssStatCdSrch.schema.item}></Group.Control>
                            <Group.Control {...form.prcssStatCdSrch.schema.itemNm}></Group.Control>
                        </Group.Row>
                    </Group.Body>
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
                </Group>
            </form>

            <Group>
                <Wijmo
                    {...grid.prcssStatCdLst.grid}
                    data={fetch.getPrcssStatCdLst.data}
                    onCellClick={handler.click_Grid_PrcssStatCdLst}
                />
            </Group>
            {comnUtils.isPopup() && (
                <Layout.Right>
                    <Button onClick={close}>{t("B_CLS")}</Button>
                </Layout.Right>
            )}
        </Page>
    );
};
