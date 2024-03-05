import { useState, useEffect, forwardRef, useRef, useCallback } from "react";
import type { ChangeEvent } from "react";
import lodash from "lodash";
import { useOptions, UseOptionsProps, useModal } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { Icon } from "@/comn/components";

type InputCodeProps = UseOptionsProps & {
    edit?: boolean;
    popupSize?: "sm" | "md" | "lg";
    popupParams?: any;
    viewType?: "label" | "value" | "both";

    value?: any;
    name?: string;
    placeholder?: string;
    readOnly?: boolean;
    disabled?: boolean;
    maxLength?: number;
    callback?: (arg?: any) => void;
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
    portCd: `/comn/comn/ppup/portCdPpup`,
    portAirptCd: `/comn/comn/ppup/portAirptCdPpup`,
    airptCd: `/comn/comn/ppup/airptCdPpup`,
    coCd: `/comn/comn/ppup/coCdPpup`,
    prcssStatCd: `/comn/comn/ppup/prcssStatPpup`,
    orgCd: `/comn/comn/ppup/orgCdPpup`,
    wrhsCd: `/comn/comn/ppup/wrhsCdPpup`,
    coDtlCd: `/comn/comn/ppup/coDtlCdPpup`,
    coDclaCd: `/comn/comn/ppup/coDclaCdPpup`,
    orgDeptCd: `/comn/comn/ppup/orgDeptCdPpup`,
    cstmCd: `/comn/comn/ppup/cstmCdPpup`,
    vhclBodyCd: `/comn/comn/ppup/vhclBodyCdPpup`,
    vhclCtgrCd: `/comn/comn/ppup/vhclCtgrCdPpup`,
    vhclClrCd: `/comn/comn/ppup/vhclClrCdPpup`,
    vhclFlCd: `/comn/comn/ppup/vhclFlCdPpup`,
    vhclMkerCd: `/comn/comn/ppup/vhclMkerCdPpup`,
    vhclImpCntyCd: `/comn/comn/ppup/vhclImpCntyCdPpup`,
    vhclInsrTpCd: `/comn/comn/ppup/vhclInsrTpCdPpup`,
    vhclMdlCd: `/comn/comn/ppup/vhclMdlCdPpup`,
    vhclMdlNoCd: `/comn/comn/ppup/vhclMdlNoCdPpup`,
    vhclHlpnCtgrCd: `/comn/comn/ppup/vhclHlpnCtgrCdPpup`,
    vhclPrplTpCd: `/comn/comn/ppup/vhclPrplTpCdPpup`,
    vhclTrmssnTpCd: `/comn/comn/ppup/vhclTrmssnTpCdPpup`,
    vhclUseCd: `/comn/comn/ppup/vhclUseCdPpup`,
    coCdDtl: `/comn/comn/ppup/CoCdDtl`,
    hsCd: `/comn/comn/ppup/hsCdPpup`,
};

export const InputCode = forwardRef((props: InputCodeProps, ref: any) => {
    const {
        edit = true,
        popupSize = "sm",
        popupParams,
        viewType = "both",
        /** useOptions props */
        area,
        comnCd,
        excludes,
        includes,
        filter,
        options,
        /** */
        value,
        name,
        readOnly,
        disabled,
        maxLength,
        placeholder,
        onBlur,
        onFocus,
        onChange,
        callback,
    } = props;

    const _props = Object.fromEntries(
        Object.entries({
            name,
            readOnly,
            disabled,
            maxLength,
            placeholder,
            onBlur,
            onFocus,
        }).filter(([, value]) => value !== undefined),
    );

    const modal = useModal();

    const o = useOptions({ comnCd, area, options, excludes, includes, filter });
    const [_value, _setValue] = useState<string>(formatCode(value));

    useEffect(() => {
        if (value === _value) return;

        const vv = o.options.find((option: any) => option.value === formatCode(value).toUpperCase());
        _setValue(formatCode(vv?.value || value));
    }, [value]);

    const getValueFromOptions = useCallback(
        lodash.debounce((v: any, o: any) => {
            if (o.hasOption) {
                const vv = o.options.find((option: any) => option.value === v.toUpperCase());
                if (vv && onChange) {
                    _setValue(vv.value);
                    onChange(vv.value);
                }
            }
        }, 500),
        [],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        getValueFromOptions(formatCode(e.target.value), o);
        _setValue(formatCode(e.target.value));
    };

    const handleClickSearch = () => {
        if (disabled === true) return;

        const params = { ...utils.toValues(popupParams), comnCd };
        modal.openModal({
            params,
            url: POPUP_URLS[area || "comnCd"],
            size: "md",
            draggable: true,
            callback: (data: any) => {
                if (callback) callback(data);
                modal.closeModal();
            },
        });
    };

    const _label = o.options.find((option) => option.value === value)?.label;

    return (
        <div className="w-full">
            {!edit && (
                <div title={viewCode(_value, { options: o.options, viewType })}>
                    {viewCode(_value, { options: o.options, viewType })}
                </div>
            )}
            <div hidden={!edit}>
                <div className="w-full flex">
                    <input
                        {..._props}
                        ref={ref}
                        value={_value}
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
});

export const viewCode = (v: any, o?: any) => {
    if (!o?.options) return;

    const option = o.options?.find(({ value }: any) => value === v);

    if (!option) return;

    const vt = option.value || "";
    const lt = option.label || "";
    const vtWithBracket = option.value ? `[${option.value}] ` : "";

    const view = o?.viewType === "value" ? vt : o?.viewType === "label" ? lt : vtWithBracket + lt;

    return view;
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
