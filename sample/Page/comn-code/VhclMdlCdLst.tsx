import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_VHCL_MDL_CD_SRCH, SCHEMA_GRID_VHCL_MDL_CD } from "./ComnCdService";

export const VehicleModelCodeList = (props: any) => {
    const pgeUid = "vhclMdlCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        vhclMdlCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_MDL_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclMdlCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_MDL_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclMdlCdLst: useFetch({
            api: (page = grid.vhclMdlCdLst.page) => {
                return APIS.getVhclMdlCdLst(form.vhclMdlCdSrch.getValues(), page, grid.vhclMdlCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.vhclMdlCdSrch.errors) && form.vhclMdlCdSrch.isSubmitted,
            key: [grid.vhclMdlCdLst.page, grid.vhclMdlCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclMdlCdSrch.getValues(),
                    page: grid.vhclMdlCdLst.page,
                    size: grid.vhclMdlCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclMdlCdSrch.handleSubmit(
                () => {
                    grid.vhclMdlCdLst.setPage(0);
                    fetch.getVhclMdlCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };

    const render = {
        grid_VhclMdlCdLst: {
            cell: {
                vhclMdlCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.vhclMdlNm });
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
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_VHCL_MDL_CD_LST")}
            description={t("T_VHCL_MDL_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_MDL_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclMdlCdSrch.schema.vhclMdlCd}></Group.Control>
                                <Group.Control {...form.vhclMdlCdSrch.schema.vhclMdlNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclMdlCdSrch.reset();
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
                        <Grid
                            {...grid.vhclMdlCdLst.grid}
                            data={fetch.getVhclMdlCdLst.data?.vhclMdlList}
                            render={render.grid_VhclMdlCdLst}
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
