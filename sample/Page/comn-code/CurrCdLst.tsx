import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { utils, envs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_CURR_CD, SCHEMA_GRID_CURR_CD } from "./ComnCdService";

export const CurrencyCodeList = (props: any) => {
    const pgeUid = "comnCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        currCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_CURR_CD,
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
            api: () => APIS.getCurrCdLst(form.currCdSrch.getValues(), grid.currCdLst.page, grid.currCdLst.size),
            enabled: utils.isEmpty(form.currCdSrch.errors) && form.currCdSrch.isSubmitted,
            key: [grid.currCdLst.page, grid.currCdLst.size],
            showToast: true,
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.currCdSrch.handleSubmit(
                () => {
                    setStore(pgeUid, {
                        form: form.currCdSrch.getValues(),
                        page: grid.currCdLst.page,
                        size: grid.currCdLst.size,
                    });
                    fetch.getCurrCdLst.fetch();
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_CurrCdLst: {
            currCd: (data: any) => {
                if (!utils.isPopup()) return;
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
            <Page.Navigation base={envs.base} nodes={[...BASE.nodes, { label: "T_CURR_CD_LST" }]} />
            <Page.Header title={t("T_CURR_CD_LST")} description={t("T_CURR_CD_LST")} />
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
                    data={fetch.getCurrCdLst.data}
                    onCellClick={handler.click_Grid_CurrCdLst}
                />
            </Group>
            {utils.isPopup() && (
                <Layout.Right>
                    <Button onClick={close}>{t("B_CLS")}</Button>
                </Layout.Right>
            )}
        </Page>
    );
};
