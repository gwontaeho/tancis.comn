import React from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import { FormControl, FormControlProps } from "@/com/components";
import { InputDateProps } from "@/com/components/_";

const RANGE_BUTTON_OPTIONS: RangeButtonOptionType[][] = [
    [
        { label: "-3M", unit: "M", value: -3 },
        { label: "-1M", unit: "M", value: -1 },
        { label: "-1W", unit: "w", value: -1 },
        { label: "0", unit: "d", value: 1 },
        { label: "+1W", unit: "w", value: 1 },
        { label: "+1M", unit: "M", value: 1 },
        { label: "+3M", unit: "M", value: 3 },
    ],
    [
        { label: "+1D", unit: "d", value: 1 },
        { label: "+1W", unit: "w", value: 1 },
        { label: "+1M", unit: "M", value: 1 },
        { label: "+2M", unit: "M", value: 2 },
        { label: "+3M", unit: "M", value: 3 },
        { label: "+6M", unit: "M", value: 6 },
        { label: "+12M", unit: "M", value: 12 },
    ],
    [
        { label: "-1M", unit: "M", value: -1 },
        { label: "-1W", unit: "w", value: -1 },
        { label: "Today", unit: "d", value: 1 },
        { label: "+1W", unit: "w", value: 1 },
    ],
];

type DateUnitType = "M" | "w" | "d" | "h";

type RangeButtonOptionType = {
    unit: DateUnitType;
    label: string;
    value: number;
};

export type InputRangeProps = {
    schema?: any;
    rangebutton?: number;
    setValue?: (name: string, value: any) => void;
    onChange?: (e: any) => void;
};

export const InputRange = (props: InputRangeProps & { hasLeftButton?: boolean; hasRightButton?: boolean }) => {
    const { schema, rangebutton, setValue, hasLeftButton, hasRightButton } = props;

    const [start, end] = Object.entries<FormControlProps>(schema);

    const handleClickButton = (unit: DateUnitType, value: number) => {
        console.log(setValue);
        if (!setValue) return;
        const isAdd = value > 0;
        const today = new Date();
        if (isAdd) {
            setValue(start[0], today);
            setValue(end[0], dayjs(today).add(value, unit).toDate());
        } else {
            setValue(start[0], dayjs(today).add(value, unit).toDate());
            setValue(end[0], today);
        }
    };

    return (
        <div className={"w-full flex"}>
            <FormControl
                {...start[1]}
                mainClassName={classNames("[&_.input]:rounded-r-none [&_button]:rounded-r-none", {
                    "[&_button]:rounded-l-none": hasLeftButton,
                })}
            />
            <div className={"flex items-center justify-center min-w-[1.25rem] h-7 bg-header border-y"}>-</div>
            <FormControl
                {...end[1]}
                mainClassName={classNames("[&_.input]:rounded-l-none [&_button]:rounded-l-none", {
                    "[&_.input]:rounded-r-none": hasRightButton || typeof rangebutton === "number",
                    "[&_button]:rounded-r-none": hasRightButton || typeof rangebutton === "number",
                })}
            />
            {typeof rangebutton === "number" && (
                <div className="flex">
                    {(RANGE_BUTTON_OPTIONS[rangebutton] as []).map((props: RangeButtonOptionType) => {
                        const { unit, label, value } = props;
                        return (
                            <button
                                key={uuid()}
                                onClick={() => handleClickButton(unit, value)}
                                type="button"
                                className={classNames("button bg-header text-sm border-l-0 rounded-none", {
                                    "last:rounded-r": !hasRightButton,
                                })}
                            >
                                {label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
