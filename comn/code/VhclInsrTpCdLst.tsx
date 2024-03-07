import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_VHCL_INSR_TP_CD_SRCH, SCHEMA_GRID_VHCL_INSR_TP_CD } from "./services/ComnCdService";

export const VehicleInsuranceTypeCodeList = (props: any) => {
    const pgeUid = "vhclInsrTpCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        vhclInsrTpCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_INSR_TP_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclInsrTpCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_INSR_TP_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclInsrTpCdLst: useFetch({
            api: (page = grid.vhclInsrTpCdLst.page) => {
                return APIS.getVhclInsrTpCdLst(form.vhclInsrTpCdSrch.getValues(), page, grid.vhclInsrTpCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.vhclInsrTpCdSrch.errors) && form.vhclInsrTpCdSrch.isSubmitted,
            key: [grid.vhclInsrTpCdLst.page, grid.vhclInsrTpCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclInsrTpCdSrch.getValues(),
                    page: grid.vhclInsrTpCdLst.page,
                    size: grid.vhclInsrTpCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclInsrTpCdSrch.handleSubmit(
                () => {
                    grid.vhclInsrTpCdLst.setPage(0);
                    fetch.getVhclInsrTpCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.vhclInsrTpCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_VhclInsrTpCdLst: {
            cell: {
                vhclInsrTpCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.vhclInsrTpNm });
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
            grid.vhclInsrTpCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_VHCL_INSR_TP_CD_LST")}
            description={t("T_VHCL_INSR_TP_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_INSR_TP_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclInsrTpCdSrch.schema.vhclInsrTpCd}></Group.Control>
                                <Group.Control {...form.vhclInsrTpCdSrch.schema.vhclInsrTpNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclInsrTpCdSrch.reset();
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
                            {...grid.vhclInsrTpCdLst.grid}
                            data={fetch.getVhclInsrTpCdLst.data?.vhclInsrTpList}
                            render={render.grid_VhclInsrTpCdLst}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>
        </Page>
    );
};
