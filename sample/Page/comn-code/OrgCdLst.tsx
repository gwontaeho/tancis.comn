import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
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
        orgCdLst: useWijmo({
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
        click_Grid_OrgCdLst: {
            orgCd: (data: any) => {
                if (!comnUtils.isPopup()) return;
                postMessage({
                    code: data.value,
                    label: data.rowValues.orgNm,
                    orgAddr: data.rowValues.orgAddr,
                    rprsTlphNo: data.rowValues.rprsTlphNo,
                });
                close();
            },
        },
    };

    useEffect(() => {
        handler.click_Btn_Srch();
    }, []);

    return (
        <Page>
            {/* <Page.Navigation base={comnEnvs.base} nodes={[...BASE.nodes, { label: "T_ORG_CD_LST" }]} />
            <Page.Header title={t("T_ORG_CD_LST")} description={t("T_ORG_CD_LST")} /> */}
            <form>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.orgCdSrch.schema.orgCd}></Group.Control>
                            <Group.Control {...form.orgCdSrch.schema.orgNm}></Group.Control>
                        </Group.Row>
                    </Group.Body>
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
                </Group>
            </form>

            <Group>
                <Wijmo
                    {...grid.orgCdLst.grid}
                    data={fetch.getOrgCdLst.data?.orgList}
                    onCellClick={handler.click_Grid_OrgCdLst}
                />
            </Group>
            {comnUtils.isPopup() && (
                <Layout.Right>
                    <Button onClick={close}>{t("B_CLS")}</Button>
                </Layout.Right>
            )}
        </Page>
    );
};
