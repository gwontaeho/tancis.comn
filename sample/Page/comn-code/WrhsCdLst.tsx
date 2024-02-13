import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_WRHS_CD_SRCH, SCHEMA_GRID_WRHS_CD } from "./ComnCdService";

export const WrhsCodeList = (props: any) => {
    const pgeUid = "wrhsCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!

    const form = {
        wrhsCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_WRHS_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        wrhsCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_WRHS_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getWrhsCdLst: useFetch({
            api: (page = grid.wrhsCdLst.page) => {
                return APIS.getWrhsCdLst(form.wrhsCdSrch.getValues(), page, grid.wrhsCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.wrhsCdSrch.errors) && form.wrhsCdSrch.isSubmitted,
            key: [grid.wrhsCdLst.page, grid.wrhsCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.wrhsCdSrch.getValues(),
                    page: grid.wrhsCdLst.page,
                    size: grid.wrhsCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.wrhsCdSrch.handleSubmit(
                () => {
                    grid.wrhsCdLst.setPage(0);
                    fetch.getWrhsCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };

    const render = {
        grid_WrhsCdLst: {
            cell: {
                coDclaCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                modal.postMessage({ code: value, label: rowValues.wrhsNm });
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
            title={t("T_WRHS_CD_LST")}
            description={t("T_WRHS_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_WRHS_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.wrhsCdSrch.schema.coDclaCd}></Group.Control>
                                <Group.Control {...form.wrhsCdSrch.schema.wrhsNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.wrhsCdSrch.reset();
                                    }}
                                >
                                    {t("B_RESET")}
                                </Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    onClick={() => {
                                        handler.click_Btn_Srch();
                                    }}
                                >
                                    {t("B_SRCH")}
                                </Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Body>
                </Group>
            </form>

            <Group>
                <Group.Body>
                    <Grid
                        {...grid.wrhsCdLst.grid}
                        data={fetch.getWrhsCdLst.data?.wrhsList}
                        render={render.grid_WrhsCdLst}
                    />
                </Group.Body>
            </Group>
            {comnUtils.isPopup() && (
                <Layout.Right>
                    <Button role="close" onClick={close}></Button>
                </Layout.Right>
            )}
        </Page>
    );
};
