import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

type InputBooleanProps = {
    inputLabel?: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
};

export const InputBoolean = (props: InputBooleanProps) => {
    const { t } = useTranslation();

    const [_checked, _setChecked] = React.useState<boolean>(props.value || false);

    useEffect(() => {
        if (!props.onChange) return;
        if (props.value === _checked) return;
        props.onChange(_checked);
    }, [_checked]);

    const _handleChange = () => {
        _setChecked((prev) => !prev);
    };

    return (
        <label className="flex items-center h-7 space-x-1 mr-3">
            <input type="checkbox" onChange={_handleChange} checked={_checked} />
            {props.inputLabel && <div>{t(props.inputLabel)}</div>}
        </label>
    );
};
