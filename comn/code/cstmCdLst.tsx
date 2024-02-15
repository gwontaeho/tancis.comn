import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_CSTM_CD_SRCH, SCHEMA_GRID_CSTM_CD } from "./services/ComnCdService";

export const CustomsCodeList = (props: any) => {
    const pgeUid = "cstmCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        cstmCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_CSTM_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        cstmCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_CSTM_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getCstmCdLst: useFetch({
            api: (page = grid.cstmCdLst.page) => {
                return APIS.getCstmCdLst(form.cstmCdSrch.getValues(), page, grid.cstmCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.cstmCdSrch.errors) && form.cstmCdSrch.isSubmitted,
            key: [grid.cstmCdLst.page, grid.cstmCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.cstmCdSrch.getValues(),
                    page: grid.cstmCdLst.page,
                    size: grid.cstmCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.cstmCdSrch.handleSubmit(
                () => {
                    grid.cstmCdLst.setPage(0);
                    fetch.getCstmCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };

    const render = {
        grid_CstmCdLst: {
            cell: {
                cstmOfceCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.cstmNm });
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
            title={t("T_CSTM_CD_LST")}
            description={t("T_CSTM_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_CSTM_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.cstmCdSrch.schema.cstmOfceCd}></Group.Control>
                                <Group.Control {...form.cstmCdSrch.schema.cstmNm}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.cstmCdSrch.schema.cstmTpCd} controlSize={10}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.cstmCdSrch.reset();
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
                            {...grid.cstmCdLst.grid}
                            data={fetch.getCstmCdLst.data?.cstmCdList}
                            render={render.grid_CstmCdLst}
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
