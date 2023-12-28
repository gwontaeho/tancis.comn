import { v4 as uuid } from "uuid";
import classNames from "classnames";
import { useWijmo } from "../hooks";

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
                    type: "select",
                    area: "comnCd",
                    comnCd: "CAG_0018",
                    width: 200,

                    // render: (data: any) => {
                    //     console.log(data);
                    //     return <span>asd</span>;
                    // },
                    onClick: (data: any) => {
                        console.log(data);
                    },
                },
                {
                    binding: "b",
                    type: "date",
                    width: 200,
                },
                {
                    binding: "c",
                    type: "radio",
                    area: "cntyCd",

                    width: 300,
                },
            ],
        },
        {
            cells: [{ binding: "d" }],
        },
        {
            cells: [{ binding: "e" }],
        },
    ],
};

const head = [
    {
        colspan: 3,
        cells: [
            { header: "id", binding: "id", colspan: 3 },
            { header: "a", binding: "a" },
            { header: "b", binding: "b", width: 200 },
            { header: "c", binding: "c", width: 100 },
        ],
    },
    { cells: [{ header: "a", binding: "a" }] },
    { cells: [{ header: "a", binding: "a" }] },
];
const body = [];

const Td = (props: any) => {
    console.log(props);
    return (
        <div
            className={classNames("border-r border-b px-8 py-4", {
                "col-span-3": props.colspan,
                // "col-span-full": props.last,
            })}
            style={{ width: props.width }}
        ></div>
    );
};

export const __Test = () => {
    const a = useWijmo({ defaultSchema: schema });

    return (
        <div>
            <div className="flex">
                {head.map((_, i) => {
                    return (
                        <div key={uuid()} className={classNames("grid", { "grid-cols-3": _.colspan })}>
                            {_.cells.map((cellProps: any, i) => {
                                if (_.cells.length - 1 === i) cellProps.last = true;
                                return <Td key={uuid()} {...cellProps}></Td>;
                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
