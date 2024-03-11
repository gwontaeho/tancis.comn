import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button, Grid } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useModal, useGrid } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_LBL_LANG_SRCH, SG_LBL_LANG_LIST } from "./services/LblLangPrsccService";

export const LblLangLst = (props: any) => {
    const pgeUid = "lblLangLst";
    const { t } = useTranslation();
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        lblLangSrch: useForm({
            defaultSchema: SF_LBL_LANG_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    console.log(pgeStore);

    const grid = {
        lblLangLst: useGrid({
            defaultSchema: SG_LBL_LANG_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getLblLangLst: useFetch({
            api: (page = grid.lblLangLst.page) => {
                return APIS.getLblLangList(form.lblLangSrch.getValues(), page, grid.lblLangLst.size);
            },
            enabled: comnUtils.isEmpty(form.lblLangSrch.errors) && form.lblLangSrch.isSubmitted,
            key: [grid.lblLangLst.page, grid.lblLangLst.size],
            onSuccess: () => {
                console.log(grid.lblLangLst);
                console.log(new Date());

                setStore(pgeUid, {
                    form: form.lblLangSrch.getValues(),
                    page: grid.lblLangLst.getPage(),
                    size: grid.lblLangLst.getSize(),
                });
            },
        }),
        deleteLblLang: useFetch({
            api: (lblIds) => APIS.deleteLblLang(lblIds),
            onSuccess: () => {
                modal.openModal({ content: "msg.00003" });
                handler.getLblLangList();
            },
            onError: () => {},
            showToast: true,
        }),
    };

    const handler = {
        // 목록조회 메소스 선언시 기존에 파리메터를 받지 않음 -> page 파라메터 선언. 기본값 0 설정
        // 변경전 : 파라메터를 받지 않음
        // getLblLangList: () => {
        // 변경후 : page 파라메터( 기본값 0 ) 추가
        // 메소드 선언시 파라메너 (page: number = 0 ) 추가
        getLblLangList: (page: number = 0) => {
            form.lblLangSrch.handleSubmit(
                (data) => {
                    // 변경전 getPage , fetch 시 0 을 파라메터로 넘김
                    // grid.lblLangLst.setPage(0);
                    // fetch.getLblLangLst.fetch(0);
                    // 변경후 getPage , fetch 시 page 를 파라메터로 넘김
                    // setPage , fetch 에 0 을 넘기는 부분을 page 로 변경
                    grid.lblLangLst.setPage(page);
                    fetch.getLblLangLst.fetch(page);
                },
                (err) => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        deleteLblLang: () => {
            const seltList: any[] = grid.lblLangLst.getChecked() || [];
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

                    fetch.deleteLblLang.fetch(lblIds.join(","));
                },
            });
        },
    };

    const render = {
        grid_LblLangLst: {
            cell: {
                lblId: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return <Link to={`${URLS.lblLangDtl}/${rowValues.lblId}`}>{`${rowValues.lblId}`}</Link>;
                },
            },
        },
    };

    useEffect(() => {
        // 변경전( 호출시 파라메터 없음 )
        // handler.getLblLangList();
        // 메소드 호출시 파라메터 추가 ( pgeStore?.page );
        handler.getLblLangList(pgeStore?.page);
    }, []);

    useEffect(() => {
        console.log("page", grid.lblLangLst.page);
    }, [grid.lblLangLst.page]);

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
                                <Group.Control {...form.lblLangSrch.schema.lblId}></Group.Control>
                                <Group.Control {...form.lblLangSrch.schema.lblNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.lblLangSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        handler.getLblLangList();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Body>
                </Group>
            </form>

            <Group>
                <Group.Body>
                    <Layout direction="row">
                        <Layout.Right>
                            <Button
                                role="delete"
                                onClick={() => {
                                    handler.deleteLblLang();
                                }}
                            ></Button>
                        </Layout.Right>
                    </Layout>
                    <Group.Section>
                        <Grid
                            {...grid.lblLangLst.grid}
                            data={fetch.getLblLangLst.data?.lblLangList}
                            render={render.grid_LblLangLst}
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
