import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_VHCL_IMP_CNTY_CD_SRCH, SCHEMA_GRID_VHCL_IMP_CNTY_CD } from "./services/ComnCdService";

export const VehicleImportCountryCodeList = (props: any) => {
    const pgeUid = "vhclImpCntyCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        vhclImpCntyCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_IMP_CNTY_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclImpCntyCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_IMP_CNTY_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclImpCntyCdLst: useFetch({
            api: (page = grid.vhclImpCntyCdLst.page) => {
                return APIS.getVhclImpCntyCdLst(form.vhclImpCntyCdSrch.getValues(), page, grid.vhclImpCntyCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.vhclImpCntyCdSrch.errors) && form.vhclImpCntyCdSrch.isSubmitted,
            key: [grid.vhclImpCntyCdLst.page, grid.vhclImpCntyCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclImpCntyCdSrch.getValues(),
                    page: grid.vhclImpCntyCdLst.page,
                    size: grid.vhclImpCntyCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclImpCntyCdSrch.handleSubmit(
                () => {
                    grid.vhclImpCntyCdLst.setPage(0);
                    fetch.getVhclImpCntyCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.vhclImpCntyCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            modal.postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_VhclImpCntyCdLst: {
            cell: {
                vhclCntyCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                modal.postMessage({ code: value, label: rowValues.vhclCntyNm });
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
            grid.vhclImpCntyCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_VHCL_IMP_CNTY_CD_LST")}
            description={t("T_VHCL_IMP_CNTY_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_IMP_CNTY_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclImpCntyCdSrch.schema.vhclCntyCd}></Group.Control>
                                <Group.Control {...form.vhclImpCntyCdSrch.schema.vhclCntyNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclImpCntyCdSrch.reset();
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
                            {...grid.vhclImpCntyCdLst.grid}
                            data={fetch.getVhclImpCntyCdLst.data?.vhclImpCntyList}
                            render={render.grid_VhclImpCntyCdLst}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>
        </Page>
    );
};
