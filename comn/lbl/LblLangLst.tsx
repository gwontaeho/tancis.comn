import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button, Grid } from "@/comn/components";
import { useForm, useFetch, useStore, useToast, useModal, useGrid } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_LBL_LANG_SRCH, SG_LBL_LANG_LIST } from "./services/LblLangPrsccService";

// export const LblLangLst = () => {
//     const pgeUid = "lblLangLst";

//     const { t } = useTranslation();
//     const navigate = useNavigate();
//     const modal = useModal();
//     const toast = useToast();

//     const { pgeStore = {}, setStore } = useStore({ pgeUid });
//     const ps = {
//         form: pgeStore.form || {},
//         page: pgeStore.page || 0,
//         size: pgeStore.size || 10,
//     };

//     const form_lblLangSrch = useForm({
//         defaultSchema: SF_LBL_LANG_SRCH,
//         defaultValues: ps.form,
//     });

//     const grid_lblLangLst = useGrid({
//         defaultSchema: SG_LBL_LANG_LIST,
//         page: ps.page,
//         size: ps.size,
//     });

//     const fetch_getLblLangList = useFetch({
//         api: () => APIS.getLblLangList(ps.form, ps.page, ps.size),
//         enabled: form_lblLangSrch.isSubmitted && !form_lblLangSrch.isError,
//         key: [ps.form, ps.page, ps.size],
//     });

//     const fetch_deleteLblLang = useFetch({
//         api: (lblIds) => APIS.deleteLblLang(lblIds),
//         onSuccess: () => {
//             modal.openModal({ content: "msg.00003" });
//             handleSearch();
//         },
//         showToast: true,
//     });

//     const handleSearch = () => {
//         form_lblLangSrch.handleSubmit(
//             (data) => {
//                 grid_lblLangLst.setPage(0);
//                 setStore(pgeUid, (prev: any) => ({ ...prev, form: data, page: 0 }));
//             },
//             () => {
//                 toast.showToast({ type: "warning", content: "msg.00002" });
//             },
//         )();
//     };

//     const handleDelete = () => {
//         const seltList: any[] = grid_lblLangLst.getChecked() || [];
//         if (comnUtils.isEmpty(seltList)) {
//             modal.openModal({ content: "msg.00004" });
//             return;
//         }
//         modal.openModal({
//             content: "msg.00103",
//             onConfirm: () => {
//                 const lblIds: string[] = [];
//                 seltList.forEach((item) => {
//                     lblIds.push(`${item.lblId}`);
//                 });

//                 fetch_deleteLblLang.fetch(lblIds.join(","));
//             },
//         });
//     };

//     const render = {
//         grid_LblLangLst: {
//             cell: {
//                 lblId: (props: any) => {
//                     const { rowValues } = props;
//                     return <Link to={`${URLS.lblLangDtl}/${rowValues.lblId}`}>{`${rowValues.lblId}`}</Link>;
//                 },
//             },
//         },
//     };

//     useEffect(() => {
//         setStore(pgeUid, (prev: any) => ({ ...prev, page: grid_lblLangLst.page, size: grid_lblLangLst.size }));
//     }, [grid_lblLangLst.page, grid_lblLangLst.size]);

//     useEffect(() => {
//         form_lblLangSrch.handleSubmit()();
//     }, []);

//     return (
//         <Page
//             id={pgeUid}
//             title={t("T_LBL_LANG_LST")}
//             description={t("T_LBL_LANG_LST")}
//             navigation={{
//                 base: comnEnvs.base,
//                 nodes: [...BASE.nodes, { label: "T_LBL_LANG_LST" }],
//             }}
//         >
//             <form>
//                 <Group>
//                     <Group.Body>
//                         <Group.Section>
//                             <Group.Row>
//                                 <Group.Control {...form_lblLangSrch.schema.lblId}></Group.Control>
//                                 <Group.Control {...form_lblLangSrch.schema.lblNm}></Group.Control>
//                             </Group.Row>
//                         </Group.Section>
//                         <Layout direction="row" align="between">
//                             <Button role="reset" onClick={form_lblLangSrch.reset}></Button>
//                             <Button role="search" onClick={handleSearch}></Button>
//                         </Layout>
//                     </Group.Body>
//                 </Group>
//             </form>

//             <Group>
//                 <Group.Body>
//                     <Layout direction="row" align="end">
//                         <Button role="delete" onClick={handleDelete}></Button>
//                     </Layout>
//                     <Group.Section>
//                         <Grid
//                             {...grid_lblLangLst.grid}
//                             data={fetch_getLblLangList.data?.lblLangList}
//                             render={render.grid_LblLangLst}
//                         />
//                     </Group.Section>
//                 </Group.Body>
//             </Group>

