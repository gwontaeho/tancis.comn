import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { utils, envs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_BNK_CD, SCHEMA_GRID_BNK_CD } from "./ComnCdService";

export const BankCodeList = (props: any) => {
    const pgeUid = "comnCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        bnkCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_BNK_CD,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        bnkCdLst: useWijmo({
            defaultSchema: SCHEMA_GRID_BNK_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getBnkCdLst: useFetch({
            api: () => APIS.getBnkCdLst(form.bnkCdSrch.getValues(), grid.bnkCdLst.page, grid.bnkCdLst.size),
            enabled: utils.isEmpty(form.bnkCdSrch.errors) && form.bnkCdSrch.isSubmitted,
            key: [grid.bnkCdLst.page, grid.bnkCdLst.size],
            showToast: true,
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.bnkCdSrch.handleSubmit(
                () => {
                    setStore(pgeUid, {
                        form: form.bnkCdSrch.getValues(),
                        page: grid.bnkCdLst.page,
                        size: grid.bnkCdLst.size,
                    });
                    fetch.getBnkCdLst.fetch();
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_BnkCdLst: {
            cdVldVal: (data: any) => {
                if (!utils.isPopup()) return;
                postMessage({ code: data.value, label: data.rowValues.cdVldValNm });
                close();
            },
        },
    };

    useEffect(() => {
        handler.click_Btn_Srch();
    }, []);

    return (
        <Page>
            <Page.Navigation base={envs.base} nodes={[...BASE.nodes, { label: "T_BNK_CD_LST" }]} />
            <Page.Header title={t("T_BNK_CD_LST")} description={t("T_BNK_CD_LST")} />
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.bnkCdSrch.schema.cdVldVal}></Group.Control>
                            <Group.Control {...form.bnkCdSrch.schema.cdVldValNm}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                onClick={() => {
                                    form.bnkCdSrch.reset();
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
                    {...grid.bnkCdLst.grid}
                    data={fetch.getBnkCdLst.data}
                    onCellClick={handler.click_Grid_BnkCdLst}
                />
            </Group>
            <Layout.Right>
                <Button onClick={close}>{t("B_CLS")}</Button>
            </Layout.Right>
        </Page>
    );
};
