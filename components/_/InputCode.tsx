import React from "react";
import lodash from "lodash";
import { api } from "@/comn";
import { Icon } from "@/comn/components";
import { ControllerWrapper } from "@/comn/components/_";
import { Control } from "react-hook-form";

type InputCodeProps = {
    name?: string;
    value?: any;
    comnCd?: string;
    minLength?: number;
    control?: Control;
    onChange?: (...args: any) => void;
};

const InputCodeMain = (props: InputCodeProps) => {
    const keywordInput = React.useRef<HTMLInputElement>(null);
    const cdVldValNmInput = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (!props.value) return;
        if (keywordInput.current?.value === props.value) return;
        getComnCd(props.value);
    }, [props.value]);

    const handleChange = lodash.debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return;
        getComnCd(e.target.value);
    }, 500);

    const getComnCd = async (keyword: string) => {
        if (!props.comnCd) return;

        if (props.minLength !== undefined && keyword.length < props.minLength) {
            if (keywordInput.current) keywordInput.current.value = keyword;
            return;
        }

        try {
            const {
                data: { content },
            } = await api.get(
                `http://singlewindow.info:9010/ptl-com/comn/comn-cds?size=1&comnCd=${props.comnCd}&cdVldVal=${keyword}`
            );

            if (!content[0]) return;
            if (cdVldValNmInput.current) cdVldValNmInput.current.value = content[0].cdVldValNm;
            if (keywordInput.current) keywordInput.current.value = content[0].cdVldVal;

            if (!props.onChange) return;
            props.onChange(content[0].cdVldVal);
        } catch (error) {}
    };

    const handleClickSearch = () => {};

    return (
        <div className="flex">
            <input ref={keywordInput} className="input rounded-r-none flex-1" onChange={handleChange} />
            <button className="button border-x-0 rounded-none" onClick={handleClickSearch}>
                <Icon icon="search" size="xs" />
            </button>
            <input ref={cdVldValNmInput} readOnly className="input rounded-l-none flex-[2]" />
        </div>
    );
};

export const InputCode = (props: InputCodeProps) => {
    if (props.control && props.name)
        return (
            <ControllerWrapper {...props} control={props.control} name={props.name}>
                <InputCodeMain />
            </ControllerWrapper>
        );

    return <InputCodeMain {...props} />;
};
