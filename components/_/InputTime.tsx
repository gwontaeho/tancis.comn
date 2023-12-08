import ReactDatePicker from "react-datepicker";
import { Icon } from "@/com/components";

type InputTimeProps = {
    value?: Date | null;
    onChange?: any;
};

export const InputTime = (props: InputTimeProps) => {
    const { value, onChange } = props;
    const dateFormat = "HH:mm";

    return (
        <div className="w-full [&>div]:w-full">
            <Icon icon="clock" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
            <ReactDatePicker
                selected={value}
                onChange={onChange}
                dateFormat={dateFormat}
                showTimeSelect
                showTimeSelectOnly
                autoComplete="off"
                timeIntervals={5}
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
            />
        </div>
    );
};
