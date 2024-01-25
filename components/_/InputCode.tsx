import React from "react";
import lodash from "lodash";
import { usePopup, useOptions, UseOptionsProps } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { Icon } from "@/comn/components";

type InputCodeProps = UseOptionsProps & {
    edit?: boolean;
    popupSize?: "sm" | "md" | "lg";
    popupParams?: any;

    value?: any;
    name?: string;
    readOnly?: boolean;
    disabled?: boolean;
    maxLength?: number;
    onBlur?: (arg?: any) => void;
    onFocus?: (arg?: any) => void;
    onChange?: (arg?: any) => void;
};

const POPUP_URLS: Record<string, string> = {
    comnCd: `/comn/comn/ppup/comnCdPpup`,
    cityCd: `/comn/comn/ppup/cityCdPpup`,
    cntyCd: `/comn/comn/ppup/cntyCdPpup`,
    bnkCd: `/comn/comn/ppup/bnkCdPpup`,
    currCd: `/comn/comn/ppup/currCdPpup`,
    portCd: `/comncomn/ppup/portCdPpup`,
    portAirptCd: `/comn/comn/ppup/portAirptCdPpup`,
    airptCd: `/comn/comn/ppup/airptCdPpup`,
    coCd: `/comn/comn/ppup/coCdPpup`,
    prcssStatCd: `/comn/comn/ppup/prcssStatPpup`,
    orgCd: `/comn/comn/ppup/orgCdPpup`,
    wrhsCd: `/comn/comn/ppup/wrhsCdPpup`,
};

export const InputCode = (props: InputCodeProps) => {
    const {
        edit = true,
        popupSize = "sm",
        popupParams,
        /** useOptions props */
        area,
        comnCd,
        options,
        /** */
        value,
        name,
        readOnly,
        disabled,
        maxLength,
        onBlur,
        onFocus,
        onChange,
    } = props;

    const _props = Object.fromEntries(
        Object.entries({
            name,
            readOnly,
            disabled,
            maxLength,
            onBlur,
            onFocus,
        }).filter(([, value]) => value !== undefined),
    );

    const { openPopup } = usePopup();

    const o = useOptions({ comnCd, area, options });
    const __t = o.__t?.getTime();

    /** 코드 값 */
    const [_value, _setValue] = React.useState<string>(formatCode(value));
    const keywordInput = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (!__t) return;
        if (typeof value !== "string") return;
        if (value === _value) return;

        const next = o.options.find((_) => _.value === value.toUpperCase());

        if (!next) {
            handleValueChange("");

            return;
        }

        if (next) {
            handleValueChange(next.value);
        }
    }, [value, __t]);

    /**
     * handle change keyword
     */
    const handleChange = lodash.debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        /** 값 세팅 조건 */
        if (maxLength !== e.target.value.length) {
            handleValueChange("");
            return;
        }

        const next = o.options.find(({ value }) => value === e.target.value.toUpperCase());

        if (next) {
            handleValueChange(next.value);
        }
    }, 500);

    const handleClickSearch = () => {
        const params = { ...utils.toValues(popupParams), comnCd };
        openPopup({
            params,
            url: POPUP_URLS[area || "comnCd"],
            size: popupSize,
            callback: (data: any) => {
                handleValueChange(data.code);
            },
        });
    };

    const handleValueChange = (v?: any) => {
        _setValue(v);

        if (onChange) {
            onChange(v);
        }

        if (keywordInput.current) {
            keywordInput.current.value = v;
        }
    };

    const _label = o.options.find(({ value }) => value === _value)?.label;

    return (
        <div className="w-full">
            {!edit && <div>{viewCode(_value, { options: o.options })}</div>}
            <div hidden={!edit}>
                <div className="w-full flex">
                    <input
                        {..._props}
                        ref={keywordInput}
                        defaultValue={_value}
                        onChange={handleChange}
                        className="input rounded-r-none flex-1"
                    />
                    <button className="button border-x-0 rounded-none" type="button" onClick={handleClickSearch}>
                        <Icon icon="search" size="xs" />
                    </button>
                    <input
                        readOnly={true}
                        disabled={disabled}
                        defaultValue={_label}
                        className="input rounded-l-none flex-[2]"
                    />
                </div>
            </div>
        </div>
    );
};

export const viewCode = (v: any, o?: any) => {
    if (!o?.options) return;

    const option = o.options?.find(({ value }: any) => value === v);

    if (!option) return;

    const vt = option.value ? `[${option.value}] ` : "";
    const lt = option.label;

    return vt + lt;
};

export const formatCode = (v: any, o?: any) => {
    if (!v) return "";

    let f = String(v);

    return f;
};

export const unformatCode = (v: any, o?: any) => {
    if (!v) return undefined;

    let f = String(v);

    return f;
};
