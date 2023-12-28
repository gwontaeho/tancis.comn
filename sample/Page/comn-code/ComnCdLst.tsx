import { useEffect } from "react";
import { utils, envs } from "@/comn/utils";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, useToast, usePopup, useTheme, useStore } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_COMN_CD, SCHEMA_GRID_COMN_CD } from "./ComnCdService";

export const CommonCodeList = (props: any) => {
    const pgeUid = "comnCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams();
    const { theme } = useTheme();

    const form = {
        comnCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_COMN_CD,
            defaultValues: { ...pgeStore?.form, comnCd: params?.comnCd, langCd: theme.lang.toUpperCase() } || {},
        }),
    };

    const grid = {
        comnCdLst: useWijmo({
            defaultSchema: SCHEMA_GRID_COMN_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getComnCdLst: useFetch({
            api: () => APIS.getComnCdLst(form.comnCdSrch.getValues(), grid.comnCdLst.page, grid.comnCdLst.size),
            enabled: utils.isEmpty(form.comnCdSrch.errors) && form.comnCdSrch.isSubmitted,
            key: [grid.comnCdLst.page, grid.comnCdLst.size],
            showToast: true,
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.comnCdSrch.handleSubmit(
                () => {
                    setStore(pgeUid, {
                        form: form.comnCdSrch.getValues(),
                        page: grid.comnCdLst.page,
                        size: grid.comnCdLst.size,
                    });
                    fetch.getComnCdLst.fetch();
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_ComnCdLst: {
            cdVldVal: (data: any) => {
                if (!utils.isPopup()) return;
                postMessage({ code: data.value, label: data.rowValues.cdVldValNm });
                close();
            },
        },
    };

    useEffect(() => {
        if (params?.comnCd) {
            form.comnCdSrch.setSchema("comnCd", { readOnly: true });
        }
        handler.click_Btn_Srch();
    }, []);

    return (
        <Page>
            <Page.Navigation base={envs.base} nodes={[...BASE.nodes, { label: "T_COMN_CD_LST" }]} />
            <Page.Header title={t("T_COMN_CD_LST")} description={t("T_COMN_CD_LST")} />
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.comnCdSrch.schema.comnCd}></Group.Control>
                            <Group.Control {...form.comnCdSrch.schema.cdVldVal}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.comnCdSrch.schema.cdVldValNm}></Group.Control>
                            <Group.Control {...form.comnCdSrch.schema.langCd} select={true}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                onClick={() => {
                                    form.comnCdSrch.reset();
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
                    {...grid.comnCdLst.grid}
                    data={fetch.getComnCdLst.data}
                    onCellClick={handler.click_Grid_ComnCdLst}
                />
            </Group>
            <Layout.Right>
                <Button onClick={close}>{t("B_CLS")}</Button>
            </Layout.Right>
        </Page>
    );
};
