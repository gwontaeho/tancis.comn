import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useGrid, usePopup, useStore, useToast, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_PORT_CD_SRCH, SCHEMA_GRID_PORT_CD } from "./services/ComnCdService";

export const PortCodeList = (props: any) => {
    const pgeUid = "portCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        portCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_PORT_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        portCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_PORT_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getPortCdLst: useFetch({
            api: (page = grid.portCdLst.page) => {
                return APIS.getPortCdLst(form.portCdSrch.getValues(), page, grid.portCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.portCdSrch.errors) && form.portCdSrch.isSubmitted,
            key: [grid.portCdLst.page, grid.portCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.portCdSrch.getValues(),
                    page: grid.portCdLst.page,
                    size: grid.portCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.portCdSrch.handleSubmit(
                () => {
                    grid.portCdLst.setPage(0);
                    fetch.getPortCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.portCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "에러\n에러\n" });
                return;
            }

            postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_PortCdLst: {
            cell: {
                regnCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;

                                postMessage({ code: value, label: rowValues.regnNm });
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
        /* * */
        if (params.multiple === true) {
            grid.portCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_PORT_CD_LST")}
            description={t("T_PORT_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_PORT_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.portCdSrch.schema.cntyCd} controlSize={10}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.portCdSrch.schema.regnCd}></Group.Control>
                                <Group.Control {...form.portCdSrch.schema.regnNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.portCdSrch.reset();
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
                    {/* * */}
                    {params.multiple === true && (
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
                        {...grid.portCdLst.grid}
                        data={fetch.getPortCdLst.data?.regnCdList}
                        render={render.grid_PortCdLst}
                    />
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
