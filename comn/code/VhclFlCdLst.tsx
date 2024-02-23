import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_VHCL_FL_CD_SRCH, SCHEMA_GRID_VHCL_FL_CD } from "./services/ComnCdService";

export const VehicleFuelCodeList = (props: any) => {
    const pgeUid = "vhclFlCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        vhclFlCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_FL_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclFlCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_FL_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclFlCdLst: useFetch({
            api: (page = grid.vhclFlCdLst.page) => {
                return APIS.getVhclFlCdLst(form.vhclFlCdSrch.getValues(), page, grid.vhclFlCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.vhclFlCdSrch.errors) && form.vhclFlCdSrch.isSubmitted,
            key: [grid.vhclFlCdLst.page, grid.vhclFlCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclFlCdSrch.getValues(),
                    page: grid.vhclFlCdLst.page,
                    size: grid.vhclFlCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclFlCdSrch.handleSubmit(
                () => {
                    grid.vhclFlCdLst.setPage(0);
                    fetch.getVhclFlCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.vhclFlCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "에러\n에러\n" });
                return;
            }

            postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_VhclFlCdLst: {
            cell: {
                vhclFlTpCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.vhclFlNm });
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
        if (params?.multiple === true) {
            grid.vhclFlCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_VHCL_FL_CD_LST")}
            description={t("T_VHCL_FL_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_FL_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclFlCdSrch.schema.vhclFlTpCd}></Group.Control>
                                <Group.Control {...form.vhclFlCdSrch.schema.vhclFlNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclFlCdSrch.reset();
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
                            {...grid.vhclFlCdLst.grid}
                            data={fetch.getVhclFlCdLst.data?.vhclFlList}
                            render={render.grid_VhclFlCdLst}
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
