import { api } from "@/comn";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { cgmUtils, cgmEnvs } from "@/tra/tancis/cgme/comn"; // 시스템 공통 유틸
import { TFormSchema, TGridSchema } from "@/comn/hooks";

/*
 * Repacking Item Declaration Service
 * !== 재포장 BL(품목) 신고서 기능 서비스 ==!
 */

/*
 * @ BASE
 * @ 서비스에서 사용하는 기본 정보 세팅
 * @ path : 화면들의 기본 웹 경로
 * @ api : 사용하는 api 의 기본 주소
 * @ api 주소가 여러개일 경우 _ 로구분하여 의미에 맞게 카멜표기업으로 표시 : api_clr
 * @ nodes : 화면의 Page.Navigation 에서 사용하는 기본 결로 Array
 */
export const BASE = {
    path: `${cgmEnvs.base}/wrhs/rpck`,
    api: `${process.env.REACT_APP_API_CGME}/api/v1/cgme/wrhs/rpck/rpck-itm-app`,
    nodes: [
        { path: "/", label: "L_CAG_MGMT" },
        { path: "/mnfs/wrhs/", label: "L_MNFS_MGMT" },
        { path: "/mnfs/wrhs/rpck", label: "L_RPCK_BL" },
    ],
};

/*
 * @ URLS
 * @ 화면에서 사용하는 주소들 정의
 * @ 해당화면의 컴포넌트명 대문자로 정의
 */
export const URLS = {
    cgme0411001q: `${BASE.path}/cgme0411001q`, // Repacking Item Declaration List !== 재포장 BL(품목) 신고서 목록 ==!
    cgme0411002s: `${BASE.path}/cgme0411002s`, // Repacking Item Declaration Registration !== 재포장 BL(품목) 신고서 등록 ==!
    cgme0411003q: `${BASE.path}/cgme0411003q`, // Repacking Item Declaration Item List !== 재포장 BL(품목) 신고서 품목 목록 ==!
};

/*
 * @ APIS
 * @ 화면에서 사용하는 api 정의
 */
export const APIS = {
    // Get Repacking Item Application List !== 재포장 품목 신청서 목록 조회 ==!
    getRpckItmAppList: (data: any, page: number, size: number) => {
        return api.get(`${BASE.api}?page=${page}&size=${size}`, {
            params: comnUtils.toGetParams(data),
        });
    },
    // Get Repacking Item Application Item List !== 재포장 품목 신청서 품목 목록 조회 ==!
    getRpckItmAppItmList: (id: any, page: number, size: number) => {
        return api.get(`${BASE.api}/${id}/itm?page=${page}&size=${size}`);
    },
    // Get Repacking Item Application !== 재포장 품목 신청서 조회 ==!
    getRpckItmApp: (id: any) => {
        return api.get(`${BASE.api}/${id}`);
    },
    // Save Repacking Item Application !== 재포장 품목 신청서 저장 ==!
    saveRpckItmApp: (data: any) => {
        return api.post(`${BASE.api}`, {
            ...data,
        });
    },
    submitRpckItmApp: (data: any) => {
        return api.post(`${BASE.api}`, {
            ...data,
        });
    },
    // Delete Repacking Item Application !== 재포장 품목 신청서 삭제 ==!
    deleteRpckItmApp: (dclrNos: any) => {
        return api.delete(`${BASE.api}/${dclrNos}`);
    },
};

/*
 * @ 그리드 스키마 정의
 * @ 화면에서 사용하는 그리드 구조 정의
 * @ SG_ 로 시작 (Schema grid)
 * @ SG_[그리드명가 조회하는 데이터 이름 메타 단어(용어) 대문자, "_" 로 구분 , 그리드명 맨 뒤에 "_LIST" 로 종료]
 */

