import { Fragment, useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Page, Group, Grid } from "@/comn/components"; // 화면 구성 컴포넌트
import {
    useForm,
    useFetch,
    useResource,
    useGrid,
    useModal,
    useStore,
    useToast,
    usePopup,
    TGridSchema,
} from "@/comn/hooks"; // hook

export const SG_ERROR_LIST: TGridSchema = {
    id: "errors",
    options: { pagination: "in", index: true },
    head: [
        { cells: [{ header: "L_ROW_NO", binding: "row" }], width: 100 },
        { cells: [{ header: "L_SHT", binding: "sheet" }], width: 100, show: false },
        { cells: [{ header: "L_KEY", binding: "key1" }], width: 100, show: false },
        { cells: [{ header: "L_KEY", binding: "key2" }], width: 100, show: false },
        { cells: [{ header: "L_KEY", binding: "key3" }], width: 100, show: false },
        { cells: [{ header: "L_KEY", binding: "key4" }], width: 100, show: false },
        { cells: [{ header: "L_KEY", binding: "key5" }], width: 100, show: false },
        { cells: [{ header: "L_ITM_NM", binding: "label" }], width: 150 },
        { cells: [{ header: "L_MSG", binding: "message" }], width: "*" },
        { cells: [{ header: "L_TP", binding: "type" }], width: 150, show: false },
        { cells: [{ header: "L_SHT", binding: "sheet" }], width: 150, show: false },
        { cells: [{ header: "L_OPT", binding: "option" }], width: 150, show: false },
    ],
    body: [
        {
            cells: [{ binding: "row" }],
        },
        {
            cells: [{ binding: "sheet" }],
        },
        {
            cells: [{ binding: "key1" }],
        },
        {
            cells: [{ binding: "key2" }],
        },
        {
            cells: [{ binding: "key3" }],
        },
        {
            cells: [{ binding: "key4" }],
        },
        {
            cells: [{ binding: "key5" }],
        },
        {
            cells: [{ binding: "label" }],
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
    sheet?: string | number;
    key1?: any;
    key2?: any;
    key3?: any;
    key4?: any;
    key5?: any;
    ref?: any;
    option?: string;
};

export const CommonErrors = (props: ErrorProps) => {
    const { type, message, title, errors = [], head = {} } = props;
    const pgeUid = "ERRORS"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!

    if (head?.key1 !== undefined) {
        SG_ERROR_LIST.head[2].show = true;
        SG_ERROR_LIST.head[2].cells[0].header = head.key1.header;
    }
    if (head?.key2 !== undefined) {
        SG_ERROR_LIST.head[3].show = true;
        SG_ERROR_LIST.head[3].cells[0].header = head.key2.header;
    }
    if (head?.key3 !== undefined) {
        SG_ERROR_LIST.head[4].show = true;
        SG_ERROR_LIST.head[4].cells[0].header = head.key3.header;
    }
    if (head?.key4 !== undefined) {
        SG_ERROR_LIST.head[5].show = true;
        SG_ERROR_LIST.head[5].cells[0].header = head.key4.header;
    }
    if (head?.key5 !== undefined) {
        SG_ERROR_LIST.head[6].show = true;
        SG_ERROR_LIST.head[6].cells[0].header = head.key5.header;
    }

    const errorData = {
        content: errors,
        page: {
            totalElements: errors.length || 0,
        },
    };

    const grid = {
        errorList: useGrid({
            defaultSchema: SG_ERROR_LIST,
        }),
    };

    const getErrorMessage = (rowValues: any) => {
        switch (rowValues.type) {
            case "maxLength":
                return t(rowValues.message, { 0: rowValues.schema?.maxLength?.value });
            case "minLength":
                return t(rowValues.message, { 0: rowValues.schema?.minLength?.value });
            case "max":
                return t(rowValues.message, { 0: rowValues.schema?.max?.value });
            case "min":
                return t(rowValues.message, { 0: rowValues.schema?.min?.value });
            default:
                return t(rowValues.message);
        }
    };

    const render = {
        errorList: {
            cell: {
                message: (props: any) => {
                    const { binding, rowValues, value } = props;
                    console.log(rowValues);
                    return getErrorMessage(rowValues);
                },
            },
        },
    };

    return (
        <Page id={pgeUid} title={t("T_ERROR_LST")} description={t("T_ERROR_LST")}>
            <Group>
                <Group.Body>
                    <Grid {...grid.errorList.grid} data={errorData} render={render.errorList} />
                </Group.Body>
            </Group>
        </Page>
    );
};
