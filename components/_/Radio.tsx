import React from "react";
import { v4 as uuid } from "uuid";
import { utils } from "@/comn/utils";
import { useTheme } from "@/comn/hooks";
import { FormControlOptionsType } from "@/comn/components";

type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
    options?: FormControlOptionsType;
    comnCd?: string;
    area?: string;
};

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    (props: RadioProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            theme: { lang },
        } = useTheme();

        const { options, required, comnCd, area, ...rest } = props;

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
            <div className="flex flex-wrap w-fit">
                {Array.isArray(_options) &&
                    _options.map(({ label, value }, i) => {
                        return (
                            <div key={OPTIONS_ID_BASE + "." + i} className="flex items-center h-7 space-x-1 mr-3">
                                <input ref={ref} {...rest} type="radio" value={value} />
                                {label && <label>{label}</label>}
                            </div>
                        );
                    })}
            </div>
        );
    }
);
