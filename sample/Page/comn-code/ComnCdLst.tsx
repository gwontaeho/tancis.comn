import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Wijmo } from "@/comn/components/Wijmo.v2/Wijmo.v2";
import { Page, Group, Layout, Button } from "@/comn/components";
import {
    useForm,
    useFetch,
    useWijmo,
    useCondition,
    usePopup,
    FormValuesType,
    FormSchemaType,
} from "@/comn/hooks";
import { APIS } from "./comn-comn-cd.service";

const SCHEMA_GRID: any = {
    id: "grid",
    options: { pagination: "in" },
    head: [
        { cells: [{ header: "L_COMN_CD", binding: "comnCd" }] },
        { cells: [{ header: "L_CD_VLD_VAL", binding: "cdVldVal" }] },
        { cells: [{ header: "L_CD_VLD_VAL_NM", binding: "cdVldValNm" }] },
    ],
    body: [
        {
            cells: [
                {
                    binding: "comnCd",
                },
            ],
        },
        {
            cells: [{ binding: "cdVldVal" }],
        },
        {
            cells: [{ binding: "cdVldValNm" }],
        },
    ],
};

export const SCHEMA_FORM: FormSchemaType = {
    id: "form",
    schema: {
        comnCd: { type: "text", label: "L_COMN_CD", disabled: true, required: true },
        cdVldVal: { type: "text", label: "L_CD_VLD_VAL" },
        cdVldValNm: { type: "text", label: "L_CD_VLD_VAL_NM" },
        langCd: {
            type: "select",
            label: "L_LANG_CD",
            required: true,
            options: [
                { label: "L_SW", value: "SW" },
                { label: "L_EN", value: "EN" },
                { label: "L_KO", value: "KO" },
            ],
        },
    },
};

export const CommonCodeList = (props: any) => {
    const { openPopup, postMessage } = usePopup();
    const { t } = useTranslation();
    const { condition } = useCondition();
    const _form = useForm({ defaultSchema: SCHEMA_FORM, values: condition });

    const _wijmo = useWijmo({ defaultSchema: SCHEMA_GRID });
    const getComnCdLst = useFetch({
        api: () => APIS.getCommonCodeList(_form.getValues(), 0, _wijmo.size),
    });

    const onSubmit = (data: FormValuesType) => {
        //console.log(data);
        getComnCdLst.fetch();
        return false;
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
