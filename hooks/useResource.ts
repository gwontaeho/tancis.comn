import React, { useEffect, useState } from "react";
import { utils } from "@/comn/utils";
import { useTheme } from "@/comn/hooks";

type UseOptionsProps = any;

export const useResource = (props: UseOptionsProps) => {
    const { defaultSchema } = props;

    const { theme } = useTheme();

    const [_s, _setS] = useState(() => {
        return defaultSchema.reduce((p: any, c: any) => {
            return { ...p, [c.area + (c.comnCd ? `__${c.comnCd}` : "")]: { area: c.area, comnCd: c.comnCd } };
        }, {});
    });

    React.useEffect(() => {
        gg();
    }, [theme.lang]);

    const gg = async () => {
        try {
            const e = Object.entries(_s).map(([_, v]: any) => utils.getCode({ area: v.area, comnCd: v.comnCd }));
            const r = await Promise.allSettled(e);

            console.log(
                Object.entries(_s).map(([_, v]: any, i) => {
                    let data = [];
                    const status = r[i].status;
                    if (status === "fulfilled") {
                        data = (r[i] as PromiseFulfilledResult<any>).value;
                    }

                    return [_, { ...v, ...r[i] }];
                }),
            );
        } catch (error) {}
    };

    return {};
};
// data:   Object.values<any>(r[i].value.data)[0].content
// Object.values<any>(data)[0].content.map((code: any) => ({
//     label: utils.getCodeLabel(area, code),
//     value: utils.getCodeValue(area, code),
// })),
