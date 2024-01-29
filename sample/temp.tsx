import { useStore } from "@/comn/hooks";
import { useGrid, useResource } from "@/comn/hooks";
import { utils } from "@/comn/utils";

import { Page, Group, FormControl, Grid, Layout } from "@/comn/components";
import { Link } from "react-router-dom";

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
        // group: ["q", "12313"],
    },
    head: [
        {
            cells: [{ binding: "q", required: true }],
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
            cells: [{ binding: "q", rightButton: { icon: "search" } }],
        },
        {
            cells: [{ binding: "w" }],
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

const data = utils.getMockData({ totalElements: 9999 });

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
    } = useGrid({
        defaultSchema: schema1,
    });

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
                console.log(data);
            },
        },
        onRowClick: (data: any) => {
            console.log(data);
        },
    };

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

            <Layout.Left direction="row" gap={8}>
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
                <button onClick={() => console.log(getChecked())}>getChecked</button>
                <button onClick={() => addRow({ text: "added" })}>add row</button>
                <button onClick={() => updateRow({ text: "updated" })}>updateRow selected</button>
                <button onClick={() => setEdit("column", "text", true)}>edit column true</button>
                <button onClick={() => setEdit("column", "text", false)}>edit column false</button>
                <button onClick={() => setShow("column", "text", true)}>show text</button>
                <button onClick={() => setShow("column", "text", false)}>hide text</button>
            </Layout.Left>
        </Page>
    );
};
