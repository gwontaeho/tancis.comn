import { useTranslation } from "react-i18next";
import { Page, Group, Grid, Layout, Button } from "@/comn/components"; // 화면 구성 컴포넌트
import { useGrid, TGridSchema } from "@/comn/hooks"; // hook

export const SG_ERROR_LIST: TGridSchema = {
    id: "errors",
    options: { pagination: "in", index: true },
    head: [
        { cells: [{ header: "L_ROW_NO", binding: "row", width: 100 }] },
        { cells: [{ header: "L_SHT", binding: "sheet", width: 100 }], show: false },
        { cells: [{ header: "L_KEY", binding: "key", width: 100 }], show: false },
        { cells: [{ header: "L_ITM_NM", binding: "label", width: 150 }] },
        { cells: [{ header: "L_VAL", binding: "input", width: 150 }] },
        { cells: [{ header: "L_MSG", binding: "message", width: "*" }] },
        { cells: [{ header: "L_TP", binding: "type", width: 100 }], show: false },
        { cells: [{ header: "L_OPT", binding: "option", width: 150 }], show: false },
    ],
    body: [
        {
            cells: [{ binding: "row", type: "number" }],
        },
        {
            cells: [{ binding: "sheet" }],
        },
        {
            cells: [{ binding: "key" }],
        },
        {
            cells: [{ binding: "label" }],
        },
        {
            cells: [{ binding: "input" }],
        },
        {
            cells: [{ binding: "message", align: "left" }],
        },
        {
            cells: [{ binding: "type" }],
        },
        {
            cells: [{ binding: "option" }],
        },
    ],
};

export const SG_PRE_VALID_ERROR_LIST: TGridSchema = {
    id: "errors",
    options: { pagination: "in", index: true },
    head: [
        { cells: [{ header: "T_ID_VAL", binding: "erkyMsg", width: 250 }] },
        { cells: [{ header: "L_ITM_NM", binding: "valdnItmNm", width: 150 }] },
        { cells: [{ header: "L_MSG", binding: "errMsgCn", width: "*" }] },
    ],
    body: [
        {
            cells: [{ binding: "erkyMsg", align: "left" }],
        },
        {
            cells: [{ binding: "valdnItmNm" }],
        },
        {
            cells: [{ binding: "errMsgCn", align: "left" }],
        },
    ],
};

export type ErrorProps = {
    type?: string;
    message?: string;
    title?: string;
    errors?: Array<ErrorUnitProps>;
    head?: any;
};

export type ErrorUnitProps = {
    row?: number;
    label?: string;
    message?: string;
    type?: string;
    input?: any;
    binding?: string;
    sheet?: string | number;
    key?: any;
    option?: string;
};

export const CommonErrors = (props: ErrorProps) => {
    const { type = "error", message, errors = [], head = {} } = props;
    //console.log(props);
    const pgeUid = "ERRORS"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!

    if (head?.key !== undefined) {
        SG_ERROR_LIST.head[2].show = true;
        SG_ERROR_LIST.head[2].cells[0].header = head.key1.header;
    }

    const errorData = {
        content: errors,
        page: {
            totalElements: errors.length || 0,
        },
    };

    const grid = {
        errorList: useGrid({
            defaultSchema: type === "preValid" ? SG_PRE_VALID_ERROR_LIST : SG_ERROR_LIST,
        }),
    };

    const getErrorMessage = (rowValues: any) => {
        switch (rowValues.type) {
            case "maxLength":
                return t(rowValues.message, { 0: rowValues?.value });
            case "minLength":
                return t(rowValues.message, { 0: rowValues?.value });
            case "max":
                return t(rowValues.message, { 0: rowValues?.value });
            case "min":
                return t(rowValues.message, { 0: rowValues?.value });

            default:
                return t(rowValues.message);
        }
    };

    const render = {
        errorList: {
            cell: {
                valdnItmNm: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return t(value);
                },
                label: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return t(value);
                },
                message: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return getErrorMessage(rowValues);
                },
            },
        },
    };

    return (
        <Page id={""} title={t("T_ERROR_LST")}>
            <Group>
                <Group.Body>
                    <Grid {...grid.errorList.grid} data={errorData} render={render.errorList} />
                </Group.Body>
            </Group>
        </Page>
    );
};
