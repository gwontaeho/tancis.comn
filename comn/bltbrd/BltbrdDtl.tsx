import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { comnUtils, comnEnvs } from "@/comn/utils";
import { Page, Group, Layout, Button, Grid } from "@/comn/components";
import { useForm, useFetch, useStore, useToast, useModal, useGrid } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_BLTBRD, SG_BLTBRD_LIST } from "./services/BltBrdService";

export const BltbrdDtl = (props: any) => {
    const pgeUid = "BltbrdDtl";
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
                if (!data.bltbrdInfo.content) {
                    modal.openModal({ type: "deleted" });
                    return;
                }

                form.bltbrd.setValues(data.bltbrdInfo.content);
            },
            onError: (error) => {},
            showToast: true,
        }),
        deleteBltbrd: useFetch({
            api: (id) => APIS.deleteBltbrd(id),
            onSuccess: () => {
                modal.openModal({
                    content: "msg.com.00060",
                    onCancel: () => {
                        navigate(URLS.bltbrdLst);
                    },
                });
            },
            onError: () => {
                modal.openModal({
                    content: "msg.com.00023",
                });
            },
            showToast: true,
        }),
    };

    const handler = {
        deleteBltbrd: () => {
            modal.openModal({
                content: "msg.com.00049",
                onConfirm: () => {
                    fetch.deleteBltbrd.fetch(id);
                },
            });
        },
    };

    useEffect(() => {
        form.bltbrd.setEditable(false);
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
                                    role="edit"
                                    onClick={() => {
                                        navigate(`${URLS.bltbrdEdit}/${id}`);
                                    }}
                                ></Button>
                                <Button
                                    role="delete"
                                    onClick={() => {
                                        handler.deleteBltbrd();
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
