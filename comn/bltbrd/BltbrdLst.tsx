import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button, Grid } from "@/comn/components";
import { useForm, useFetch, useStore, useToast, useModal, useGrid } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_BLTBRD_SRCH, SG_BLTBRD_LIST } from "./services/BltBrdService";

export const BltbrdLst = (props: any) => {
    const pgeUid = "BltbrdLst";
    const { t } = useTranslation();
    const navigate = useNavigate();
    const modal = useModal();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();

    const form = {
        bltbrdSrch: useForm({
            defaultSchema: SF_BLTBRD_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        bltbrdLst: useGrid({
            defaultSchema: SG_BLTBRD_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getBltbrdLst: useFetch({
            api: (page = grid.bltbrdLst.page) => {
                return APIS.getBltbrdList(form.bltbrdSrch.getValues(), page, grid.bltbrdLst.size);
            },
            enabled: comnUtils.isEmpty(form.bltbrdSrch.errors) && form.bltbrdSrch.isSubmitted,
            key: [grid.bltbrdLst.page, grid.bltbrdLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.bltbrdSrch.getValues(),
                    page: grid.bltbrdLst.page,
                    size: grid.bltbrdLst.size,
                });
            },
        }),
        deleteBltbrd: useFetch({
            api: (lblIds) => APIS.deleteBltbrd(lblIds),
            onSuccess: () => {
                modal.openModal({ content: "msg.00003" });
                handler.getBltbrdList();
            },
            onError: () => {},
            showToast: true,
        }),
    };

    const handler = {
        getBltbrdList: () => {
            form.bltbrdSrch.handleSubmit(
                () => {
                    grid.bltbrdLst.setPage(0);
                    fetch.getBltbrdLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        click_Grid_BltbrdLst: {
            lblId: (data: any) => {
                navigate(`${URLS.bltbrdDtl}/${data.rowValues.lblId}`);
            },
        },
    };

    const render = {
        grid_BltbrdList: {
            cell: {
                ttle: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return <Link to={`${URLS.bltbrdDtl}/${rowValues.id}`}>{`${value}`}</Link>;
                },
            },
        },
    };

    useEffect(() => {
        handler.getBltbrdList();
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_BLTBRD_LST")}
            description={t("T_LTBRD_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_LTBRD_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.bltbrdSrch.schema.ttle}></Group.Control>
                                <Group.Control {...form.bltbrdSrch.schema.cn}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.bltbrdSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        handler.getBltbrdList();
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
                            {...grid.bltbrdLst.grid}
                            data={fetch.getBltbrdLst.data?.bltbrdList}
                            onCellClick={handler.click_Grid_BltbrdLst}
                            render={render.grid_BltbrdList}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>

            <Layout.Left>
                <Layout.Button
                    variant="primary"
                    onClick={() => {
                        navigate(URLS.bltbrdRgsr);
                    }}
                >
                    {t("B_NEW")}
                </Layout.Button>
            </Layout.Left>
        </Page>
    );
};
