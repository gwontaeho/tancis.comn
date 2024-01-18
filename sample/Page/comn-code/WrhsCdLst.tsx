import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast, useAuth } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_CURR_CD_SRCH, SCHEMA_GRID_CURR_CD } from "./ComnCdService";

export const WrhsCodeList = (props: any) => {
    const pgeUid = "wrhsCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();
    const auth = useAuth();
    auth.get("tin");

    const form = {
        wrshCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_CURR_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        wrshCdLst: useWijmo({
            defaultSchema: SCHEMA_GRID_CURR_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getWrshCdLst: useFetch({
            api: (page = grid.wrshCdLst.page) => {
                return APIS.getWrshCdLst(form.wrshCdSrch.getValues(), page, grid.wrshCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.wrshCdSrch.errors) && form.wrshCdSrch.isSubmitted,
            key: [grid.wrshCdLst.page, grid.wrshCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.wrshCdSrch.getValues(),
                    page: grid.wrshCdLst.page,
                    size: grid.wrshCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.wrshCdSrch.handleSubmit(
                () => {
                    grid.wrshCdLst.setPage(0);
                    fetch.getWrshCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_WrshCdLst: {
            wrshCd: (data: any) => {
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
                                <Group.Control {...form.wrshCdSrch.schema.wrshCd}></Group.Control>
                                <Group.Control {...form.wrshCdSrch.schema.currNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.wrshCdSrch.reset();
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
                            {...grid.wrshCdLst.grid}
                            data={fetch.getWrshCdLst.data?.wrshCdList}
                            onCellClick={handler.click_Grid_WrshCdLst}
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
