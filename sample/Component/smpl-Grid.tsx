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
                edit: true,
                pagination: "in",
            },
            head: [
                {
                    colspan: 2,
                    cells: [
                        //
                        { binding: "q", width: "*" },
                        { binding: "w" },
                    ],
                },
                {
                    colspan: 2,

                    cells: [
                        //
                        { binding: "q", width: "*" },
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
                    colspan: 2,
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
        <div>
            <Sample>
                <Sample.Section>
                    <Grid {...grid} data={data} />
                </Sample.Section>

                <Sample.Section>
                    <ul className="grid gap-4 grid-cols-4 [&_span]:text-lg">
                        <li className="flex flex-col gap-1">
                            <span>getData</span>
                            <p>전체 데이터</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>getOrigin</span>
                            <p>원본 데이터</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>getSelectedRow</span>
                            <p>선택된 Row</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>getSelectedCell</span>
                            <p>선택된 Cell</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>getChecked</span>
                            <p>체크된 Rows</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>addRow</span>
                            <p>Row 추가</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>deleteRow</span>
                            <p>Row 삭제</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>updateRow</span>
                            <p>Row 수정</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>setEdit</span>
                            <p>Edit 변경</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>setShow</span>
                            <p>Show 변경</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>setOption</span>
                            <p>스키마 옵션 변경</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>setPage</span>
                            <p>Page 변경</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>setSize</span>
                            <p>Size 변경</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>setData</span>
                            <p>Data 설정</p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <span>resetData</span>
                            <p>원본 데이터로 변경</p>
                        </li>
                    </ul>
                </Sample.Section>

                <Sample.Code>
                    {`
const { getData } = useGrid();

getData();`}
                </Sample.Code>
            </Sample>
        </div>
    );
};
