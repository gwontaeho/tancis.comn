import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_CARR_CD_SRCH, SCHEMA_GRID_CARR_CD } from "./services/ComnCdService";

export const CarrCodeList = (props: any) => {
    const pgeUid = "carrCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        carrCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_CARR_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        carrCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_CARR_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getCarrCdLst: useFetch({
            api: (page = grid.carrCdLst.page) => {
                return APIS.getCarrCdLst(form.carrCdSrch.getValues(), page, grid.carrCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.carrCdSrch.errors) && form.carrCdSrch.isSubmitted,
            key: [grid.carrCdLst.page, grid.carrCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.carrCdSrch.getValues(),
                    page: grid.carrCdLst.page,
                    size: grid.carrCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.carrCdSrch.handleSubmit(
                () => {
                    grid.carrCdLst.setPage(0);
                    fetch.getCarrCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.carrCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            modal.postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_CarrCdLst: {
            cell: {
                coDclaCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                modal.postMessage({ code: value, label: rowValues.carrNm, data: rowValues });
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
        if (params?.cstmOfceCd) {
            form.carrCdSrch.setValue("cstmOfceCd", params.cstmOfceCd);
        }
        handler.click_Btn_Srch();
        /* * */
        if (params?.multiple === true) {
            grid.carrCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_CARR_CD_LST")}
            description={t("T_CARR_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_CARR_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.carrCdSrch.schema.coDclaCd}></Group.Control>
                                <Group.Control {...form.carrCdSrch.schema.carrNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.carrCdSrch.reset();
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
                    {/* * */}
                    {params?.multiple === true && (
                        <Layout>
                            <Layout.Right>
                                <Button
                                    role="apply"
                                    onClick={() => {
                                        handler.click_Btn_Apply();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    )}
                    <Grid
                        {...grid.carrCdLst.grid}
                        data={fetch.getCarrCdLst.data?.carrList}
                        render={render.grid_CarrCdLst}
                    />
                </Group.Body>
            </Group>
        </Page>
    );
};
