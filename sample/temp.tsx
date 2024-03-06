import { TGridSchema, useFetch, useForm } from "@/comn/hooks";
import { useGrid, useResource } from "@/comn/hooks";

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
        height: 700,
        // pagination: "in",
        group: ["text"],
    },
    group: [
        { cells: [{ binding: "number", aggregate: "SUM" }] },
        {
            colspan: 2,
            cells: [
                { binding: "number", aggregate: "AVERAGE" },
                { binding: "number", aggregate: "MAX" },
            ],
        },
        {
            cells: [{ binding: "number", aggregate: "COUNT" }],
        },
    ],
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
        { cells: [{ binding: "text", type: "code", area: "currCd" }] },
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
        row: (data: any) => {
            return data.text !== "Tom";
        },
        checkbox: (data: any) => {
            return data.__type === "added";
        },
        cell: {
            q: (data: any) => {
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
            q: (data: any) => {
                return (
                    <Layout>
                        <div>{data.rowValues.q}-</div>
                        <div>{data.rowValues.q}-</div>
                        <div>{data.rowValues.q}</div>
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
                                    <Group.Cell size={10}></Group.Cell>
                                </Group.Cell>
                            </Group.Cell>
                            <Group.Cell root>
                                <Group.Cell>
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
                                    <button onClick={() => g.setData(data)}>set data</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.resetData()}>reset</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.addRow({ text: "added", q: "asd" })}>add row</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setSize(30)}>setSize 30</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setPage(2)}>setPage 2</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setOption("height", 500)}>set height</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.deleteRow(g.getSelectedRow())}>delete one row</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.setOption("height", "auto")}>set height auto</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.deleteRow(g.getChecked())}>delete array rows</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.deleteRow("radio")}>delete radio</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.deleteRow("checkbox")}>delete checkbox</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button
                                        onClick={() => {
                                            const cel = g.getSelectedCell();
                                            g.updateRow({ ...cel?.rowValues, q: "123123" });
                                        }}
                                    >
                                        셀 데이터 바꾸기
                                    </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getChecked())}>getChecked</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.validate())}>validate</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.unCheck()}>un check all</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.unSelectRow()}>un select row</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.unSelectCell()}>un select cell</button>
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
                            </Group.Cell>
                        </Group.Section>
                    </Group.Body>
                    <Group.Footer></Group.Footer>
                </Group>
            </Layout>

            <div className="flex flex-col gap-8">
                <div className="flex  flex-wrap gap-2 [&_button]:border [&_button]:p-2"></div>
                <div className="flex  flex-wrap gap-2 [&_button]:border [&_button]:p-2">
                    <button onClick={() => g.setOption("edit", true)}>setOption edit true</button>
                    <button onClick={() => g.setOption("edit", false)}>setOption edit false</button>
                    <button onClick={() => g.setOption("index", true)}>setOption index true</button>
                    <button onClick={() => g.setOption("index", false)}>setOption index false</button>
                    <button onClick={() => g.setOption("checkbox", true)}>setOption checkbox true</button>
                    <button onClick={() => g.setOption("checkbox", false)}>setOption checkbox false</button>
                    <button onClick={() => g.setOption("radio", true)}>setOption radio true</button>
                    <button onClick={() => g.setOption("radio", false)}>setOption radio false</button>
                    <button onClick={() => g.setEdit("column", "test", true)}>edit column true</button>
                    <button onClick={() => g.setEdit("column", "test", false)}>edit column false</button>
                    <button onClick={() => g.setEdit("cell", "w", true)}>edit cell true</button>
                    <button onClick={() => g.setEdit("cell", "w", false)}>edit cell false</button>
                    <button onClick={() => g.setEdit("row", g.getSelectedCell()?.rowValues, true)}>
                        edit row true
                    </button>
                    <button onClick={() => g.setEdit("row", g.getSelectedCell()?.rowValues, false)}>
                        edit row false
                    </button>
                    <button
                        onClick={() => g.setEdit("rowCell", { row: g.getSelectedCell()?.rowValues, cell: "w" }, true)}
                    >
                        edit rowcell true w
                    </button>
                    <button
                        onClick={() => g.setEdit("rowCell", { row: g.getSelectedCell()?.rowValues, cell: "w" }, false)}
                    >
                        edit rowcell false w
                    </button>
                    <button
                        onClick={() => g.setEdit("rowCell", { row: g.getSelectedCell()?.rowValues, cell: "q" }, true)}
                    >
                        edit rowcell true q
                    </button>
                    <button
                        onClick={() => g.setEdit("rowCell", { row: g.getSelectedCell()?.rowValues, cell: "q" }, false)}
                    >
                        edit rowcell false q
                    </button>
                    <button onClick={() => g.setShow("column", "test", true)}>show text</button>
                    <button onClick={() => g.setShow("column", "test", false)}>hide text</button>
                </div>
                <div className="flex  flex-wrap gap-2 [&_button]:border [&_button]:p-2">
                    <button onClick={() => console.log(g.getData())}>getData</button>
                    <button onClick={() => console.log(g.getData({ excludes: ["deleted", "added"] }))}>
                        getData not deleted
                    </button>
                    <button onClick={() => console.log(g.getOrigin())}>getOrigin</button>
                    <button onClick={() => console.log(g.getSelectedRow())}>getSelectedRow</button>
                    <button onClick={() => console.log(g.getSelectedCell())}>getSelectedCel</button>
                    <button onClick={() => console.log(g.getChecked())}>getChecked</button>
                    <button onClick={() => console.log(g.isChecked())}>isChecked</button>
                    <button onClick={() => console.log(g.isSelectedRow())}>isSelectedRow</button>
                    <button onClick={() => console.log(g.isSelectedCell())}>isSelectedCell</button>
                    <button onClick={() => g.exportExcel()}>export</button>
                    <button onClick={async () => console.log(await g.importExcel())}>importExcel</button>
                </div>
            </div>

            <Layout direction="col" align="between" height={400}>
                <div>a</div>
                <div>a</div>
            </Layout>
        </Page>
    );
};
