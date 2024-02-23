import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_VHCL_PRPL_TP_CD_SRCH, SCHEMA_GRID_VHCL_PRPL_TP_CD } from "./services/ComnCdService";

export const VehiclePropellerTypeCodeList = (props: any) => {
    const pgeUid = "vhclPrplTpCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        vhclPrplTpCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_PRPL_TP_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclPrplTpCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_PRPL_TP_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclPrplTpCdLst: useFetch({
            api: (page = grid.vhclPrplTpCdLst.page) => {
                return APIS.getVhclPrplTpCdLst(form.vhclPrplTpCdSrch.getValues(), page, grid.vhclPrplTpCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.vhclPrplTpCdSrch.errors) && form.vhclPrplTpCdSrch.isSubmitted,
            key: [grid.vhclPrplTpCdLst.page, grid.vhclPrplTpCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclPrplTpCdSrch.getValues(),
                    page: grid.vhclPrplTpCdLst.page,
                    size: grid.vhclPrplTpCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclPrplTpCdSrch.handleSubmit(
                () => {
                    grid.vhclPrplTpCdLst.setPage(0);
                    fetch.getVhclPrplTpCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.vhclPrplTpCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "에러\n에러\n" });
                return;
            }

            postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_VhclPrplTpCdLst: {
            cell: {
                vhclPrplTpCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.vhclPrplTpNm });
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
            grid.vhclPrplTpCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_VHCL_PRPL_TP_CD_LST")}
            description={t("T_VHCL_PRPL_TP_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_PRPL_TP_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclPrplTpCdSrch.schema.vhclPrplTpCd}></Group.Control>
                                <Group.Control {...form.vhclPrplTpCdSrch.schema.vhclPrplTpNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclPrplTpCdSrch.reset();
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
                            {...grid.vhclPrplTpCdLst.grid}
                            data={fetch.getVhclPrplTpCdLst.data?.vhclPrplTpList}
                            render={render.grid_VhclPrplTpCdLst}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>
            {comnUtils.isPopup() && (
                <Layout.Right>
                    <Button onClick={close}>{t("B_CLS")}</Button>
                </Layout.Right>
            )}
        </Page>
    );
};
