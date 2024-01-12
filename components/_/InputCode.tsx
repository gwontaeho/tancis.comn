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

const POPUP_URLS: { [id: string]: string } = {
    comnCd: `/comn/smpl/pages/comnCdPpup`,
    cityCd: `/comn/smpl/pages/cityCdPpup`,
    cntyCd: `/comn/smpl/pages/cntyCdPpup`,
    bnkCd: `/comn/smpl/pages/bnkCdPpup`,
    currCd: `/comn/smpl/pages/currCdPpup`,
    portCd: `/comn/smpl/pages/portCdPpup`,
    portAirptCd: `/comn/smpl/pages/portAirptCdPpup`,
    airptCd: `/comn/smpl/pages/airptCdPpup`,
    coCd: `/comn/smpl/pages/coCdPpup`,
    prcssStatCd: `/comn/smpl/pages/prcssStatPpup`,
    orgCd: `/comn/smpl/pages/orgCdPpup`,
};

export const InputCode = (props: InputCodeProps) => {
    const { edit = true, area, comnCd, value, maxLength, popupParams, popupSize = "sm", onChange } = props;

    const initialized = React.useRef(false);

    const { openPopup } = usePopup();
    const {
        theme: { lang },
    } = useTheme();

    const [_vl, _setVl] = React.useState<{ value: string; label: string }>({ value: "", label: "" });

    const keywordInput = React.useRef<HTMLInputElement>(null);

    /**
     * # on lang changed
     * lang이 바뀔 시 value가 있으면 getComnCd 호출
     */
    useEffect(() => {
        if (!_vl.value) return;
        getComnCd(_vl.value);
    }, [lang]);

    /**
     * # on props.value changed
     * props.value 와 value의 값이 다르고,
     * 두 값 모두 비어있지 않을 시 getComnCd 호출
     */
    React.useEffect(() => {
        if (!value && !_vl.value) return;
        if (value === _vl.value) return;
        getComnCd(props.value);
    }, [value]);

    /**
     * # on value changed
     * 컴포넌트 초기화 이후 value가 바뀔 시(after getComnCd()) keyword input value change
     */
    React.useEffect(() => {
        if (initialized.current === false) {
            initialized.current = true;
            return;
        }

        if (!keywordInput.current) return;
        keywordInput.current.value = _vl.value;
        if (!!value === !!_vl.value) return;
        if (!onChange) return;
        onChange(_vl.value);
    }, [_vl]);

    /**
     * # keyword input change event handler
     * keyword input value 빈 값일 때 value 초기화
     */
    const handleChange = lodash.debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            _setVl({ value: "", label: "" });
            return;
        }

        getComnCd(e.target.value);
    }, 500);

    /**
     * getComnCd fetching api
     * 검색 조건에 충족되지 않으면 value 초기화
     *
     * # on api success
     * set value
     */
    const getComnCd = async (keyword: string) => {
        if (!area && !comnCd) return;

        if (props.maxLength !== undefined && keyword.length < props.maxLength) {
            _setVl({ value: "", label: "" });
            return;
        }

        try {
            const { data } = await utils.getCode({ comnCd, area, size: 1, keyword });
            const c = Object.values<any>(data)[0].content[0];

            if (!c) {
                _setVl({ value: "", label: "" });
                return;
            }

            const label = utils.getCodeLabel(area, c);
            const code = utils.getCodeValue(area, c);
            _setVl({ value: code, label });
        } catch (error) {}
    };

    const handleClickSearch = () => {
        const params = { ...utils.toValues(popupParams), comnCd };
        openPopup({
            params,
            url: POPUP_URLS[area || "comnCd"],
            size: popupSize,
            callback: (data: any) => {
                _setVl({ value: data.code, label: data.label });
            },
        });
    };

    return (
        <div className="w-full">
            {!edit && <div>{_vl.value && `[${_vl.value}] ${_vl.label}`}</div>}
            <div hidden={!edit}>
                <div className="w-full flex">
                    <input
                        className="input rounded-r-none flex-1"
                        ref={keywordInput}
                        onChange={handleChange}
                        maxLength={maxLength}
                    />
                    <button className="button border-x-0 rounded-none" type="button" onClick={handleClickSearch}>
                        <Icon icon="search" size="xs" />
                    </button>
                    <input readOnly defaultValue={_vl.label} className="input rounded-l-none flex-[2]" />
                </div>
            </div>
        </div>
    );
};
