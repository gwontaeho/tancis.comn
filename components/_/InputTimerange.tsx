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
    setValue?: any;
};

export const InputTimerange = (props: InputTimerangeProps) => {
    const { edit = true } = props;

    const dateFormat = "HH:mm";

    const [_startValue, _setStartValue] = React.useState<any>();
    const [_endValue, _setEndValue] = React.useState<any>();

    React.useEffect(() => {
        if (!props.start?.onChange) return;
        if (String(props.start.value) === String(_startValue)) return;
        props.start.onChange(_startValue);
    }, [_startValue]);

    React.useEffect(() => {
        if (!props.end?.onChange) return;
        if (String(props.end.value) === String(_endValue)) return;
        props.end.onChange(_endValue);
    }, [_endValue]);

    const _handleClickButton = (unit: TimeUnitType, value: number) => {
        const today = new Date();
        if (value > 0) {
            _setStartValue(today);
            _setEndValue(dayjs(today).add(value, unit).toDate());
            if (props.setValue) {
                if (props.start) props.setValue(props.start.name, today);
                if (props.end) props.setValue(props.end.name, dayjs(today).add(value, unit).toDate());
            }
        } else {
            _setStartValue(dayjs(today).add(value, unit).toDate());
            _setEndValue(today);
            if (props.setValue) {
                if (props.start) props.setValue(props.start.name, dayjs(today).add(value, unit).toDate());
                if (props.end) props.setValue(props.end.name, today);
            }
        }
    };

    const _onChangeStart = (v: any) => {
        _setStartValue(v);
    };

    const _onChangeEnd = (v: any) => {
        _setEndValue(v);
    };

    return (
        <div className="w-full">
            {!edit && <div>{dayjs(_startValue).format(dateFormat) + " ~ " + dayjs(_endValue).format(dateFormat)}</div>}
            <div hidden={!edit}>
                <div className="w-full flex">
                    <div className="w-full [&_input]:rounded-r-none">
                        <FormControl type="time" {...props.start} value={_startValue} onChange={_onChangeStart} />
                    </div>
                    <div className="flex items-center justify-center min-w-[1.25rem] h-7 bg-header border-y">-</div>
                    <div
                        className={classNames("w-full [&_input]:rounded-l-none", {
                            "[&_input]:rounded-r-none": props.rangeButton !== undefined,
                        })}
                    >
                        <FormControl type="time" {...props.end} value={_endValue} onChange={_onChangeEnd} />
                    </div>
                    {props.rangeButton !== undefined && (
                        <div className="flex divide-x bg-header text-sm border-y border-r rounded-r h-7">
                            {RANGE_BUTTON_OPTIONS[props.rangeButton].map((props: RangeButtonOptionType) => {
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
            </div>
        </div>
    );
};
