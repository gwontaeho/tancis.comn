import { useRef } from "react";
import { TGridSchema, useAuth, useForm, useModal, useStore, useTree } from "@/comn/hooks";
import { useGrid, useResource } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { utils as xlsxUtils, writeFile, read } from "xlsx";
import excel from "exceljs";
import { comnUtils } from "@/comn/utils";

import { Page, Group, FormControl, Grid, Layout, ExcelUpload, Tree } from "@/comn/components";
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
        // group: ["q", "w"],
    },
    // group: [
    //     { cells: [{ binding: "number", aggregate: "SUM" }] },
    //     {
    //         colspan: 2,
    //         cells: [
    //             { binding: "number", aggregate: "AVERAGE" },
    //             { binding: "number", aggregate: "MAX" },
    //         ],
    //     },
    //     {
    //         cells: [{ binding: "number", aggregate: "COUNT" }],
    //     },
    // ],
    head: [
        { id: "test", cells: [{ binding: "number", rowspan: 2, width: 200 }] },
        {
            colspan: 2,
            cells: [
                { binding: "w", width: 200, colspan: 2 },
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
        { cells: [{ type: "number", binding: "number", required: true }] },
        { colspan: 2, cells: [{ binding: "q", required: true, validate: (data: any) => data === "asd", colspan: 2 }] },
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
                select: { label: "select", type: "select", area: "currCd", viewType: "label" },
                radio: { label: "radio", type: "radio", area: "currCd", viewType: "value" },

                checkbox: {
                    label: "checkbox",
                    type: "checkbox",
                    area: "comnCd",
                    comnCd: "COM_0100",
                    viewType: "both",
                },
                code: { label: "code", type: "code", area: "currCd", maxLength: 3 },
            },
        },
        defaultValues: {
            radio: "KRW",
        },
    });

    const form2 = useForm({
        defaultSchema: {
            id: "test",
            schema: {
                text: { label: "text", type: "text" },
                date: { label: "date", type: "date" },
                select: { label: "select", type: "select", area: "currCd", viewType: "label" },
                radio: { label: "radio", type: "radio", area: "currCd", viewType: "value" },

                checkbox: {
                    label: "checkbox",
                    type: "checkbox",
                    area: "comnCd",
                    comnCd: "COM_0100",
                    viewType: "both",
                },
                code: { label: "code", type: "code", area: "currCd", maxLength: 3 },
            },
        },
        defaultValues: {
            radio: "KRW",
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
        scrollToRow,
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
        exportExcel,
        importExcel,
    } = useGrid({
        defaultSchema: schema1,
    });

    const data = useMemo(() => getMockData({ totalElements: 66 }), []);

    const data2 = getMockDataWithPaging({ data, page, size });

    const _test = {
        row: (data: any) => {
            return data.q !== "Tom";
        },

        // radio: () => {
        //     return false;
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
            // q: (data: any) => {
            //     /**
            //      * # data
            //      * value
            //      * rowValues
            //      * binding
            //      */
            //     return (
            //         <Layout direction="row" gap={1}>
            //             <FormControl type="radio" options={[{ label: "a", value: "a" }]} />
            //             <FormControl type="radio" />
            //         </Layout>
            //     );
            // },
        },
    };

    // getData({excludes:["deleted"]})

    const _test2 = {
        onCellClick: (data: any) => {
            console.log(data);
        },
        onRowClick: (data: any) => {
            console.log(data);
        },
    };

    const handleTest = (e: any) => {
        console.log(e.target.files[0]);
    };

    const { tree, setOpen } = useTree({ defaultSchema: TREE_SCHEMA });

    return (
        <Page>
            <Layout>
                <Group>
                    <Group.Header></Group.Header>
                    <Group.Body>
                        <Group.Section>
                            <Group.Cell root>
                                <Group.Cell header></Group.Cell>
                                <Group.Cell size={10}>
                                    <Group.Cell size={2} header required>
                                        required
                                    </Group.Cell>
                                    <Group.Cell size={8}></Group.Cell>
                                    <Group.Cell size={2} header></Group.Cell>
                                    <Group.Cell size={8}></Group.Cell>
                                    <Group.Cell size={2} header></Group.Cell>
                                    <Group.Cell size={8}></Group.Cell>
                                    <Group.Cell size={10}></Group.Cell>
                                </Group.Cell>
                            </Group.Cell>
                        </Group.Section>
                    </Group.Body>
                    <Group.Footer></Group.Footer>
                </Group>

                <Group>
                    <Group.Header></Group.Header>
                    <Group.Body>
                        <Group.Section>
                            <Grid
                                {...grid}
                                data={data}
                                render={_test}
                                onCellClick={_test2.onCellClick}
                                onRowClick={_test2.onRowClick}
                                onRowCheck={(data: any, checked: any) => console.log(data, checked)}
                                onRowSelect={(data: any) => console.log(data)}
                            />
                        </Group.Section>

                        <Group.Section>
                            <Group.Cell root>
                                <Group.Cell>
                                    <button onClick={() => setData(data)}>set data</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => resetData()}>reset</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => addRow({ text: "added", q: "asd" })}>add row</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => setSize(30)}>setSize 30</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => setPage(2)}>setPage 2</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => setOption("height", 500)}>set height</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => deleteRow(getSelectedRow())}>delete one row</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => setOption("height", "auto")}>set height auto</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => deleteRow(getChecked())}>delete array rows</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => deleteRow("radio")}>delete radio</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => deleteRow("checkbox")}>delete checkbox</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button
                                        onClick={() => {
                                            const cel = getSelectedCell();
                                            updateRow({ ...cel?.rowValues, q: "123123" });
                                        }}
                                    >
                                        셀 데이터 바꾸기
                                    </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(getChecked())}>getChecked</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(validate())}>validate</button>
                                </Group.Cell>
                                <Group.Cell></Group.Cell>
                                <Group.Cell></Group.Cell>
                                <Group.Cell></Group.Cell>
                                <Group.Cell></Group.Cell>
                                <Group.Cell></Group.Cell>
                                <Group.Cell></Group.Cell>
                                <Group.Cell></Group.Cell>
                                <Group.Cell></Group.Cell>
                                <Group.Cell></Group.Cell>
                                <Group.Cell></Group.Cell>
                            </Group.Cell>
                        </Group.Section>
                    </Group.Body>
                    <Group.Footer></Group.Footer>
                </Group>
            </Layout>

            <div className="flex flex-col gap-8">
                <div className="flex  flex-wrap gap-2 [&_button]:border [&_button]:p-2"></div>
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
                    <button onClick={() => setEdit("rowCell", { row: getSelectedCell()?.rowValues, cell: "w" }, true)}>
                        edit rowcell true w
                    </button>
                    <button onClick={() => setEdit("rowCell", { row: getSelectedCell()?.rowValues, cell: "w" }, false)}>
                        edit rowcell false w
                    </button>
                    <button onClick={() => setEdit("rowCell", { row: getSelectedCell()?.rowValues, cell: "q" }, true)}>
                        edit rowcell true q
                    </button>
                    <button onClick={() => setEdit("rowCell", { row: getSelectedCell()?.rowValues, cell: "q" }, false)}>
                        edit rowcell false q
                    </button>
                    <button onClick={() => setShow("column", "test", true)}>show text</button>
                    <button onClick={() => setShow("column", "test", false)}>hide text</button>
                </div>
                <div className="flex  flex-wrap gap-2 [&_button]:border [&_button]:p-2">
                    <button onClick={() => console.log(getData())}>getData</button>
                    <button onClick={() => console.log(getData({ excludes: ["deleted", "added"] }))}>
                        getData not deleted
                    </button>
                    <button onClick={() => console.log(getOrigin())}>getOrigin</button>
                    <button onClick={() => console.log(getSelectedRow())}>getSelectedRow</button>
                    <button onClick={() => console.log(getSelectedCell())}>getSelectedCel</button>
                    <button onClick={() => console.log(getChecked())}>getChecked</button>
                    <button onClick={() => console.log(isChecked())}>isChecked</button>
                    <button onClick={() => console.log(isSelectedRow())}>isSelectedRow</button>
                    <button onClick={() => console.log(isSelectedCell())}>isSelectedCell</button>
                    <button onClick={() => exportExcel()}>export</button>
                    <button onClick={async () => console.log(await importExcel())}>importExcel</button>
                </div>
            </div>

            <Layout direction="col" align="between" height={400}>
                <div>a</div>
                <div>a</div>
            </Layout>

            <Group>
                <Tree
                    data={treeData}
                    onClick={(data) => {
                        console.log(data);
                    }}
                />
                <button onClick={() => setOpen()}>setOpen</button>
            </Group>
        </Page>
    );
};

