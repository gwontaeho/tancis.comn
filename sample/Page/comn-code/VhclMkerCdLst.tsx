import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_VHCL_MKER_CD_SRCH, SCHEMA_GRID_VHCL_MKER_CD } from "./ComnCdService";

export const VehicleManufactureCodeList = (props: any) => {
    const pgeUid = "vhclMkerCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        vhclMkerCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_MKER_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclMkerCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_MKER_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclMkerCdLst: useFetch({
            api: (page = grid.vhclMkerCdLst.page) => {
                return APIS.getVhclMkerCdLst(form.vhclMkerCdSrch.getValues(), page, grid.vhclMkerCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.vhclMkerCdSrch.errors) && form.vhclMkerCdSrch.isSubmitted,
            key: [grid.vhclMkerCdLst.page, grid.vhclMkerCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclMkerCdSrch.getValues(),
                    page: grid.vhclMkerCdLst.page,
                    size: grid.vhclMkerCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclMkerCdSrch.handleSubmit(
                () => {
                    grid.vhclMkerCdLst.setPage(0);
                    fetch.getVhclMkerCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };

    const render = {
        grid_VhclMkerCdLst: {
            cell: {
                vhclMnfcCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.vhclMnfcNm });
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
            title={t("T_VHCL_MKER_CD_LST")}
            description={t("T_VHCL_MKER_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_MKER_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclMkerCdSrch.schema.vhclMnfcCd}></Group.Control>
                                <Group.Control {...form.vhclMkerCdSrch.schema.vhclMnfcNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclMkerCdSrch.reset();
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
                            {...grid.vhclMkerCdLst.grid}
                            data={fetch.getVhclMkerCdLst.data?.vhclMkerList}
                            render={render.grid_VhclMkerCdLst}
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
