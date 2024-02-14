import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_VHCL_BODY_CD_SRCH, SCHEMA_GRID_VHCL_BODY_CD } from "./services/ComnCdService";

export const VehicleBodyCodeList = (props: any) => {
    const pgeUid = "vhclBodyCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        vhclBodyCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_BODY_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclBodyCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_BODY_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclBodyCdLst: useFetch({
            api: (page = grid.vhclBodyCdLst.page) => {
                return APIS.getVhclBodyCdLst(form.vhclBodyCdSrch.getValues(), page, grid.vhclBodyCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.vhclBodyCdSrch.errors) && form.vhclBodyCdSrch.isSubmitted,
            key: [grid.vhclBodyCdLst.page, grid.vhclBodyCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclBodyCdSrch.getValues(),
                    page: grid.vhclBodyCdLst.page,
                    size: grid.vhclBodyCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclBodyCdSrch.handleSubmit(
                () => {
                    grid.vhclBodyCdLst.setPage(0);
                    fetch.getVhclBodyCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };

    const render = {
        grid_VhclBodyCdLst: {
            cell: {
                vhclBodyTpCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.vhclBodyTpNm });
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
            title={t("T_VHCL_BODY_CD_LST")}
            description={t("T_VHCL_BODY_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_BODY_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclBodyCdSrch.schema.vhclBodyTpCd}></Group.Control>
                                <Group.Control {...form.vhclBodyCdSrch.schema.vhclBodyTpNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclBodyCdSrch.reset();
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
                            {...grid.vhclBodyCdLst.grid}
                            data={fetch.getVhclBodyCdLst.data?.vhclBodyList}
                            render={render.grid_VhclBodyCdLst}
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
