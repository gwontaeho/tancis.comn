import React from "react";
import { useRecoilState } from "recoil";

import { resourceState } from "@/comn/features/recoil";
import { utils, idb } from "@/comn/utils";
import { useTheme } from "@/comn/hooks";

type UseOptionsProps = {
    area?: string;
    comnCd?: string;
    options?: { label: string; value: any }[];
};

export const useOptions = (props: UseOptionsProps) => {
    const { comnCd, area, options } = props;

    const { theme } = useTheme();
    const [resource] = useRecoilState(resourceState);
    const [_options, _setOptions] = React.useState<{ label: string; value: any }[]>([]);

    React.useEffect(() => {
        const key = area && utils.getResourceKey(area, comnCd, theme.lang);
        if (!key) return;
        if (!resource[key]) return;

        getOptionsFromIDB(key);
    }, [resource]);

    const getOptionsFromIDB = async (key: any) => {
        try {
            const resource = await idb.get("TANCIS", "RESOURCE", key);
            if (!resource) return;

            _setOptions(resource.value.options);
        } catch (error) {
            console.log(error);
        }
    };

    return { options: _options };
};
