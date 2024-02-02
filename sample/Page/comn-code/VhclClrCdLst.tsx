import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid, Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast, useAuth, useGrid } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_VHCL_CLR_CD_SRCH, SCHEMA_GRID_VHCL_CLR_CD } from "./ComnCdService";

export const VehicleColorCodeList = (props: any) => {
    console.log("a");
    debugger;
    const pgeUid = "vhclClrCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        vhclClrCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_CLR_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclClrCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_CLR_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclClrCdLst: useFetch({
            api: (page = grid.vhclClrCdLst.page) => {
                return APIS.getVhclClrCdLst(form.vhclClrCdSrch.getValues(), page, grid.vhclClrCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.vhclClrCdSrch.errors) && form.vhclClrCdSrch.isSubmitted,
            key: [grid.vhclClrCdLst.page, grid.vhclClrCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclClrCdSrch.getValues(),
                    page: grid.vhclClrCdLst.page,
                    size: grid.vhclClrCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclClrCdSrch.handleSubmit(
                () => {
                    grid.vhclClrCdLst.setPage(0);
                    fetch.getVhclClrCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };

    const render = {
        grid_VhclClrCdLst: {
            cell: {
                vhclClrCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.vhclClrNm });
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
            title={t("T_VHCL_CLR_CD_LST")}
            description={t("T_VHCL_CLR_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_CLR_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclClrCdSrch.schema.vhclClrCd}></Group.Control>
                                <Group.Control {...form.vhclClrCdSrch.schema.vhclClrNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclClrCdSrch.reset();
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
                            {...grid.vhclClrCdLst.grid}
                            data={fetch.getVhclClrCdLst.data?.vhclClrList}
                            render={render.grid_VhclClrCdLst}
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
