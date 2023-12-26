import React from "react";
import { v4 as uuid } from "uuid";
import { utils } from "@/comn/utils";
import { TFormControlOptions } from "@/comn/components";
import { LangManager } from "@/comn/components/_";

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
    options?: TFormControlOptions;
    comnCd?: string;
    area?: string;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    (props: RadioProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const { options, required, comnCd, area, ...rest } = props;

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
                } catch (error) {}
            })();
        }, [comnCd, area, _lang]);

        const OPTIONS_ID_BASE = React.useMemo(() => uuid(), []);
        return (
            <>
                {!props.lang && <LangManager onChange={(lang: any) => _setLang(lang)} />}
                <div className="flex flex-wrap w-fit">
                    {Array.isArray(_options) &&
                        _options.map(({ label, value }, i) => {
                            return (
                                <label key={OPTIONS_ID_BASE + "." + i} className="flex items-center h-7 space-x-1 mr-3">
                                    <input ref={ref} {...rest} type="radio" value={value} />
                                    {label && <div>{label}</div>}
                                </label>
                            );
                        })}
                </div>
            </>
        );
    },
);
