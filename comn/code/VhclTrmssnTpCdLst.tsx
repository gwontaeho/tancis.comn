import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid, useModal } from "@/comn/hooks";
import {
    BASE,
    APIS,
    SCHEMA_FORM_VHCL_TRMSSN_TP_CD_SRCH,
    SCHEMA_GRID_VHCL_TRMSSN_TP_CD,
} from "./services/ComnCdService";

export const VehicleTransmissionTypeCodeList = (props: any) => {
    const pgeUid = "vhclTrmssnTpCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        vhclTrmssnTpCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_TRMSSN_TP_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclTrmssnTpCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_TRMSSN_TP_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclTrmssnTpCdLst: useFetch({
            api: (page = grid.vhclTrmssnTpCdLst.page) => {
                return APIS.getVhclTrmssnTpCdLst(
                    form.vhclTrmssnTpCdSrch.getValues(),
                    page,
                    grid.vhclTrmssnTpCdLst.size,
                );
            },
            enabled: comnUtils.isEmpty(form.vhclTrmssnTpCdSrch.errors) && form.vhclTrmssnTpCdSrch.isSubmitted,
            key: [grid.vhclTrmssnTpCdLst.page, grid.vhclTrmssnTpCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclTrmssnTpCdSrch.getValues(),
                    page: grid.vhclTrmssnTpCdLst.page,
                    size: grid.vhclTrmssnTpCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclTrmssnTpCdSrch.handleSubmit(
                () => {
                    grid.vhclTrmssnTpCdLst.setPage(0);
                    fetch.getVhclTrmssnTpCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.vhclTrmssnTpCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            modal.postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_VhclTrmssnTpCdLst: {
            cell: {
                vhclTrmssnTpCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                modal.postMessage({ code: value, label: rowValues.vhclTrmssnTpNm });
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
            grid.vhclTrmssnTpCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_VHCL_TRMSSN_TP_CD_LST")}
            description={t("T_VHCL_TRMSSN_TP_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_TRMSSN_TP_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclTrmssnTpCdSrch.schema.vhclTrmssnTpCd}></Group.Control>
                                <Group.Control {...form.vhclTrmssnTpCdSrch.schema.vhclTrmssnTpNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclTrmssnTpCdSrch.reset();
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
                            {...grid.vhclTrmssnTpCdLst.grid}
                            data={fetch.getVhclTrmssnTpCdLst.data?.vhclTrmssnTpList}
                            render={render.grid_VhclTrmssnTpCdLst}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>
        </Page>
    );
};
