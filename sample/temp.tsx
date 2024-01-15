import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { Page, Button, Group, Layout } from "../components";
import classNames from "classnames";
import { utils } from "../utils";

const SIZES: any = {
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
};

const schema1 = {
    id: "grid2",
    options: { checkbox: true, pagination: "out", add: true, remove: true },
    head: [
        { cells: [{ id: "a", header: "asd", colspan: 2 }, { id: "aa" }, { id: "ab" }] },
        { cells: [{ id: "b", header: "asdas" }] },
        { cells: [{ id: "c" }] },
    ],
    body: [
        {
            cells: [{ binding: "id" }],
        },
        {
            cells: [{ binding: "a", colspan: 2 }, { binding: "c" }, { binding: "d" }],
        },
        {
            cells: [{ binding: "b" }],
        },
    ],
};

const data = utils.getMockData({ totCnt: 96 });

const Grid = (props: any) => {
    const { head, body } = props;

    const [_head, _setHead] = useState(() =>
        head.map((_: any) => ({ ..._, key: uuid(), cells: _.cells.map((__: any) => ({ ...__, key: uuid() })) })),
    );
    const [_body, _setBody] = useState(() =>
        body.map((_: any) => ({ ..._, key: uuid(), cells: _.cells.map((__: any) => ({ ...__, key: uuid() })) })),
    );

    const [_content, _setContent] = useState(() => data.content.map((_) => ({ ..._, key: uuid() })));

    const [_selected, _setSelected] = useState();

    const test = () => {};

    console.log(_selected);

    return (
        <div className="[&_thead]:bg-uf-card-header [&_.cell]:justify-center [&_.cell]:min-h-[2rem] [&_.cell]:flex [&_.cell]:items-center [&_.cell]:px-2 [&_td]:border [&_th]:border">
            <table className="w-full">
                <thead>
                    <tr>
                        {_head.map(({ key, cells }: any) => {
                            return (
                                <th key={key} className="p-0">
                                    <div className="grid gap-[1px] bg-uf-border">
                                        {cells.map(({ key, id, header, colspan = 1 }: any) => {
                                            return (
                                                <div
                                                    key={key}
                                                    className={classNames("cell bg-uf-card-header", SIZES[colspan])}
                                                >
                                                    {header || id}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {_content.map((row: any) => {
                        return (
                            <tr key={row.key}>
                                {_body.map(({ key, cells }: any) => {
                                    return (
                                        <td key={key} className="p-0">
                                            <div className="grid gap-[1px] bg-uf-border">
                                                {cells.map(({ key, id, header, binding, colspan = 1 }: any) => {
                                                    return (
                                                        <div
                                                            key={key}
                                                            className={classNames(
                                                                "cell bg-uf-card-background",
                                                                SIZES[colspan],
                                                                _selected === row.key + key && "bg-uf-gray",
                                                            )}
                                                            onClick={() => _setSelected(row.key + key)}
                                                        >
                                                            {row[binding]}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const useGrid = (props: any) => {
    const [_schema, _setSchema] = useState(props.defaultSchema);

    return { schema: _schema };
};

export const Temp = () => {
    const { schema } = useGrid({ defaultSchema: schema1 });

    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Grid {...schema} />
                    </Group.Section>
                </Group.Body>
            </Group>
        </Page>
    );
};
