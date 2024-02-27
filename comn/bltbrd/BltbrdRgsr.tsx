import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button, Grid, Editor } from "@/comn/components";
import { useForm, useFetch, useStore, useToast, useModal, useGrid } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_BLTBRD, SG_BLTBRD_LIST } from "./services/BltBrdService";

export const BltbrdRgsr = (props: any) => {
    const pgeUid = "BltbrdRgsr";
    const { t } = useTranslation();
    const navigate = useNavigate();
    const modal = useModal();
    const toast = useToast();

    const form = {
        bltbrd: useForm({
            defaultSchema: SF_BLTBRD,
            defaultValues: {},
        }),
    };

    const fetch = {
        saveBltbrd: useFetch({
            api: (lblIds) => APIS.saveBltbrd(lblIds),
            onSuccess: () => {
                modal.openModal({
                    content: "msg.com.00047",
                    onCancel: () => {
                        navigate(`${URLS.bltbrdLst}`);
                    },
                });
            },
            onError: () => {},
            showToast: true,
        }),
    };

    const handler = {
        saveBltbrd: form.bltbrd.handleSubmit(
            () => {
                const data = form.bltbrd.getValues();
                modal.openModal({
                    content: "msg.com.00062",
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
                                <Button
                                    role="save"
                                    onClick={() => {
                                        form.bltbrd.setEditable(false);
                                    }}
                                ></Button>
                                <Button
                                    role="save"
                                    onClick={() => {
                                        form.bltbrd.setEditable(true);
                                    }}
                                ></Button>
                                <Button
                                    role="save"
                                    onClick={() => {
                                        console.log(form.bltbrd.getValues());
                                    }}
                                ></Button>
                                <Button
                                    role="save"
                                    onClick={() => {
                                        form.bltbrd.setSchema("cn", { readOnly: true });
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
