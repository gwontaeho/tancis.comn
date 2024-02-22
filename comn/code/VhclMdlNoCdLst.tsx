import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_VHCL_MDL_NO_CD_SRCH, SCHEMA_GRID_VHCL_MDL_NO_CD } from "./services/ComnCdService";

export const VehicleModelNumberCodeList = (props: any) => {
    const pgeUid = "vhclMdlNoCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        vhclMdlNoCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_MDL_NO_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclMdlNoCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_MDL_NO_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclMdlNoCdLst: useFetch({
            api: (page = grid.vhclMdlNoCdLst.page) => {
                return APIS.getVhclMdlNoCdLst(form.vhclMdlNoCdSrch.getValues(), page, grid.vhclMdlNoCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.vhclMdlNoCdSrch.errors) && form.vhclMdlNoCdSrch.isSubmitted,
            key: [grid.vhclMdlNoCdLst.page, grid.vhclMdlNoCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclMdlNoCdSrch.getValues(),
                    page: grid.vhclMdlNoCdLst.page,
                    size: grid.vhclMdlNoCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclMdlNoCdSrch.handleSubmit(
                () => {
                    grid.vhclMdlNoCdLst.setPage(0);
                    fetch.getVhclMdlNoCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.vhclMdlNoCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "에러\n에러\n" });
                return;
            }

            postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_VhclMdlNoCdLst: {
            cell: {
                vhclMdlNoCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.vhclMdlNoNm });
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
        if (params.multiple === true) {
            grid.vhclMdlNoCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_VHCL_MDL_NO_CD_LST")}
            description={t("T_VHCL_MDL_NO_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_MDL_NO_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclMdlNoCdSrch.schema.vhclMdlNoCd}></Group.Control>
                                <Group.Control {...form.vhclMdlNoCdSrch.schema.vhclMdlNoNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclMdlNoCdSrch.reset();
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
                        {params.multiple === true && (
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
                            {...grid.vhclMdlNoCdLst.grid}
                            data={fetch.getVhclMdlNoCdLst.data?.vhclMdlNoList}
                            render={render.grid_VhclMdlNoCdLst}
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
