import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components/Wijmo.v2/Wijmo.v2";
import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useFetch, useWijmo, useCondition, FormValuesType } from "@/comn/hooks";
import { APIS, SCHEMA_FORM, SCHEMA_GRID } from "./comn-comn-cd.service";

/**
 * Common Code List
 * !==공통코드 목록==!
 *
 * Bae JeongYong (Ken)
 */

export const CommonCodeList = (props: any) => {
    const { t } = useTranslation();
    const { condition } = useCondition();
    const _form = useForm({ defaultSchema: SCHEMA_FORM, values: condition });
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get("popup"));

    const _wijmo = useWijmo({ defaultSchema: SCHEMA_GRID });
    const getComnCdLst = useFetch({
        api: () => APIS.getCommonCodeList(_form.getValues(), 0, _wijmo.size),
    });

    const onSubmit = (data: FormValuesType) => {
        console.log(_form.getValues());

        getComnCdLst.fetch();
    };

    useEffect(() => {
        _form.setValues({ comnCd: "COM_0015" });
    }, []);

    return (
        <Page>
            <Page.Navigation
                base="/sample/pages"
                nodes={[{ path: "/", label: "List" }, { label: "Regist" }]}
            />
            <Page.Header title={t("T_COMN_CD_LST")} description={t("T_COMN_CD_LST")} />
            <form onSubmit={_form.handleSubmit(onSubmit)}>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {..._form.schema.comnCd}></Group.Control>
                            <Group.Control {..._form.schema.cdVldVal}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {..._form.schema.cdVldValNm}></Group.Control>
                            <Group.Control {..._form.schema.langCd}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Layout.Right>
                        <Button type="submit">{t("B_SRCH")}</Button>
                    </Layout.Right>
                </Group>
            </form>
            <Group>
                {getComnCdLst.data && <Wijmo {..._wijmo.grid} data={getComnCdLst.data} />}
            </Group>
        </Page>
    );
};
