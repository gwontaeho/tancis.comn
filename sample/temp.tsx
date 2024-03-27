import { useEffect, useMemo, useState, useRef, useLayoutEffect, memo } from "react";
import { TFormSchema, TGridSchema, useFetch, useForm, useModal, usePage, useStore, useTree } from "@/comn/hooks";
import { useGrid, useResource } from "@/comn/hooks";
import {
    Page,
    Group,
    Grid,
    Layout,
    FormControl,
    Tree,
    Button,
    Chat,
    Loading,
    Card,
    Accordion,
    Table,
    Text,
    Pdf,
} from "@/comn/components";

import lodash from "lodash";
import { api } from "../features/apis";
import { comnUtils } from "../utils";
import axios from "axios";
import { Link } from "react-router-dom";

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
                test: "1231231231234125436",
            })),
    };
};

const paging = ({ data = {}, page = 0, size = 10 }: { data: any; page: number; size: number }) => {
    return { ...data, content: lodash.chunk(data.content, size)[page], __t: new Date() };
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
                        hasChildren: true,
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
        hasChildren: true,
    },
];

const treeData2 = [
    {
        id: "27",
        name: "README.md",
        hasChildren: true,
    },
];

const GRID_SCHEMA: TGridSchema = {
    options: {
        // index: "DESC",
        // radio: true,
        // checkbox: true,
        add: true,
        delete: true,
        // edit: true,
        importExcel: true,
        exportExcel: true,
        // pagination: "in",
        height: "auto",
        // pagination: "out",
        group: ["text"],
    },

    group: [{ cells: [{ colspan: 4, text: "그리드 그룹" }] }],

    groupFoot: [
        { cells: [{ colspan: 2, text: "숫자 총합", align: "center" }] },
        { cells: [{ colspan: 2, binding: "number", aggregate: "SUM" }] },
    ],

    head: [
        { id: "test", cells: [{ rowspan: 2, binding: "number", width: 200 }] },
        {
            cells: [{ rowspan: 2, binding: "text", width: 200 }],
        },
        {
            colspan: 2,
            cells: [
                { binding: "text", width: 200, colspan: 2 },
                { binding: "text", width: 200 },
                { binding: "text", width: 200 },
            ],
        },
    ],
    body: [
        { colspan: 2, cells: [{ colspan: 2, binding: "text", excel: "A", mode: "view" }] },
        {
            colspan: 2,
            cells: [{ colspan: 2, binding: "number", type: "number", excel: "B" }],
        },
    ],
};

const FORM_SCHEMA: TFormSchema = {
    id: "test",
    schema: {
        text: { label: "text", type: "text", as: "link" },
        number: {
            label: "number",
            type: "number",
            // required: true,
            maxLength: 3,
            popupSize: "sm",

            validate: (data: any) => {
                console.log(data);
                return String(data).length === 4 || "asd";
            },
        },
        date: { label: "date", type: "date", required: true },
        select: { label: "select", type: "select", area: "currCd", viewType: "label" },
        radio: { label: "radio", type: "radio", area: "currCd", viewType: "value", readOnly: true },
        checkbox: {
            label: "checkbox",
            type: "checkbox",
            area: "comnCd",
            comnCd: "COM_0100",
            viewType: "both",
        },
        code: {
            label: "code",
            type: "code",
            area: "currCd",
            maxLength: 3,
            exact: false,
            // edit: false,
            viewType: "both",
        },
        textarea: { type: "textarea" },
        timerange: {
            type: "daterange",
            start: { name: "start", required: true, readOnly: true },
            end: { name: "end", required: true },
            required: true,
        },
    },
};

class Holder {
    // @ts-ignore
    isLocked;
    // @ts-ignore
    promise;
    // @ts-ignore
    reject;
    // @ts-ignore
    resolve;
    constructor() {
        this.hold();
    }
    hold() {
        this.isLocked = false;
        this.promise = new Promise((resolve, reject) =>
            Object.assign(this, {
                reject: () => {
                    reject(this.hold());
                },
                resolve: () => {
                    resolve(this.hold());
                },
            }),
        );
    }
    lock() {
        this.isLocked = true;
    }
}

