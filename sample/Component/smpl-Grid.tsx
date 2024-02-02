import { useMemo } from "react";
import { Sample } from "@/comn/components/_";
import { Button, Grid, Layout } from "@/comn/components";
import { useGrid } from "@/comn/hooks";
import { utils } from "@/comn/utils";

export const SampleGrid = () => {
    const s1 = useGrid({
        defaultSchema: {
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
                    cells: [{ binding: "text", width: 100 }],
                },
                {
                    cells: [{ binding: "number", width: 100 }],
                },
            ],
            body: [
                {
                    cells: [{ binding: "text" }],
                },
                {
                    cells: [{ binding: "number" }],
                },
            ],
        },
    });

    const s2 = useGrid({
        defaultSchema: {
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
        },
    });

    const data = useMemo(() => utils.getMockData({ totalElements: 7 }), []);

    return (
        <Sample title="Grid & useGrid">
            <Sample.Section title="Return">
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

            {/* default */}
            <Sample.Section title="TEST!@#!@#!@">
                <Sample.Section title="Result">
                    <Grid
                        {...s1.grid}
                        data={data}
                        render={{
                            cell: {
                                q: () => {
                                    return (
                                        <div>
                                            <div>asd</div>
                                            <div>asd</div>
                                            <div>asd</div>
                                        </div>
                                    );
                                },
                            },
                        }}
                    />
                </Sample.Section>
                <Layout direction="row" gap={4}>
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
            cells: [{ binding: "text", width: 100 }],
        },
        {
            cells: [{ binding: "number", width: 100 }],
        },
    ],
    body: [
        {
            cells: [{ binding: "text" }],
        },
        {
            cells: [{ binding: "number" }],
        },
    ],
};`}</Sample.Code>
                    </Sample.Section>

                    <Sample.Section title="Component">
                        <Sample.Code>{`
import { Grid } from "@/comn/components";
import { useGrid } from "@/comn/hooks";

const Page = () => {
    const {
        grid,
        getData,
        getOrigin,
        getSelectedRow,
        getSelectedCell,
        getChecked,
        addRow,
        deleteRow,
        updateRow,
        setEdit,
        setShow,
        setOption,
        setPage,
        setSize,
        setData,
        resetData,
    } = useGrid({
        defaultSchema: SCHEMA
    });


    return <Grid {...grid} data={data} />
};`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="좀더 복잡한..">
                <Sample.Section title="Result">
                    <Grid
                        {...s2.grid}
                        data={data}
                        render={{
                            cell: {
                                q: () => {
                                    return (
                                        <div>
                                            <div>asd</div>
                                            <div>asd</div>
                                            <div>asd</div>
                                        </div>
                                    );
                                },
                            },
                        }}
                    />
                </Sample.Section>
                <Layout direction="row" gap={4}>
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
    const {
        grid,
        getData,
        getOrigin,
        getSelectedRow,
        getSelectedCell,
        getChecked,
        addRow,
        deleteRow,
        updateRow,
        setEdit,
        setShow,
        setOption,
        setPage,
        setSize,
        setData,
        resetData,
    } = useGrid({
        defaultSchema: SCHEMA
    });


    return <Grid {...grid} data={data} />
};`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
