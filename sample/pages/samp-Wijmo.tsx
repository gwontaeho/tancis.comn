import axios from "axios";
import { useWijmo, useToast } from "@/com/hooks";
import { Group } from "@/com/components";
import { Wijmo } from "@/com/components/Wijmo.v2/Wijmo.v2";

import { v4 as uuid } from "uuid";

const instance = axios.create({
    baseURL: "http://183.107.31.131:8000/template",
});

export const APIS = {
    getComponentGroups: (page: any, size: any) => instance.get("/com/componentGroups", { params: { page, size } }),
    getComponentGroup: (id: any) => instance.get(`/com/componentGroups/${id}`),
    getComponents: (grpId: any) => instance.get(`/com/componentGroups/${grpId}/components`),
    createComponentGroup: (data: any) => instance.post("/com/componentGroups", data),
};

const schema = {
    __grid__: "grid",
    options: { checkbox: true, pagination: "inner", add: true, remove: true },
    head: [
        { cells: [{ header: "a", binding: "id", colspan: 3 }, { header: "a" }, { header: "b" }, { header: "c" }] },
        { cells: [{ header: "d", binding: "a" }] },
        { cells: [{ header: "e", binding: "b" }] },
    ],
    body: [
        {
            colspan: 3,
            cells: [{ binding: "id", colspan: 3 }],
        },
        {
            cells: [{ header: "d", binding: "a" }],
        },
        {
            cells: [{ header: "e", binding: "b" }],
        },
    ],
};

const getMockData = () => {
    return {
        page: 0,
        size: 10,
        totCnt: 43,
        content: Array(43)
            .fill(null)
            .map((_) => ({
                id: uuid(),
                a: Math.random() * 1000,
                b: Math.random() * 1000,
            })),
    };
};

const data = getMockData();

export const SampleWijmo = () => {
    const { grid, getData, getChecked, getCheckedIndex, addRow, removeRow, removeChecked, page, size } = useWijmo({
        defaultSchema: schema,
    });

    //   const { data, fetch } = useFetch({
    // api: () => APIS.getComponentGroups(),
    // api: () => APIS.getComponentGroups(page, size),
    // enabled: true,
    // key: [page, size],
    //   });

    //   console.log(getMockData());

    return (
        <Group>
            <Wijmo {...grid} data={data} />

            <div className="space-x-2">
                <button onClick={() => console.log(getData())}>데이터 가져오기</button>
                <button onClick={() => console.log(getChecked())}>check 가져오기</button>
                <button onClick={() => console.log(getCheckedIndex())}>index 가져오기</button>
                <button onClick={() => addRow()}>add</button>
                <button onClick={() => removeRow()}>remove at</button>
                <button onClick={() => removeChecked()}>checked 삭제</button>
                {/* <button onClick={() => fetch()}>refetch</button> */}
            </div>
        </Group>
    );
};
