import React from "react";
import { utils } from "@/comn/utils";
import { useTheme } from "@/comn/hooks";

type UseOptionsProps = {
    lang?: string;
    comnCd?: string;
    area?: string;
    options?: { label: string; value: any }[];
};

export const useOptions = (props: UseOptionsProps) => {
    const { lang, comnCd, area, options } = props;

    const theme = useTheme();

    const [_lang, _setLang] = React.useState(lang || localStorage.getItem("lang") || "ko");
    const [_options, _setOptions] = React.useState([]);

    React.useEffect(() => {
        if (!lang) return;
        _setLang(lang);
    }, [lang]);

    React.useEffect(() => {
        if (!area) return;

        (async () => {
            try {
                const { data } = await utils.getCode({ comnCd, area });
                _setOptions(
                    Object.values<any>(data)[0].content.map((code: any) => ({
                        label: utils.getCodeLabel(area, code),
                        value: utils.getCodeValue(area, code),
                    })),
                );
            } catch (error) {
                console.log(error);
            }
        })();
    }, [comnCd, area, theme.theme.lang]);

    return { options: options || _options };
};
