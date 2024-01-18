import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SF_LBL_LANG_SRCH, SG_LBL_LANG_LIST } from "./services/LblLangPrsccService";

export const CurrencyCodeList = (props: any) => {
    const pgeUid = "lblLangLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        lblLangSrch: useForm({
            defaultSchema: SF_LBL_LANG_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        lblLangLst: useWijmo({
            defaultSchema: SG_LBL_LANG_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getLblLangLst: useFetch({
            api: (page = grid.lblLangLst.page) => {
                return APIS.getLblLangList(form.lblLangSrch.getValues(), page, grid.lblLangLst.size);
            },
            enabled: comnUtils.isEmpty(form.lblLangSrch.errors) && form.lblLangSrch.isSubmitted,
            key: [grid.lblLangLst.page, grid.lblLangLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.lblLangSrch.getValues(),
                    page: grid.lblLangLst.page,
                    size: grid.lblLangLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.lblLangSrch.handleSubmit(
                () => {
                    grid.lblLangLst.setPage(0);
                    fetch.getLblLangLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_LblLangLst: {
            lblLang: (data: any) => {
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
                                <Group.Control {...form.lblLangSrch.schema.lblId}></Group.Control>
                                <Group.Control {...form.lblLangSrch.schema.lblNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.lblLangSrch.reset();
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
                        <Wijmo
                            {...grid.lblLangLst.grid}
                            data={fetch.getLblLangLst.data?.lblLangList}
                            onCellClick={handler.click_Grid_LblLangLst}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>
        </Page>
    );
};
