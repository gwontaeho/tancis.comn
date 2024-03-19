import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_CSTM_OFCR_CD_SRCH, SCHEMA_GRID_CSTM_OFCR_CD } from "./services/ComnCdService";

export const CustomsOfficerCodeList = (props: any) => {
    const pgeUid = "cstmOfcrCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */

    const form = {
        cstmOfcrCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_CSTM_OFCR_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        cstmOfcrCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_CSTM_OFCR_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getCstmOfcrCdList: useFetch({
            api: (page = grid.cstmOfcrCdLst.page) => {
                return APIS.getCstmOfcrCdList(form.cstmOfcrCdSrch.getValues(), page, grid.cstmOfcrCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.cstmOfcrCdSrch.errors) && form.cstmOfcrCdSrch.isSubmitted,
            key: [grid.cstmOfcrCdLst.page, grid.cstmOfcrCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.cstmOfcrCdSrch.getValues(),
                    page: grid.cstmOfcrCdLst.page,
                    size: grid.cstmOfcrCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.cstmOfcrCdSrch.handleSubmit(
                () => {
                    grid.cstmOfcrCdLst.setPage(0);
                    fetch.getCstmOfcrCdList.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },

        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.cstmOfcrCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "msg.com.00086" });
                return;
            }

            postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_CstmOfcrCdLst: {
            cell: {
                usrDmnId: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            href="#!"
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.usrDmnId });
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
            grid.cstmOfcrCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_CSTM_OFCR_CD_LST")}
            description={t("T_CSTM_OFCR_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_CSTM_OFCR_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.cstmOfcrCdSrch.schema.usrDmnId}></Group.Control>
                                <Group.Control {...form.cstmOfcrCdSrch.schema.usrNm}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.cstmOfcrCdSrch.schema.cstmOfceCd}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.cstmOfcrCdSrch.reset();
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
                            {...grid.cstmOfcrCdLst.grid}
                            data={fetch.getCstmOfcrCdList.data?.cstmCdList}
                            render={render.grid_CstmOfcrCdLst}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>
        </Page>
    );
};
