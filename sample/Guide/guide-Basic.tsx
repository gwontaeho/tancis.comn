import { useState } from "react";
import { comnEnvs, comnUtils } from "@/comn/utils"; // 공통유틸, 공통변수
import { Sample } from "@/comn/components/_";
import { Group, Layout, FormControl, Button } from "@/comn/components";
import { useForm, TFormSchema, useResource } from "@/comn/hooks";
import "prismjs/themes/prism.css";

export const BASE = {
    path: `${comnEnvs.base_comn}/smpl/sample`,
    api: `${process.env.REACT_APP_API_SAMPLE}/api/v1/cgme/wrhs/rpck/rpck-itm-app`,
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

export const GuideBasic = () => {
    return (
        <Sample title="기본 구조" description="React 프레임워크 화면개발 기본 구조">
            <Sample.Section title="1. 기본 구성(서비스+화면)">
                <Layout direction="col">
                    <Sample.Section
                        title="1.1 서비스 파일"
                        description={
                            <>
                                - 화면에서 사용하는 기본정보, 주소, api, 그리드구조, 폼구조등을 정의
                                <br />
                                - export 구문을 사용하여 타 서비스에서 import 해서 사용가능하게 구성
                                <br />- 응용기능 마지막 레벨(화면)의 상위레벨별로 시스템구분(+내외부구분자) + 서비스명
                                메타단어(용어) + Service.tsx 파일 작성
                            </>
                        }
                    >
                        <Sample.Section title="Service 기본 구조">
                            <Sample.Code>{`
// 서비스 파일 구조

import { api } from "@/comn"; // api (백앤드 호출) 라이브러리
import { comnEnvs, comnUtils } from "@/comn/utils"; // 공통유틸, 공통변수 
import { TFormSchema, TGridSchema } from "@/comn/hooks"; // 폼, 그리드 스키마 정의 타입

// 화면에서 사용하는 기본 정보 정의
export const BASE = {    
    ...
};

// 화면에서 사용하는 주소 정보 정의
export const URLS = {
    ...
};

// 화면에서 사용하는 api 정의
export const APIS = {
    ...
}
// 화면에서 사용하는 그리드 스키마 정의
export const SG_[그리드명 메타단어(용어)대문자 "_" 구분 + _LIST로 종료] : TGridSchema = {
    ...
}
// 화면에서 사용하는 폼 스키마 정의
export const [SF_폼명 메타단어(용어)대문자 "_" 구분] : TFormSchema = {
    ...
}
`}</Sample.Code>
                        </Sample.Section>
                        <Sample.Section title="Service 파일 예시">
                            <Sample.Code>{`
// 서비스 파일 구조

import { api } from "@/comn";
import { comnEnvs, comnUtils } from "@/comn/utils";
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
    path: \`\${comnEnvs.base_comn}/smpl/sample\`,
    api: \`\${process.env.REACT_APP_API_SAMPLE}/api/v1/cgme/wrhs/rpck/rpck-itm-app\`,
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
    cgme0411001q: \`\${BASE.path}/cgme0411001q\`, // Repacking Item Declaration List !== 재포장 BL(품목) 신고서 목록 ==!
    cgme0411002s: \`\${BASE.path}/cgme0411002s\`, // Repacking Item Declaration Registration !== 재포장 BL(품목) 신고서 등록 ==!
    cgme0411003q: \`\${BASE.path}/cgme0411003q\`, // Repacking Item Declaration Item List !== 재포장 BL(품목) 신고서 품목 목록 ==!
};

/*
 * @ APIS
 * @ 화면에서 사용하는 api 정의
 */
export const APIS = {
    // Get Repacking Item Application List !== 재포장 품목 신청서 목록 조회 ==!
    getRpckItmAppList: (data: any, page: number, size: number) => {
        return api.get(\`\${BASE.api}?page=\${page}&size=\${size}\`, {
            params: comnUtils.toGetParams(data),
        });
    },
    // Get Repacking Item Application Item List !== 재포장 품목 신청서 품목 목록 조회 ==!
    getRpckItmAppItmList: (id: any, page: number, size: number) => {
        return api.get(\`\${BASE.api}/\${id}/itm?page=\${page}&size=\${size}\`);
    },
    // Get Repacking Item Application !== 재포장 품목 신청서 조회 ==!
    getRpckItmApp: (id: any) => {
        return api.get(\`\${BASE.api}/\${id}\`);
    },
    // Save Repacking Item Application !== 재포장 품목 신청서 저장 ==!
    saveRpckItmApp: (data: any) => {
        return api.post(\`\${BASE.api}\`, {
            ...data,
        });
    },
    submitRpckItmApp: (data: any) => {
        return api.post(\`\${BASE.api}\`, {
            ...data,
        });
    },
    // Delete Repacking Item Application !== 재포장 품목 신청서 삭제 ==!
    deleteRpckItmApp: (dclrNos: any) => {
        return api.delete(\`\${BASE.api}/\${dclrNos}\`);
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
        edit: false, // 그리드 편집 가능 여부 , default : false
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
        { cells: [{ binding: "dclrNo" }]},
        { cells: [{ binding: "wrhsCd", type: "code", area: "wrhsCd" }]},
        { cells: [{ binding: "mrn"}], },
        { cells: [{ binding: "msn"}],},
        { cells: [{ binding: "mblNo" }]},
        { cells: [{ binding: "godsDesc" }]},
        { cells: [{ binding: "blPckgNo", align: "right", type: "number", thousandSeparator: true }]},
        { cells: [{ binding: "blGwght", align: "right", type: "number", thousandSeparator: true }]},
        { cells: [{ binding: "prcssStatCd", type: "select", area: "comnCd", comnCd: "COM_0100" }] },
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
        mrn: { type: "text", label: "L_MRN" },
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

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.2 화면 컴포넌트 파일"
                        description={
                            <>
                                - 실제 화면을 구성하는 파일
                                <br />
                                - 화면ID에서 "UI-" 와 "-" 를 제거하고 대문자로 파일명 작성
                                <br />- 화면 컴포넌트명도 화면명과 동일하게 작성
                            </>
                        }
                    >
                        <Sample.Section title="화면컴포넌트 기본 구조">
                            <Sample.Code>{`
// 화면 컴포넌트 파일 구조

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils"; // 프로젝트 공통 유틸
import { Page, Group, Layout, Button, FormControl } from "@/comn/components"; // 화면 구성 컴포넌트
import { useForm, useFetch, useResource, useGrid, useModal, useStore, useToast, usePopup } from "@/comn/hooks"; // hook
import { BASE, URLS, APIS, SG_RPCK_ITM_APP_LIST, SF_RPCK_ITM_APP_SRCH } from "./services/CgmeRpckItmAppService"; // 서비스

// 컴포넌트 정의
export const CGME0411001Q = (props: any) => {

    // 화면에서 사용하는 Hook 선언


    // 화면에서 사용하는 폼 정의
    const form = {    
        ...
    };

    // 화면에서 사용하는 그리드 정의
    const grid = {    
        ...
    };

    // 화면에서 사용하는 api 호출 정의
    const fetch = {    
        ...
    };

    // 화면에서 사용하는 이벤트 핸들러 정의
    const handler = {    
        ...
    };

    // 화면에서 사용하는 그리드의 커스텀 셀 정의
    const render = {    
        ...
    };

    // 화면 초기화 함수 정의
    useEffect(() => {
        ...
    }, []);

    return (
        <>
            ... 화면 UI 구성
        </>
    )
}
`}</Sample.Code>
                        </Sample.Section>
                        <Sample.Section title="화면 컴포넌트 파일 예시">
                            <Sample.Code>{`
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils"; // 프로젝트 공통 유틸
import { Page, Group, Layout, Button, FormControl } from "@/comn/components"; // 화면 구성 컴포넌트
import { useForm, useFetch, useResource, useGrid, useModal, useStore, useToast, usePopup } from "@/comn/hooks"; // hook
import { BASE, URLS, APIS, SG_RPCK_ITM_APP_LIST, SF_RPCK_ITM_APP_SRCH } from "./services/CgmeRpckItmAppService"; // 서비스

/*
 * @ 화면 컴포넌트 주석
 * @ 메타 시스템을 참고 하여 표준 단어와 용어를 사용하여 작성
 * @ !== ... ==! 치환 부호는 개발 완료 후 한글 주석을 인지하여 제거하기 위한 표시
 * @ 기본 여러줄의 주석 형태를 사용
 * @ 포맷
 * @ [화면명 영문]
 * @ [지환부호시작] [화면명 한글] [치환부호종료]
 *
 * 화면명 영문
 * !== 화면명 한글 ==!
 */

/*
 * Repacking Item Declaration List
 * !== 재포장 BL(품목) 신고서 목록 ==!
 */
export const CGME0411001Q = (props: any) => {
    /*
     * @ 변수에 대한 주석 (기본 Hook 제외)
     * @ 메타 시스템을 참고 하여 표준 단어와 용어를 사용하여 작성
     * @ 기본 한줄 주석 형태를 사용
     * @ 포맷
     * @ [지환부호시작] [한글변수명] [지환부호종료]
     *
     * 예시) const pgeUid = "CGME0411001Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
     * 선언과 동시에 전개가 이루어 지는 경우 변수의 위쪽에 작성
     */

    /*
     * Declaration Hook, Meta
     * !== Hook, 메타 정보 정의 ==!
     */

    useResource({
        defaultSchema: [{ area: "comnCd", comnCd: "COM_0100" }, { area: "wrhsCd" }],
    });

    const pgeUid = "UI-CGME-0411-001Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore, getStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const { openPopup } = usePopup();

    /*
     * @ 화면에서 사용하는 form 객체를 선언
     * @ 기본 변수명은 메타 단어 조합 카멜 표기법을 따름
     * @ 검색 조건일 경우 구분을 위해 폼 이름 뒤에 Srch
     * @ const form = {
     *      [form 이름] : useForm({
     *          defaultSchema: [form의 schema 구조],
     *          defaultValues: [form의 기본 값] || {},
     *      }),
     *      ...
     * }
     */

    /*
     * Declaration Form
     * !== 폼 정의 ==!
     */
    const form = {
        // Repacking Item Application Search !== 재포장 품목 신청서 검색 ==!
        rpckItmAppSrch: useForm({
            defaultSchema: SF_RPCK_ITM_APP_SRCH,
            defaultValues: {
                ...(pgeStore?.form || {}),
            },
        }),
    };

    /*
     * @ 화면에서 사용하는 grid 객체를 선언
     * @ 기본 변수명은 메타 단어 조합 카멜 표기법을 따름
     * @ 그리드 변수명 뒤에 List (List) 를 붙여 구분
     * @ const grid = {
     *      [grid 이름] : useWijmo({
     *          defaultSchema: [grid의 schema 구조],
     *          page: [페이지 번호, 기본 0부터 시작],
                size: [한 페이지에 보여줄 데이터 갯수],
     *      }),
     *      ...
     * }
     */

    /*
     * Declaration Grid
     * !== 그리드 정의 ==!
     */
    const grid = {
        // Repacking Item Application List !== 재포장 품목 신청서 목록 ==!
        rpckItmAppList: useGrid({
            defaultSchema: SG_RPCK_ITM_APP_LIST,
            page: pgeStore?.page,
            size: pgeStore?.size,
        }),
    };

    /*
     * 화면에서 사용하는 api 호출 객체를 선언
     * 기본 변수명은 메타 단어 조합 카멜 표기법을 따름
     * Back-End Controller 메소드명과 동일하게 작성(Back-End 개발 가이드 참조)
     * 
     * 다건 조회    get         getRpckItmAppList
     * 단건 조회    get         getRpckItmApp
     * 등록         create      createRpckItmApp
     * 수정         update      updateRpckItmApp
     * 삭제         delete      deleteRpckItmApp
     * 저장 단건    save        saveRpckItmApp
     * 저장 다건    save        saveRpckItmAppList
     * 실행         execute     executeRpckItmApp
     * 
     * const fetch = {
     *      [fetch 이름] : useFetch({
     *          api: [fetch 실행 api, service 파일의 APIS 에 기재],
     *          enabled: [[fetch 가 실행되기 위한 조건]],
                key: [[fetch 에서 변화를 감지하여 자동실행할 변수]],
                onSuccess : [fetch 실행 성공시 실행],
                onError : [fetch 실행 실패시 실행],
                showToast: [성공/실패 결과 Toast메세지 표시 여부],
     *      }),
     *      ...
     * }
     */

    /*
     * Declaration Fetch
     * !== Fetch 정의 ==!
     */
    const fetch = {
        // Get Repacking Item Application List !== 재포장 품목 신청서 목록 조회 ==!
        getRpckItmAppList: useFetch({
            api: (page = grid.rpckItmAppList.page) => {
                return APIS.getRpckItmAppList(form.rpckItmAppSrch.getValues(), page, grid.rpckItmAppList.size);
            },
            enabled: comnUtils.isEmpty(form.rpckItmAppSrch.errors) && form.rpckItmAppSrch.isSubmitted,
            key: [grid.rpckItmAppList.page, grid.rpckItmAppList.size],
            onSuccess: () => {
                setStore(pgeUid, {
                    form: form.rpckItmAppSrch.getValues(),
                    page: grid.rpckItmAppList.page,
                    size: grid.rpckItmAppList.size,
                });
            },
            onError: () => {},
            showToast: true,
        }),
        // Delete Repacking Item Application !== 재포장 품목 신청서 삭제 ==!
        deleteRpckItmApp: useFetch({
            api: (dclrNos) => APIS.deleteRpckItmApp(dclrNos),
            onSuccess: () => {
                modal.openModal({ content: "msg.00003" });
                handler.getRpckItmAppList();
            },
            onError: () => {},
            showToast: true,
        }),
    };

    /*
     * 화면에서 사용하는 이벤트, 함수를 선언
     * 기본 변수명은 메타 단어 조합 카멜 표기법을 따름
     * fetch 를 호출 하는 메소드: fetch 명과 동일하게 작성
     * 버튼이나 그리드의 이벤트의 경우 : [이벤트종류]_[이벤트대상타입]_[이벤트대상명]
     * 이벤트 대상 타입 : Btn , Grid ... 카멜표기법으로 표시, 첫글자 대문자
     * 이벤트 명 : 카멜표기법으로 표시, 첫글자 대문자
     *
     * const handler = {
     *      [handler 이름] : ()=>{ 함수 },
     *      click_Btn_Save : 저장버튼 클릭
     *      click_Grid_RpckItmAppList : 재포장 품목 신청서 그리드 클릭
     *      ...
     * }
     */

    /*
     * Declaration Event Handler
     * !== 이벤트 핸들러 정의 ==!
     */
    const handler = {
        // Get Repacking Item Application List !== 재포장 품목 신청서 목록 조회 ==!
        getRpckItmAppList: () => {
            form.rpckItmAppSrch.handleSubmit(
                (data) => {
                    grid.rpckItmAppList.setPage(0);
                    fetch.getRpckItmAppList.fetch(0);
                },
                (data) => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        // Delete Repacking Item Application !== 재포장 품목 신청서 삭제 ==!
        deleteRpckItmApp: () => {
            const seltList: any[] = grid.rpckItmAppList.getChecked() || [];
            if (comnUtils.isEmpty(seltList)) {
                modal.openModal({ content: "msg.00004" });
                return;
            }

            modal.openModal({
                content: "msg.00103",
                onConfirm: () => {
                    const dclrNos: string[] = [];
                    seltList.forEach((item) => {
                        dclrNos.push(\`\${item.dcltTin}-\${item.dclrYy}-\${item.prcsTpCd}-\${item.dclrSrno}\`);
                    });

                    fetch.deleteRpckItmApp.fetch(dclrNos.join(","));
                },
            });
        },
        // Click Grid of Repacking Item Application List !== 재포장 품목 신청서 목록 그리드 클릭 ==!
        click_GridCell_RpckItmAppList: {
            wrhsCd: (props: any) => {
                const { binding, rowValues, value } = props;
                console.log(props);
            },
        },
        click_GridRow_RpckItmAppList: (data: any) => {
            const { binding, rowValues, value } = props;
            console.log(props);
        },
    };

    const render = {
        grid_RpckItmAppList: {
            head: {
                mrn: (props: any) => {
                    return (
                        <>
                            <Group.Any>전체변경 : </Group.Any>
                            <FormControl
                                type="select"
                                options={[{ label: "1", value: "1" }]}
                                onChange={(v) => {
                                    const list = grid.rpckItmAppList.getData();
                                    list.map((item: any) => {
                                        grid.rpckItmAppList.updateRow({ ...item, mrn: v });
                                    });
                                }}
                            />
                        </>
                    );
                },
            },
            cell: {
                dclrNo: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <Link
                            to={\`\${URLS.cgme0411002s}/\${rowValues.dcltTin}-\${rowValues.dclrYy}-\${rowValues.prcsTpCd}-\${rowValues.dclrSrno}\`}
                        >{\`\${rowValues.dcltTin}-\${rowValues.dclrYy}-\${rowValues.prcsTpCd}-\${rowValues.dclrSrno}\`}</Link>
                    );
                },
            },
            edit: {
                msn: (props: any) => {
                    const { binding, rowValues, value } = props;
                    return (
                        <Layout direction="row" gap={1}>
                            <FormControl
                                value={rowValues.msn}
                                onChange={(v) => {
                                    grid.rpckItmAppList.updateRow({ ...rowValues, msn: v });
                                }}
                                rightButton={{
                                    icon: "search",
                                    onClick: (props: any) => {
                                        console.log(props);
                                        openPopup({
                                            url: \`\${comnEnvs.base_comn}/comn/ppup/coCdPpup\`,
                                            callback: ({ data }) => {
                                                grid.rpckItmAppList.updateRow({ ...rowValues, msn: data.coTin });
                                            },
                                        });
                                    },
                                }}
                            />
                        </Layout>
                    );
                },
                dclrNo: (props: any) => {
                    const { binding, rowValues, value } = props;

                    return (
                        <Layout direction="row" gap={1}>
                            <FormControl
                                value={rowValues.dcltTin}
                                onChange={(v) => {
                                    grid.rpckItmAppList.updateRow({ ...rowValues, dcltTin: v });
                                }}
                            />
                            <FormControl
                                value={rowValues.dclrYy}
                                onChange={(v) => {
                                    grid.rpckItmAppList.updateRow({ ...rowValues, dclrYy: v });
                                }}
                            />
                            <FormControl
                                value={rowValues.prcsTpCd}
                                onChange={(v) => {
                                    grid.rpckItmAppList.updateRow({ ...rowValues, prcsTpCd: v });
                                }}
                            />
                            <FormControl
                                value={rowValues.dclrSrno}
                                readOnly={rowValues.prcsTpCd == "1"}
                                onChange={(v) => {
                                    grid.rpckItmAppList.updateRow({ ...rowValues, dclrSrno: v });
                                }}
                            />
                            <Button>테스트</Button>
                        </Layout>
                    );
                },
            },
        },
    };

    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        handler.getRpckItmAppList();
    }, []);

    /*
     * @ 라벨 생성(명명 규칙)
     * @ prefix
     * @ 일반라벨 : L_
     * @ 버튼 : B_
     * @ 제목 : T_
     * @ 메세지 : msg.com.00000 [msg.시스템구분3자리.숫자5자리]
     * @ 매세지를 제외한 라벨은 메타 단어, 용어 조합, 메세지는 숫자 5자리 일련번호로 정의
     * @ 대문자로 표시
     * @ 단어와 단어 사이 용어와 용어 사이는 "_" 로 구분
     */

    return (
        <Page
            id={pgeUid}
            title={t("T_RPCK_ITM_DCLR_LST")}
            description={t("T_RPCK_ITM_DCLR_LST")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { path: "/mnfs/wrhs/rpck/cgme0411001q", label: "T_RPCK_ITM_DCLR_LST" }],
            }}
        >
            <form>
                <Group>
                    <Group.Body>
                        <Layout direction="row">
                            <Layout.Left size={6}>
                                <Group.Title title={"L_CO"} titleSize={2}></Group.Title>
                                {/*
                                <FormControl {...form.rpckItmAppSrch.schema.text}></FormControl>
                                */}
                            </Layout.Left>
                            <Layout.Right>
                                {/*
                                <FormControl {...form.rpckItmAppSrch.schema.check}></FormControl>
                                <Button
                                    role="delete"
                                    onClick={() => {
                                        handler.deleteRpckItmApp();
                                    }}
                                ></Button>
                                */}
                            </Layout.Right>
                        </Layout>
                        <Group.Section>
                            <Group.Row>
                                {/* Registration Date !== 등록일자 ==!  */}
                                <Group.Control {...form.rpckItmAppSrch.schema.frstRgsrDtmRnge}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                {/* MRN !== MRN ==!  */}
                                <Group.Control {...form.rpckItmAppSrch.schema.mrn}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                {/* Processing Status !== 처리상태 ==!  */}
                                <Group.Control {...form.rpckItmAppSrch.schema.prcssStatCd}></Group.Control>
                            </Group.Row>
                        </Group.Section>

                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.rpckItmAppSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        handler.getRpckItmAppList();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Body>
                </Group>
            </form>

            <Group>
                <Group.Body>
                    <Layout direction="row">
                        <Layout.Right>
                            <Button
                                role="delete"
                                onClick={() => {
                                    handler.deleteRpckItmApp();
                                }}
                            ></Button>
                        </Layout.Right>
                    </Layout>
                    {/*
                     * 그리드
                     * @ 그리드 스키마 주입 : {...grid.[그리드이름].grid}
                     * @ 데이터 data={fetch.[fetch 명].data?.[api 리턴 vo 명]}
                     * @ 셀클릭이벤트 연결 : onCellClick={handler.[그리드 이벤트 핸들러명]}
                     */}
                    <Grid
                        {...grid.rpckItmAppList.grid}
                        data={fetch.getRpckItmAppList.data?.rpckItmAppList}
                        render={render.grid_RpckItmAppList}
                        onCellClick={handler.click_GridCell_RpckItmAppList}
                        onRowClick={handler.click_GridRow_RpckItmAppList}
                    />
                </Group.Body>
            </Group>
            <Layout direction="row">
                <Layout.Left>
                    <Button
                        role="new"
                        onClick={() => {
                            navigate(URLS.cgme0411002s);
                        }}
                    >
                        {t("B_NEW_$0", { 0: t("L_RPCK_BL") })}
                    </Button>
                </Layout.Left>
            </Layout>
        </Page>
    );
};


`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