//             <Layout.Left>
//                 <Layout.Button
//                     variant="primary"
//                     onClick={() => {
//                         navigate(URLS.lblLangRgsr);
//                     }}
//                 >
//                     {t("B_NEW_$0", { 0: "Label" })}
//                 </Layout.Button>
//             </Layout.Left>
//         </Page>
//     );
// };

export const LblLangLst = () => {
    const pgeUid = "lblLangLst";

    const { t } = useTranslation();
    const navigate = useNavigate();
    const modal = useModal();
    const toast = useToast();

    // 페이지가 사용하는 state
    const { pgeStore = {}, setStore } = useStore({ pgeUid });
    const ps = {
        form: pgeStore.form || {},
        page: pgeStore.page || 0,
        size: pgeStore.size || 10,
    };

    const form_lblLangSrch = useForm({
        defaultSchema: SF_LBL_LANG_SRCH,
        defaultValues: ps.form,
    });

    const grid_lblLangLst = useGrid({
        defaultSchema: SG_LBL_LANG_LIST,
        page: ps.page,
        size: ps.size,
    });

    const fetch_getLblLangList = useFetch({
        api: () => APIS.getLblLangList(ps.form, ps.page, ps.size),
        enabled: form_lblLangSrch.isSubmitted && !form_lblLangSrch.isError,
        key: [ps.form, ps.page, ps.size],
    });

    const fetch_deleteLblLang = useFetch({
        api: (lblIds) => APIS.deleteLblLang(lblIds),
        onSuccess: () => {
            modal.openModal({ content: "msg.00003" });
            handleSearch();
        },
        showToast: true,
    });

    const handleChangePage = (nextPage: any) => {
        setStore(pgeUid, (prev: any) => ({ ...prev, page: nextPage }));
    };

    const handleChangeSize = (nextSize: any) => {
        setStore(pgeUid, (prev: any) => ({ ...prev, page: 0, size: nextSize }));
    };

    const handleSearch = () => {
        form_lblLangSrch.handleSubmit(
            (data) => {
                grid_lblLangLst.setPage(0);
                setStore(pgeUid, (prev: any) => ({ ...prev, form: data, page: 0 }));
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        )();
    };

    const handleDelete = () => {
        const seltList: any[] = grid_lblLangLst.getChecked() || [];
        if (comnUtils.isEmpty(seltList)) {
            modal.openModal({ content: "msg.00004" });
            return;
        }
        modal.openModal({
            content: "msg.00103",
            onConfirm: () => {
                const lblIds: string[] = [];
                seltList.forEach((item) => {
                    lblIds.push(`${item.lblId}`);
                });

                fetch_deleteLblLang.fetch(lblIds.join(","));
            },
        });
    };

    const render = {
        grid_LblLangLst: {
            cell: {
                lblId: (props: any) => {
                    const { rowValues } = props;
                    return <Link to={`${URLS.lblLangDtl}/${rowValues.lblId}`}>{`${rowValues.lblId}`}</Link>;
                },
            },
        },
    };

    useEffect(() => {
        form_lblLangSrch.handleSubmit()();
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_LBL_LANG_LST")}
            description={t("T_LBL_LANG_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_LBL_LANG_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form_lblLangSrch.schema.lblId}></Group.Control>
                                <Group.Control {...form_lblLangSrch.schema.lblNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row" align="between">
                            <Button role="reset" onClick={form_lblLangSrch.reset}></Button>
                            <Button role="search" onClick={handleSearch}></Button>
                        </Layout>
                    </Group.Body>
                </Group>
            </form>

            <Group>
                <Group.Body>
                    <Layout direction="row" align="end">
                        <Button role="delete" onClick={handleDelete}></Button>
                    </Layout>
                    <Group.Section>
                        <Grid
                            {...grid_lblLangLst.grid}
                            data={fetch_getLblLangList.data?.lblLangList}
                            render={render.grid_LblLangLst}
                            onPageChange={handleChangePage}
                            onSizeChange={handleChangeSize}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>

            <Layout.Left>
                <Layout.Button
                    variant="primary"
                    onClick={() => {
                        navigate(URLS.lblLangRgsr);
                    }}
                >
                    {t("B_NEW_$0", { 0: "Label" })}
                </Layout.Button>
            </Layout.Left>
        </Page>
    );
};