// Schema of Repacking Item Application List Grid !== 재포장 품목 신청서 목록 그리드 스키마 ==!
export const SG_RPCK_ITM_APP_LIST: TGridSchema = {
    id: "grid",
    options: {
        radio: true, // 라디오 버튼 보이기/숨기기 , default : false
        checkbox: true, //체크박스 보이기 숨기기, default : false
        pagination: "in", // 그리드 데이터 페이징 "out" : 데이터를 외부에서 페이징해서 가져오는 경우 , "in" : 데이터를 전체 가져와서 그리드 내부에서 페이징 및 편집
        index: true, // 그리드 번호  index : true ( asc )  , index : "DESC" ( desc 역순 )
        add: true, // add 버튼 보이기/숨기기 , default : false
        delete: true, // delete 버튼 보이기/숨기기 , default : false
        edit: false, // 그리드 편집 가능 여부 , default : false
        importExcel: true, // 엑셀 import 버튼 보이기 숨기기 (기능 구현 예정) , default : false
        exportExcel: true, // 엑셀 export 버튼 보이기 숨기기 (기능 구현 예정) , default : false
        height: 200,
    },
    head: [
        { cells: [{ header: "L_DCLR_NO", binding: "dclrNo", required: true, width: 300 }] },
        { cells: [{ header: "L_WRHS", binding: "wrhsCd", width: 200 }], id: "wrhsCd" },
        { cells: [{ header: "L_MRN", binding: "mrn", width: 200 }], id: "mrn" },
        {
            cells: [
                {
                    header: "L_MSN",
                    binding: "msn",
                    width: 200,
                },
            ],
        },
        { cells: [{ header: "L_MBL_NO", binding: "mblNo", width: 200 }] },
        { cells: [{ header: "L_GODS_DESC", binding: "godsDesc", width: 200 }] },
        { cells: [{ header: "L_PCKG_NO", binding: "blPckgNo", width: 200 }] },
        { cells: [{ header: "L_GWGHT", binding: "blGwght", width: 200 }] },
        { cells: [{ header: "L_PRCSS_STAT", binding: "prcssStatCd", width: 200 }] },
    ],
    body: [
        {
            cells: [{ binding: `dclrNo` }],
        },
        {
            cells: [{ binding: "wrhsCd", type: "code", area: "wrhsCd" }],
        },
        {
            cells: [{ binding: "mrn" }],
        },
        {
            cells: [
                {
                    binding: "msn",
                },
            ],
        },
        {
            cells: [{ binding: "mblNo" }],
        },
        {
            cells: [{ binding: "godsDesc" }],
        },
        {
            cells: [{ binding: "blPckgNo", align: "right", type: "number", thousandSeparator: true }],
        },
        {
            cells: [{ binding: "blGwght", align: "right", type: "number", thousandSeparator: true }],
        },
        {
            cells: [{ binding: "prcssStatCd", type: "select", area: "comnCd", comnCd: "COM_0100" }],
        },
    ],
};

/*
 * @ Form 스키마 정의
 * @ 화면에서 사용하는 Form 구조 정의
 * @ SF_ 로 시작 (Schema form)
 * @ SF_[Form 이름 메타 대문자, "_" 로 구분 ]
 * @ 검색폼은 _SRCH 로 구분
 */

// Schema of Repacking Item Application List Search Form !== 재포장 품목 신청서 목록 검색 폼 스키마 ==!
export const SF_RPCK_ITM_APP_SRCH: TFormSchema = {
    id: "form_RpckItmAppSrch",
    schema: {
        frstRgsrDtmRnge: {
            type: "daterange",
            label: "L_RGSR_DT",
            start: { name: "strtDt" },
            end: { name: "endDt" },
            rangeButton: 3,
            controlSize: 10,
        },
        mrn: { type: "file", label: "L_MRN" },
        prcssStatCd: {
            type: "checkbox",
            label: "L_PRCSS_STAT",
            area: "comnCd",
            controlSize: 10,
            comnCd: "COM_0100",
            all: true,
        },
        text: { type: "text" },
        check: { type: "checkbox", options: [{ label: "Y", value: "Y" }] },
    },
};

