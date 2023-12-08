import ReactDatePicker from "react-datepicker";
import { Icon } from "@/com/components";

type InputDateTimeProps = {
    value?: any;
    onChange?: any;
};

export const InputDatetime = (props: InputDateTimeProps) => {
    const { value, onChange } = props;
    const dateFormat = "MM/dd/yyyy HH:mm";

    return (
        <div className="relative w-full [&>div]:w-full">
            <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
            <ReactDatePicker
                selected={value}
                onChange={onChange}
                dateFormat={dateFormat}
                autoComplete="off"
                showTimeSelect
                timeIntervals={5}
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
            />
        </div>
    );
};
