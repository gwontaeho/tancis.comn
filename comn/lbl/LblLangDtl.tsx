import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, usePopup, useStore, useToast, useModal } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_LBL_LANG_SRCH, SG_LBL_LANG_LIST } from "./services/LblLangPrsccService";
import { useNavigate, useParams } from "react-router-dom";

export const LblLangDtl = (props: any) => {
    const pgeUid = "lblLangDtl";
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore, getStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const { lblId } = useParams(); // Key Information of this Component Router !== 라우터에 정의된 키정보 ==!

    const form = {
        lblLang: useForm({
            defaultSchema: SF_LBL_LANG_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const fetch = {
        // Get Repacking Item Application !== 재포장 품목 신청서 조회 ==!
        getLblLang: useFetch({
            api: (data) => APIS.getLblLang(lblId),
            enabled: !!lblId,
            onSuccess: (data) => {
                form.lblLang.setValues({
                    ...data.rpckItmAppInfo.content,
                });
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
                                <Group.Control {...form.lblLang.schema.lblNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                </Group>
            </form>
        </Page>
    );
};

export {};