export const SF_RPCK_ITM_APP: TFormSchema = {
    id: "form_CgmeRpckItmM",
    schema: {
        rprtNo: {
            type: "text",
            label: "L_RPRT_NO",
            edit: true,
            /*
             * 문자 "A"
             * 영어대문자 [A-Z]
             * 특정 영어대문자 [A-Z]
             * 영어소문자 [a-z]
             * 숫자 /\d/
             * 숫자범위 /[0-5]/
             */
            mask: [
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
                /\d/,
            ],
        },
        dcltTin: { type: "text", label: "L_DCLT_TIN" },
        dclrYy: { type: "text", label: "L_DCLR_YY" },
        prcsTpCd: { type: "text", label: "L_PRCS_TP_CD" },
        dclrSrno: { type: "text", label: "L_DCLR_SRNO" },
        prcssStatCd: { type: "code", label: "L_PRCSS_STAT", edit: false, area: "prcssStatCd" },
        prcssDt: { type: "text", label: "L_PRCSS_DT" },
        prcssId: { type: "text", label: "L_PRCSS_ID" },
        cstmOfceCd: { type: "text", label: "L_CSTM_OFCE_CD" },
        mrn: { type: "text", label: "L_MRN" },
        mblNo: { type: "text", label: "L_MBL_NO", edit: false },
        crn: { type: "text", label: "L_CRN", edit: false },
        msn: { type: "text", label: "L_MSN" },
        cagClsfCd: { type: "select", label: "L_CAG_CLSF", area: "comnCd", comnCd: "CAG_0006" },
        blTpCd: { type: "text", label: "L_BL_TP_CD" },
        shagCd: { type: "text", label: "L_SHAG_CD" },
        exppnTin: { type: "text", label: "L_EXPPN_TIN" },
        exppnNm: { type: "text", label: "L_EXPPN_NM", rightButton: { icon: "search" } },
        exppnTelno: { type: "text", label: "L_EXPPN_TELNO" },
        exppnAddr: { type: "text", label: "L_EXPPN_ADDR" },
        cnsiTin: { type: "text", label: "L_CNSI_TIN", required: true },
        cnsiNm: { type: "text", label: "L_CNSI_NM", rightButton: { icon: "search" } },
        cnsiTelno: { type: "text", label: "L_CNSI_TELNO" },
        cnsiAddr: { type: "text", label: "L_CNSI_ADDR" },
        ntprTin: { type: "text", label: "L_NTPR_TIN" },
        ntprNm: { type: "text", label: "L_NTPR_NM", rightButton: { icon: "search" } },
        ntprTelno: { type: "text", label: "L_NTPR_TELNO" },
        ntprAddr: { type: "text", label: "L_NTPR_ADDR" },
        godsDesc: { type: "text", label: "L_GODS_DESC" },
        blPckgNo: { type: "number", required: true, thousandSeparator: true },
        pckgUtCd: { type: "select", required: true, area: "comnCd", comnCd: "CAG_0018" },
        blGwght: {
            type: "number",
            label: "L_BL_GWGHT",
            rightText: "KG",
            size: 4,
            thousandSeparator: true,
            decimalScale: 3,
        },
        gwghtUtCd: { type: "text", label: "L_GWGHT_UT_CD" },
        blNwght: {
            type: "number",
            label: "L_BL_NWGHT",
            rightText: "KG",
            size: 4,
            thousandSeparator: true,
            decimalScale: 3,
        },
        nwghtUtCd: { type: "text", label: "L_NWGHT_UT_CD" },
        blGvlm: { type: "text", label: "L_BL_GVLM" },
        vlmUtCd: { type: "text", label: "L_VLM_UT_CD" },
        loadPortCd: { type: "code", label: "L_LOAD_PORT", required: true, area: "portCd", maxLength: 3 },
        dstnPlcCd: { type: "code", label: "L_DSTN_PLC", required: true, area: "cityCd", maxLength: 3, popupSize: "md" },
        dlvrPlcCd: { type: "text", label: "L_DLVR_PLC" },
        imdgCd: { type: "text", label: "L_IMDG_CD" },
        invcVal: { type: "text", label: "L_INVC_VAL" },
        invcCurrCd: { type: "text", label: "L_INVC_CURR_CD" },
        frghCrge: { type: "text", label: "L_FRGH_CRGE" },
        frghCurrCd: { type: "text", label: "L_FRGH_CURR_CD" },
        wrhsCd: { type: "text", label: "L_WRHS", edit: false },
        sbmtDt: { type: "text", label: "L_SBMT_DT" },
        autrId: { type: "text", label: "L_AUTR_ID" },
        audtDt: { type: "text", label: "L_AUDT_DT" },
        audtRsltCn: { type: "text", label: "L_AUDT_RSLT_CN" },
        exctYn: { type: "text", label: "L_EXCT_YN" },
        dcltId: { type: "text", label: "L_DCLT_ID" },
        dcltNm: { type: "text", label: "L_DCLT_NM" },
        dcltTelno: { type: "text", label: "L_DCLT_TELNO" },
        bondVal: { type: "text", label: "L_BOND_VAL" },
        oilTpCd: { type: "text", label: "L_OIL_TP_CD" },
        pckgTpCd: { type: "select", label: "L_PCKG_TP", area: "comnCd", comnCd: "CAG_0018" },
        delYn: { type: "text", label: "L_DEL_YN" },
        frstRegstId: { type: "text", label: "L_FRST_REGST_ID" },
        frstRgsrDtm: { type: "datetime", label: "L_FRST_RGSR_DTM" },
        lastMdfrId: { type: "text", label: "L_LAST_MDFR_ID" },
        lastMdfyDtm: { type: "text", label: "L_LAST_MDFY_DTM" },
        test: { type: "label" },
    },
};

