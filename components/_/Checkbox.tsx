import React from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { Control } from "react-hook-form";
import { utils } from "@/comn/utils";
import { useTheme } from "@/comn/hooks";
import { ControllerWrapper } from "@/comn/components/_";
import { TFormControlOptions } from "@/comn/components";

type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
    options?: TFormControlOptions;
    value?: string[] | number[] | null[];
    onChange?: (value?: any) => void;
    comnCd?: string;
    area?: string;
    control?: Control;
    all?: boolean;
};

const CheckboxMain = React.forwardRef<HTMLInputElement, CheckBoxProps>(
    (props: CheckBoxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const { t } = useTranslation();
        const {
            theme: { lang },
        } = useTheme();

        const [_options, _setOptions] = React.useState<TFormControlOptions>(props.options || []);
        const [_value, _setValue] = React.useState<any[]>(props.value || []);

        React.useEffect(() => {
            if (!props.area) return;
            (async () => {
                try {
                    const {
                        data: { content },
                    } = await utils.getCode({ comnCd: props.comnCd, area: props.area });
                    _setOptions(
                        content.map((code: any) => ({
                            label: utils.getCodeLabel(props.area, code),
                            value: utils.getCodeValue(props.area, code),
                        })),
                    );
                } catch (error) {}
            })();
        }, [props.comnCd, props.area, lang]);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const next = event.target.checked
                ? [..._value, event.target.value]
                : _value.filter((_) => _ !== event.target.value);

            _setValue(next);
            if (props.onChange) props.onChange(next);
        };

        const handleChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
            const next = event.target.checked ? _options.map(({ value }) => value) : [];

            _setValue(next);
            if (props.onChange) props.onChange(next);
        };

        const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);
        return (
            <div className="flex flex-wrap w-fit">
                {props.all && (
                    <div className="flex items-center h-7 space-x-1 mr-3">
                        <label className="flex items-center h-7 space-x-1">
                            <input type="checkbox" onChange={handleChangeAll} />
                            <div>{t(`L_AL`)}</div>
                        </label>
                    </div>
                )}
                {Array.isArray(_options) &&
                    _options.map(({ label, value }, i) => {
                        return (
                            <label key={OPTIONS_ID_BASE + "." + i} className="flex items-center h-7 space-x-1 mr-3">
                                <input
                                    ref={ref}
                                    type="checkbox"
                                    value={value}
                                    onChange={handleChange}
                                    checked={_value.some((_) => _ === value)}
                                />
                                {label && <div>{t(label)}</div>}
                            </label>
                        );
                    })}
            </div>
        );
    },
);

export const Checkbox = (props: CheckBoxProps) => {
    if (props.control && props.name)
        return (
            <ControllerWrapper {...props} control={props.control} name={props.name}>
                <CheckboxMain />
            </ControllerWrapper>
        );

    return <CheckboxMain {...props} />;
};