export const Temp = () => {
    usePage();
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "currCd" },
            { area: "cityCd" },
            { area: "test" },
        ],
    });

    const [count, setRender] = useState(0);
    const [count2, setRender2] = useState(0);
    const f = useForm({ defaultSchema: FORM_SCHEMA, defaultValues: { select: "CAD", code: "AED", radio: "MYR" } });

    const st = useStore();

    const modal = useModal();

    const g = useGrid({ defaultSchema: GRID_SCHEMA });

    const t = useTree();

    const data = useMemo(() => mock({ totalElements: 7 }), []);

    const pagingData = paging({ data, page: g.page, size: g.size });

    const fetch = useFetch({
        api: () => comnUtils.getCode({ area: "currCd" }),
        // enabled: true,
        onSuccess: (data) => {
            const a = comnUtils.getOptions(data.currCdList.content, "currCd", "currNm");
        },
    });

    const test = async () => {
        try {
            const a = await api.get("http://localhost:9720/clr/api/v1/clri/tm/hs/hs-mgmt/1/1");
            console.log(a.data.clriHsMgmtDto.content);
        } catch (error) {
            // console.log(error);
            // console.log("as");
        }
    };

    const testRef = useRef<any>(null);

    const zjvl = async () => {};
    const zjvl2 = async () => {};

    const r = () => {
        setRender((prev) => ++prev);
    };
    const r2 = () => {
        setRender2((prev) => ++prev);
    };

    const render = {
        row: (data: any, context: any) => {
            // if (data.text === "Maru") {
            //     context.backgroundColor = "red";
            // }

            // if (data.text === "Sam") {
            //     context.backgroundColor = "blue";
            // }
            // if (data.text === "Ken") {
            //     context.backgroundColor = "yellow";
            // }

            return true;
        },
        // checkbox: (data: any) => {
        //     return data.__type === "added";
        // },

        radio: (data: any) => {
            return data.text !== "N";
        },

        cell: {
            text: (data: any, context: any) => {
                context.textColor = "red";

                return <>[{data.control}]</>;
            },
            test: (data: any) => {},
        },

        group: {},

        // edit: {
        //     text: (data: any) => {
        //         return (
        //             <Layout>
        //                 <FormControl value={data.value} onChange={(v) => g.updateRow({ ...data.rowValues, text: v })} />
        //             </Layout>
        //         );
        //     },
        // },
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
            <button onClick={() => modal.openModal({ url: "http://localhost:3000" })}>asdad</button>
            <Button onClick={r2}>render2</Button>
            <Button onClick={r}>render</Button>
            <Button onClick={test}>asd</Button>
            <Button onClick={zjvl}>zjvl</Button>
            <Button onClick={zjvl2}>zjvl2</Button>
            {/* <Button onClick={() => g.setSchema(GRID_SCHEMA)}>setschema</Button> */}
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
                                    <Group.Cell size={8}>
                                        <FormControl
                                            {...f.schema.text}
                                            onClick={() => console.log("a")}
                                            as="link"
                                            onChange={(a) => console.log(a)}
                                        />
                                    </Group.Cell>

                                    <Group.Cell size={2} header>
                                        <FormControl {...f.schema.date} />
                                    </Group.Cell>

                                    <Group.Cell size={8}>
                                        <FormControl {...f.schema.radio} />
                                    </Group.Cell>
                                    <Group.Cell size={2} header></Group.Cell>
                                    <Group.Cell size={8}>
                                        <FormControl
                                            {...f.schema.code}
                                            callback={({ data }) => {
                                                console.log(data);
                                            }}
                                        />
                                    </Group.Cell>
                                    <Group.Cell size={10}>
                                        <FormControl {...f.schema.number} />
                                    </Group.Cell>
                                </Group.Cell>
                            </Group.Cell>
                            <Group.Cell root>
                                <FormControl {...f.schema.timerange} rangeButton={5} />
                            </Group.Cell>

                            <Group.Cell root>
                                <Group.Cell>
                                    <button onClick={() => console.log(f.validate())}>sss</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(f.setValue("number", 12312313.12312))}>
                                        sss
                                    </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(f.getValues())}>Get all</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(f.getValues("number"))}>Get </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(f.getValues(["number", "text"]))}>Get 2</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(f.setEditable(true))}>Edit true</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(f.setEditable(false))}>Edit false</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(f.setValue("code", "AED"))}>
                                        Set Code "AED"
                                    </button>
                                </Group.Cell>

                                <Group.Cell>
                                    <button onClick={() => f.setSchema("date", { required: false })}>readOnly</button>
                                </Group.Cell>

                                <Group.Cell>
                                    <button onClick={() => console.log(f.reset())}>Reset</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => f.setSchema("date", { type: "text" })}>set schema</button>
                                </Group.Cell>
                            </Group.Cell>
                        </Group.Section>

                        <Group.Section>
                            <Tree
                                {...t.tree}
                                height={300}
                                size={12}
                                onClick={(e) => console.log(e)}
                                onCheck={(e) => {
                                    console.log(e);
                                }}
                                data={treeData2}
                                onOpen={async (e) => {
                                    console.log(e);

                                    try {
                                        const a = await api.get(
                                            "http://localhost:9720/clr/api/v1/clri/tm/hs/hs-mgmt/1/1",
                                        );

                                        const mapped = a.data.clriHsMgmtDto.content.map((_: any) => {
                                            return { id: _.hsCd, name: _.hsDesc, hasChildren: true };
                                        });

                                        t.setChildren(e, mapped);
                                    } catch (error) {}
                                }}
                            />

                            <Group.Cell root>
                                <Group.Cell>
                                    <button onClick={() => t.setData(treeData)}>Set</button>
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
                                {...g.grid}
                                data={data}
                                // data={pagingData}
                                render={render}
                                onCellClick={handler.onCellClick}
                                onRowClick={handler.onRowClick}
                                onRowCheck={handler.onRowCheck}
                                onRowSelect={handler.onRowSelect}
                                // onPageChange={(a: any) => {
                                //     console.log(a);
                                //     const data = mock({ totalElements: 20 });
                                //     const pagingData = paging({ data, page: a, size: 10 });
                                //     g.setData(pagingData);
                                // }}
                            />
                        </Group.Section>

                        <Group.Section>
                            <Group.Cell root>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getData())}>Get</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getViewData())}>Get View</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getDeletedData())}>Get Deleted</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getAddedData())}>Get Added</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.getUpdatedData())}>Get Updated</button>
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
                                        Edit false (RowCell)
                                    </button>
                                </Group.Cell>

                                <Group.Cell>
                                    <button
                                        onClick={() =>
                                            g.setEdit("rowCell", { row: g.getSelectedRow(), cell: "number" }, true)
                                        }
                                    >
                                        - number
                                    </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button
                                        onClick={() =>
                                            g.setEdit("rowCell", { row: g.getSelectedRow(), cell: "number" }, false)
                                        }
                                    >
                                        - number
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
                                    <button
                                        onClick={async () =>
                                            console.log(
                                                await g.importExcel({
                                                    C: "afaf",
                                                    D: "asd",
                                                }),
                                            )
                                        }
                                    >
                                        Import
                                    </button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => g.clearData()}>Clear</button>
                                </Group.Cell>
                                <Group.Cell>
                                    <button onClick={() => console.log(g.validate())}>validate</button>
                                </Group.Cell>
                            </Group.Cell>
                        </Group.Section>
                    </Group.Body>
                    <Group.Footer></Group.Footer>
                </Group>
            </Layout>

            <Group>
                <Group.Body>
                    <Group.Section>
                        <Chat data={CHAT_DATA} />
                    </Group.Section>
                </Group.Body>
            </Group>

            <Chat data={CHAT_DATA} />

            {/* <Loading /> */}

            <Layout align="between" gap={4}>
                <Card icon="megaphone" color="error" size="full">{`Critical Alarms\n1,300`}</Card>
                <Card icon="megaphone" color="blue" size="full">{`Normal Alarms\n1,300`}</Card>
                <Card icon="megaphone" color="info" size="full">{`Info Alarms\n1,300`}</Card>
                <Card icon="megaphone" color="success" size="full">{`Total Alarms\n1,300`}</Card>
            </Layout>

            <Layout>
                <Layout direction="col">
                    <Accordion root>
                        <Accordion>
                            <Accordion.Summary>
                                <Layout>
                                    <Button variant="primary">Date - Oct 12, 2023</Button>
                                    <Button variant="danger">102</Button>
                                    <Button variant="primary">102</Button>
                                    <Button variant="info">102</Button>
                                </Layout>
                            </Accordion.Summary>
                            <Accordion.Details>
                                <Layout direction="col">
                                    <Layout direction="row">
                                        <Layout direction="col">
                                            <Button variant="danger">Master Device Critical Alrams( 102 )</Button>
                                            <Button variant="primary">Master Device Critical Alrams( 102 )</Button>
                                            <Button variant="info">Master Device Critical Alrams( 102 )</Button>
                                        </Layout>
                                    </Layout>
                                </Layout>
                            </Accordion.Details>
                        </Accordion>
                        <Accordion>
                            <Accordion.Summary>title</Accordion.Summary>
                            <Accordion.Details>details</Accordion.Details>
                        </Accordion>
                        <Accordion>
                            <Accordion.Summary>title</Accordion.Summary>
                            <Accordion.Details>details</Accordion.Details>
                        </Accordion>
                    </Accordion>
                </Layout>
                <Layout direction="col">
                    <Group.Title title="Critical Alarms (Count by Alarm-Type)" titleSize={2}></Group.Title>
                    <Table>
                        <Table.Tr>
                            <Table.Td>
                                <Layout align="between" gap={4} valign="center">
                                    STAND STILL
                                    <Button variant="danger">102</Button>
                                </Layout>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Layout align="between" gap={4} valign="center">
                                    STAND STILL
                                    <Button variant="danger">102</Button>
                                </Layout>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Layout align="between" gap={4} valign="center">
                                    STAND STILL
                                    <Button variant="danger">102</Button>
                                </Layout>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Layout align="between" gap={4} valign="center">
                                    STAND STILL
                                    <Button variant="danger">102</Button>
                                </Layout>
                            </Table.Td>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td>
                                <Layout align="between" gap={4} valign="center">
                                    STAND STILL
                                    <Button variant="danger">102</Button>
                                </Layout>
                            </Table.Td>
                        </Table.Tr>
                    </Table>
                    <Layout>
                        <Button>111</Button>
                        <Button>111</Button>
                        <Button>111</Button>
                    </Layout>
                    <Abc count={count} />
                </Layout>
            </Layout>

            <Pdf />

            <Component count={count} />
        </Page>
    );
};

