import { TGridSchema, useStore } from "@/comn/hooks";
import { useGrid, useResource } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { utils as xlsxUtils, writeFile } from "xlsx";
import excel from "exceljs";

import { Page, Group, FormControl, Grid, Layout } from "@/comn/components";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const schema1: TGridSchema = {
    options: {
        index: true,
        radio: true,
        checkbox: true,
        add: true,
        delete: true,
        // edit: true,
        importExcel: true,
        exportExcel: true,
        pagination: "in",

        // group: ["q", "w"],
    },
    head: [
        { id: "test", cells: [{ binding: "q", rowspan: 2, width: 200 }] },
        { cells: [{ binding: "w", rowspan: 2, width: 200 }] },
    ],
    body: [{ cells: [{ binding: "q" }] }, { cells: [{ binding: "w" }] }],
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

export const Temp = () => {
    // const { resource } = useResource({
    //     defaultSchema: [
    //         { area: "comnCd", comnCd: "COM_0015" },
    //         { area: "currCd" },
    //         { area: "cityCd" },
    //         { area: "portAirptCd" },
    //         { area: "test" },
    //     ],
    // });

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
        updateRow,
        page,
        size,
        setEdit,
        setShow,
        setPage,
        setSize,
        resetData,
        setData,
    } = useGrid({
        defaultSchema: schema1,
    });

    const data = useMemo(() => utils.getMockData({ totalElements: 7 }), []);

    const data2 = utils.getMockDataWithPaging({ data, page, size });

    const _test = {
        // head: {
        //     a: (data: any) => {
        //         /**
        //          * # data
        //          * id
        //          * header
        //          * binding
        //          */
        //         return (
        //             <Layout>
        //                 <FormControl />
        //             </Layout>
        //         );
        //     },
        // },
        cell: {
            // text: (data: any) => {
            //     /**
            //      * # data
            //      * value
            //      * rowValues
            //      * binding
            //      */
            //     return <Layout>*custom* {data.value}</Layout>;
            // },
        },
        edit: {
            // text: (data: any) => {
            //     /**
            //      * # data
            //      * value
            //      * rowValues
            //      * binding
            //      */
            //     return (
            //         <Layout direction="row" gap={1}>
            //             <FormControl />
            //             <FormControl />
            //         </Layout>
            //     );
            // },
        },
    };

    const _test2 = {
        onCellClick: {
            text: (data: any) => {
                // console.log(data);
            },
        },
        onRowClick: (data: any) => {
            // console.log(data);
        },
    };

    console.log("Page Rendered");

    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Grid
                            {...grid}
                            data={data}
                            render={_test}
                            onCellClick={_test2.onCellClick}
                            onRowClick={_test2.onRowClick}
                        />
                    </Group.Section>
                </Group.Body>
            </Group>

            {/* exportExcel(data, {},[a+b,name+id]) */}

            <button
                onClick={() => {
                    const workbook = new excel.Workbook();
                    const sheet = workbook.addWorksheet("My Sheet");
                    sheet.columns = [
                        { header: "Id", key: "id", width: 10 },
                        { header: "Name", key: "name", width: 32 },
                        { header: "D.O.B.", key: "dob", width: 10, outlineLevel: 1 },
                    ];

                    for (let i = 0; i < 77; i++) {
                        sheet.addRow({ id: 1, name: `${3 + 5} - 4 `, dob: new Date(1970, 1, 1) });
                        const currentRowIdx = sheet.rowCount;
                        const endColumnIdx = sheet.columnCount;

                        sheet.mergeCells(currentRowIdx, 0, currentRowIdx + 1, 0);
                        sheet.mergeCells(currentRowIdx, 2, currentRowIdx, 3);
                    }

                    workbook.xlsx.writeBuffer().then((b) => {
                        let a = new Blob([b]);
                        let url = window.URL.createObjectURL(a);

                        let elem = document.createElement("a");
                        elem.href = url;
                        elem.download = "테스트.xlsx";
                        elem.click();
                        elem.remove();
                    });
                }}
            >
                asdasd
            </button>

            <div className="flex flex-col gap-8">
                <div className="flex  flex-wrap gap-2 [&_button]:border [&_button]:p-2">
                    <button onClick={() => setData(data)}>set data</button>
                    <button onClick={() => resetData()}>reset</button>
                    <button onClick={() => addRow({ text: "added" })}>add row</button>
                    <button onClick={() => setSize(30)}>setSize 30</button>
                    <button onClick={() => setPage(2)}>setPage 2</button>
                    <button onClick={() => setOption("height", 500)}>set height</button>

                    <button onClick={() => deleteRow(getSelectedRow())}>delete one row</button>
                    <button onClick={() => deleteRow(getChecked())}>delete array rows</button>
                    <button onClick={() => deleteRow("radio")}>delete radio</button>
                    <button onClick={() => deleteRow("checkbox")}>delete checkbox</button>

                    <button
                        onClick={() => {
                            const cel = getSelectedCell();
                            updateRow({ ...cel?.rowValues, q: "123123" });
                        }}
                    >
                        셀 데이터 바꾸기
                    </button>
                    <button onClick={() => console.log(getChecked())}>getChecked</button>
                </div>
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
                    <button onClick={() => setShow("column", "test", true)}>show text</button>
                    <button onClick={() => setShow("column", "test", false)}>hide text</button>
                </div>
                <div className="flex  flex-wrap gap-2 [&_button]:border [&_button]:p-2">
                    <button onClick={() => console.log(getData())}>getData</button>
                    <button onClick={() => console.log(getOrigin())}>getOrigin</button>
                    <button onClick={() => console.log(getSelectedRow())}>getSelectedRow</button>
                    <button onClick={() => console.log(getSelectedCell())}>getSelectedCel</button>
                    <button onClick={() => console.log(getChecked())}>getChecked</button>
                </div>
            </div>
        </Page>
    );
};
