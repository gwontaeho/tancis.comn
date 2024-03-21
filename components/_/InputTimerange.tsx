import React from "react";
import dayjs from "dayjs";
import { v4 as uuid } from "uuid";
import classNames from "classnames";
import { BOLD_TEXT, COLOR_TEXT, SIZE_TEXT } from "@/comn/features/foundation";
import { comnUtils } from "@/comn/utils";
import { InputTimeProps } from "@/comn/components/_";
import { FormControl } from "@/comn/components";

const RANGE_BUTTON_OPTIONS: RangeButtonOptionType[][] = [
    [
        { label: "-3M", unit: "M", value: -3 },
        { label: "-1M", unit: "M", value: -1 },
        { label: "-1W", unit: "w", value: -1 },
        { label: "0", unit: "d", value: 0 },
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
        { label: "∞", unit: "y", value: 1000 },
    ],
    [
        { label: "-1M", unit: "M", value: -1 },
        { label: "-1W", unit: "w", value: -1 },
        { label: "Today", unit: "d", value: 0 },
        { label: "+1W", unit: "w", value: 1 },
    ],
    [
        { label: "-3H", unit: "h", value: -3 },
        { label: "-2H", unit: "h", value: -2 },
        { label: "-1H", unit: "h", value: -1 },
        { label: "0", unit: "h", value: 0 },
        { label: "+1H", unit: "h", value: 1 },
        { label: "+2H", unit: "h", value: 2 },
        { label: "+3H", unit: "h", value: 3 },
    ],
    [
        { label: "-3M", unit: "M", value: -3 },
        { label: "-1M", unit: "M", value: -1 },
        { label: "-1W", unit: "w", value: -1 },
        { label: "1D", unit: "d", value: 1 },
    ],
    [
        { label: "-3H", unit: "h", value: -3 },
        { label: "-2H", unit: "h", value: -2 },
        { label: "-1H", unit: "h", value: -1 },
        { label: "0", unit: "h", value: 0 },
    ],
];

type TimeUnitType = "M" | "w" | "d" | "h" | "y";
type RangeButtonOptionType = { unit: TimeUnitType; label: string; value: number };

export type InputTimerangeProps = {
    edit?: boolean;
    start?: InputTimeProps;
    end?: InputTimeProps;
    rangeButton?: 0 | 1 | 2 | 3 | 4 | 5;

    color?: keyof typeof COLOR_TEXT;
    editColor?: keyof typeof COLOR_TEXT;
    bold?: keyof typeof BOLD_TEXT;
    editBold?: keyof typeof BOLD_TEXT;
    fontSize?: keyof typeof SIZE_TEXT;
};

export const InputTimerange = (props: InputTimerangeProps) => {
    const { edit = true, start, end, rangeButton, color, editColor, bold, editBold, fontSize } = props;

    const startRef = React.useRef<any>({});
    const endRef = React.useRef<any>({});
    const styleProp = { color, editColor, bold, editBold, fontSize };

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
                    {...{ ...styleProp, ...start }}
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
                    {...{ ...styleProp, ...end }}
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
