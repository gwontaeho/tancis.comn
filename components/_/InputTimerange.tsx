import React from "react";
import dayjs from "dayjs";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import { InputTimeProps } from "@/comn/components/_";
import { FormControl } from "@/comn/components";

const RANGE_BUTTON_OPTIONS: RangeButtonOptionType[][] = [
    [
        { label: "-3H", unit: "h", value: -3 },
        { label: "-2H", unit: "h", value: -2 },
        { label: "-1H", unit: "h", value: -1 },
        { label: "+1H", unit: "h", value: 1 },
        { label: "+2H", unit: "h", value: 2 },
        { label: "+3H", unit: "h", value: 3 },
    ],
];

type TimeUnitType = "h";
type RangeButtonOptionType = { unit: TimeUnitType; label: string; value: number };

export type InputTimerangeProps = {
    edit?: boolean;
    start?: InputTimeProps;
    end?: InputTimeProps;
    rangeButton?: 0 | 1 | 2;
};

export const InputTimerange = (props: InputTimerangeProps) => {
    const { edit = true, start, end, rangeButton } = props;

    const startRef = React.useRef<any>({});
    const endRef = React.useRef<any>({});

    const _handleClickButton = (unit: TimeUnitType, value: number) => {
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
            <div className="flex-1 [&_input]:rounded-r-none">
                <FormControl //
                    {...start}
                    type="time"
                    edit={edit}
                    startRef={startRef}
                />
            </div>
            <div className={classNames("flex items-center justify-center min-w-[1.25rem]", edit && "border-y h-7")}>
                ~
            </div>
            <div
                className={classNames("flex-1 [&_input]:rounded-l-none", {
                    "[&_input]:rounded-r-none": rangeButton !== undefined,
                })}
            >
                <FormControl //
                    {...end}
                    type="time"
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
