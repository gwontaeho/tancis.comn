import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useStore, useToast, useModal } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_LBL_LANG } from "./services/LblLangPrsccService";
import { useNavigate, useParams } from "react-router-dom";

export const LblLangDtl = (props: any) => {
    const pgeUid = "lblLangDtl";
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { lblId } = useParams(); // Key Information of this Component Router !== 라우터에 정의된 키정보 ==!

    const form = {
        lblLang: useForm({
            defaultSchema: SF_LBL_LANG,
            defaultValues: {},
        }),
    };

    const fetch = {
        getLblLang: useFetch({
            api: (data) => APIS.getLblLang(lblId),
            enabled: !!lblId,
            onSuccess: (data) => {
                const lblLang = data.lblLang.content;
                const lblLangInfoList = lblLang.lblLangInfoList;

                if (lblLangInfoList) {
                    lblLangInfoList.map((item: any) => {
                        switch (item.langCd) {
                            case "EN":
                                lblLang.lblNmEn = item.lblNm;
                                break;
                            case "TZ":
                                lblLang.lblNmTz = item.lblNm;
                                break;
                            default:
                                lblLang.lblNmKo = item.lblNm;
                                break;
                        }
                    });
                }
                form.lblLang.setValues(lblLang);
            },
            onError: (error) => {},
            showToast: true,
        }),
        deleteLblLang: useFetch({
            api: (lblIds) => APIS.deleteLblLang(lblIds),
            onSuccess: () => {
                modal.openModal({
                    content: "msg.00003",
                    onCancel: () => {
                        navigate(URLS.lblLangLst);
                    },
                });
            },
            onError: () => {},
            showToast: true,
        }),
    };

    const handler = {
        deleteLblLang: () => {
            modal.openModal({
                content: "msg.00103",
                onConfirm: () => {
                    fetch.deleteLblLang.fetch(lblId);
                },
            });
        },
    };

    useEffect(() => {
        fetch.getLblLang.fetch();
        form.lblLang.setEditable(false);
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
                                <Group.Control {...form.lblLang.schema.lblId}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.lblLang.schema.lblTpCd}></Group.Control>
                                <Group.Control {...form.lblLang.schema.bsopClsfCd}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.lblLang.schema.lblNmEn}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.lblLang.schema.lblNmTz}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.lblLang.schema.lblNmKo}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.lblLang.schema.frstRegstId}></Group.Control>
                                <Group.Control {...form.lblLang.schema.frstRgsrDtm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="list"
                                    onClick={() => {
                                        navigate(URLS.lblLangLst);
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="delete"
                                    onClick={() => {
                                        handler.deleteLblLang();
                                    }}
                                ></Button>
                                <Button
                                    role="edit"
                                    onClick={() => {
                                        navigate(`${URLS.LblLangEdit}/${lblId}`);
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
