import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_PORT_AIRPT_CD_SRCH, SCHEMA_GRID_PORT_AIRPT_CD } from "./ComnCdService";

export const PortAirptCodeList = (props: any) => {
    const pgeUid = "portAirptCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        portAirptCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_PORT_AIRPT_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        portAirptCdLst: useWijmo({
            defaultSchema: SCHEMA_GRID_PORT_AIRPT_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getPortAirptCdLst: useFetch({
            api: (page = grid.portAirptCdLst.page) => {
                return APIS.getPortAirptCdLst(form.portAirptCdSrch.getValues(), page, grid.portAirptCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.portAirptCdSrch.errors) && form.portAirptCdSrch.isSubmitted,
            key: [grid.portAirptCdLst.page, grid.portAirptCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.portAirptCdSrch.getValues(),
                    page: grid.portAirptCdLst.page,
                    size: grid.portAirptCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.portAirptCdSrch.handleSubmit(
                () => {
                    grid.portAirptCdLst.setPage(0);
                    fetch.getPortAirptCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_PortAirptCdLst: {
            regnCd: (data: any) => {
                if (!comnUtils.isPopup()) return;
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
            {/* <Page.Navigation base={comnEnvs.base} nodes={[...BASE.nodes, { label: "T_PORT_AIRPT_CD_LST" }]} />
            <Page.Header title={t("T_PORT_AIRPT_CD_LST")} description={t("T_PORT_AIRPT_CD_LST")} /> */}
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.portAirptCdSrch.schema.cntyCd}></Group.Control>
                            <Group.Control {...form.portAirptCdSrch.schema.portAirptTpCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.portAirptCdSrch.schema.regnCd}></Group.Control>
                            <Group.Control {...form.portAirptCdSrch.schema.regnNm}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                onClick={() => {
                                    form.portAirptCdSrch.reset();
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
                    {...grid.portAirptCdLst.grid}
                    data={fetch.getPortAirptCdLst.data?.regnCdList}
                    onCellClick={handler.click_Grid_PortAirptCdLst}
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
