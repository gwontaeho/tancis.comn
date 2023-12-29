import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { utils, envs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_AIRPT_CD_SRCH, SCHEMA_GRID_AIRPT_CD } from "./ComnCdService";

export const AirptCodeList = (props: any) => {
    const pgeUid = "airptCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        airptCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_AIRPT_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        airptCdLst: useWijmo({
            defaultSchema: SCHEMA_GRID_AIRPT_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getAirptCdLst: useFetch({
            api: (page = grid.airptCdLst.page) => {
                return APIS.getAirptCdLst(form.airptCdSrch.getValues(), page, grid.airptCdLst.size);
            },
            enabled: utils.isEmpty(form.airptCdSrch.errors) && form.airptCdSrch.isSubmitted,
            key: [grid.airptCdLst.grid.page, grid.airptCdLst.grid.size],
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
        click_Btn_Srch: () => {
            form.airptCdSrch.handleSubmit(
                () => {
                    grid.airptCdLst.setPage(0);
                    fetch.getAirptCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_AirptCdLst: {
            regnCd: (data: any) => {
                if (!utils.isPopup()) return;
                postMessage({ code: data.value, label: data.rowValues.regnNm });
                close();
            },
        },
    };

    useEffect(() => {
        handler.click_Btn_Srch();
    }, []);

    return (
        <Page>
            <Page.Navigation base={envs.base} nodes={[...BASE.nodes, { label: "T_AIRPT_CD_LST" }]} />
            <Page.Header title={t("T_AIRPT_CD_LST")} description={t("T_AIRPT_CD_LST")} />
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.airptCdSrch.schema.cntyCd} controlSize={10}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.airptCdSrch.schema.regnCd}></Group.Control>
                            <Group.Control {...form.airptCdSrch.schema.regnNm}></Group.Control>
                        </Group.Row>
                    </Group.Body>
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
                </Group>
            </form>

            <Group>
                <Wijmo
                    {...grid.airptCdLst.grid}
                    data={fetch.getAirptCdLst.data}
                    onCellClick={handler.click_Grid_AirptCdLst}
                />
            </Group>
            {utils.isPopup() && (
                <Layout.Right>
                    <Button onClick={close}>{t("B_CLS")}</Button>
                </Layout.Right>
            )}
        </Page>
    );
};
