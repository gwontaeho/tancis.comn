import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useStore, useToast, useModal } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_MSG_LANG } from "./services/MsgLangPrsccService";
import { useNavigate, useParams } from "react-router-dom";

export const MsgLangDtl = (props: any) => {
    const pgeUid = "msgLangDtl";
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { msgId } = useParams(); // Key Information of this Component Router !== 라우터에 정의된 키정보 ==!

    const form = {
        msgLang: useForm({
            defaultSchema: SF_MSG_LANG,
            defaultValues: {},
        }),
    };

    const fetch = {
        getMsgLang: useFetch({
            api: (data) => APIS.getMsgLang(msgId),
            enabled: !!msgId,
            onSuccess: (data) => {
                const msgLang = data.msgLang.content;
                const msgLangInfoList = msgLang.msgLangInfoList;

                if (msgLangInfoList) {
                    msgLangInfoList.map((item: any) => {
                        switch (item.langCd) {
                            case "EN":
                                msgLang.msgCnEn = item.msgCn;
                                break;
                            case "TZ":
                                msgLang.msgCnTz = item.msgCn;
                                break;
                            default:
                                msgLang.msgCnKo = item.msgCn;
                                break;
                        }
                    });
                }
                form.msgLang.setValues(msgLang);
            },
            onError: (error) => {},
            showToast: true,
        }),
        deleteMsgLang: useFetch({
            api: (msgIds) => APIS.deleteMsgLang(msgIds),
            onSuccess: () => {
                modal.openModal({
                    content: "msg.00003",
                    onCancel: () => {
                        navigate(URLS.msgLangLst);
                    },
                });
            },
            onError: () => {},
            showToast: true,
        }),
    };

    const handler = {
        deleteMsgLang: () => {
            modal.openModal({
                content: "msg.00103",
                onConfirm: () => {
                    fetch.deleteMsgLang.fetch(msgId);
                },
            });
        },
    };

    useEffect(() => {
        fetch.getMsgLang.fetch();
        form.msgLang.setEditable(false);
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
                            <Group.Row>
                                <Group.Control {...form.msgLang.schema.frstRegstId}></Group.Control>
                                <Group.Control {...form.msgLang.schema.frstRgsrDtm}></Group.Control>
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
                                    role="delete"
                                    onClick={() => {
                                        handler.deleteMsgLang();
                                    }}
                                ></Button>
                                <Button
                                    role="edit"
                                    onClick={() => {
                                        navigate(`${URLS.MsgLangEdit}/${msgId}`);
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
