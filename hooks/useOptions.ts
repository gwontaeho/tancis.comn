import React from "react";
import { v4 as uuid } from "uuid";
import { useRecoilState } from "recoil";

import { resourceState } from "@/comn/features/recoil";
import { utils, idb } from "@/comn/utils";
import { useTheme } from "@/comn/hooks";

export type TOption = {
    label: string;
    value: string;
};

export type UseOptionsProps = {
    area?: string;
    comnCd?: string;
    options?: TOption[];
};

export const useOptions = (props: UseOptionsProps) => {
    const { comnCd, area, options = [] } = props;

    const ref = React.useRef<any>({ base: uuid() });
    const { theme } = useTheme();
    const [resource] = useRecoilState(resourceState);
    const [_options, _setOptions] = React.useState<TOption[]>(options);
    /**  */
    const [__t, __setT] = React.useState<any>();

    React.useEffect(() => {
        if (!area) return;

        const key = utils.getResourceKey(area, comnCd, theme.lang);
        if (!resource[key]) return;
        getOptionsFromIDB(key);

        /** */
    }, [resource]);

    const getOptionsFromIDB = async (key: any) => {
        try {
            const resource = await idb.get("TANCIS", "RESOURCE", key);
            if (!resource) return;
            if (ref.current.key === resource.key) return;

            ref.current.key = resource.key;
            __setT(new Date());
            _setOptions(resource.value.options);
        } catch (error) {
            console.log(error);
        }
    };

    return { base: ref.current.base, __t, options: _options, hasOption: _options.length > 0 };
};
