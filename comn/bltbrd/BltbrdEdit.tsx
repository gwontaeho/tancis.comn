import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button, Grid } from "@/comn/components";
import { useForm, useFetch, useStore, useToast, useModal, useGrid } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_BLTBRD, SG_BLTBRD_LIST } from "./services/BltBrdService";

export const BltbrdEdit = (props: any) => {
    const pgeUid = "BltbrdEdit";
    const { t } = useTranslation();
    const navigate = useNavigate();
    const modal = useModal();
    const toast = useToast();
    const { id } = useParams();

    const form = {
        bltbrd: useForm({
            defaultSchema: SF_BLTBRD,
            defaultValues: {},
        }),
    };

    const fetch = {
        getBltbrd: useFetch({
            api: (data) => APIS.getBltbrd(id),
            enabled: !!id,
            onSuccess: (data) => {
                form.bltbrd.setValues(data.bltbrdInfo.content);
            },
            onError: (error) => {},
            showToast: true,
        }),
        saveBltbrd: useFetch({
            api: (lblIds) => APIS.saveBltbrd(lblIds),
            onSuccess: () => {
                modal.openModal({
                    content: "msg.com.00062",
                    onCancel: () => {
                        navigate(`${URLS.bltbrdLst}`);
                    },
                });
            },
            onError: () => {
                modal.openModal({
                    content: "msg.com.00026",
                });
            },
            showToast: true,
        }),
    };

    const handler = {
        saveBltbrd: form.bltbrd.handleSubmit(
            () => {
                const data = form.bltbrd.getValues();
                modal.openModal({
                    content: "msg.com.00047",
                    onConfirm: () => {
                        fetch.saveBltbrd.fetch(data);
                    },
                });
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.com.00014" });
            },
        ),
    };

    useEffect(() => {
        form.bltbrd.setFocus("ttle");
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
                                <Group.Control {...form.bltbrd.schema.ttle} controlSize={10}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.bltbrd.schema.bltbrdCtgrCd} controlSize={10}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                <Group.Control {...form.bltbrd.schema.cn} controlSize={10}></Group.Control>
                            </Group.Row>
                        </Group.Section>
                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="list"
                                    onClick={() => {
                                        navigate(URLS.bltbrdLst);
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="save"
                                    onClick={() => {
                                        handler.saveBltbrd();
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
