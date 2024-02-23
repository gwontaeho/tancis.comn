import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_CNTY_CD_SRCH, SCHEMA_GRID_CNTY_CD } from "./services/ComnCdService";

export const CountryCodeList = (props: any) => {
    const pgeUid = "cntyCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { close, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        cntyCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_CNTY_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        cntyCdLst: useGrid({
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

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.cntyCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_CntyCdLst: {
            cell: {
                cntyCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;

                                modal.postMessage({ code: value, label: rowValues.cntyNm });
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
            grid.cntyCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_CNTY_CD_LST")}
            description={t("T_CNTY_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_CNTY_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.cntyCdSrch.schema.cntyCd}></Group.Control>
                                <Group.Control {...form.cntyCdSrch.schema.cntyNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
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
                    </Group.Body>
                </Group>
            </form>

            <Group>
                <Group.Body>
                    <Group.Section>
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
                            {...grid.cntyCdLst.grid}
                            data={fetch.getCntyCdLst.data?.cntyCdList}
                            render={render.grid_CntyCdLst}
                        />
                    </Group.Section>
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
