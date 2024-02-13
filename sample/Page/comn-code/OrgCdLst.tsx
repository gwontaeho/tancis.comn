import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useGrid, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_ORG_CD_SRCH, SCHEMA_GRID_ORG_CD } from "./ComnCdService";

export const OrganizationCodeList = (props: any) => {
    const pgeUid = "orgCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        orgCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_ORG_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        orgCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_ORG_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getOrgCdLst: useFetch({
            api: (page = grid.orgCdLst.page) => {
                return APIS.getOrgCdLst(form.orgCdSrch.getValues(), page, grid.orgCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.orgCdSrch.errors) && form.orgCdSrch.isSubmitted,
            key: [grid.orgCdLst.page, grid.orgCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.orgCdSrch.getValues(),
                    page: grid.orgCdLst.page,
                    size: grid.orgCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.orgCdSrch.handleSubmit(
                () => {
                    grid.orgCdLst.setPage(0);
                    fetch.getOrgCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };

    const render = {
        grid_OrgCdLst: {
            cell: {
                orgCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;

                                postMessage({ code: value, label: rowValues.orgNm });
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
            title={t("T_ORG_CD_LST")}
            description={t("T_ORG_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_ORG_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.orgCdSrch.schema.orgCd}></Group.Control>
                                <Group.Control {...form.orgCdSrch.schema.orgNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.orgCdSrch.reset();
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
                    <Grid
                        {...grid.orgCdLst.grid}
                        data={fetch.getOrgCdLst.data?.orgList}
                        render={render.grid_OrgCdLst}
                    />
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
