import React from "react";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import classNames from "classnames";

import { InputDateProps } from "@/comn/components/_";
import { FormControl } from "@/comn/components";

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
type RangeButtonOptionType = { unit: DateUnitType; label: string; value: number };

export type InputDaterangeProps = {
    edit?: boolean;
    start?: InputDateProps;
    end?: InputDateProps;
    rangeButton?: 0 | 1 | 2;
};

export const InputDaterange = (props: InputDaterangeProps) => {
    const { edit = true, start, end, rangeButton } = props;

    const startRef = React.useRef<any>({});
    const endRef = React.useRef<any>({});

    const _handleClickButton = (unit: DateUnitType, value: number) => {
        if (!startRef.current.handleChangeStart) return;
        if (!endRef.current.handleChangeEnd) return;

        const today = new Date();

        if (value > 0) {
            startRef.current.handleChangeStart(today);
            endRef.current.handleChangeEnd(dayjs(today).add(value, unit).toDate());
        } else {
            startRef.current.handleChangeStart(dayjs(today).add(value, unit).toDate());
            endRef.current.handleChangeEnd(today);
        }
    };

    return (
        <div className="flex w-full">
            <div className="min-w-fit flex-1 [&_input]:rounded-r-none">
                <FormControl //
                    {...start}
                    type="date"
                    edit={edit}
                    startRef={startRef}
                />
            </div>
            <div className={classNames("flex items-center justify-center min-w-[1.25rem]", edit && "border-y h-7")}>
                ~
            </div>
            <div
                className={classNames("min-w-fit flex-1 [&_input]:rounded-l-none", {
                    "[&_input]:rounded-r-none": rangeButton !== undefined,
                })}
            >
                <FormControl //
                    {...end}
                    type="date"
                    edit={edit}
                    endRef={endRef}
                />
            </div>
            {edit && rangeButton !== undefined && (
                <div className="flex divide-x bg-header text-sm border-y border-r rounded-r h-7">
                    {RANGE_BUTTON_OPTIONS[rangeButton].map((props: RangeButtonOptionType) => {
                        const { unit, label, value } = props;
                        return (
                            <button
                                key={uuid()}
                                type="button"
                                className="px-2"
                                onClick={() => _handleClickButton(unit, value)}
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
