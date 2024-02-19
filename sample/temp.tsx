import { useRef } from "react";
import { TGridSchema, useForm, useModal, useStore } from "@/comn/hooks";
import { useGrid, useResource } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { utils as xlsxUtils, writeFile, read } from "xlsx";
import excel from "exceljs";
import { comnUtils } from "@/comn/utils";

import { Page, Group, FormControl, Grid, Layout, ExcelUpload } from "@/comn/components";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import lodash from "lodash";
import dayjs from "dayjs";

const getMockData = ({ totalElements = 99 }) => {
    return {
        page: {
            totalElements,
            page: 0,
            size: 10,
        },
        content: Array(totalElements)
            .fill(null)
            .map((_, i) => ({
                index: i,
                q: ["Maru", "Sam", "Tom", "Ken"][Math.floor(Math.random() * 4)],
                w: ["005", "011", "414"][Math.floor(Math.random() * 3)],
                ww: ["77", "22"][Math.floor(Math.random() * 2)],
                id: new Date().getTime() + i,
                a: "a" + Math.random() * 1000,
                b: "b" + Math.random() * 1000,
                c: "c" + Math.random() * 1000,
                d: "d" + Math.random() * 1000,
                e: "e" + Math.random() * 1000,
                f: "f" + Math.random() * 1000,
                g: "g" + Math.random() * 1000,
                text: ["Maru", "Sam", "Tom", "Ken"][Math.floor(Math.random() * 4)],
                number: Math.ceil(Math.random() * 1000),
                date: "2022-10-10",
                time: "11:20:10",
                datetime: "2022-10-10 10:30:20",
            })),
    };
};

const getMockDataWithPaging = ({ data = {}, page = 0, size = 10 }: { data: any; page: number; size: number }) => {
    return { ...data, content: lodash.chunk(data.content, size)[page], __t: new Date() };
};
const getMockOptions = (count = 3) => {
    return Array(count)
        .fill(null)
        .map(() => ({ label: (Math.random() * 1000).toFixed(), value: (Math.random() * 1000).toFixed() }));
};

const schema1: TGridSchema = {
    options: {
        index: true,
        radio: true,
        checkbox: true,
        add: true,
        delete: true,
        edit: false,
        importExcel: true,
        exportExcel: true,
        height: 400,
        pagination: "in",

        group: ["q"],
    },
    head: [
        { id: "test", cells: [{ binding: "q", rowspan: 2, width: "50%" }] },
        {
            cells: [
                { binding: "w", width: 200 },
                { binding: "w", width: 200 },
            ],
        },
        {
            cells: [
                { binding: "e", width: 200 },
                { binding: "w", width: 200 },
            ],
        },
    ],
    body: [
        { cells: [{ binding: "q", required: true }] },
        { cells: [{ binding: "w", required: true, validate: (data: any) => data === "asd" }] },
        { cells: [{ binding: "d", min: 5, required: true }] },
    ],
};

type TData = {
    content: Record<string, any>;
    page: {
        number: number;
        size: number;
        totalElements: number;
        totalPages: number;
    };
};

const useExcel = () => {
    const _file = useRef<any>();

    const importFile = (file: any) => {
        const { buffer } = file;

        const wb = read(buffer);
        /* SheetNames[0] get first worksheet */
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw = xlsxUtils.sheet_to_json(ws);
        const header = raw.shift() || {};

        const key = Object.keys(header);
        const label = Object.values(header);

        return raw;
    };

    const selectFile = async () => {
        return new Promise((resolve) => {
            const input = document.createElement("input");
            input.type = "file";
            input.onchange = async () => {
                if (!input.files) return;

                const file = input.files[0];
                const name = file.name;
                const buffer = await file.arrayBuffer();

                _file.current = { file, name, buffer };
                resolve({ file, name, buffer });
            };
            input.click();
        });
    };

    const getFile = () => {
        return _file.current;
    };

    return { selectFile, importFile, getFile };
};

