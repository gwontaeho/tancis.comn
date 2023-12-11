import axios from "axios";
import { useWijmo, useToast } from "@/com/hooks";
import { Group, Page } from "@/com/components";
import { Wijmo } from "@/com/components/Wijmo.v2/Wijmo.v2";

import lodash from "lodash";
import { v4 as uuid } from "uuid";
import { utils } from "@/com/utils";
import { useEffect } from "react";

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
        { cells: [{ header: "aaa", binding: "id", colspan: 3 }, { header: "a" }, { header: "b" }, { header: "c" }] },
        { cells: [{ header: "d", binding: "a" }] },
        { cells: [{ header: "e", binding: "b" }] },
    ],
    body: [
        {
            colspan: 3,
            cells: [{ binding: "id", colspan: 3 }],
        },
        {
            cells: [{ binding: "a" }],
        },
        {
            cells: [{ binding: "d", type: "date" }],
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
            colspan: 3,
            cells: [{ binding: "id", colspan: 3 }],
        },
        {
            cells: [{ binding: "a" }],
        },
        {
            cells: [{ binding: "b" }],
        },
    ],
};

const data = utils.getMockData({ totCnt: 34 });

export const SampleWijmo = () => {
    const grid1 = useWijmo({
        defaultSchema: schema,
    });
    const grid2 = useWijmo({
        defaultSchema: schema2,
    });

    const grid2Data = utils.getMockDataWithPaging({ data, page: grid2.page, size: grid2.size });

    useEffect(() => {
        test();
    }, []);

    const test = async () => {
        try {
            const a = await axios.get("http://localhost:4000/api/test");
            console.log(a);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Page>
            <Group>
                <Wijmo {...grid1.grid} data={data} />
                <div className="space-x-2">
                    <button onClick={() => console.log(grid1.getData())}>데이터 가져오기</button>
                    <button onClick={() => console.log(grid1.getChecked())}>check 가져오기</button>

                    <button onClick={() => grid1.resetData()}>reset data</button>
                    <button onClick={() => console.log(grid1.getOrigin())}>get origin</button>
                </div>
            </Group>

            <Group>
                <Wijmo {...grid2.grid} data={grid2Data} />
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
        </Page>
    );
};
