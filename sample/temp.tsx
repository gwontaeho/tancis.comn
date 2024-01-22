import { useStore } from "@/comn/hooks";
import { useGrid } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { Page, Group, FormControl, Grid } from "@/comn/components";
import { Link } from "react-router-dom";

const schema1 = {
    options: { radio: true, checkbox: true, pagination: "in", add: true, delete: true, edit: true },
    head: [
        { id: "text", width: "*", cells: [{ binding: "text" }] },
        { cells: [{ binding: "number" }] },
        { cells: [{ binding: "date" }] },
        // { cells: [{ binding: "time" }] },
        // { cells: [{ binding: "datetime" }] },
        // { cells: [{ binding: "select" }] },
        // { cells: [{ binding: "radio" }] },
        // { cells: [{ binding: "checkbox" }] },
        // { cells: [{ binding: "code" }] },
    ],
    body: [
        {
            cells: [{ binding: "text", required: true, align: "left" }],
        },
        {
            cells: [{ binding: "number", type: "number", thousandSeparator: true, max: 5 }],
        },
        {
            cells: [{ binding: "date", type: "date", colspan: 2 }],
        },
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

const data = utils.getMockData({ totalElements: 30000 });

export const Temp = () => {
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
    } = useGrid({
        defaultSchema: schema1,
    });

    const data2 = utils.getMockDataWithPaging({ data, page, size });

    const { pgeStore, setStore } = useStore({ pgeUid: "test" });

    const _test = {
        head: {},
        cell: {},
        edit: {},
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

            <Link to="/asd">asd</Link>
            <button onClick={() => setSize(30)}>setSize 30</button>

            <button onClick={() => setOption("edit", true)}>setOption edit true</button>
            <button onClick={() => setOption("edit", false)}>setOption edit false</button>

            <button onClick={() => deleteRow(getSelectedRow())}>delete one row</button>
            <button onClick={() => deleteRow(getChecked())}>delete array rows</button>
            <button onClick={() => deleteRow("radio")}>delete radio</button>
            <button onClick={() => deleteRow("checkbox")}>delete checkbox</button>

            <button onClick={() => setOption("checkbox", true)}>setOption checkbox true</button>
            <button onClick={() => setOption("checkbox", false)}>setOption checkbox false</button>
            <button onClick={() => setOption("radio", true)}>setOption radio true</button>
            <button onClick={() => setOption("radio", false)}>setOption radio false</button>

            <button onClick={() => console.log(getData())}>getData</button>
            <button onClick={() => console.log(getOrigin())}>getOrigin</button>
            <button onClick={() => console.log(getSelectedRow())}>getSelectedRow</button>
            <button onClick={() => console.log(getChecked())}>getChecked</button>

            <button onClick={() => addRow({ text: "added" })}>add row</button>

            <button onClick={() => updateRow(getSelectedRow(), { text: "updated" })}>updateRow selected</button>

            <button onClick={() => setEdit("column", "col", true)}>show text</button>
            <button onClick={() => setEdit("cell", "time", true)}>show text</button>

            <button onClick={() => setShow("column", "text", true)}>show text</button>
            <button onClick={() => setShow("column", "text", false)}>hide text</button>
        </Page>
    );
};
