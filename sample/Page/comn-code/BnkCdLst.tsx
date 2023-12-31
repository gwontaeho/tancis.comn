import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_BNK_CD_SRCH, SCHEMA_GRID_BNK_CD } from "./ComnCdService";

export const BankCodeList = (props: any) => {
    const pgeUid = "bnkCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        bnkCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_BNK_CD_SRCH,
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
            api: (page = grid.bnkCdLst.page) => {
                return APIS.getBnkCdLst(form.bnkCdSrch.getValues(), page, grid.bnkCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.bnkCdSrch.errors) && form.bnkCdSrch.isSubmitted,
            key: [grid.bnkCdLst.page, grid.bnkCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.bnkCdSrch.getValues(),
                    page: grid.bnkCdLst.page,
                    size: grid.bnkCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.bnkCdSrch.handleSubmit(
                () => {
                    grid.bnkCdLst.setPage(0);
                    fetch.getBnkCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_BnkCdLst: {
            cdVldVal: (data: any) => {
                if (!comnUtils.isPopup()) return;
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
            {/* <Page.Navigation base={comnEnvs.base} nodes={[...BASE.nodes, { label: "T_BNK_CD_LST" }]} />
            <Page.Header title={t("T_BNK_CD_LST")} description={t("T_BNK_CD_LST")} /> */}
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
                    data={fetch.getBnkCdLst.data?.comnCdList}
                    onCellClick={handler.click_Grid_BnkCdLst}
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
