import React from "react";
import { v4 as uuid } from "uuid";
import { useRecoilState } from "recoil";

import { resourceState } from "@/comn/features/recoil";
import { utils, idb } from "@/comn/utils";
import { useTheme } from "@/comn/hooks";
import { TFunction } from "i18next";
import lodash from "lodash";

export type TOption = {
    label: string;
    value: string;
};

export type UseOptionsProps = {
    area?: string;
    comnCd?: string;
    options?: TOption[];
    excludes?: string[];
    includes?: { label: string; value: string }[];
    filter?: (arg?: any) => boolean;
};

type UseOptionsReturn = {
    __t?: any;
    base: string;
    options: TOption[];
    hasOption: boolean;
};

export const useOptions = (props: UseOptionsProps): UseOptionsReturn => {
    const { comnCd, area, options = [], excludes, includes, filter } = props;

    const ref = React.useRef<{ base: string; key?: string }>({ base: uuid() });
    const { theme } = useTheme();
    const [resource] = useRecoilState(resourceState);
    const [_options, _setOptions] = React.useState<TOption[]>(options);

    /**  */
    const [__t, __setT] = React.useState<any>();

    React.useEffect(() => {
        if (!area) return;

        const key = utils?.getResourceKey(area, comnCd, theme.lang);
        if (!resource[key]) return;
        getOptionsFromIDB(key);

        /** */
    }, [resource]);

    React.useEffect(() => {
        if (!area) return;

        const key = utils.getResourceKey(area, comnCd, theme.lang);
        if (!resource[key]) return;
        getOptionsFromIDB(key);

        /** */
    }, [comnCd, area]);

    const getOptionsFromIDB = async (key: string) => {
        try {
            const resource = await idb.get("TANCIS", "RESOURCE", key);
            if (!resource) return;
            if (ref.current.key === resource.key) return;

            ref.current.key = resource.key;
            __setT(new Date());

            let t = [...resource.value.options];

            if (excludes) {
                t = t.filter((item: any) => {
                    return lodash.indexOf(excludes, item.value) === -1;
                });
            }

            if (includes) {
                t = t.concat(includes);
            }

            if (filter) {
                t = t.filter((item: any) => {
                    return filter(item);
                });
            }
            _setOptions(t);
        } catch (error) {
            console.log(error);
        }
    };

    return { base: ref.current.base, __t, options: _options, hasOption: _options.length > 0 };
};
