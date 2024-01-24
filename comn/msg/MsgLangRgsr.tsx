import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useStore, useToast, useModal } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_MSG_LANG } from "./services/MsgLangPrsccService";
import { useNavigate, useParams } from "react-router-dom";

export const MsgLangRgsr = (props: any) => {
    const pgeUid = "MsgLangRgsr";
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!

    const form = {
        msgLang: useForm({
            defaultSchema: SF_MSG_LANG,
            defaultValues: {},
        }),
    };

    const fetch = {
        saveMsgLang: useFetch({
            api: (msgIds) => APIS.saveMsgLang(msgIds),
            onSuccess: () => {
                modal.openModal({
                    content: "msg.00003",
                    onCancel: () => {
                        navigate(`${URLS.msgLangLst}`);
                    },
                });
            },
            onError: () => {},
            showToast: true,
        }),
    };

    const handler = {
        saveMsgLang: form.msgLang.handleSubmit(
            () => {
                if (!handler.checkMsgId()) return;

                const data = form.msgLang.getValues();
                modal.openModal({
                    content: "msg.00101",
                    onConfirm: () => {
                        fetch.saveMsgLang.fetch(data);
                    },
                });
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        ),
        checkMsgId: () => {
            return true;
        },
    };

    useEffect(() => {}, []);

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
                                <Group.Control {...form.msgLang.schema.msgId}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.msgLang.schema.bsopClsfCd}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.msgLang.schema.msgCnEn}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.msgLang.schema.msgCnTz}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.msgLang.schema.msgCnKo}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="list"
                                    onClick={() => {
                                        navigate(URLS.msgLangLst);
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="save"
                                    onClick={() => {
                                        handler.saveMsgLang();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Body>
                </Group>
            </form>
        </Page>
    );
};
