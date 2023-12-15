import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, useCondition, usePopup, useTheme } from "@/comn/hooks";
import { APIS, SCHEMA_FORM, SCHEMA_GRID } from "./comn-comn-cd.service";

/**
 * Common Code List
 * !==공통코드 목록==!
 *
 * Bae JeongYong (Ken)
 */

export const CommonCodeList = (props: any) => {
    /* 컴포넌트에서 사용하는 Hook 및 변수 선언  _ 사용 */
    const { t } = useTranslation(); /* 다국어 */
    const { condition } = useCondition(); /* 검색 조건 저장 */
    const form = useForm({ defaultSchema: SCHEMA_FORM, values: condition }); /* 화면 폼 제어 */
    const [params] = useSearchParams(); /* 화면 폼 제어 */
    const { close, postMessage } = usePopup();
    const { theme } = useTheme(); /* Theme */
    const grid = useWijmo({
        defaultSchema: SCHEMA_GRID((data: any) => {
            postMessage({ code: data.cdVldVal, label: data.cdVldValNm });
            close();
        }),
    }); /* Grid */

    const comnCd = params.get("comnCd");
    const fetch_Srch = useFetch({
        api: () => APIS.getCommonCodeList(form.getValues(), 0, grid.size),
    });

    const onSubmit = () => {};

    const click_Srch = () => {
        console.log(form.validate());
        fetch_Srch.fetch();
    };

    useEffect(() => {
        form.setValues({ comnCd: comnCd, langCd: theme.lang.toUpperCase() });
    }, []);

    return (
        <Page>
            <Page.Navigation
                base="/sample/pages"
                nodes={[{ path: "/", label: "List" }, { label: "Regist" }]}
            />
            <Page.Header title={t("T_COMN_CD_LST")} description={t("T_COMN_CD_LST")} />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.schema.comnCd}></Group.Control>
                            <Group.Control {...form.schema.cdVldVal}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.cdVldValNm}></Group.Control>
                            <Group.Control {...form.schema.langCd} select={true}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Layout.Right>
                        <Button type="submit">{t("B_SRCH")}</Button>
                    </Layout.Right>
                </Group>
            </form>

            <Group>{fetch_Srch.data && <Wijmo {...grid.grid} data={fetch_Srch.data} />}</Group>
        </Page>
    );
};