export const SF_RPCK_ITM_APP_ITM_SRCH: TFormSchema = {
    id: "form",
    schema: {
        frstRgsrDtmRnge: {
            type: "daterange",
            label: "L_RGSR_DT",
            start: { name: "strtDt" },
            end: { name: "endDt" },
            rangeButton: 0,
            controlSize: 10,
        },
        spcd: { type: "text", label: "L_SPCD" },
    },
};

/*
 * @ 그리드 스키마 정의
 * @ 화면에서 사용하는 그리드 구조 정의
 * @ SG_ 로 시작 (Schema grid)
 * @ SQ_[그리드명 메타 대문자, "_" 로 구분 ]
 */

// Schema of Repacking Item Application List Grid !== 재포장 품목 신청서 목록 그리드 스키마 ==!
export const SG_RPCK_ITM_APP_ITM_LIST: TGridSchema = {
    id: "grid",
    options: { pagination: "in", edit: false, checkbox: true },
    head: [
        { cells: [{ header: "L_MRN", binding: "mrn", width: 150 }] },
        { cells: [{ header: "L_MSN", binding: "msn", width: 150 }] },
        { cells: [{ header: "L_HSN", binding: "hsn", width: 100 }] },
        { cells: [{ header: "L_HS_CD", binding: "hsCd", width: 150 }] },
        { cells: [{ header: "L_SPCD", binding: "spcd", width: 150 }] },
        { cells: [{ header: "L_ORGN_QTY", binding: "orgnQty", width: 150 }] },
        { cells: [{ header: "L_ORGN_WGHT", binding: "orgnWght", width: 150 }] },
        { cells: [{ header: "L_ORGN_BOND_VAL", binding: "orgnBondVal", width: 150 }] },
        { cells: [{ header: "L_ITM_QTY", binding: "itmQty", width: 100 }] },
        { cells: [{ header: "L_ITM_WGHT", binding: "itmWght", width: 100 }] },
        { cells: [{ header: "L_BOND_VAL", binding: "bondVal", width: "*" }] },
    ],
    body: [
        {
            cells: [{ binding: "mrn", required: true }],
        },
        {
            cells: [{ binding: "msn", min: 5 }],
        },
        {
            cells: [{ binding: "hsn", max: 10 }],
        },
        {
            cells: [{ binding: "hsCd", minLength: 5 }],
        },
        {
            cells: [{ binding: "spcd", maxLength: 10 }],
        },
        {
            cells: [
                {
                    binding: "orgnQty",
                    pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                },
            ],
        },
        {
            cells: [
                {
                    binding: "orgnWght",
                    required: true,
                    validate: (v: any) => {
                        if (v === "a") return true;
                        return false;
                    },
                },
            ],
        },
        {
            cells: [{ binding: "orgnBondVal" }],
        },
        {
            cells: [{ binding: "itmQty" }],
        },
        {
            cells: [{ binding: "itmWght" }],
        },
        {
            cells: [{ binding: "bondVal", area: "comnCd", comnCd: "CAG_0018" }],
        },
    ],
};
