import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_PORT_CD_SRCH, SCHEMA_GRID_PORT_CD } from "./ComnCdService";

export const PortCodeList = (props: any) => {
    const pgeUid = "portCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        portCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_PORT_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        portCdLst: useWijmo({
            defaultSchema: SCHEMA_GRID_PORT_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getPortCdLst: useFetch({
            api: (page = grid.portCdLst.page) => {
                return APIS.getPortCdLst(form.portCdSrch.getValues(), page, grid.portCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.portCdSrch.errors) && form.portCdSrch.isSubmitted,
            key: [grid.portCdLst.page, grid.portCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.portCdSrch.getValues(),
                    page: grid.portCdLst.page,
                    size: grid.portCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.portCdSrch.handleSubmit(
                () => {
                    grid.portCdLst.setPage(0);
                    fetch.getPortCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_PortCdLst: {
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
            {/* <Page.Navigation base={comnEnvs.base} nodes={[...BASE.nodes, { label: "T_PORT_CD_LST" }]} />
            <Page.Header title={t("T_PORT_CD_LST")} description={t("T_PORT_CD_LST")} /> */}
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.portCdSrch.schema.cntyCd} controlSize={10}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.portCdSrch.schema.regnCd}></Group.Control>
                            <Group.Control {...form.portCdSrch.schema.regnNm}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                onClick={() => {
                                    form.portCdSrch.reset();
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
                    {...grid.portCdLst.grid}
                    data={fetch.getPortCdLst.data?.regnCdList}
                    onCellClick={handler.click_Grid_PortCdLst}
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
