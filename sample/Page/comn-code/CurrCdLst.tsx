import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useGrid, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_CURR_CD_SRCH, SCHEMA_GRID_CURR_CD } from "./ComnCdService";

export const CurrencyCodeList = (props: any) => {
    const pgeUid = "currCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        currCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_CURR_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        currCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_CURR_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getCurrCdLst: useFetch({
            api: (page = grid.currCdLst.page) => {
                return APIS.getCurrCdLst(form.currCdSrch.getValues(), page, grid.currCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.currCdSrch.errors) && form.currCdSrch.isSubmitted,
            key: [grid.currCdLst.page, grid.currCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.currCdSrch.getValues(),
                    page: grid.currCdLst.page,
                    size: grid.currCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.currCdSrch.handleSubmit(
                () => {
                    grid.currCdLst.setPage(0);
                    fetch.getCurrCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };

    const render = {
        grid_CurrCdLst: {
            cell: {
                currCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;

                                postMessage({ code: value, label: rowValues.cntyNm });
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
            title={t("T_CURR_CD_LST")}
            description={t("T_CURR_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_CURR_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.currCdSrch.schema.currCd}></Group.Control>
                                <Group.Control {...form.currCdSrch.schema.currNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.currCdSrch.reset();
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
                    <Group.Section>
                        <Grid
                            {...grid.currCdLst.grid}
                            data={fetch.getCurrCdLst.data?.currCdList}
                            render={render.grid_CurrCdLst}
                        />
                    </Group.Section>
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
