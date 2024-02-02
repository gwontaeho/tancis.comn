import { useMemo, useState } from "react";
import { Sample } from "@/comn/components/_";
import { Button, FormControl, Grid, Layout } from "@/comn/components";
import { TGridSchema, useGrid } from "@/comn/hooks";
import { utils } from "@/comn/utils";

const sch1: TGridSchema = {
    id: "test",
    options: {
        index: true,
        radio: true,
        checkbox: true,
        pagination: "in",
        height: 300,
    },
    head: [
        {
            colspan: 2,
            cells: [{ binding: "text", colspan: 2, width: 300 }],
        },
        {
            id: "id",
            cells: [{ binding: "number", width: 100 }],
        },
    ],
    body: [
        { colspan: 2, cells: [{ binding: "text" }, { binding: "text" }] },
        {
            cells: [{ binding: "number" }],
        },
    ],
};

const sch2: TGridSchema = {
    id: "test",
    options: {
        index: true,
        radio: true,
        checkbox: true,
        pagination: "in",
        height: 300,
    },
    head: [
        {
            colspan: 2,
            cells: [
                { binding: "text", colspan: 2 },
                { binding: "text", width: 100 },
                { binding: "text", width: 100 },
                { binding: "text", width: 100, colspan: 2 },
            ],
        },
        {
            cells: [{ binding: "number", width: 100, rowspan: 3 }],
        },
        {
            colspan: 3,
            cells: [
                { binding: "number", width: 100 },
                { binding: "number", width: 100 },
                { binding: "number", width: 100 },
                { binding: "number", width: 100, colspan: 3 },
                { binding: "number", width: 100, colspan: 2 },
                { binding: "number", width: 100 },
            ],
        },
    ],
    body: [
        {
            colspan: 2,
            cells: [
                { binding: "text", colspan: 2 },
                { binding: "text", colspan: 2 },
            ],
        },
        {
            cells: [{ binding: "number", rowspan: 2 }],
        },
        {
            colspan: 3,
            cells: [{ binding: "number", colspan: 3 }, { binding: "number", colspan: 2 }, { binding: "number" }],
        },
    ],
};

const sch3: TGridSchema = {
    id: "test",
    options: {
        index: true,
        radio: true,
        checkbox: true,
        pagination: "in",
        height: 300,
    },
    head: [
        {
            colspan: 2,
            cells: [
                { binding: "custom1", colspan: 2 },
                { binding: "text", width: 150 },
                { binding: "text", width: 150 },
                { binding: "text", width: 100, colspan: 2 },
            ],
        },
        {
            cells: [{ binding: "number", width: 100, rowspan: 3 }],
        },
        {
            colspan: 3,
            cells: [
                { binding: "number", width: 100 },
                { binding: "number", width: 100 },
                { binding: "number", width: 100 },
                { binding: "custom2", width: 100, colspan: 3 },
                { binding: "number", width: 100, colspan: 2 },
                { binding: "number", width: 100 },
            ],
        },
    ],
    body: [
        {
            colspan: 2,
            cells: [
                { binding: "text", colspan: 2 },
                { binding: "custom3", colspan: 2 },
            ],
        },
        {
            cells: [{ binding: "number", rowspan: 2 }],
        },
        {
            colspan: 3,
            cells: [{ binding: "custom4", colspan: 3 }, { binding: "number", colspan: 2 }, { binding: "number" }],
        },
    ],
};

