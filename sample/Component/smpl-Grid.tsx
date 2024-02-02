import { useMemo } from "react";
import { Sample } from "@/comn/components/_";
import { Button, Grid, Layout } from "@/comn/components";
import { useGrid } from "@/comn/hooks";
import { utils } from "@/comn/utils";

export const SampleGrid = () => {
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
        defaultSchema: {
            id: "test",
            options: {
                index: true,
                radio: true,
                checkbox: true,
                // edit: true,
                pagination: "in",
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
                    cells: [{ binding: "text", required: true }],
                },
                {
                    cells: [{ binding: "number" }],
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

            <Sample.Section>
                <Grid
                    {...grid}
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
            cells: [{ binding: "text", required: true }],
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

    return <Grid {...grid} />
};`}</Sample.Code>
                </Sample.Section>
            </Layout>
        </Sample>
    );
};
