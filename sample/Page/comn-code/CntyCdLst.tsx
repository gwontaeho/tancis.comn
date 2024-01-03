import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_CNTY_CD_SRCH, SCHEMA_GRID_CNTY_CD } from "./ComnCdService";

export const CountryCodeList = (props: any) => {
    const pgeUid = "cntyCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        cntyCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_CNTY_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        cntyCdLst: useWijmo({
            defaultSchema: SCHEMA_GRID_CNTY_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getCntyCdLst: useFetch({
            api: (page = grid.cntyCdLst.page) => {
                return APIS.getCntyCdLst(form.cntyCdSrch.getValues(), page, grid.cntyCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.cntyCdSrch.errors) && form.cntyCdSrch.isSubmitted,
            key: [grid.cntyCdLst.page, grid.cntyCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.cntyCdSrch.getValues(),
                    page: grid.cntyCdLst.page,
                    size: grid.cntyCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.cntyCdSrch.handleSubmit(
                () => {
                    grid.cntyCdLst.setPage(0);
                    fetch.getCntyCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_CntyCdLst: {
            cntyCd: (data: any) => {
                if (!comnUtils.isPopup()) return;
                postMessage({ code: data.value, label: data.rowValues.cntyNm });
                close();
            },
        },
    };

    useEffect(() => {
        handler.click_Btn_Srch();
    }, []);

    return (
        <Page>
            <Page.Navigation base={comnEnvs.base} nodes={[...BASE.nodes, { label: "T_CNTY_CD_LST" }]} />
            <Page.Header title={t("T_CNTY_CD_LST")} description={t("T_CNTY_CD_LST")} />
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.cntyCdSrch.schema.cntyCd}></Group.Control>
                            <Group.Control {...form.cntyCdSrch.schema.cntyNm}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                onClick={() => {
                                    form.cntyCdSrch.reset();
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
                    {...grid.cntyCdLst.grid}
                    data={fetch.getCntyCdLst.data}
                    onCellClick={handler.click_Grid_CntyCdLst}
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
