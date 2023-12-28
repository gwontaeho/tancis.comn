import { v4 as uuid } from "uuid";
import classNames from "classnames";

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
