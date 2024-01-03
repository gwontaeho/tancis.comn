import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_CO_CD_SRCH, SCHEMA_GRID_CO_CD } from "./ComnCdService";

export const CompanyCodeList = (props: any) => {
    const pgeUid = "coCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        coCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_CO_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        coCdLst: useWijmo({
            defaultSchema: SCHEMA_GRID_CO_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getCoCdLst: useFetch({
            api: (page = grid.coCdLst.page) => {
                return APIS.getCoCdLst(form.coCdSrch.getValues(), page, grid.coCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.coCdSrch.errors) && form.coCdSrch.isSubmitted,
            key: [grid.coCdLst.page, grid.coCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.coCdSrch.getValues(),
                    page: grid.coCdLst.page,
                    size: grid.coCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.coCdSrch.handleSubmit(
                () => {
                    grid.coCdLst.setPage(0);
                    fetch.getCoCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_CoCdLst: {
            tin: (data: any) => {
                if (!comnUtils.isPopup()) return;
                postMessage({
                    code: data.value,
                    label: data.rowValues.coNm,
                    addr: data.rowValues.coAddr,
                    status: data.rowValues.coStatCd,
                });
                close();
            },
        },
    };

    useEffect(() => {
        handler.click_Btn_Srch();
    }, []);

    return (
        <Page>
            <Page.Navigation base={comnEnvs.base} nodes={[...BASE.nodes, { label: "T_CO_CD_LST" }]} />
            <Page.Header title={t("T_CO_CD_LST")} description={t("T_CO_CD_LST")} />
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.coCdSrch.schema.tin}></Group.Control>
                            <Group.Control {...form.coCdSrch.schema.coTpCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.coCdSrch.schema.coNm} controlSize={10}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                onClick={() => {
                                    form.coCdSrch.reset();
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
                <Wijmo {...grid.coCdLst.grid} data={fetch.getCoCdLst.data} onCellClick={handler.click_Grid_CoCdLst} />
            </Group>
            {comnUtils.isPopup() && (
                <Layout.Right>
                    <Button onClick={close}>{t("B_CLS")}</Button>
                </Layout.Right>
            )}
        </Page>
    );
};