export const SampleGrid = () => {
    // const [sch, setSch] = useState(sch1);

    const s1 = useGrid({ defaultSchema: sch1 });
    const s2 = useGrid({ defaultSchema: sch2 });
    const s3 = useGrid({ defaultSchema: sch3 });

    const data = useMemo(() => utils.getMockData({ totalElements: 7 }), []);

    // 단순한 그리드
    // 복잡한 그리드
    // 커스텀 셀
    // Pagination in
    // Pagination out
    // Pagination false

    const render = {
        head: {
            custom1: () => {
                return <FormControl />;
            },
            custom2: () => {
                return (
                    <Layout direction="row" gap={1}>
                        <FormControl type="code" />
                        <FormControl type="date" />
                    </Layout>
                );
            },
        },
        cell: {
            custom3: () => {
                return <FormControl type="select" />;
            },
            custom4: () => {
                return (
                    <Layout gap={1}>
                        <FormControl
                            type="radio"
                            options={[
                                { label: "ABC", value: "0" },
                                { label: "DEF", value: "1" },
                                { label: "HIJ", value: "2" },
                            ]}
                        />
                        <FormControl type="time" />
                    </Layout>
                );
            },
        },
        edit: {},
    };

    return (
        <Sample title="Grid & useGrid">
            <Sample.Section title="useGrid() Return">
                <Sample.Table
                    data={[
                        ["Name", "Description"],
                        ["getData()", "전체 데이터"],
                        ["getOrigin()", "원본 데이터"],
                        ["getSelectedRow()", "선택된 Row"],
                        ["getSelectedCell()", "선택된 Cell"],
                        ["getChecked()", "체크된 Rows"],
                        ["addRow()", "Row 추가"],
                        ["deleteRow()", "Row 삭제"],
                        ["updateRow()", "Row 수정"],
                        ["setEdit()", "Edit 상태 변경"],
                        ["setShow()", "Show 상태 변경"],
                        ["setPage()", "Page 변경"],
                        ["setSize()", "Size 변경"],
                        ["setData()", "Data 설정"],
                        ["resetData()", "원본 데이터로 리셋"],
                    ]}
                />
            </Sample.Section>

            {/* 1. 단순한 그리드 */}
            <Sample.Section title="1. 기본">
                <Sample.Section title="Result">
                    <Grid {...s1.grid} data={data} />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="grid grid-cols-2 gap-1">
                                <Sample.Button onClick={() => console.log(s1.getData())}>getData()</Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.getOrigin())}>getOrigin()</Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.getSelectedRow())}>
                                    getSelectedRow()
                                </Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.getSelectedCell())}>
                                    getSelectedCell()
                                </Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.getChecked())}>getChecked()</Sample.Button>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-2 gap-1">
                                <Sample.Button onClick={() => console.log(s1.addRow())}>addRow()</Sample.Button>
                                <Sample.Button
                                    onClick={() => s1.updateRow({ ...s1.getSelectedCell().rowValues, text: "Changed" })}
                                >
                                    updateRow()
                                </Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.getData())}>setEdit()</Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.getData())}>setShow()</Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.getData())}>setPage()</Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.getData())}>setSize()</Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.getData())}>setData()</Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.resetData())}>resetData()</Sample.Button>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-2 gap-1">
                                <Sample.Button onClick={() => s1.setEdit("column", "id", true)}>
                                    setEdit("column", "id", true)
                                </Sample.Button>
                                <Sample.Button onClick={() => s1.setEdit("cell", "text", true)}>
                                    setEdit("cell", "text", true)
                                </Sample.Button>
                                <Sample.Button onClick={() => s1.setEdit("row", s1.getSelectedRow(), true)}>
                                    setEdit("row", s1.getSelectedRow(), true)
                                </Sample.Button>
                            </div>
                        </div>
                        <div>
                            <div className="grid grid-cols-2 gap-1">
                                <Sample.Button onClick={() => console.log(s1.deleteRow("radio"))}>
                                    deleteRow("radio")
                                </Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.deleteRow("checkbox"))}>
                                    deleteRow("checkbox")
                                </Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.deleteRow("all"))}>
                                    deleteRow("all")
                                </Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.deleteRow(s1.getSelectedRow()))}>
                                    deleteRow(getSelectedRow())
                                </Sample.Button>
                                <Sample.Button onClick={() => console.log(s1.deleteRow(s1.getChecked()))}>
                                    deleteRow(getChecked())
                                </Sample.Button>
                            </div>
                        </div>
                    </div>
                </Sample.Section>
                <Layout direction="row">
                    <Sample.Section title="Schema">
                        <Sample.Code>{`
import { TGridSchema } from "@/comn/hooks";

const SCHEMA: TGridSchema = {
    id: "test",
    options: {
        index: true,
        radio: true,
        checkbox: true,
        pagination: "in",
        height: 300,
    },
    head: [
        { cells: [{ binding: "text", width: 100 }] },
        { cells: [{ binding: "number", width: 100 }] },
    ],
    body: [
        { cells: [{ binding: "text" }] },
        { cells: [{ binding: "number" }] },
    ],
};`}</Sample.Code>
                    </Sample.Section>

                    <Sample.Section title="Component">
                        <Sample.Code>{`
import { Grid } from "@/comn/components";
import { useGrid } from "@/comn/hooks";

const Page = () => {
    const { grid } = useGrid({
        defaultSchema: SCHEMA
    });

    return <Grid {...grid} data={data} />
};`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
            {/* 1. 단순한 그리드 */}

            {/* 2. 복잡한 그리드 */}
            <Sample.Section title="2. 여러 행, 열">
                <Sample.Section title="Result">
                    <Grid {...s2.grid} data={data} />
                </Sample.Section>
                <Layout direction="row">
                    <Sample.Section title="Schema">
                        <Sample.Code>{`
import { TGridSchema } from "@/comn/hooks";

const SCHEMA: TGridSchema = {
    id: "test",
    options: {
        index: true,
        radio: true,
        checkbox: true,
        pagination: "in",
        height: 300,
    },
    head: [
        {
            colspan: 2,
            cells: [
                { binding: "text", colspan: 2 },
                { binding: "text", width: 100 },
                { binding: "text", width: 100 },
                { binding: "text", width: 100, colspan: 2 },
            ],
        },
        {
            cells: [{ binding: "number", width: 100, rowspan: 3 }],
        },
        {
            colspan: 3,
            cells: [
                { binding: "number", width: 100 },
                { binding: "number", width: 100 },
                { binding: "number", width: 100 },
                { binding: "number", width: 100, colspan: 3 },
                { binding: "number", width: 100, colspan: 2 },
                { binding: "number", width: 100 },
            ],
        },
    ],
    body: [
        {
            colspan: 2,
            cells: [
                { binding: "text", colspan: 2 },
                { binding: "text", colspan: 2 },
            ],
        },
        {
            cells: [{ binding: "number", rowspan: 2 }],
        },
        {
            colspan: 3,
            cells: [
                { binding: "number", colspan: 3 },
                { binding: "number", colspan: 2 },
                { binding: "number" },
            ],
        },
    ],
};`}</Sample.Code>
                    </Sample.Section>

                    <Sample.Section title="Component">
                        <Sample.Code>{`
import { Grid } from "@/comn/components";
import { useGrid } from "@/comn/hooks";

const Page = () => {
    const { grid } = useGrid({
        defaultSchema: SCHEMA
    });

    return <Grid {...grid} data={data} />
};`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
            {/* 2. 복잡한 그리드 */}

            {/* 3. 커스텀 셀 그리드 */}
            <Sample.Section title="3. 커스텀 셀">
                <Sample.Section title="Result">
                    <Grid {...s3.grid} data={data} render={render} />
                </Sample.Section>
                <Layout direction="row">
                    <Sample.Section title="Schema">
                        <Sample.Code>{`
import { TGridSchema } from "@/comn/hooks";

const SCHEMA: TGridSchema = {
    id: "test",
    options: {
        index: true,
        radio: true,
        checkbox: true,
        pagination: "in",
        height: 300,
    },
    head: [
        {
            colspan: 2,
            cells: [
                { binding: "custom1", colspan: 2 },
                { binding: "text", width: 100 },
                { binding: "text", width: 100 },
                { binding: "text", width: 100, colspan: 2 },
            ],
        },
        {
            cells: [{ binding: "number", width: 100, rowspan: 3 }],
        },
        {
            colspan: 3,
            cells: [
                { binding: "number", width: 100 },
                { binding: "number", width: 100 },
                { binding: "number", width: 100 },
                { binding: "custom2", width: 100, colspan: 3 },
                { binding: "number", width: 100, colspan: 2 },
                { binding: "number", width: 100 },
            ],
        },
    ],
    body: [
        {
            colspan: 2,
            cells: [
                { binding: "text", colspan: 2 },
                { binding: "custom3", colspan: 2 },
            ],
        },
        {
            cells: [{ binding: "number", rowspan: 2 }],
        },
        {
            colspan: 3,
            cells: [
                { binding: "custom4", colspan: 3 }, 
                { binding: "number", colspan: 2 },
                { binding: "number" }
            ],
        },
    ],
};`}</Sample.Code>
                    </Sample.Section>
                    <Sample.Section title="Component">
                        <Sample.Code>{`
import { Grid } from "@/comn/components";
import { useGrid } from "@/comn/hooks";

const Page = () => {
    const { grid } = useGrid({
        defaultSchema: SCHEMA
    });

    const render = {
        head: {
            custom1: () => {
                return <FormControl />;
            },
            custom2: () => {
                return (
                    <Layout direction="row" gap={1}>
                        <FormControl type="code" />
                        <FormControl type="date" />
                    </Layout>
                );
            },
        },
        cell: {
            custom3: () => {
                return <FormControl type="select" />;
            },
            custom4: () => {
                return (
                    <Layout gap={1}>
                        <FormControl
                            type="radio"
                            options={[
                                { label: "ABC", value: "0" },
                                { label: "DEF", value: "1" },
                                { label: "HIJ", value: "2" },
                            ]}
                        />
                        <FormControl type="time" />
                    </Layout>
                );
            },
        },
        edit: {},
    };

    return <Grid {...grid} data={data} render={render} />
};`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
            {/* 3. 커스텀 셀 그리드 */}
        </Sample>
    );
};
