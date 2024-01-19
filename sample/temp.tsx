import { useStore } from "@/comn/hooks";
import { useGrid } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { Page, Group, FormControl, Grid } from "@/comn/components";

const schema1 = {
    options: { radio: true, checkbox: true, pagination: "in", add: true, delete: true, edit: true },
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
            cells: [{ binding: "q", edit: false }],
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

const data = utils.getMockData({ totalElements: 26 });

export const Temp = () => {
    const {
        schema,
        getData,
        getOriginData,
        setOption,
        getSelectedRow,
        getCheckedRows,
        addRow,
        deleteRow,
        updateRow,
        page,
        size,
        setEdit,
        setShow,
    } = useGrid({
        defaultSchema: schema1,
    });
    const data2 = utils.getMockDataWithPaging({ data, page, size });

    const { pgeStore, setStore } = useStore({ pgeUid: "test" });

    const _test = {
        head: {
            q: () => {
                return <FormControl />;
            },
        },
        cell: {
            q: (props: any) => {
                return <div>test hh</div>;
            },
        },
        edit: {},
    };

    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Grid {...schema} data={data} render={_test} />
                    </Group.Section>
                </Group.Body>
            </Group>
            <button onClick={() => console.log(setOption("checkbox", false))}>set option</button>
            <button onClick={() => console.log(setOption("radio", false))}>set option radio</button>
            <button onClick={() => console.log(getData())}>get Data</button>
            <button onClick={() => console.log(getOriginData())}>get getOriginData</button>
            <button onClick={() => console.log(getSelectedRow())}>get radio</button>
            <button onClick={() => console.log(getCheckedRows())}>get checkbox</button>
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