const treeData = [
    {
        id: "1",
        name: "public",
        children: [
            {
                id: "2",
                name: "assets",
                children: [
                    {
                        id: "3",
                        name: "image",
                        children: [
                            {
                                id: "4",
                                name: "aa",
                            },
                            {
                                id: "5",
                                name: "generic.png",
                            },
                            {
                                id: "6",
                                name: "shield.svg",
                            },
                        ],
                    },
                    {
                        id: "7",
                        name: "video",
                        children: [
                            {
                                id: "8",
                                name: "beach.mp4",
                            },
                            {
                                id: "9",
                                name: "background.map",
                            },
                        ],
                    },
                    {
                        id: "10",
                        name: "js",
                        children: [
                            {
                                id: "11",
                                name: "theme.js",
                            },
                            {
                                id: "12",
                                name: "theme.min.js",
                            },
                        ],
                    },
                ],
            },
            {
                id: "13",
                name: "dashboard",
                children: [
                    {
                        id: "14",
                        name: "default.html",
                    },
                    {
                        id: "15",
                        name: "analytics.html",
                    },
                    {
                        id: "16",
                        name: "crm.html",
                    },
                ],
            },
            {
                id: "17",
                name: "index.html",
            },
        ],
    },
    {
        id: "18",
        name: "Files",
        children: [
            {
                id: "19",
                name: "build.zip",
            },
            {
                id: "20",
                name: "live-1.3.4.zip",
            },
            {
                id: "21",
                name: "app.exe",
            },
            {
                id: "22",
                name: "export.csv",
            },
            {
                id: "23",
                name: "default.pdf",
            },
            {
                id: "24",
                name: "Yellow_Coldplay.wav",
            },
        ],
    },
    {
        id: "25",
        name: "package.json",
    },
    {
        id: "26",
        name: "package-lock.json",
    },
    {
        id: "27",
        name: "README.md",
    },
];

const TREE_SCHEMA = {
    options: { height: 300 },
    data: treeData,
};
