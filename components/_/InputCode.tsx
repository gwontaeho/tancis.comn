import { useState, useEffect, forwardRef, useCallback } from "react";
import type { ChangeEvent } from "react";
import lodash from "lodash";
import { useOptions, UseOptionsProps, useModal } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { Icon } from "@/comn/components";

type InputCodeProps = UseOptionsProps & {
    exact?: boolean;
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
    dgt3CntyCd: `/comn/comn/ppup/dgt3CntyCdPpup`,
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
        exact,
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
    const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);

    useEffect(() => {
        if (value === _value) return;
        if (!value) return;

        _setValue(value);
    }, [value]);

    useEffect(() => {
        const vv = o.options.find((option: any) => option.value === formatCode(_value).toUpperCase());
        if (vv?.value) {
            if (onChange) {
                onChange(vv.value);
            }
        }
    }, [o.__t]);

    const getValueFromOptions = useCallback(
        lodash.debounce((v: any, o: any) => {
            if (o.hasOption) {
                const vv = o.options.find((option: any) => option.value === v.toUpperCase());
                if (vv) {
                    _setValue(vv.value);
                    if (onChange) onChange(vv.value);
                } else {
                    if (exact && v.length > 1 && v.length === maxLength) {
                        _setValue("");
                        if (onChange) onChange("");
                    }
                }
            }
        }, 500),
        [exact, maxLength],
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
                _setValue(data.code);
                if (onChange) {
                    onChange(data.code);
                }

                if (callback) callback(data);
                modal.closeModal();
            },
        });
    };

    const handleFocus = () => {
        if (autoCompleteOpen) return;
        setAutoCompleteOpen(true);
    };

    const handleBlur = useCallback(
        lodash.debounce((v?: any) => {
            if (v) {
                _setValue(v);
                if (onChange) onChange(v);
            }
            setAutoCompleteOpen(false);
        }, 200),
        [],
    );

    const _label = o.options.find((option) => option.value === value)?.label;

    const autoComplete = o.options.filter((_) => {
        return _value.length > 1 && _.value.includes(_value.toUpperCase());
    });

    return (
        <div className="w-full">
            {!edit && (
                <div title={viewCode(_value, { options: o.options, viewType })}>
                    {viewCode(_value, { options: o.options, viewType })}
                </div>
            )}
            <div hidden={!edit}>
                <div className="w-full flex relative">
                    <input
                        {..._props}
                        ref={ref}
                        value={_value}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={() => handleBlur()}
                        autoComplete="off"
                        className="input rounded-r-none flex-1"
                    />
                    <button
                        className="button border-x-0 rounded-none"
                        type="button"
                        onClick={handleClickSearch}
                        disabled={readOnly === true || disabled === true}
                    >
                        <Icon icon="search" size="xs" />
                    </button>
                    <input
                        readOnly={true}
                        disabled={disabled}
                        defaultValue={_label}
                        className="input rounded-l-none flex-[2]"
                    />

                    {autoCompleteOpen && !!autoComplete.length && (
                        <ul className="absolute translate-y-1 rounded top-full w-full bg-uf-card-background border z-[9997]">
                            {autoComplete.map(({ value, label }, i) => {
                                return (
                                    <li
                                        key={o.base + "." + i}
                                        className="flex px-1.5 items-center h-[2rem] cursor-pointer hover:bg-uf-lightgray"
                                        onClick={() => handleBlur(value)}
                                    >{`[${value}] ${label}`}</li>
                                );
                            })}
                        </ul>
                    )}
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
