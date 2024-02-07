import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Grid } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useAuth, useGrid } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_ORG_DEPT_CD_SRCH, SCHEMA_GRID_ORG_DEPT_CD } from "./ComnCdService";

export const OrganizationDepartmentCodeList = (props: any) => {
    const pgeUid = "orgDeptCdLst";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        orgDeptCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_ORG_DEPT_CD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        orgDeptCdLst: useGrid({
            defaultSchema: SCHEMA_GRID_ORG_DEPT_CD,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getOrgDeptCdLst: useFetch({
            api: (page = grid.orgDeptCdLst.page) => {
                return APIS.getOrgDeptCdLst(form.orgDeptCdSrch.getValues(), page, grid.orgDeptCdLst.size);
            },
            enabled: comnUtils.isEmpty(form.orgDeptCdSrch.errors) && form.orgDeptCdSrch.isSubmitted,
            key: [grid.orgDeptCdLst.page, grid.orgDeptCdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.orgDeptCdSrch.getValues(),
                    page: grid.orgDeptCdLst.page,
                    size: grid.orgDeptCdLst.size,
                });
            },
        }),
    };

    const handler = {
        click_Btn_Srch: () => {
            form.orgDeptCdSrch.handleSubmit(
                () => {
                    grid.orgDeptCdLst.setPage(0);
                    fetch.getOrgDeptCdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
    };

    const render = {
        grid_OrgDeptCdLst: {
            cell: {
                deptCd: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <a
                            onClick={() => {
                                if (!comnUtils.isPopup()) return;
                                postMessage({ code: value, label: rowValues.deptNm });
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
            title={t("T_ORG_DEPT_CD_LST")}
            description={t("T_ORG_DEPT_CD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_ORG_DEPT_CD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.orgDeptCdSrch.schema.deptCd}></Group.Control>
                                <Group.Control {...form.orgDeptCdSrch.schema.deptNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.orgDeptCdSrch.reset();
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
                        <Grid
                            {...grid.orgDeptCdLst.grid}
                            data={fetch.getOrgDeptCdLst.data?.orgDeptList}
                            render={render.grid_OrgDeptCdLst}
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
