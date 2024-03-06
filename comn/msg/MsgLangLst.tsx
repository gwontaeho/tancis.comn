import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button, Grid } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast, useModal, useGrid } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_MSG_LANG_SRCH, SG_MSG_LANG_LIST } from "./services/MsgLangPrsccService";

export const MsgLangLst = (props: any) => {
    const pgeUid = "msgLangLst";
    const { t } = useTranslation();
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();

    const form = {
        msgLangSrch: useForm({
            defaultSchema: SF_MSG_LANG_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const grid = {
        msgLangLst: useGrid({
            defaultSchema: SG_MSG_LANG_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    const fetch = {
        getMsgLangLst: useFetch({
            api: (page = grid.msgLangLst.page) => {
                return APIS.getMsgLangList(form.msgLangSrch.getValues(), page, grid.msgLangLst.size);
            },
            enabled: comnUtils.isEmpty(form.msgLangSrch.errors) && form.msgLangSrch.isSubmitted,
            key: [grid.msgLangLst.page, grid.msgLangLst.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.msgLangSrch.getValues(),
                    page: grid.msgLangLst.page,
                    size: grid.msgLangLst.size,
                });
            },
        }),
        deleteMsgLang: useFetch({
            api: (msgIds) => APIS.deleteMsgLang(msgIds),
            onSuccess: () => {
                modal.openModal({ content: "msg.00003" });
                handler.getMsgLangList();
            },
            onError: () => {},
            showToast: true,
        }),
    };

    const handler = {
        getMsgLangList: () => {
            form.msgLangSrch.handleSubmit(
                () => {
                    grid.msgLangLst.setPage(0);
                    fetch.getMsgLangLst.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        deleteMsgLang: () => {
            const seltList: any[] = grid.msgLangLst.getChecked() || [];
            if (comnUtils.isEmpty(seltList)) {
                modal.openModal({ content: "msg.00004" });
                return;
            }

            modal.openModal({
                content: "msg.00103",
                onConfirm: () => {
                    const msgIds: string[] = [];
                    seltList.forEach((item) => {
                        msgIds.push(`${item.msgId}`);
                    });

                    fetch.deleteMsgLang.fetch(msgIds.join(","));
                },
            });
        },
        click_Grid_MsgLangLst: (data: any) => {
            navigate(`${URLS.msgLangDtl}/${data.rowValues.msgId}`);
        },
    };

    const render = {
        grid_MsgLangLst: {
            cell: {
                msgId: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return <Link to={`${URLS.msgLangDtl}/${rowValues.msgId}`}>{`${rowValues.msgId}`}</Link>;
                },
            },
        },
    };

    useEffect(() => {
        handler.getMsgLangList();
    }, []);

    return (
        <Page
            id={pgeUid}
            title={t("T_MSG_LANG_LST")}
            description={t("T_MSG_LANG_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_MSG_LANG_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.msgLangSrch.schema.msgId}></Group.Control>
                                <Group.Control {...form.msgLangSrch.schema.msgCn}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.msgLangSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        handler.getMsgLangList();
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
                                    handler.deleteMsgLang();
                                }}
                            ></Button>
                        </Layout.Right>
                    </Layout>
                    <Group.Section>
                        <Grid
                            {...grid.msgLangLst.grid}
                            data={fetch.getMsgLangLst.data?.msgLangList}
                            render={render.grid_MsgLangLst}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>

            <Layout.Left>
                <Layout.Button
                    variant="primary"
                    onClick={() => {
                        navigate(URLS.msgLangRgsr);
                    }}
                >
                    {t("B_NEW_$0", { 0: "Message" })}
                </Layout.Button>
            </Layout.Left>
        </Page>
    );
};
