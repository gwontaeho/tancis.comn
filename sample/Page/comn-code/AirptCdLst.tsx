import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_FORM_AIRPT_CD_SRCH, SCHEMA_GRID_AIRPT_CD } from "./ComnCdService";

export const AirptCodeList = () => {
    const pgeUid = "airptCdLst";
    const { t } = useTranslation();
    const toast = useToast();
    const { close, postMessage } = usePopup();
    const { pgeStore, setStore } = useStore({ pgeUid });

    /**
     * form 초기화
     */
    const form = {
        airptCdSrch: useForm({
            defaultSchema: SCHEMA_FORM_AIRPT_CD_SRCH,
            defaultValues: pgeStore?.form === undefined ? { regnNm: "", regnCd: "", cntyCd: "" } : pgeStore?.form,
        }),
    };

    /* AAAAA */

    /**
     * grid 초기화
     */
    const grid = {
        airptCdLst: useWijmo({
            defaultSchema: SCHEMA_GRID_AIRPT_CD,
            page: pgeStore?.page === undefined ? 0 : pgeStore?.page,
            size: pgeStore?.size === undefined ? 10 : pgeStore?.size,
        }),
    };

    /**
     * api 초기화
     */
    const fetch = {
        getAirptCdLst: useFetch({
            /**
             * fetching 시 실행되는 api
             */
            api: (page = grid.airptCdLst.page) =>
                APIS.getAirptCdLst(form.airptCdSrch.getValues(), page, grid.airptCdLst.size),

            /**
             * api가 참조하는 key
             */
            key: [grid.airptCdLst.page, grid.airptCdLst.size],

            /**
             * api가 key변화를 감지해 자동 실행되는 조건
             * enabled=true 항상
             */
            enabled: true,

            /**
             * on success callback
             */
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.airptCdSrch.getValues(),
                    page: grid.airptCdLst.page,
                    size: grid.airptCdLst.size,
                });
            },
        }),
    };

    const handler = {
        /**
         * 검색 버튼 click event handler
         */
        click_Btn_Srch: () => {
            form.airptCdSrch.handleSubmit(
                /**
                 * validation 성공 시
                 */
                () => {
                    fetch.getAirptCdLst.fetch(0);
                    grid.airptCdLst.setPage(0);
                },
                /**
                 * validation 실패 시
                 */
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        /**
         * 그리드 셀 click event handler object
         */
        click_Grid_AirptCdLst: {
            regnCd: (data: any) => {
                if (!comnUtils.isPopup()) return;
                postMessage({ code: data.value, label: data.rowValues.regnNm });
                close();
            },
        },
    };

    return (
        <Page>
            {/* <Page.Navigation base={comnEnvs.base} nodes={[...BASE.nodes, { label: "T_AIRPT_CD_LST" }]} />
            <Page.Header title={t("T_AIRPT_CD_LST")} description={t("T_AIRPT_CD_LST")} /> */}
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.airptCdSrch.schema.cntyCd} controlSize={10}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.airptCdSrch.schema.regnCd}></Group.Control>
                                <Group.Control {...form.airptCdSrch.schema.regnNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    onClick={() => {
                                        form.airptCdSrch.reset();
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
                    <Wijmo
                        {...grid.airptCdLst.grid}
                        data={fetch.getAirptCdLst.data?.regnCdList}
                        onCellClick={handler.click_Grid_AirptCdLst}
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

/**
 * 원본
 */
// export const AirptCodeList = (props: any) => {
//     const pgeUid = "airptCdLst";
//     const { t } = useTranslation();
//     const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
//     const toast = useToast();
//     const { close, postMessage } = usePopup();

//     const form = {
//         airptCdSrch: useForm({
//             defaultSchema: SCHEMA_FORM_AIRPT_CD_SRCH,
//             defaultValues: { ...pgeStore?.form } || {},
//         }),
//     };

//     const grid = {
//         airptCdLst: useWijmo({
//             defaultSchema: SCHEMA_GRID_AIRPT_CD,
//             page: pgeStore?.page,
//             size: pgeStore?.size,
//         }),
//     };

//     const fetch = {
//         getAirptCdLst: useFetch({
//             api: (page = grid.airptCdLst.page) => {
//                 return APIS.getAirptCdLst(form.airptCdSrch.getValues(), page, grid.airptCdLst.size);
//             },
//             enabled: comnUtils.isEmpty(form.airptCdSrch.errors) && form.airptCdSrch.isSubmitted,
//             key: [grid.airptCdLst.grid.page, grid.airptCdLst.grid.size],
//             onSuccess: () => {
//                 setStore(pgeUid, {
//                     form: form.airptCdSrch.getValues(),
//                     page: grid.airptCdLst.page,
//                     size: grid.airptCdLst.size,
//                 });
//             },
//         }),
//     };

//     console.log(fetch.getAirptCdLst);

//     const handler = {
//         click_Btn_Srch: () => {
//             form.airptCdSrch.handleSubmit(
//                 () => {
//                     grid.airptCdLst.setPage(0);
//                     fetch.getAirptCdLst.fetch(0);
//                 },
//                 () => {
//                     toast.showToast({ type: "warning", content: "msg.00002" });
//                 },
//             )();
//         },
//         click_Grid_AirptCdLst: {
//             regnCd: (data: any) => {
//                 if (!comnUtils.isPopup()) return;
//                 postMessage({ code: data.value, label: data.rowValues.regnNm });
//                 close();
//             },
//         },
//     };

//     useEffect(() => {
//         handler.click_Btn_Srch();
//     }, []);

//     return (
//         <Page>
//             <Page.Navigation base={comnEnvs.base} nodes={[...BASE.nodes, { label: "T_AIRPT_CD_LST" }]} />
//             <Page.Header title={t("T_AIRPT_CD_LST")} description={t("T_AIRPT_CD_LST")} />
//             <form>
//                 <Group>
//                     <Group.Body>
//                         <Group.Row>
//                             <Group.Control {...form.airptCdSrch.schema.cntyCd} controlSize={10}></Group.Control>
//                         </Group.Row>
//                         <Group.Row>
//                             <Group.Control {...form.airptCdSrch.schema.regnCd}></Group.Control>
//                             <Group.Control {...form.airptCdSrch.schema.regnNm}></Group.Control>
//                         </Group.Row>
//                     </Group.Body>
//                     <Layout direction="row">
//                         <Layout.Left>
//                             <Button
//                                 onClick={() => {
//                                     form.airptCdSrch.reset();
//                                 }}
//                             >
//                                 {t("B_RESET")}
//                             </Button>
//                         </Layout.Left>
//                         <Layout.Right>
//                             <Button
//                                 onClick={() => {
//                                     handler.click_Btn_Srch();
//                                 }}
//                             >
//                                 {t("B_SRCH")}
//                             </Button>
//                         </Layout.Right>
//                     </Layout>
//                 </Group>
//             </form>

//             <Group>
//                 <Wijmo
//                     {...grid.airptCdLst.grid}
//                     data={fetch.getAirptCdLst.data}
//                     onCellClick={handler.click_Grid_AirptCdLst}
//                 />
//             </Group>
//             {comnUtils.isPopup() && (
//                 <Layout.Right>
//                     <Button onClick={close}>{t("B_CLS")}</Button>
//                 </Layout.Right>
//             )}
//         </Page>
//     );
// };
