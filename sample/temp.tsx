import { TGridSchema, useFetch, useForm } from "@/comn/hooks";
import { useGrid, useResource } from "@/comn/hooks";
import type { TGridRender } from "@/comn/components";

import { Page, Group, Grid, Layout, FormControl, Tree, Button } from "@/comn/components";
import { useEffect, useMemo, useState } from "react";
import lodash from "lodash";
import { comnUtils } from "../utils";
import { api } from "../features/apis";

const mock = ({ totalElements = 99 }) => {
    return {
        page: { totalElements, page: 0, size: 10 },
        content: Array(totalElements)
            .fill(null)
            .map((_) => ({
                text: ["Maru", "Sam", "Tom", "Ken"][Math.floor(Math.random() * 4)],
                number: Math.ceil(Math.random() * 1000),
                date: "2022-10-10",
                time: "11:20:10",
                datetime: "2022-10-10 10:30:20",
            })),
    };
};

const paging = ({ data = {}, page = 0, size = 10 }: { data: any; page: number; size: number }) => {
    return { ...data, content: lodash.chunk(data.content, size)[page], __t: new Date() };
};

const GRID_SCHEMA: TGridSchema = {
    options: {
        index: true,
        radio: true,
        checkbox: true,
        add: true,
        delete: true,
        edit: true,
        importExcel: true,
        exportExcel: true,
        pagination: "in",
        group: ["text"],
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
        { cells: [{ binding: "text", type: "text" }] },
    ],
};

const FORM_SCHEMA = {
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
        textarea: { type: "textarea" },
        timerange: {
            type: "timerange",
            start: { name: "start" },
            end: { name: "end" },
        },
    },
};

