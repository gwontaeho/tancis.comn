import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useStore, useToast, useModal } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_LBL_LANG } from "./services/LblLangPrsccService";
import { useNavigate, useParams } from "react-router-dom";

export const LblLangRgsr = (props: any) => {
    const pgeUid = "LblLangRgsr";
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!

    const form = {
        lblLang: useForm({
            defaultSchema: SF_LBL_LANG,
            defaultValues: { lblId: "L_", lblTpCd: "L" },
        }),
    };

    const fetch = {
        saveLblLang: useFetch({
            api: (lblIds) => APIS.saveLblLang(lblIds),
            onSuccess: () => {
                modal.openModal({
                    content: "msg.00003",
                    onCancel: () => {
                        navigate(`${URLS.lblLangLst}`);
                    },
                });
            },
            onError: () => {},
            showToast: true,
        }),
    };

    const handler = {
        saveLblLang: form.lblLang.handleSubmit(
            () => {
                if (!handler.checkLblId()) return;

                const data = form.lblLang.getValues();
                modal.openModal({
                    content: "msg.00101",
                    onConfirm: () => {
                        fetch.saveLblLang.fetch(data);
                    },
                });
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        ),
        checkLblId: () => {
            const value = form.lblLang.getValue("lblTpCd");
            const lblId = form.lblLang.getValue("lblId");

            if (lblId.substring(0, 2) !== value + "_") {
                form.lblLang.setError("lblId", {
                    message: "라벨 ID 는 '" + value + "_' 로 시작되어야 합니다.",
                });
                return false;
            } else {
                form.lblLang.clearErrors("lblId");
            }
            return true;
        },
    };

    useEffect(() => {
        form.lblLang.setFocus("lblId");
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
                                <Group.Control
                                    {...form.lblLang.schema.lblTpCd}
                                    onChange={() => {
                                        handler.checkLblId();
                                    }}
                                ></Group.Control>
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
                                    role="save"
                                    onClick={() => {
                                        handler.saveLblLang();
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
