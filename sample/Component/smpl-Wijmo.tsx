import axios from "axios";

import { useWijmo, useToast, useFetch } from "@/comn/hooks";
import { Group, Page } from "@/comn/components";
import { Wijmo } from "@/comn/components";
import { useStore } from "@/comn/hooks";

import lodash from "lodash";
import { v4 as uuid } from "uuid";
import { utils } from "@/comn/utils";
import { useState, useEffect, useRef } from "react";
import { api } from "@/comn";

const instance = axios.create({
    baseURL: "http://183.107.31.131:8000/template",
});

export const APIS = {
    getComponentGroups: (page: any, size: any) => instance.get("/com/componentGroups", { params: { page, size } }),
    getComponentGroup: (id: any) => instance.get(`/com/componentGroups/${id}`),
    getComponents: (grpId: any) => instance.get(`/com/componentGroups/${grpId}/components`),
    createComponentGroup: (data: any) => instance.post("/com/componentGroups", data),
};

const schema: any = {
    id: "grid",
    options: { checkbox: true, pagination: "in", add: true, remove: true },
    head: [
        {
            cells: [
                { header: "id", binding: "id", colspan: 3 },
                { header: "a", binding: "a" },
                { header: "b", binding: "b" },
                { header: "c", binding: "c" },
            ],
        },
        { cells: [{ header: "d", binding: "d" }] },
        { cells: [{ header: "e", binding: "e" }] },
    ],
    body: [
        {
            colspan: 3,
            cells: [
                {
                    colspan: 3,
                    binding: "id",
                },
                {
                    binding: "a",
                    type: "number",
                    thousandSeparator: true,
                },
                {
                    binding: "b",
                    type: "code",
                },
                {
                    binding: "c",
                },
            ],
        },
        {
            cells: [{ binding: "d" }],
        },
        {
            cells: [{ binding: "e", type: "date" }],
        },
    ],
};

const schema2: any = {
    id: "grid2",
    options: { checkbox: true, pagination: "out", add: true, remove: true },
    head: [
        { cells: [{ header: "a", binding: "id", colspan: 3 }, { header: "a" }, { header: "b" }, { header: "c" }] },
        { cells: [{ header: "d", binding: "a" }] },
        { cells: [{ header: "e", binding: "b" }] },
    ],
    body: [
        {
            width: 400,
            colspan: 3,
            cells: [{ binding: "frstRegstId", colspan: 3 }],
        },
        {
            cells: [{ binding: "a", width: 400 }],
        },
        {
            cells: [{ binding: "b" }],
        },
    ],
};

const data = utils.getMockData({ totalElements: 123 });

export const SampleWijmo = () => {
    const st = useStore();

    const grid1 = useWijmo({
        defaultSchema: schema,
    });
    const grid2 = useWijmo({
        defaultSchema: schema2,
    });

    const [test, setTest] = useState(0);
    const test2 = useRef(0);

    const grid2Data = utils.getMockDataWithPaging({ data, page: grid2.page, size: grid2.size });

    const test99 = useFetch({
        api: () =>
            api.get(`http://192.168.194.202:8080/api/v1/wrhs/rpck/rpck-itm-app?page=${grid2.page}&size=${grid2.size}`),
        enabled: true,
        key: [grid2.page, grid2.size],
    });

    const handleClick = {
        a: (data: any) => {
            console.log(st.getStore());
        },
    };

    return (
        <Page>
            <div>{test}</div>
            <div>{test2.current}</div>

            <Group>
                <Wijmo {...grid1.grid} data={data} onCellClick={handleClick} />
                <div className="space-x-2">
                    <button onClick={() => console.log(grid1.getData())}>데이터 가져오기</button>
                    <button onClick={() => console.log(grid1.getChecked())}>check 가져오기</button>
                    <button onClick={() => grid1.resetData()}>reset data</button>
                    <button onClick={() => console.log(grid1.getOrigin())}>get origin</button>
                    <button onClick={() => console.log(grid1.getDeleted())}>get deleted</button>
                    <button onClick={() => console.log(grid1.getDataWithDeleted())}>get with deleted</button>
                    <button onClick={() => grid1.addRow({ id: "qwd" })}>test</button>
                </div>
            </Group>

            <Group>
                {/* <Wijmo {...grid2.grid} data={test99.data?.rpckItmAppList} /> */}
                {/* <div className="space-x-2">
                    <button onClick={() => console.log(getData())}>데이터 가져오기</button>
                    <button onClick={() => console.log(getChecked())}>check 가져오기</button>
                    <button onClick={() => console.log(getCheckedIndex())}>index 가져오기</button>
                    <button onClick={() => addRow()}>add</button>
                    <button onClick={() => removeRow()}>remove at</button>
                    <button onClick={() => removeChecked()}>checked 삭제</button>
                    <button onClick={() => fetch()}>refetch</button>
                </div> */}
            </Group>
            <button onClick={() => st.setStore("test", (prev: any) => 100)}>asd</button>
            <button onClick={() => (test2.current = test2.current + 100)}>asxxxd</button>
        </Page>
    );
};
