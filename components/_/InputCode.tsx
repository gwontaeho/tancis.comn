import { useState, useEffect, forwardRef, useCallback, useRef } from "react";
import type { ChangeEvent } from "react";
import lodash from "lodash";
import { useOptions, UseOptionsProps, useModal } from "@/comn/hooks";
import { utils } from "@/comn/utils";
import { Icon } from "@/comn/components";
import { BOLD_TEXT, COLOR_TEXT, SIZE_TEXT } from "@/comn/features/foundation";
import { comnUtils } from "@/comn/utils";

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

    color?: keyof typeof COLOR_TEXT;
    editColor?: keyof typeof COLOR_TEXT;
    bold?: keyof typeof BOLD_TEXT;
    editBold?: keyof typeof BOLD_TEXT;
    fontSize?: keyof typeof SIZE_TEXT;

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
    carrCd: `/comn/comn/ppup/carrCdPpup`,
    coDtlCd: `/comn/comn/ppup/coDtlCdPpup`,
    coDclaCd: `/comn/comn/ppup/coDclaCdPpup`,
    orgDeptCd: `/comn/comn/ppup/orgDeptCdPpup`,
    cstmCd: `/comn/comn/ppup/cstmCdPpup`,
    cstmOfcrCd: `/comn/comn/ppup/cstmOfcrCdPpup`,
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
    postCd: `/comn/comn/ppup/postCdPpup`,
    tinNo: `/comn/comn/ppup/tinNoPpup`,
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

        color,
        editColor,
        bold,
        editBold,
        fontSize,

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
            onFocus,
        }).filter(([, value]) => value !== undefined),
    );

    const modal = useModal();

    const o = useOptions({ comnCd, area, options, excludes, includes, filter });
    const [_value, _setValue] = useState<string>(formatCode(value));
    const [autoCompleteOpen, setAutoCompleteOpen] = useState(false);
    const __autoCompleteCount = useRef<number>(0);
    const __target = useRef<any>(null);

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
                    if (exact !== false && __autoCompleteCount.current <= 0) {
                        _setValue("");
                        if (onChange) onChange("");
                    } else if (exact !== false && __target.current !== null) {
                        _setValue("");
                        if (onChange) onChange("");
                        __target.current = null;
                    } else {
                        _setValue(v);
                        if (onChange) onChange(v);
                    }
                }
            }
        }, 700),
        [exact, maxLength],
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAutoCompleteOpen(true);
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

    const handleClick = () => {
        setAutoCompleteOpen(true);
    };

    const handleBlur = (e: any) => {
        __target.current = e.relatedTarget;
        if (__target.current !== null) {
            setAutoCompleteOpen(false);
            getValueFromOptions(formatCode(e.target.value), o);
        }

        if (onBlur) {
            onBlur(e);
        }
    };

    const _label = o.options.find((option) => option.value === value)?.label;

    const autoComplete = o.options.filter((_) => {
        return (
            _value.length > 0 &&
            (_.value?.toUpperCase().includes(_value.toUpperCase()) ||
                _.label?.toUpperCase().includes(_value.toUpperCase()))
        );
    });
    __autoCompleteCount.current = autoComplete.length;

    return (
        <div className="w-full">
            {!edit && (
                <div
                    title={viewCode(value, { options: o.options, viewType })}
                    className={comnUtils.getViewStyle(color, bold, fontSize)}
                >
                    {viewCode(value, { options: o.options, viewType })}
                </div>
            )}
            <div hidden={!edit}>
                <div className="w-full flex relative">
                    <input
                        {..._props}
                        ref={ref}
                        value={_value}
                        onChange={handleChange}
                        onClick={handleClick}
                        onBlur={handleBlur}
                        autoComplete="off"
                        className={"input rounded-r-none flex-1" + comnUtils.getEditStyle(editColor, editBold)}
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
                        className={"input rounded-l-none flex-[2]" + comnUtils.getEditStyle(editColor, editBold)}
                    />

                    {autoCompleteOpen && !!autoComplete.length && (
                        <AutoComplete
                            o={o}
                            autoComplete={autoComplete}
                            _setValue={_setValue}
                            onChange={onChange}
                            setAutoCompleteOpen={setAutoCompleteOpen}
                        />
                    )}
                </div>
            </div>
        </div>
    );
});

const AutoComplete = (props?: any) => {
    const { autoComplete, _setValue, onChange, setAutoCompleteOpen, o } = props;

    const ac = useRef<any>([]);
    const [curr, setCurr] = useState<any>(null);
    const currRef = useRef<any>(null);

    useEffect(() => {
        ac.current = autoComplete;
    }, [autoComplete]);

    useEffect(() => {
        const handleKeydown = (event: any) => {
            if (event.keyCode === 27) {
                setAutoCompleteOpen(false);
            }

            if (event.keyCode === 38) {
                // up
                setCurr((prev: any) => {
                    const val = prev === null ? 0 : prev - 1;
                    const next = val < 0 ? prev : val;
                    currRef.current = next;

                    return next;
                });
            }

            if (event.keyCode === 40) {
                // down

                setCurr((prev: any) => {
                    const val = prev === null ? 0 : prev + 1;
                    const next = val > ac.current.length - 1 ? prev : val;
                    currRef.current = next;

                    return next;
                });
            }

            if (event.keyCode === 13) {
                // enter

                if (typeof currRef.current !== "number") return;

                const value = ac.current[currRef.current].value;

                _setValue(value);
                if (onChange) onChange(value);

                setAutoCompleteOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeydown);

        return () => {
            window.removeEventListener("keydown", handleKeydown);
        };
    }, []);

    return (
        <>
            <ul className="absolute translate-y-1 rounded top-full w-full bg-uf-card-background border z-[9999] max-h-80 overflow-auto">
                {autoComplete.map(({ value, label }: any, i: any) => {
                    return (
                        <li
                            key={o.base + "." + i}
                            aria-selected={curr === i}
                            className="flex px-1.5 items-center h-[2rem] cursor-pointer hover:bg-uf-lightgray aria-selected:bg-uf-lightgray"
                            onClick={() => {
                                _setValue(value);
                                if (onChange) onChange(value);

                                setAutoCompleteOpen(false);
                            }}
                        >{`[${value}] ${label}`}</li>
                    );
                })}
            </ul>
            <div onClick={() => setAutoCompleteOpen(false)} className="fixed w-full h-full top-0 left-0 z-[9998]" />
        </>
    );
};

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