export const Temp = () => {
    const { selectFile, importFile, getFile } = useExcel();

    const tbl = useRef<any | null>(null);

    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "currCd" },
            { area: "cityCd" },
            { area: "portAirptCd" },
            { area: "test" },
        ],
    });

    const modal = useModal();

    const form = useForm({
        defaultSchema: {
            id: "test",
            schema: {
                text: { label: "text", type: "text" },
                date: { label: "date", type: "date" },
                select: { label: "select", type: "select", area: "comnCd", comnCd: "COM_0100", viewType: "label" },
                radio: { label: "radio", type: "radio", area: "comnCd", comnCd: "COM_0100", viewType: "value" },
                checkbox: {
                    label: "checkbox",
                    type: "checkbox",
                    area: "comnCd",
                    comnCd: "COM_0100",
                    viewType: "both",
                },
                code: { label: "code", type: "code", area: "comnCd", comnCd: "COM_0100", maxLength: 3 },
            },
        },
    });

    const {
        grid,
        getData,
        getOrigin,
        setOption,
        getSelectedRow,
        getSelectedCell,
        getChecked,
        addRow,
        deleteRow,
        updateRow,
        page,
        size,
        setEdit,
        setShow,
        setPage,
        setSize,
        resetData,
        setData,
        isChecked,
        isSelectedRow,
        isSelectedCell,
        validate,
    } = useGrid({
        defaultSchema: schema1,
    });

    const data = useMemo(() => getMockData({ totalElements: 4 }), []);

    const data2 = getMockDataWithPaging({ data, page, size });

    const _test = {
        radio: (data: any) => {
            return true;
        },
        checkbox: (data: any) => {
            return false;
        },
        // head: {
        //     a: (data: any) => {
        //         /**
        //          * # data
        //          * id
        //          * header
        //          * binding
        //          */
        //         return (
        //             <Layout>
        //                 <FormControl />
        //             </Layout>
        //         );
        //     },
        // },
        cell: {
            q: (data: any) => {
                /**
                 * # data
                 * value
                 * rowValues
                 * binding
                 */
                return (
                    <Layout>
                        <div>{data.rowValues.q}-</div>
                        <div>{data.rowValues.q}-</div>
                        <div>{data.rowValues.q}</div>
                    </Layout>
                );
            },
        },
        edit: {
            // text: (data: any) => {
            //     /**
            //      * # data
            //      * value
            //      * rowValues
            //      * binding
            //      */
            //     return (
            //         <Layout direction="row" gap={1}>
            //             <FormControl />
            //             <FormControl />
            //         </Layout>
            //     );
            // },
        },
    };

    const _test2 = {
        onCellClick: {
            text: (data: any) => {
                // console.log(data);
            },
        },
        onRowClick: (data: any) => {
            // console.log(data);
        },
    };

    return (
        <Page>
            <button onClick={selectFile}>select</button>
            <button onClick={() => console.log(getFile())}>get</button>
            <button onClick={() => console.log(importFile(getFile()))}>import</button>

            <Group>
                <Group.Body>
                    <Group.Section title="asd" description="asd">
                        <Group.Row>
                            <Group.Control {...form.schema.text} />
                            <Group.Control {...form.schema.date} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.select} />
                            <Group.Control {...form.schema.radio} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.checkbox} />
                            <Group.Control {...form.schema.code} />
                        </Group.Row>
                        <Group.Row>
                            <button onClick={() => console.log(form.getValues())}>get values</button>
                            <button onClick={() => form.setEditable(true)}>setEdit true</button>
                            <button onClick={() => form.setEditable(false)}>setEdit false</button>
                            <button onClick={() => form.setValues({ text: "asd" })}>set values</button>
                            <button onClick={() => form.setValue("code", null)}>set value</button>
                        </Group.Row>
                    </Group.Section>

                    <Group.Section>
                        <Grid
                            {...grid}
                            data={data}
                            render={_test}
                            onCellClick={_test2.onCellClick}
                            onRowClick={_test2.onRowClick}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>

            <div className="flex flex-col gap-8">
                <div className="flex  flex-wrap gap-2 [&_button]:border [&_button]:p-2">
                    <button onClick={() => setData(data2)}>set data</button>
                    <button onClick={() => resetData()}>reset</button>
                    <button onClick={() => addRow({ text: "added" })}>add row</button>
                    <button onClick={() => setSize(30)}>setSize 30</button>
                    <button onClick={() => setPage(2)}>setPage 2</button>
                    <button onClick={() => setOption("height", 500)}>set height</button>
                    <button onClick={() => setOption("height", "auto")}>set height auto</button>

                    <button onClick={() => deleteRow(getSelectedRow())}>delete one row</button>
                    <button onClick={() => deleteRow(getChecked())}>delete array rows</button>
                    <button onClick={() => deleteRow("radio")}>delete radio</button>
                    <button onClick={() => deleteRow("checkbox")}>delete checkbox</button>

                    <button
                        onClick={() => {
                            const cel = getSelectedCell();
                            updateRow({ ...cel?.rowValues, q: "123123" });
                        }}
                    >
                        셀 데이터 바꾸기
                    </button>
                    <button onClick={() => console.log(getChecked())}>getChecked</button>
                    <button onClick={() => console.log(validate())}>validate</button>
                </div>
                <div className="flex  flex-wrap gap-2 [&_button]:border [&_button]:p-2">
                    <button onClick={() => setOption("edit", true)}>setOption edit true</button>
                    <button onClick={() => setOption("edit", false)}>setOption edit false</button>
                    <button onClick={() => setOption("index", true)}>setOption index true</button>
                    <button onClick={() => setOption("index", false)}>setOption index false</button>
                    <button onClick={() => setOption("checkbox", true)}>setOption checkbox true</button>
                    <button onClick={() => setOption("checkbox", false)}>setOption checkbox false</button>
                    <button onClick={() => setOption("radio", true)}>setOption radio true</button>
                    <button onClick={() => setOption("radio", false)}>setOption radio false</button>
                    <button onClick={() => setEdit("column", "test", true)}>edit column true</button>
                    <button onClick={() => setEdit("column", "test", false)}>edit column false</button>
                    <button onClick={() => setEdit("cell", "w", true)}>edit cell true</button>
                    <button onClick={() => setEdit("cell", "w", false)}>edit cell false</button>
                    <button onClick={() => setEdit("row", getSelectedCell()?.rowValues, true)}>edit row true</button>
                    <button onClick={() => setEdit("row", getSelectedCell()?.rowValues, false)}>edit row false</button>
                    <button onClick={() => setShow("column", "test", true)}>show text</button>
                    <button onClick={() => setShow("column", "test", false)}>hide text</button>
                </div>
                <div className="flex  flex-wrap gap-2 [&_button]:border [&_button]:p-2">
                    <button onClick={() => console.log(getData())}>getData</button>
                    <button onClick={() => console.log(getOrigin())}>getOrigin</button>
                    <button onClick={() => console.log(getSelectedRow())}>getSelectedRow</button>
                    <button onClick={() => console.log(getSelectedCell())}>getSelectedCel</button>
                    <button onClick={() => console.log(getChecked())}>getChecked</button>
                    <button onClick={() => console.log(isChecked())}>isChecked</button>
                    <button onClick={() => console.log(isSelectedRow())}>isSelectedRow</button>
                    <button onClick={() => console.log(isSelectedCell())}>isSelectedCell</button>
                </div>
            </div>
        </Page>
    );
};