const CHAT_DATA = [
    {
        date: new Date(),
        name: "TRA",
        position: "right",
        content:
            "ASSESSED VALUES ARE MAINTAINED BECAUSE THE ATTACHED COPY OF TT DOES NOT TALLY WITH THE SUM IN INVOICE ATTACHED.",
    },
    {
        date: new Date(),
        name: "TRA",
        content:
            "ASSESSED VALUES ARE MAINTAINED BECAUSE THE ATTACHED COPY OF TT DOES NOT TALLY WITH THE SUM IN INVOICE ATTACHED.",
    },
    {
        date: new Date(),
        name: "TRA",
        position: "right",
        content:
            "ASSESSED VALUES ARE MAINTAINED BECAUSE THE ATTACHED COPY OF TT DOES NOT TALLY WITH THE SUM IN INVOICE ATTACHED.",
    },
    {
        date: new Date(),
        name: "TRA",
        content:
            "ASSESSED VALUES ARE MAINTAINED BECAUSE THE ATTACHED COPY OF TT DOES NOT TALLY WITH THE SUM IN INVOICE ATTACHED.",
    },
    {
        date: new Date(),
        name: "TRA",
        position: "right",
        content:
            "ASSESSED VALUES ARE MAINTAINED BECAUSE THE ATTACHED COPY OF TT DOES NOT TALLY WITH THE SUM IN INVOICE ATTACHED.",
    },
];

const Abc = memo(({ count }: any) => {
    return <div></div>;
});

const Component = (props: any) => {
    const { count } = props;

    // console.log(props);
    return <div>{count}</div>;
};
