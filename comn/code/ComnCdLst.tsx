import { useEffect } from "react";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { useTranslation } from "react-i18next";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useToast, usePopup, useTheme, useStore, useGrid, useModal } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_COMN_CD_SRCH, SCHEMA_GRID_COMN_CD } from "./services/ComnCdService";

export const CommonCodeList = (props: any) => {
    const pgeUid = "comnCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const modal = useModal();
    const { close, postMessage, getParams } = usePopup();
    const params = getParams(); /* * */
    const { theme } = useTheme();

    const form = {
        comnCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_COMN_CD_SRCH,
            defaultValues:
                { ...pgeStore?.form, comnCd: params?.comnCd || "", langCd: theme.lang.toUpperCase() || "" } || {},
        }),
    };

    const grid = {
        comnCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_COMN_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getComnCdLst: useFetch({
            api: (page = grid.comnCdLst.page) => {
                return APIS.getComnCdLst(form.comnCdSrch.getValues(), page, grid.comnCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.comnCdSrch.errors) && form.comnCdSrch.isSubmitted,
            key: [grid.comnCdLst.page, grid.comnCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.comnCdSrch.getValues(),
                    page: grid.comnCdLst.page,
                    size: grid.comnCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.comnCdSrch.handleSubmit(
                () => {
                    grid.comnCdLst.setPage(0);
                    fetch.getComnCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        /* * */
        click_Btn_Apply: () => {
            const list: any[] = grid.comnCdLst.getChecked() || [];
            if (comnUtils.isEmpty(list)) {
                modal.openModal({ content: "에러\n에러\n" });
                return;
            }

            postMessage({ data: list });
            close();
        },
    };

    const render = {
        grid_ComnCdLst: {
            cell: {
                cdVldVal: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;

                                postMessage({ code: rowValues.cdVldVal, label: rowValues.cdVldValNm });
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
        if (params?.comnCd) {
            form.comnCdSrch.setSchema("comnCd", { readOnly: true });
        }
        handler.click_Btn_Srch();
        /* * */
        if (params?.multiple === true) {
            grid.comnCdLst.setOption("checkbox", true);
        }
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_COMN_CD_LST")}
            description={t("T_COMN_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_COMN_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.comnCdSrch.schema.comnCd}></Group.Control>
                                <Group.Control {...form.comnCdSrch.schema.cdVldVal}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.comnCdSrch.schema.cdVldValNm}></Group.Control>
                                <Group.Control {...form.comnCdSrch.schema.langCd} select={true}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.comnCdSrch.reset();
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
                            {...grid.comnCdLst.grid}
                            data={fetch.getComnCdLst.data?.comnCdList}
                            render={render.grid_ComnCdLst}
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
