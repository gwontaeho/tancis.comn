import { useStore } from "@/comn/hooks";
import { useGrid } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { Page, Group, FormControl, Grid } from "@/comn/components";

const schema1 = {
    options: { radio: true, checkbox: true, pagination: "out", add: true, delete: true, edit: false },
    head: [
        {
            width: "*",
            cells: [{ binding: "q", colspan: 2, required: true }, { binding: "d", header: "adad" }, { binding: "ab" }],
        },
        { width: 100, cells: [{ binding: "b" }] },
        {
            id: "col",
            show: false,
            width: 300,
            cells: [{ binding: "c", colspan: 2 }, { binding: "c" }, { binding: "c" }],
        },
        // { width: 300, cells: [{ binding: "e" }] },
        { width: 300, cells: [{ binding: "f" }] },
        { cells: [{ binding: "g" }] },
    ],
    body: [
        {
            cells: [
                { binding: "index", required: true, colspan: 2 },
                { binding: "test", required: true },
                { binding: "q", required: true },
            ],
        },
        {
            cells: [{ binding: "q", type: "number", thousandSeparator: true }],
        },
        {
            cells: [{ binding: "a", colspan: 2, link: () => {} }, { binding: "c", type: "text" }, { binding: "d" }],
        },
        {
            cells: [{ binding: "f", type: "date" }],
        },
        {
            cells: [{ binding: "g" }],
        },
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

const data = utils.getMockData({ totalElements: 66 });

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
    console.log(page, size);
    const data2 = utils.getMockDataWithPaging({ data, page, size });

    const { pgeStore, setStore } = useStore({ pgeUid: "test" });

    const _test = {
        head: {},
        cell: {},
        edit: {},
    };

    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Grid {...grid} data={data2} render={_test} />
                    </Group.Section>
                </Group.Body>
            </Group>
            <button onClick={() => setSize(30)}>edit</button>

            <button onClick={() => setOption("edit", true)}>edit</button>
            <button onClick={() => setOption("edit", false)}>edit</button>

            <button onClick={() => console.log(setOption("checkbox", false))}>set option</button>
            <button onClick={() => console.log(setOption("radio", false))}>set option radio</button>
            <button onClick={() => console.log(getData())}>get Data</button>
            <button onClick={() => console.log(getOrigin())}>get getOriginData</button>
            <button onClick={() => console.log(getSelectedRow())}>get radio</button>
            <button onClick={() => console.log(getChecked())}>get checkbox</button>
            <button onClick={() => addRow()}>add row</button>
            <button onClick={() => deleteRow("radio")}>delete radio</button>
            <button onClick={() => deleteRow("checkbox")}>delete checkbox</button>
            <button onClick={() => updateRow(getSelectedRow(), { q: "asd" })}>ffffffffffff</button>
            <button onClick={() => setEdit("cell", "a", true)}>asdasd</button>
            <button onClick={() => setEdit("cell", "a", false)}>awqeqwew 1 12sdasd</button>
            <button onClick={() => setEdit("column", "col", true)}>'12e1231e2'</button>
            <button onClick={() => setEdit("column", "col", false)}>awqeqwew sadsd a1 12sdasd</button>
            <button onClick={() => setShow("column", "col", true)}>awqeqwew sadsd a1 12sdasd</button>
            <button onClick={() => setShow("column", "col", false)}>awqeqwew sadsd a1 12sdasd</button>
        </Page>
    );
};

const LTest = () => {
    return <div>a</div>;
};
