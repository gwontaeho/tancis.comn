import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid, useModal } from "@/comn/hooks";
import {
    BASE,
    APIS,
    SCHEMA_FORM_VHCL_HLPN_CTGR_CD_SRCH,
    SCHEMA_GRID_VHCL_HLPN_CTGR_CD,
} from "./services/ComnCdService";

export const VehicleHolderCategoryList = (props: any) => {
    const pgeUid = "vhclHlpnCtgrCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        vhclHlpnCtgrCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_HLPN_CTGR_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclHlpnCtgrCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_HLPN_CTGR_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclHlpnCtgrCdLst: useFetch({
            api: (page = grid.vhclHlpnCtgrCdLst.page) => {
                return APIS.getVhclHlpnCtgrCdLst(
                    form.vhclHlpnCtgrCdSrch.getValues(),
                    page,
                    grid.vhclHlpnCtgrCdLst.size,
                );
            },
            enabled: comnUtils.isEmpty(form.vhclHlpnCtgrCdSrch.errors) && form.vhclHlpnCtgrCdSrch.isSubmitted,
            key: [grid.vhclHlpnCtgrCdLst.page, grid.vhclHlpnCtgrCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclHlpnCtgrCdSrch.getValues(),
                    page: grid.vhclHlpnCtgrCdLst.page,
                    size: grid.vhclHlpnCtgrCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclHlpnCtgrCdSrch.handleSubmit(
                () => {
                    grid.vhclHlpnCtgrCdLst.setPage(0);
                    fetch.getVhclHlpnCtgrCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.vhclHlpnCtgrCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_VhclHlpnCtgrCdLst: {
            cell: {
                vhclHlpnCtgrCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.vhclHlpnCtgrNm });
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
            grid.vhclHlpnCtgrCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_VHCL_HLPN_CTGR_CD_LST")}
            description={t("T_VHCL_HLPN_CTGR_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_HLPN_CTGR_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclHlpnCtgrCdSrch.schema.vhclHlpnCtgrCd}></Group.Control>
                                <Group.Control {...form.vhclHlpnCtgrCdSrch.schema.vhclHlpnCtgrNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclHlpnCtgrCdSrch.reset();
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
                            {...grid.vhclHlpnCtgrCdLst.grid}
                            data={fetch.getVhclHlpnCtgrCdLst.data?.vhclHlpnCtgrList}
                            render={render.grid_VhclHlpnCtgrCdLst}
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
