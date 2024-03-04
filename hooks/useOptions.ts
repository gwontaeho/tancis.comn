import React from "react";
import { v4 as uuid } from "uuid";
import { useRecoilState } from "recoil";

import { resourceState } from "@/comn/features/recoil";
import { utils } from "@/comn/utils";
import { useTheme, getResourceKey } from "@/comn/hooks";
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
    data: any[];
    hasOption: boolean;
};

export const useOptions = (props: UseOptionsProps): UseOptionsReturn => {
    const { comnCd, area, options = [], excludes, includes, filter } = props;
    const ref = React.useRef<{ base: string; key?: string }>({ base: uuid() });
    const { theme } = useTheme();
    const [resource] = useRecoilState(resourceState);
    const [_options, _setOptions] = React.useState<TOption[]>([]);
    const [_data, _setData] = React.useState<any[]>([]);

    const [__t, __setT] = React.useState<any>();

    React.useEffect(() => {
        if (options.length) return;
        if (!area) return;

        const key = getResourceKey(area, comnCd, theme.lang);
        const _ = resource[key];
        if (!_) return;
        if (ref.current.key === key) return;

        ref.current.key = key;

        let ro = _.value.map((code: any) => ({
            label: utils.getCodeLabel(area, code),
            value: utils.getCodeValue(area, code),
        }));

        if (excludes) {
            ro = ro.filter((item: any) => {
                return lodash.indexOf(excludes, item.value) === -1;
            });
        }

        if (includes) {
            ro = ro.concat(includes);
        }

        if (filter) {
            ro = ro.filter((item: any) => {
                return filter(item);
            });
        }

        _setOptions(ro);
        _setData(resource.value);
    }, [options, resource, area, comnCd, theme.lang]);

    const o = options.length ? options : area ? _options : options;

    return { base: ref.current.base, __t, options: o, hasOption: o.length > 0, data: _data };
};
