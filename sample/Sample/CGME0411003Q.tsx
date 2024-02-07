import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@/comn/components";
import { cgmUtils } from "@/tra/tancis/cgme/comn"; // 시스템 공통 유틸
import { Page, Group, Layout, Button } from "@/comn/components";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { useForm, useToast, useFetch, useModal, useStore, useGrid, usePopup } from "@/comn/hooks";
import { BASE, URLS, APIS, SF_RPCK_ITM_APP_ITM_SRCH, SG_RPCK_ITM_APP_ITM_LIST } from "./services/CgmeRpckItmAppService";

export const CGME0411003Q = (props: any) => {
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

    const pgeUid = "UI-CGME-0411-003Q"; // Page Unique identifier !== 화면 고유 식별자 ==!
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const { close, postMessage, getParams } = usePopup();
    const params = getParams();

    console.log(params);

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
        rpckItmAppItmSrch: useForm({
            defaultSchema: SF_RPCK_ITM_APP_ITM_SRCH,
            defaultValues: { ...pgeStore?.form } || {},
        }),
    };

    /*
     * @ 화면에서 사용하는 grid 객체를 선언
     * @ 기본 변수명은 메타 단어 조합 카멜 표기법을 따름
     * @ 그리드 변수명 뒤에 List (List) 를 붙여 구분
     * @ const grid = {
     *      [grid 이름] : useGrid({
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
        rpckItmAppItmList: useGrid({
            defaultSchema: SG_RPCK_ITM_APP_ITM_LIST,
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
        // Get Repacking Item Application Item List !== 재포장 품목 신청서 목록 조회 ==!
        getRpckItmAppItmList: useFetch({
            api: (data) => {
                return APIS.getRpckItmAppItmList(
                    params.dclrNo,
                    grid.rpckItmAppItmList.page,
                    grid.rpckItmAppItmList.size,
                );
            },
            enabled: !!params.dclrNo,
            onSuccess: () => {},
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
        // Get Repacking Item Application Item List !== 재포장 품목 신청서 목록 조회 ==!
        getRpckItmAppItmList: () => {
            form.rpckItmAppItmSrch.handleSubmit(
                () => {
                    grid.rpckItmAppItmList.setPage(0);
                    fetch.getRpckItmAppItmList.fetch(0);
                },
                () => {
                    toast.showToast({ type: "warning", content: "msg.00002" });
                },
            )();
        },
        // Apply Parent Screen !== 부모 화면에 적용 ==!
        applyPrntScrn: () => {
            const seltList: any[] = grid.rpckItmAppItmList.getChecked() || [];
            if (comnUtils.isEmpty(seltList)) {
                modal.openModal({ content: "msg.00004" });
                return;
            }
            postMessage({ data: seltList });
            close();
        },
        click_Grid_RpckItmAppItmList: {
            mrn: (data: any) => {
                postMessage({ data: [data.rowValues] });
                close();
            },
        },
    };

    /*
     * Declaration Page Init Function
     * !== 화면 초기화 함수 선언  ==!
     */
    useEffect(() => {
        handler.getRpckItmAppItmList();
    }, []);

    /*
     * @ 라벨 생성(명명 규칙)
     * @ prefix
     * @ 일반라벨 : L_
     * @ 버튼 : B_
     * @ 제목 : T_
     * @ 메세지 : msg.00000 [msg.숫자5자리] , 00000 ~ 10000 까지는 공통영역
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
                        <Group.Section>
                            <Group.Row>
                                {/* Registration Date !== 등록일자 ==!  */}
                                <Group.Control {...form.rpckItmAppItmSrch.schema.frstRgsrDtmRnge}></Group.Control>
                            </Group.Row>
                            <Group.Row>
                                {/* Specific Code !== 특정코드 ==!  */}
                                <Group.Control {...form.rpckItmAppItmSrch.schema.spcd}></Group.Control>
                            </Group.Row>
                        </Group.Section>

                        <Layout direction="row">
                            <Layout.Left>
                                <Button
                                    role="reset"
                                    onClick={() => {
                                        form.rpckItmAppItmSrch.reset();
                                    }}
                                ></Button>
                            </Layout.Left>
                            <Layout.Right>
                                <Button
                                    role="search"
                                    onClick={() => {
                                        handler.getRpckItmAppItmList();
                                    }}
                                ></Button>
                            </Layout.Right>
                        </Layout>
                    </Group.Body>
                </Group>
            </form>

            <Group>
                <Group.Body>
                    {/*
                     * 그리드
                     * @ 그리드 스키마 주입 : {...grid.[그리드이름].grid}
                     * @ 데이터 data={fetch.[fetch 명].data?.[api 리턴 vo 명]}
                     * @ 셀클릭이벤트 연결 : onCellClick={handler.[그리드 이벤트 핸들러명]}
                     */}
                    <Grid
                        {...grid.rpckItmAppItmList.grid}
                        data={fetch.getRpckItmAppItmList.data?.rpckItmAppItmList}
                        onCellClick={handler.click_Grid_RpckItmAppItmList}
                    />
                </Group.Body>
            </Group>

            {comnUtils.isPopup() && (
                <Layout.Right>
                    <Button
                        role="apply"
                        onClick={() => {
                            handler.applyPrntScrn();
                        }}
                    ></Button>
                    <Button role="close" onClick={close}></Button>
                </Layout.Right>
            )}
        </Page>
    );
};
