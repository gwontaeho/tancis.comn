import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_TIN_NO_SRCH, SCHEMA_GRID_TIN_NO } from "./services/ComnCdService";
export const TinNumberList = (props: any) => {
    const pgeUid = "tinNoList";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        tinNoSrch: useForm({
            defaultSchema: SCHEMA_FORM_TIN_NO_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        tinNoList: useGrid({
            defaultSchema: SCHEMA_GRID_TIN_NO,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getTinNoLst: useFetch({
            api: (page = grid.tinNoList.page) => {
                return APIS.getTinNoLst(form.tinNoSrch.getValues(), page, grid.tinNoList.size);
            },
            enabled: comnUtils.isEmpty(form.tinNoSrch.errors) && form.tinNoSrch.isSubmitted,
            key: [grid.tinNoList.page, grid.tinNoList.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.tinNoSrch.getValues(),
                    page: grid.tinNoList.page,
                    size: grid.tinNoList.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.tinNoSrch.handleSubmit(
                () => {
                    grid.tinNoList.setPage(0);
                    fetch.getTinNoLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.tinNoList.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            modal.postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_TinNoLst: {
            cell: {
                tinNo: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                modal.postMessage({ code: value, label: rowValues.coNm });
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
            title={t("T_TIN_NO_LIST")}
            description={t("T_TIN_NO_LIST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_TIN_NO_LIST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.tinNoSrch.schema.tinNo}></Group.Control>
                                <Group.Control {...form.tinNoSrch.schema.coNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.tinNoSrch.reset();
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
                            {...grid.tinNoList.grid}
                            data={fetch.getTinNoLst.data?.tinNoList}
                            render={render.grid_TinNoLst}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>
        </Page>
    );
};
