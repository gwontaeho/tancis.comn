import { Group, Page } from "@/comn/components";
import { useFetch, useForm, usePopup, useToast } from "@/comn/hooks";
import { comnEnvs } from "@/comn/utils";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { APIS, BASE, SCHEMA_CO_CD_DTL } from "./services/ComnCdService";

export const CompanyCodeDetail = (props: any) => {
    const pgeUid = "coCdDtl";
    const { t } = useTranslation();
    const { getParams } = usePopup();
    const { coTin } = getParams();

    const toast = useToast();

    const form = {
        coCdDtl: useForm({
            defaultSchema: SCHEMA_CO_CD_DTL,
        }),
    };

    const fetch = {
        getCoCdDtl: useFetch({
            api: () => APIS.getCoCdDtl(coTin),
            enabled: !!coTin,
            onSuccess: (data) => {
                form.coCdDtl.setValues({
                    ...data.coDtoInfo.content,
                });
            },
            onError: () => toast.showToast({ type: "error", content: "msg.com.00025" }), // Failed to select. !== 조회가 실패하였습니다. ==!
            showToast: true,
        }),
    };
    useEffect(() => {
        form.coCdDtl.setEditable(false);
        fetch.getCoCdDtl.fetch();
    }, []);

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
                                <Group.Control {...form.coCdDtl.schema.coTin}></Group.Control>
                                <Group.Control {...form.coCdDtl.schema.coTpCdNm}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.coCdDtl.schema.coNm}></Group.Control>
                                <Group.Control {...form.coCdDtl.schema.coAddr}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.coCdDtl.schema.rprsTelno}></Group.Control>
                                <Group.Control {...form.coCdDtl.schema.rRprsFaxNo}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.coCdDtl.schema.rprsEml}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                    </Group.Body>
                </Group>
            </form>
        </Page>
    );
};
