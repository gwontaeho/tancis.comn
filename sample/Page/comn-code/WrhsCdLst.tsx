import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid, Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast, useAuth, useGrid } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_WRHS_CD_SRCH, SCHEMA_GRID_WRHS_CD } from "./ComnCdService";

export const WrhsCodeList = (props: any) => {
    const pgeUid = "wrhsCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();
    const auth = useAuth();
    auth.get("tin");

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
        click_Grid_WrhsCdLst: {
            coDclaCd: (data: any) => {
                if (!comnUtils.isPopup()) return;
                postMessage({ code: data.value, label: data.rowValues.wrhsNm });
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
                                <Group.Control {...form.wrhsCdSrch.schema.wrhsCd}></Group.Control>
                                <Group.Control {...form.wrhsCdSrch.schema.wrhsNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.wrhsCdSrch.reset();
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
                            {...grid.wrhsCdLst.grid}
                            data={fetch.getWrhsCdLst.data?.wrhsList}
                            onCellClick={handler.click_Grid_WrhsCdLst}
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
