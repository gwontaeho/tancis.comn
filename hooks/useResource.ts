import React, { useState } from "react";
import { useSetRecoilState } from "recoil";

import { resourceState } from "@/comn/features/recoil";
import { useTheme } from "@/comn/hooks";
import { utils, idb } from "@/comn/utils";

type TResource = {
    area: string;
    comnCd?: string;
};

type UseOptionsProps = {
    defaultSchema: TResource[];
};

export const useResource = (props: UseOptionsProps) => {
    const { defaultSchema } = props;

    const { theme } = useTheme();
    const setRecource = useSetRecoilState(resourceState);

    const [_resource, _setResource] = useState(() => {
        return defaultSchema.reduce((p: any, c: any) => {
            return { ...p, [c.area + (c.comnCd ? `:${c.comnCd}` : "")]: { area: c.area, comnCd: c.comnCd } };
        }, {});
    });

    React.useEffect(() => {
        gg();
    }, [theme.lang]);

    const gg = async () => {
        try {
            let keys: any = [];
            const e = Object.entries(_resource).map(([_, v]: any) => utils.getCode({ area: v.area, comnCd: v.comnCd }));
            const r = await Promise.allSettled(e);
            const next = Object.fromEntries(
                Object.entries(_resource).map(([_, v]: any, i) => {
                    let data = [];
                    let options = [];
                    let reason;

                    const status = r[i].status;
                    if (status === "fulfilled") {
                        keys.push(_);
                        data = Object.values<any>((r[i] as PromiseFulfilledResult<any>).value.data)[0].content;
                        options = data.map((code: any) => ({
                            label: utils.getCodeLabel(v.area, code),
                            value: utils.getCodeValue(v.area, code),
                        }));
                    }
                    if (status === "rejected") {
                        reason = (r[i] as PromiseRejectedResult).reason;
                    }
                    return [_, { ...v, status, data, reason, options }];
                }),
            );

            const ir = await Promise.allSettled(
                keys.map((key: any) => {
                    return idb.update("TANCIS", "RESOURCE", key + `;${theme.lang}`, next[key]);
                }),
            );

            const reduced = ir.reduce((p: any, n: any) => {
                return { ...p, [n.value.key]: n.value.updated };
            }, {});

            setRecource((prev: any) => ({ ...prev, ...reduced }));
            _setResource(next);
        } catch (error) {
            console.log(error);
        }
    };

    return { resource: _resource };
};
