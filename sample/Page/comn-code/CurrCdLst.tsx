import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
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
        currCdLst: useWijmo({
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
        click_Grid_CurrCdLst: {
            currCd: (data: any) => {
                if (!comnUtils.isPopup()) return;
                postMessage({ code: data.value, label: data.rowValues.currNm });
                close();
            },
        },
    };

    useEffect(() => {
        handler.click_Btn_Srch();
    }, []);

    return (
        <Page>
            {/* <Page.Navigation base={comnEnvs.base} nodes={[...BASE.nodes, { label: "T_CURR_CD_LST" }]} />
            <Page.Header title={t("T_CURR_CD_LST")} description={t("T_CURR_CD_LST")} /> */}
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.currCdSrch.schema.currCd}></Group.Control>
                            <Group.Control {...form.currCdSrch.schema.currNm}></Group.Control>
                        </Group.Row>
                    </Group.Body>
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
                </Group>
            </form>

            <Group>
                <Wijmo
                    {...grid.currCdLst.grid}
                    data={fetch.getCurrCdLst.data?.currCdList}
                    onCellClick={handler.click_Grid_CurrCdLst}
                />
            </Group>
            {comnUtils.isPopup() && (
                <Layout.Right>
                    <Button onClick={close}>{t("B_CLS")}</Button>
                </Layout.Right>
            )}
        </Page>
    );
};
