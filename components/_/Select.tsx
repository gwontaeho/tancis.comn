import React from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { utils } from "@/comn/utils";
import { useTheme } from "@/comn/hooks";
import { Icon, FormControlOptionsType } from "@/comn/components";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    options?: FormControlOptionsType;
    all?: boolean;
    select?: boolean;
    comnCd?: string;
    area?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
        const { options, all, select, required, comnCd, area, ...rest } = props;
        const { t } = useTranslation();

        const {
            theme: { lang },
        } = useTheme();

        const [_options, _setOptions] = React.useState<FormControlOptionsType | undefined>(options);

        React.useEffect(() => {
            if (!area) return;

            (async () => {
                try {
                    const {
                        data: { content },
                    } = await utils.getCode({ comnCd, area });
                    _setOptions(
                        content.map((code: any) => ({
                            label: utils.getCodeLabel(area, code),
                            value: utils.getCodeValue(area, code),
                        }))
                    );
                } catch (error) {}
            })();
        }, [comnCd, area, lang]);

        const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);
        return (
            <div className="relative flex w-full items-center">
                <select {...rest} ref={ref} className="input appearance-none pr-5">
                    {all === true && (
                        <option key={OPTIONS_ID_BASE + ".all"} value="">
                            {t("L_AL")}
                        </option>
                    )}
                    {select === true && (
                        <option key={OPTIONS_ID_BASE + ".select"} value="">
                            {t("L_SELT")}
                        </option>
                    )}
                    {Array.isArray(_options) &&
                        _options.map(({ label, value }, i) => {
                            return (
                                <option key={OPTIONS_ID_BASE + "." + i} value={value}>
                                    {t(label)}
                                </option>
                            );
                        })}
                </select>
                <Icon icon="down" size="xs" className="absolute right-1 pointer-events-none" />
            </div>
        );
    }
);
