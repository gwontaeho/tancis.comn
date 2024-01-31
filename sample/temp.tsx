import { TGridSchema, useStore } from "@/comn/hooks";
import { useGrid, useResource } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { utils as xlsxUtils, writeFile } from "xlsx";
import excel from "exceljs";

import { Page, Group, FormControl, Grid, Layout } from "@/comn/components";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const schema1 = {
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

        // group: ["q", "w"],
    },
    head: [
        {
            colspan: 3,
            width: "*",
            cells: [
                {
                    colspan: 2,
                    header: "a",
                },
                {
                    header: "b",
                },
                {
                    header: "b",
                },
                { binding: "c", rowspan: 2 },
                { binding: "d", required: true, width: 150 },
                { binding: "e", required: true, width: 200 },
                { binding: "f", required: true },
            ],
        },
        {
            width: "*",
            cells: [
                {
                    header: "a",
                },
                {
                    header: "b",
                    rowspan: 2,
                    width: 500,
                },
            ],
        },
        {
            colspan: 3,
            width: "*",
            cells: [
                {
                    header: "a",
                    colspan: 2,
                },
                {
                    header: "b",
                },
                { binding: "c", rowspan: 2 },
                { binding: "d", required: true },
                { binding: "e", required: true, width: "*" },
                { binding: "f", required: true, width: 300, colspan: 2 },
            ],
        },
    ],
    body: [
        {
            cells: [
                //
                { binding: "q" },
                { binding: "q" },
                { binding: "q" },
                { binding: "q" },

                { binding: "q", colspan: 4, type: "textarea", rows: 4 },
            ],
        },
        {
            cells: [
                { binding: "w" },
                { binding: "w" },
                { binding: "w" },
                { binding: "w" },

                { binding: "w", type: "textarea" },
                { binding: "w", type: "textarea" },
                { binding: "w", type: "textarea" },
                { binding: "w", type: "textarea" },
                { binding: "w", type: "textarea" },

                { binding: "w", colspan: 8, type: "textarea", rows: 5 },
            ],
        },
        {
            colspan: 2,
            cells: [{ binding: "ww" }, { binding: "ww", type: "textarea" }, { binding: "ww" }],
        },

        // {
        //     cells: [{ binding: "date", type: "date", colspan: 2 }],
        // },
        // {
        //     cells: [
        //         { binding: "select", type: "select", colspan: 2, area: "comnCd", comnCd: "COM_0015", required: true },
        //     ],
        // },
        // {
        //     cells: [{ binding: "time", type: "time" }],
        // },
        // {
        //     cells: [{ binding: "datetime", type: "datetime" }],
        // },
        // {
        //     cells: [
        //         {
        //             binding: "select",
        //             type: "select",
        //             options: [
        //                 { label: "a", value: "a" },
        //                 { label: "b", value: "b" },
        //             ],
        //         },
        //     ],
        // },
        // {
        //     cells: [
        //         {
        //             binding: "radio",
        //             type: "radio",
        //             options: [
        //                 { label: "a", value: "a" },
        //                 { label: "b", value: "b" },
        //             ],
        //         },
        //     ],
        // },
        // {
        //     cells: [
        //         {
        //             binding: "checkbox",
        //             type: "checkbox",
        //             options: [
        //                 { label: "a", value: "a" },
        //                 { label: "b", value: "b" },
        //             ],
        //         },
        //     ],
        // },
        // {
        //     cells: [
        //         {
        //             binding: "code",
        //             type: "code",
        //             area: "comnCd",
        //             comnCd: "COM_0015",
        //         },
        //     ],
        // },
    ],
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
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0015" },
            { area: "currCd" },
            { area: "cityCd" },
            { area: "portAirptCd" },
            { area: "test" },
        ],
    });

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

    const data = useMemo(() => utils.getMockData({ totalElements: 999 }), []);

    const data2 = utils.getMockDataWithPaging({ data, page, size });

    const { pgeStore, setStore } = useStore({ pgeUid: "test" });

    const t: Array<Array<any>> = [];

    const getHederMatrix = (head: any) => {
        const t: Array<Array<any>> = [];
        let rowIndex = -1;
        let colIndex = 0;
        let colspan = head.colspan;
        let width = head.width;
        let _index = 0;
        if (colspan === undefined) colspan = 1;
        if (width === undefined) width = 100;

        head.cells.forEach((cell: any, y: number) => {
            if (_index === 0) {
                rowIndex++;
                if (!t[rowIndex]) t[rowIndex] = Array(colspan);
                colIndex = 0;
            }

            if (t[rowIndex][_index] === null) {
                for (let i = _index; i < colspan; i++) {
                    if (t[rowIndex][i] === null) {
                        _index++;

                        if (_index > colspan - 1) {
                            _index = 0;

                            return;
                        }
                    } else break;
                }
            }
            if (_index > colspan - 1) {
                _index = 0;
                return;
            }

            t[rowIndex][_index] = cell;

            if (cell.colspan !== undefined) {
                for (let i = _index + 1; i < _index + cell.colspan; i++) {
                    t[rowIndex][i] = null;
                }
            }
            if (cell.rowspan !== undefined) {
                for (let i = rowIndex + 1; i < rowIndex + cell.rowspan; i++) {
                    if (!t[i]) t[i] = Array(colspan);
                    t[i][_index] = null;
                }
            }

            _index += cell.colspan === undefined ? 1 : cell.colspan;
            if (_index > colspan - 1) {
                _index = 0;
            }
        });
        return t;
    };

    const fun = (heads: any) => {
        let t: Array<any> = [];

        for (let i = 0; i < heads.length; i++) {
            let rowIndex = -1;
            let colspan = heads[i].colspan || 1;
            let width = heads[i].width || 100;
            let _current = 0;

            let head: Array<any> = [];
            console.log(heads[i]);

            for (let col = 0; col < heads[i].cells.length; col++) {
                const cell = heads[i].cells[col];
                let isAdd = true;

                if (_current === 0) {
                    rowIndex++;
                    if (!head[rowIndex]) head[rowIndex] = Array(colspan);
                }
                if (head[rowIndex][_current] === null) {
                    for (let i = _current; i < colspan; i++) {
                        if (head[rowIndex][i] === null) {
                            _current++;
                            if (_current > col - 1) {
                                isAdd = false;
                            }
                        } else break;
                    }
                }

                if (isAdd === false) {
                    _current = 0;
                    col--;
                    continue;
                }
                if (_current > colspan - 1) {
                    _current = 0;
                    continue;
                }

                head[rowIndex][_current] = cell;

                if (cell.colspan !== undefined) {
                    for (let i = _current + 1; i < _current + cell.colspan; i++) {
                        head[rowIndex][i] = null;
                    }
                }
                if (cell.rowspan !== undefined) {
                    for (let i = rowIndex + 1; i < rowIndex + cell.rowspan; i++) {
                        if (!head[i]) head[i] = Array(colspan);
                        head[i][_current] = null;
                    }
                }

                _current += cell.colspan === undefined ? 1 : cell.colspan;
                if (_current > colspan - 1) {
                    _current = 0;
                }
            }

            t.push(head);
        }

        return t;
    };

    const combineMatrix = (arr: Array<any>) => {
        let t = arr[0];

        for (let i = 1; i < arr.length; i++) {
            for (let j = 0; j < t.length; j++) {
                t[j] = [...t[j], ...arr[i][j]];
            }
        }

        return t;
    };

    const getGridWidths = (arr: Array<any>) => {
        let w = Array(arr[0].length);
        for (let i = 1; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (w[j] === undefined) w[j] = 100;
                if (arr[i][j]?.width !== undefined && arr[i][j]?.colspan === undefined) {
                    w[j] = arr[i][j].width;
                }
            }
        }

        return w;
    };

    //console.log(getHederMatrix(schema1.head[0]));
    //console.log(getHederMatrix(schema1.head[1]));
    // const heads = combineMatrix(fun(schema1.head));
    // console.log(getGridWidths(heads));
    // let str = "";
    // for (let i = 0; i < heads.length; i++) {
    //     for (let j = 0; j < heads[i].length; j++) {
    //         if (heads[i][j] === null) continue;
    //         str +=
    //             '<div style="grid-row: ' +
    //             (i + 1) +
    //             "/ span " +
    //             (heads[i][j].rowspan || 1) +
    //             ";grid-column: " +
    //             (j + 1) +
    //             "/ span  " +
    //             (heads[i][j].colspan || 1) +
    //             ';">' +
    //             (i + "-" + j) +
    //             "</div>";
    //     }
    // }

    // console.log(str);

    /*console.log(
        combineMatrix([
            getHederMatrix(schema1.head[0]),
            getHederMatrix(schema1.head[1]),
            getHederMatrix(schema1.head[2]),
        ]),
    );
    */

    const _test = {
        head: {
            // text: (data: any) => {
            //     /**
            //      * # data
            //      * id
            //      * header
            //      * binding
            //      */
            //     return (
            //         <Layout>
            //             <FormControl />
            //         </Layout>
            //     );
            // },
        },
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

    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Grid
                            {...grid}
                            // data={data}
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
            {/* <button
                onClick={() => {
                    const worksheet = xlsxUtils.json_to_sheet(getData());
                    const workbook = xlsxUtils.book_new();
                    xlsxUtils.book_append_sheet(workbook, worksheet, "test");
                    console.log(worksheet);

                    writeFile(workbook, "Presidents.xlsx", { compression: true });
                }}
            >
                asdasd
            </button> */}

            <Layout.Left direction="row" gap={8}>
                <button onClick={() => setData(data)}>set data</button>
                <button onClick={() => resetData()}>reset</button>
                <button onClick={() => setSize(30)}>setSize 30</button>
                <button onClick={() => setOption("edit", true)}>setOption edit true</button>
                <button onClick={() => setOption("edit", false)}>setOption edit false</button>
                <button onClick={() => deleteRow(getSelectedRow())}>delete one row</button>
                <button onClick={() => deleteRow(getChecked())}>delete array rows</button>
                <button onClick={() => deleteRow("radio")}>delete radio</button>
                <button onClick={() => deleteRow("checkbox")}>delete checkbox</button>
                <button onClick={() => setOption("index", true)}>setOption index true</button>
                <button onClick={() => setOption("index", false)}>setOption index false</button>
                <button onClick={() => setOption("checkbox", true)}>setOption checkbox true</button>
                <button onClick={() => setOption("checkbox", false)}>setOption checkbox false</button>
                <button onClick={() => setOption("radio", true)}>setOption radio true</button>
                <button onClick={() => setOption("radio", false)}>setOption radio false</button>
                <button onClick={() => console.log(getData())}>getData</button>
                <button onClick={() => console.log(getOrigin())}>getOrigin</button>
                <button onClick={() => console.log(getSelectedRow())}>getSelectedRow</button>
                <button onClick={() => console.log(getSelectedCell())}>getSelectedCel</button>
                <button
                    onClick={() => {
                        const cel = getSelectedCell();
                        updateRow({ ...cel?.rowValues, q: "123123" });
                        console.log(cel?.rowValues);
                    }}
                >
                    셀 데이터 바꾸기
                </button>
                <button onClick={() => console.log(getChecked())}>getChecked</button>
                <button onClick={() => addRow({ text: "added" })}>add row</button>
                <button onClick={() => {}}>updateRow selected</button>
                <button onClick={() => setEdit("column", "text", true)}>edit column true</button>
                <button onClick={() => setEdit("column", "text", false)}>edit column false</button>
                <button onClick={() => setEdit("row", getSelectedCell()?.rowValues, true)}>edit row true</button>
                <button onClick={() => setEdit("row", getSelectedCell()?.rowValues, false)}>edit row false</button>
                <button onClick={() => setShow("column", "text", true)}>show text</button>
                <button onClick={() => setShow("column", "text", false)}>hide text</button>
            </Layout.Left>
        </Page>
    );
};