export const Temp = () => {
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "currCd" },
            { area: "cityCd" },
            { area: "portAirptCd" },
            { area: "test" },
        ],
    });

    const [count, setRender] = useState(0);

    const f = useForm({ defaultSchema: FORM_SCHEMA, defaultValues: { select: "CAD" } });
    const g = useGrid({ defaultSchema: GRID_SCHEMA });

    const data = useMemo(() => mock({ totalElements: 20 }), []);

    const pagingData = paging({ data, page: g.page, size: g.size });
    const fetch = useFetch({
        // api: () => comnUtils.getCode({ area: "currCd" }),
        api: () => api.get("asdw"),
        onError: (error) => {
            // console.log("as");
            // console.log(error);
        },
    });

    const test = async () => {
        try {
            const a = await fetch.fetch("asd");
            // console.log(a);
        } catch (error) {
            // console.log(error);
            // console.log("as");
        }
    };

    useEffect(() => {
        test();
    }, []);

    const r = () => {
        setRender((prev) => ++prev);
    };

    const render = {
        row: (data: any, context: any) => {
            if (data.text === "Maru") {
                context.backgroundColor = "red";
            }

            if (data.text === "Sam") {
                context.backgroundColor = "blue";
            }
            if (data.text === "Ken") {
                context.backgroundColor = "yellow";
            }

            return true;
        },
        // checkbox: (data: any) => {
        //     return data.__type === "added";
        // },
        cell: {
            text: (data: any) => {
                return (
                    <Layout>
                        <div>1www23</div>
                    </Layout>
                );
            },
        },
        edit: {
            text: (data: any) => {
                return (
                    <Layout>
                        <div>{data.rowValues.text}-</div>
                        <div>{data.rowValues.text}-</div>
                        <div>{data.rowValues.text}</div>
                    </Layout>
                );
            },
        },
    };
    const handler = {
        onCellClick: (data: any) => {
            console.log(data);
        },
        onRowClick: (data: any) => {
            console.log(data);
        },
        onRowCheck: (data: any, checked: any) => {
            console.log(data, checked);
        },
        onRowSelect: (data: any) => {
            console.log(data);
        },
    };

    return (
        <Page>
            <Button onClick={r}>render</Button>
            <Layout>
                <Group>
                    <Group.Header></Group.Header>
                    <Group.Body>
                        <Group.Section>
                            <Group.Cell root hidden={count % 2 === 0}></Group.Cell>
                            <Group.Cell root>
                                <Group.Cell header></Group.Cell>
                                <Group.Cell size={10}>
                                    <Group.Cell size={2} header required>
                                        required
                                    </Group.Cell>
                                    <Group.Cell size={8}>
                                        <FormControl {...f.schema.code} callback={(data) => console.log(data)} />
                                    </Group.Cell>
                                    <Group.Cell size={2} header></Group.Cell>
                                    <Group.Cell size={8}>
                                        <FormControl {...f.schema.select} />
                                    </Group.Cell>
                                    <Group.Cell size={2} header></Group.Cell>
                                    <Group.Cell size={8}></Group.Cell>
                                    <Group.Cell size={10}>
                                        <FormControl {...f.schema.textarea} />
                                    </Group.Cell>
                                </Group.Cell>
                            </Group.Cell>
                            <Group.Cell root>
                                <FormControl {...f.schema.timerange} rangeButton={5} />
                            </Group.Cell>
                            <Group.Cell root>
                                <Group.Cell>
                                    <button onClick={() => console.log(f.setEditable(false))}>get data</button>
                                    <button onClick={() => console.log(f.getValues())}>get data</button>
                                    <button onClick={() => console.log(f.setValue("select", "AED"))}>get data</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(f.getValues())}>get data</button>
                                    <button onClick={() => console.log(f.setValue("select", "AED"))}>get data</button>
                                </Group.Cell>
                            </Group.Cell>
                        </Group.Section>

                        <Group.Section>
                            <Tree
                                data={[
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
                                ]}
                            />
                        </Group.Section>
                    </Group.Body>
                    <Group.Footer></Group.Footer>
                </Group>

                <Group>
                    <Group.Header></Group.Header>
                    <Group.Body>
                        <Group.Section>
                            <Grid
                                {...g.grid}
                                data={data}
                                render={render}
                                onCellClick={handler.onCellClick}
                                onRowClick={handler.onRowClick}
                                onRowCheck={handler.onRowCheck}
                                onRowSelect={handler.onRowSelect}
                            />
                        </Group.Section>

                        <Group.Section>
                            <Group.Cell root>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getData())}>Get</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getData({ excludes: ["deleted"] }))}>
                                        Get (- deleted)
                                    </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getOrigin())}>Get (origin)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getChecked())}>Get (checkbox)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getSelectedRow())}>Get (radio)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getSelectedCell())}>Get (cell)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.deleteRow("checkbox")}>삭제 (checkbox)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.deleteRow("radio")}>삭제 (radio)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.deleteRow("all")}>삭제 (all)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.deleteRow(g.getChecked())}>삭제 (Row[])</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.deleteRow(g.getSelectedRow())}>삭제 (Row)</button>
                                </Group.Cell>

                                <Group.Cell>
                                    <button onClick={() => g.unCheck()}>체크 해제 (checkbox)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.unSelectRow()}>선택 해제 (radio)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.unSelectCell()}>선택 해제 (Cell)</button>
                                </Group.Cell>

                                <Group.Cell>
                                    <button onClick={() => g.setOption("edit", true)}>Edit true (Option)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setOption("edit", false)}>Edit false (Option)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setEdit("column", "test", true)}>
                                        Edit true (Column)
                                    </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setEdit("column", "test", false)}>
                                        Edit false (Column)
                                    </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setEdit("cell", "text", true)}>Edit true (Cell)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setEdit("cell", "text", false)}>Edit false (Cell)</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setEdit("row", g.getSelectedRow(), true)}>
                                        Edit true (Row)
                                    </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setEdit("row", g.getSelectedRow(), false)}>
                                        Edit false (Row)
                                    </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button
                                        onClick={() =>
                                            g.setEdit("rowCell", { row: g.getSelectedRow(), cell: "text" }, true)
                                        }
                                    >
                                        Edit true (RowCell)
                                    </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button
                                        onClick={() =>
                                            g.setEdit("rowCell", { row: g.getSelectedRow(), cell: "text" }, false)
                                        }
                                    >
                                        Edit true (RowCell)
                                    </button>
                                </Group.Cell>

                                <Group.Cell>
                                    <button onClick={() => g.setData(data)}>Set</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.resetData()}>Reset</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setSize(30)}>Set Size 30</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setPage(2)}>Set Page 2</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setOption("height", 500)}>Set Height 500</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setOption("height", "auto")}>Set Height Auto</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.addRow({ text: "added" })}>Add</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button
                                        onClick={() => {
                                            const row = g.getSelectedRow();
                                            g.updateRow({ ...row, text: "changed" });
                                        }}
                                    >
                                        Change
                                    </button>
                                </Group.Cell>

                                <Group.Cell>
                                    <button onClick={() => console.log(g.validate())}>validate</button>
                                </Group.Cell>

                                <Group.Cell>
                                    <button onClick={() => g.setOption("index", true)}>Index true</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setOption("index", false)}>Index false</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setOption("checkbox", true)}>Checkbox true</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setOption("checkbox", false)}>Checkbox false</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setOption("radio", true)}>Radio true</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setOption("radio", false)}>Radio false</button>
                                </Group.Cell>

                                <Group.Cell>
                                    <button onClick={() => g.setShow("column", "test", true)}>Show test</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setShow("column", "test", false)}>Hide test</button>
                                </Group.Cell>

                                <Group.Cell>
                                    <button onClick={() => console.log(g.isChecked())}>is Checked</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.isSelectedRow())}>is SelectedRow</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.isSelectedCell())}>is SelectedCell</button>
                                </Group.Cell>

                                <Group.Cell>
                                    <button onClick={() => g.exportExcel()}>Export</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={async () => console.log(await g.importExcel())}>Import</button>
                                </Group.Cell>
                                <Group.Cell></Group.Cell>
                                <Group.Cell></Group.Cell>
                            </Group.Cell>
                        </Group.Section>
                    </Group.Body>
                    <Group.Footer></Group.Footer>
                </Group>
            </Layout>
        </Page>
    );
};
