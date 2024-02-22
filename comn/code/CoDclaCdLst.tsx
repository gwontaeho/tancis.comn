import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useGrid, usePopup, useStore, useToast, useAuth } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_CO_DCLA_CD_SRCH, SCHEMA_GRID_CO_DCLA_CD } from "./services/ComnCdService";

export const CompanyDeclareCodeList = (props: any) => {
    const pgeUid = "coDclaCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams();

    const form = {
        coDclaCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_CO_DCLA_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        coDclaCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_CO_DCLA_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getCoDclaCdLst: useFetch({
            api: (page = grid.coDclaCdLst.page) => {
                return APIS.getCoDclaCdLst(form.coDclaCdSrch.getValues(), page, grid.coDclaCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.coDclaCdSrch.errors) && form.coDclaCdSrch.isSubmitted,
            key: [grid.coDclaCdLst.page, grid.coDclaCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.coDclaCdSrch.getValues(),
                    page: grid.coDclaCdLst.page,
                    size: grid.coDclaCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.coDclaCdSrch.handleSubmit(
                () => {
                    grid.coDclaCdLst.setPage(0);
                    fetch.getCoDclaCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };

    const render = {
        grid_CoDclaCdLst: {
            cell: {
                coTin: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;

                                postMessage({ code: rowValues.coDclaCd, label: rowValues.coNm, data: rowValues });
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
        if (params.coDclaTpCd) {
            form.coDclaCdSrch.setValue("coDclaTpCd", params.coDclaTpCd);
            form.coDclaCdSrch.setSchema("coDclaTpCd", { readOnly: true });
        }
        handler.click_Btn_Srch();
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_CO_DCLA_CD_LST")}
            description={t("T_CO_DCLA_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_CO_DCLA_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.coDclaCdSrch.schema.coTin}></Group.Control>
                                <Group.Control {...form.coDclaCdSrch.schema.coDclaTpCd}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.coDclaCdSrch.schema.coNm} controlSize={10}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.coDclaCdSrch.reset();
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
                            {...grid.coDclaCdLst.grid}
                            data={fetch.getCoDclaCdLst.data?.coDclaCdList}
                            render={render.grid_CoDclaCdLst}
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
