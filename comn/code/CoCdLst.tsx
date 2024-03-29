import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useGrid, usePopup, useStore, useToast, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_CO_CD_SRCH, SCHEMA_GRID_CO_CD } from "./services/ComnCdService";

export const CompanyCodeList = (props: any) => {
    const pgeUid = "coCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        coCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_CO_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        coCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_CO_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getCoCdLst: useFetch({
            api: (page = grid.coCdLst.page) => {
                return APIS.getCoCdLst(form.coCdSrch.getValues(), page, grid.coCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.coCdSrch.errors) && form.coCdSrch.isSubmitted,
            key: [grid.coCdLst.page, grid.coCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.coCdSrch.getValues(),
                    page: grid.coCdLst.page,
                    size: grid.coCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.coCdSrch.handleSubmit(
                () => {
                    grid.coCdLst.setPage(0);
                    fetch.getCoCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.coCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            modal.postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_CoCdLst: {
            cell: {
                coTin: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;

                                modal.postMessage({ code: value, label: rowValues.coNm, data: rowValues });
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
        form.coCdSrch.setValue("coTpCd", "C");
        handler.click_Btn_Srch();
        /* * */
        if (params?.multiple === true) {
            grid.coCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_CO_CD_LST")}
            description={t("T_CO_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_CO_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.coCdSrch.schema.coTin}></Group.Control>
                                <Group.Control {...form.coCdSrch.schema.coTpCd}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.coCdSrch.schema.coNm} controlSize={10}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.coCdSrch.reset();
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
                    <Grid {...grid.coCdLst.grid} data={fetch.getCoCdLst.data?.coList} render={render.grid_CoCdLst} />
                </Group.Body>
            </Group>
        </Page>
    );
};
