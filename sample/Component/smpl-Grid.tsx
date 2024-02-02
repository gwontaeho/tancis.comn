import { useMemo } from "react";
import { Sample } from "@/comn/components/_";
import { Button, Grid } from "@/comn/components";
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
                    colspan: 2,

                    cells: [
                        //
                        { binding: "w", width: "*" },
                        { binding: "w", width: "*" },
                    ],
                },
                {
                    cells: [
                        //
                        { binding: "q", width: "*" },
                        { binding: "w" },
                        { binding: "w" },
                    ],
                },
            ],
            body: [
                {
                    colspan: 2,
                    cells: [
                        //
                        { binding: "q", required: true },
                        { binding: "w" },
                    ],
                },
                {
                    cells: [
                        //
                        { binding: "q" },
                        { binding: "w" },
                    ],
                },
            ],
        },
    });

    const data = useMemo(() => utils.getMockData({ totalElements: 999 }), []);

    return (
        <Sample>
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

            <Sample.Section title="Return">
                <Sample.Table
                    data={[
                        ["Name", "Description"],
                        ["getData", "전체 데이터"],
                        ["getOrigin", "원본 데이터"],
                        ["getSelectedRow", "선택된 Row"],
                        ["getSelectedCell", "선택된 Cell"],
                        ["getChecked", "체크된 Rows"],
                        ["addRow", "Row 추가"],
                        ["deleteRow", "Row 삭제"],
                        ["updateRow", "Row 수정"],
                        ["setEdit", "Edit 상태 변경"],
                        ["setShow", "Show 상태 변경"],
                        ["setPage", "Page 변경"],
                        ["setSize", "Size 변경"],
                        ["setData", "Data 설정"],
                        ["resetData", "원본 데이터로 리셋"],
                    ]}
                />
            </Sample.Section>
        </Sample>
    );
};
