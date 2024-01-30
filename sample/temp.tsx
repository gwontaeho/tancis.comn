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
        edit: false,
        importExcel: true,
        exportExcel: true,
        pagination: "in",

        // group: ["q", "w"],
    },
    head: [
        {
            width: "*",
            cells: [
                { binding: "q", required: true, colspan: 2 },
                { binding: "q", required: true },
                { binding: "q", required: true },
            ],
        },
        {
            cells: [{ binding: "w", required: true }],
        },
        {
            cells: [{ binding: "ww", required: true }],
        },
    ],
    body: [
        {
            edit: true,
            cells: [{ binding: "q", rightButton: { icon: "search" } }],
        },
        {
            cells: [{ binding: "q", align: "left" }],
        },
        {
            colspan: 2,
            cells: [{ binding: "ww" }, { binding: "ww" }, { binding: "ww" }],
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
                        { header: "D.O.B.", key: "DOB", width: 10, outlineLevel: 1 },
                    ];

                    for (let i = 0; i < 9999; i++) {
                        sheet.addRow({ id: 1, name: `${3 + 5} - 4 `, dob: new Date(1970, 1, 1) });
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
