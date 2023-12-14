import React from "react";
import lodash from "lodash";
import { api } from "@/comn";
import { Icon } from "@/comn/components";

type InputCodeProps = {
    keyword?: string;
    comnCd?: string;
    value?: any;
    onChange?: (...args: any) => void;
};

export const InputCode = (props: InputCodeProps) => {
    const comnCd = "COM_0015";

    const cdVldValNmInput = React.useRef<HTMLInputElement>(null);
    const [_keyword, _setKeyword] = React.useState<string>();

    React.useEffect(() => {
        if (!_keyword) return;
        getComnCd(_keyword);
    }, [_keyword]);

    const handleChange = lodash.debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        _setKeyword(e.target.value);
    }, 500);

    const getComnCd = async (keyword: string) => {
        try {
            const {
                data: { content },
            } = await api.get(
                `http://singlewindow.info:9010/ptl-com/comn/comn-cds?size=1&comnCd=${comnCd}&cdVldVal=${keyword}`
            );

            if (!content[0]) return;
            cdVldValNmInput.current?.setAttribute("value", content[0].cdVldValNm);

            if (!props.onChange) return;
            props.onChange(content[0].cdVldVal);
        } catch (error) {}
    };

    return (
        <div className="flex">
            <input className="input rounded-r-none flex-1" onChange={handleChange} />
            <button className="button border-x-0 rounded-none">
                <Icon icon="search" size="xs" />
            </button>
            <input ref={cdVldValNmInput} readOnly className="input rounded-l-none flex-[2]" />
        </div>
    );
};
