import React from "react";
import { v4 as uuid } from "uuid";
import { useTranslation } from "react-i18next";
import { utils } from "@/comn/utils";
import { Icon, TFormControlOptions } from "@/comn/components";
import { LangManager } from "@/comn/components/_";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
    options?: TFormControlOptions;
    all?: boolean;
    select?: boolean;
    comnCd?: string;
    area?: string;
    lang?: string;
    setLang?: string;
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (props: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
        const { options, all, select, required, comnCd, area, ...rest } = props;
        const { t } = useTranslation();

        const [_lang, _setLang] = React.useState(props.lang || localStorage.getItem("lang") || "ko");
        const [_options, _setOptions] = React.useState<TFormControlOptions | undefined>(options);

        React.useEffect(() => {
            if (!props.lang) return;
            _setLang(props.lang);
        }, [props.lang]);

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
                        })),
                    );
                } catch (error) {
                    console.log(error);
                }
            })();
        }, [comnCd, area, _lang]);

        const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);
        return (
            <>
                {!props.lang && <LangManager onChange={(lang: any) => _setLang(lang)} />}
                <div className="relative flex w-full items-center">
                    <select {...rest} ref={ref} className="input appearance-none pr-5">
                        {all && <option value="">{t("L_AL")}</option>}
                        {select && <option value="">{t("L_SELT")}</option>}
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
            </>
        );
    },
);
