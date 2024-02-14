import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_VHCL_USE_CD_SRCH, SCHEMA_GRID_VHCL_USE_CD } from "./services/ComnCdService";
export const VehicleUseCodeList = (props: any) => {
    const pgeUid = "vhclUseCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        vhclUseCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_USE_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclUseCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_USE_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclUseCdLst: useFetch({
            api: (page = grid.vhclUseCdLst.page) => {
                return APIS.getVhclUseCdLst(form.vhclUseCdSrch.getValues(), page, grid.vhclUseCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.vhclUseCdSrch.errors) && form.vhclUseCdSrch.isSubmitted,
            key: [grid.vhclUseCdLst.page, grid.vhclUseCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclUseCdSrch.getValues(),
                    page: grid.vhclUseCdLst.page,
                    size: grid.vhclUseCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclUseCdSrch.handleSubmit(
                () => {
                    grid.vhclUseCdLst.setPage(0);
                    fetch.getVhclUseCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };

    const render = {
        grid_VhclUseCdLst: {
            cell: {
                vhclUseCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.vhclUseNm });
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
            title={t("T_VHCL_USE_CD_LST")}
            description={t("T_VHCL_USE_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_USE_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclUseCdSrch.schema.vhclUseCd}></Group.Control>
                                <Group.Control {...form.vhclUseCdSrch.schema.vhclUseNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclUseCdSrch.reset();
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
                            {...grid.vhclUseCdLst.grid}
                            data={fetch.getVhclUseCdLst.data?.vhclUseList}
                            render={render.grid_VhclUseCdLst}
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
