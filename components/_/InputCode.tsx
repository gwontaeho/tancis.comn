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
    area?: string;
    maxLength?: number;
    control?: Control;
    onChange?: (...args: any) => void;
};

const InputCodeMain = (props: InputCodeProps) => {
    const keywordInput = React.useRef<HTMLInputElement>(null);
    const cdVldValNmInput = React.useRef<HTMLInputElement>(null);
    const _keyword = React.useRef<any>(null);

    React.useEffect(() => {
        if (!props.value) return;
        if (keywordInput.current?.value === props.value) return;
        getComnCd(props.value);
    }, [props.value]);

    const handleChange = lodash.debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            if (cdVldValNmInput.current) cdVldValNmInput.current.value = "";
            return;
        }
        getComnCd(e.target.value);
    }, 500);

    const getComnCd = async (keyword: string) => {
        if (!props.area && !props.comnCd) return;
        if (props.maxLength !== undefined && keyword.length < props.maxLength) {
            if (cdVldValNmInput.current) cdVldValNmInput.current.value = "";
            return;
        }

        try {
            _keyword.current = keyword;
            const {
                data: { content },
            } = await api.get(getCodeUrl(keyword));

            if (!content[0]) {
                if (cdVldValNmInput.current) cdVldValNmInput.current.value = "";
                return;
            }
            if (cdVldValNmInput.current) cdVldValNmInput.current.value = getCodeValue(content[0]);
            if (keywordInput.current) keywordInput.current.value = getKeyword(content[0]);

            if (!props.onChange) return;
            props.onChange(content[0].cdVldVal);
        } catch (error) {}
    };

    const getCodeUrl = (keyword: string) => {
        if (!props.area || props.area === "comnCd") {
            return `/ptl-com/comn/comn-cds?size=1&comnCd=${props.comnCd}&cdVldVal=${keyword}`;
        } else if (props.area === "cntyCd") {
            return `/ptl-com/comn/cnty-cds?size=1&cntyCd=${keyword}`;
        } else if (props.area === "currCd") {
            return `/ptl-com/comn/curr-cds?size=1&currCd=${keyword}`;
        }
        return "";
    };

    const getKeyword = (content: any) => {
        if (!props.area || props.area === "comnCd") {
            return content.cdVldVal;
        } else if (props.area === "cntyCd") {
            return content.cntyCd;
        } else if (props.area === "currCd") {
            return content.currCd;
        }
        return "";
    };

    const getCodeValue = (content: any) => {
        if (!props.area || props.area === "comnCd") {
            return content.cdVldValNm;
        } else if (props.area === "cntyCd") {
            return content.cntyNm;
        } else if (props.area === "currCd") {
            return content.currNm;
        }
        return "";
    };

    const handleClickSearch = () => {};

    return (
        <div className="flex">
            <input
                ref={keywordInput}
                className="input rounded-r-none flex-1"
                onChange={handleChange}
                maxLength={props.maxLength}
            />
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
