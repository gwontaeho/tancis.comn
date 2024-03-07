import { useId } from "react";
import { useRecoilState } from "recoil";
import lodash from "lodash";

import { utils } from "@/comn/utils";
import { resourceState } from "@/comn/features/recoil";
import { useTheme, getResourceKey } from "@/comn/hooks";

export type TOption = {
    label: string;
    value: string;
};

export type UseOptionsProps = {
    area?: string;
    comnCd?: string;
    options?: TOption[];
    excludes?: string[];
    includes?: TOption[];
    filter?: (arg?: any) => boolean;
};

type UseOptionsReturn = {
    base: string;
    __t: any;
    data: any[];
    options: TOption[];
    hasOption: boolean;
};

export const useOptions = (props: UseOptionsProps): UseOptionsReturn => {
    const { comnCd, area, options = [], excludes, includes, filter } = props;

    const base = useId();

    const { theme } = useTheme();
    const [resource] = useRecoilState(resourceState);

    let _options = options;
    let _data;
    let __t;

    if (!!area) {
        const key = getResourceKey(area, comnCd, theme.lang);
        const _ = resource[key];
        if (!!_) {
            _data = _.value;
            _options = _.value.map((code: any) => ({
                label: utils.getCodeLabel(area, code),
                value: utils.getCodeValue(area, code),
            }));
            __t = key;
        }
    }
    if (excludes) {
        _options = _options.filter((item: any) => {
            return lodash.indexOf(excludes, item.value) === -1;
        });
    }
    if (includes) {
        _options = _options.concat(includes);
    }
    if (filter) {
        _options = _options.filter((item: any) => {
            return filter(item);
        });
    }

    return { base, options: _options, hasOption: _options.length > 0, data: _data, __t };
};
