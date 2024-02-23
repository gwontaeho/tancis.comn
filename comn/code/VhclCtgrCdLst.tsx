import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_VHCL_CTGR_CD_SRCH, SCHEMA_GRID_VHCL_CTGR_CD } from "./services/ComnCdService";

export const VehicleCategoryCodeList = (props: any) => {
    const pgeUid = "vhclCtgrCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        vhclCtgrCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_VHCL_CTGR_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        vhclCtgrCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_VHCL_CTGR_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getVhclCtgrCdLst: useFetch({
            api: (page = grid.vhclCtgrCdLst.page) => {
                return APIS.getVhclCtgrCdLst(form.vhclCtgrCdSrch.getValues(), page, grid.vhclCtgrCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.vhclCtgrCdSrch.errors) && form.vhclCtgrCdSrch.isSubmitted,
            key: [grid.vhclCtgrCdLst.page, grid.vhclCtgrCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.vhclCtgrCdSrch.getValues(),
                    page: grid.vhclCtgrCdLst.page,
                    size: grid.vhclCtgrCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.vhclCtgrCdSrch.handleSubmit(
                () => {
                    grid.vhclCtgrCdLst.setPage(0);
                    fetch.getVhclCtgrCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.vhclCtgrCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_VhclCtgrCdLst: {
            cell: {
                vhclCtgrCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.vhclCtgrNm });
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
            grid.vhclCtgrCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_VHCL_CTGR_CD_LST")}
            description={t("T_VHCL_CTGR_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_VHCL_CTGR_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.vhclCtgrCdSrch.schema.vhclCtgrCd}></Group.Control>
                                <Group.Control {...form.vhclCtgrCdSrch.schema.vhclCtgrNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.vhclCtgrCdSrch.reset();
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
                            {...grid.vhclCtgrCdLst.grid}
                            data={fetch.getVhclCtgrCdLst.data?.vhclCtgrList}
                            render={render.grid_VhclCtgrCdLst}
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
