import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, usePopup, useStore, useToast } from "@/comn/hooks";
import { BASE, APIS, SCHEMA_CO_CD_DTL } from "./services/ComnCdService";
import { useParams } from "react-router-dom";

export const CompanyCodeDetail = (props: any) => {
    const pgeUid = "coCdDtl";
    const { t } = useTranslation();
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid });
    const toast = useToast();
    const { close, postMessage } = usePopup();
    const { coTin } = useParams(); // Key Information of this Component Router !== 라우터에 정의된 키정보 ==!

    const form = {
        coCdDtl: useForm({
            defaultSchema: SCHEMA_CO_CD_DTL,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    const fetch = {
        getCoCdDtl: useFetch({
            api: (data) => APIS.getCoCdDtl(coTin),
            enabled: !!coTin,
            onSuccess: (data) => {
                form.coCdDtl.setValues({
                    ...data.coDtoInfo.content,
                });
            },
            onError: (error) => {},
            showToast: true,
        }),
    };

    const handler = {};

    return (
        <Page
            id={pgeUid}
            title={t("T_CO_CD_DTL")}
            description={t("T_CO_CD_DTL")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { label: "T_CO_CD_DTL" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Group.Section>
                            <Group.Row>
                                <Group.Control {...form.coCdDtl.schema.coTim}></Group.Control>
                                <Group.Control {...form.coCdDtl.schema.coNm}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                </Group>
            </form>

            {comnUtils.isPopup() && (
                <Layout.Right>
                    <Button role="close" onClick={close}></Button>
                </Layout.Right>
            )}
        </Page>
    );
};
