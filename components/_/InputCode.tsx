import React, { useEffect } from "react";
import lodash from "lodash";
import { usePopup, useTheme } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { Icon } from "@/comn/components";

type InputCodeProps = {
    edit?: boolean;
    name?: string;
    value?: any;
    comnCd?: string;
    area?: string;
    maxLength?: number;
    popupSize?: "sm" | "md" | "lg";
    popupParams?: any;
    onChange?: (...args: any) => void;
};

const PopupUrls: { [id: string]: string } = {
    comnCd: `/comn/ppup/comnCdPpup`,
    cityCd: `/comn/ppup/cityCdPpup`,
    cntyCd: `/comn/ppup/cntyCdPpup`,
    bnkCd: `/comn/ppup/bnkCdPpup`,
    currCd: `/comn/ppup/currCdPpup`,
    portCd: `/comn/ppup/portCdPpup`,
    portAirptCd: `/comn/ppup/portAirptCdPpup`,
    airptCd: `/comn/ppup/airptCdPpup`,
    coCd: `/comn/ppup/coCdPpup`,
    prcssStatCd: `/comn/ppup/prcssStatPpup`,
    orgCd: `/comn/ppup/orgCdPpup`,
};

export const InputCode = (props: InputCodeProps) => {
    const { edit = true } = props;

    const { openPopup } = usePopup();
    const {
        theme: { lang },
    } = useTheme();

    const keywordInput = React.useRef<HTMLInputElement>(null);
    const labelInput = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!keywordInput.current?.value) return;
        console.log("l chan");
        getComnCd(keywordInput.current?.value);
    }, [lang]);

    React.useEffect(() => {
        if (!props.value) return;
        if (keywordInput.current?.value === props.value) return;
        getComnCd(props.value);
    }, [props.value]);

    const handleChange = lodash.debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!labelInput.current) return;
        if (!keywordInput.current) return;

        if (!e.target.value) {
            labelInput.current.value = "";
            if (props.onChange) props.onChange("");
            return;
        }

        getComnCd(e.target.value);
    }, 500);

    const getComnCd = async (keyword: string) => {
        if (!labelInput.current) return;
        if (!keywordInput.current) return;
        if (!props.area && !props.comnCd) return;

        if (props.maxLength !== undefined && keyword.length < props.maxLength) {
            labelInput.current.value = "";
            if (!props.onChange) return;
            props.onChange("");
            return;
        }

        try {
            const { data } = await utils.getCode({ comnCd: props.comnCd, area: props.area, size: 1, keyword });

            const c = Object.values<any>(data)[0].content[0];

            if (!c) {
                labelInput.current.value = "";
                if (!props.onChange) return;
                props.onChange("");
                return;
            }

            const label = utils.getCodeLabel(props.area, c);
            const code = utils.getCodeValue(props.area, c);

            labelInput.current.value = label;
            keywordInput.current.value = code;
            if (!props.onChange) return;
            props.onChange(code);
        } catch (error) {}
    };

    const handleClickSearch = () => {
        const popupParams = utils.toValues(props.popupParams) || null;
        openPopup({
            params: { comnCd: props.comnCd, ...popupParams },
            url: PopupUrls[props.area || "comnCd"],
            size: props.popupSize || "sm",
            callback: (data: any) => {
                if (labelInput.current) labelInput.current.value = data.label;
                if (keywordInput.current) keywordInput.current.value = data.code;
                if (!props.onChange) return;
                props.onChange(data.code);
            },
        });
    };

    return (
        <div className="w-full">
            {!edit && (
                <div>
                    {(keywordInput.current?.value ? `[${keywordInput.current?.value}] ` : "") +
                        labelInput.current?.value}
                </div>
            )}
            <div hidden={!edit}>
                <div className="w-full flex">
                    <input
                        ref={keywordInput}
                        className="input rounded-r-none flex-1"
                        onChange={handleChange}
                        maxLength={props.maxLength}
                    />
                    <button className="button border-x-0 rounded-none" type="button" onClick={handleClickSearch}>
                        <Icon icon="search" size="xs" />
                    </button>
                    <input ref={labelInput} readOnly className="input rounded-l-none flex-[2]" />
                </div>
            </div>
        </div>
    );
};
