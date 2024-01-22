import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { resourceState } from "@/comn/features/recoil";
import { utils } from "@/comn/utils";
import { useTheme } from "@/comn/hooks";

type UseOptionsProps = any;

export const useResource = (props: UseOptionsProps) => {
    const { defaultSchema } = props;

    const { theme } = useTheme();
    const setRecource = useSetRecoilState(resourceState);

    const [_s, _setS] = useState(() => {
        return defaultSchema.reduce((p: any, c: any) => {
            return { ...p, [c.area + (c.comnCd ? `:${c.comnCd}` : "")]: { area: c.area, comnCd: c.comnCd } };
        }, {});
    });

    React.useEffect(() => {
        gg();
    }, [theme.lang]);

    const gg = async () => {
        try {
            const e = Object.entries(_s).map(([_, v]: any) => utils.getCode({ area: v.area, comnCd: v.comnCd }));
            const r = await Promise.allSettled(e);
            const next = Object.fromEntries(
                Object.entries(_s).map(([_, v]: any, i) => {
                    let data = [];
                    let options = [];
                    let reason;
                    const status = r[i].status === "fulfilled" ? "success" : "error";
                    if (status === "success") {
                        data = Object.values<any>((r[i] as PromiseFulfilledResult<any>).value.data)[0].content;
                        options = data.map((code: any) => ({
                            label: utils.getCodeLabel(v.area, code),
                            value: utils.getCodeValue(v.area, code),
                        }));
                    }
                    if (status === "error") {
                        reason = (r[i] as PromiseRejectedResult).reason;
                    }
                    return [_, { ...v, status, data, reason, options }];
                }),
            );

            _setS(next);
        } catch (error) {
            console.log(error);
        }
    };

    return { resource: _s };
};
