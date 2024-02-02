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
                    <div className="grid gap-4 grid-cols-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">getData</span>
                            <span>전체 데이터</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">getOrigin</span>
                            <span>기존 데이터</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">getSelectedRow</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">getSelectedCell</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">getChecked</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">addRow</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">deleteRow</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">updateRow</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">setEdit</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">setShow</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">setOption</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">setPage</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">setSize</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">setData</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-lg">resetData</span>
                            <span>하하앟재ㅏㅎ</span>
                        </div>
                    </div>
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
