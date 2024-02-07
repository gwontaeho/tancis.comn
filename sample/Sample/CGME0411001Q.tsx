import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@/comn/components";
import { comnUtils, comnEnvs } from "@/comn/utils"; // 프로젝트 공통 유틸
import { cgmUtils } from "@/tra/tancis/cgme/comn"; // 시스템 공통 유틸
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
                strtDt: comnUtils.getDate(),
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
                        dclrNos.push(`${item.dcltTin}-${item.dclrYy}-${item.prcsTpCd}-${item.dclrSrno}`);
                    });

                    fetch.deleteRpckItmApp.fetch(dclrNos.join(","));
                },
            });
        },
        // Click Grid of Repacking Item Application List !== 재포장 품목 신청서 목록 그리드 클릭 ==!
        click_Grid_RpckItmAppList: {
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
                            to={`${URLS.cgme0411002s}/${rowValues.dcltTin}-${rowValues.dclrYy}-${rowValues.prcsTpCd}-${rowValues.dclrSrno}`}
                        >{`${rowValues.dcltTin}-${rowValues.dclrYy}-${rowValues.prcsTpCd}-${rowValues.dclrSrno}`}</Link>
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
                                            url: `${comnEnvs.base_comn}/comn/ppup/coCdPpup`,
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
        //form.rpckItmAppSrch.setCheckAll("prcssStatCd", true);
        handler.getRpckItmAppList();
        //console.log(comnUtils.replaceEmpty("null"));
        //prcssStatCd: ["A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08"],
        //form.rpckItmAppSrch.setCheckAll("prcssStatCd" , true )
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
                        <Layout direction="row">
                            <Layout.Left size={6}>
                                <Group.Title title={"L_CO"} titleSize={2}></Group.Title>
                                <FormControl {...form.rpckItmAppSrch.schema.text}></FormControl>
                            </Layout.Left>
                            <Layout.Right>
                                <FormControl {...form.rpckItmAppSrch.schema.check}></FormControl>
                                <Button
                                    role="delete"
                                    onClick={() => {
                                        handler.deleteRpckItmApp();
                                    }}
                                ></Button>
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
                        onCellClick={handler.click_Grid_RpckItmAppList}
                        onRowClick={handler.click_GridRow_RpckItmAppList}
                    />
                </Group.Body>
            </Group>
            <Layout direction="row">
                <Layout.Left>
                    <Layout.Button
                        role="new"
                        onClick={() => {
                            navigate(URLS.cgme0411002s);
                        }}
                    >
                        {t("B_NEW_$0", { 0: t("L_RPCK_BL") })}
                    </Layout.Button>
                    <Layout.Button
                        role="gridDelete"
                        onClick={() => {
                            //form.rpckItmAppSrch.setEditable(false);
                            //console.log(form.rpckItmAppSrch.getValues());
                            //form.rpckItmAppSrch.setSchema("prcssStatCd", { options: [{ label: "1", value: "1" }] });
                            //grid.rpckItmAppList.setEdit("cell", "mrn", false);
                            //grid.rpckItmAppList.setEdit("column", "mrn", false);
                            form.rpckItmAppSrch.setSchema("prcssStatCd", { comnCd: "COM_0100" });
                        }}
                    ></Layout.Button>
                    <Layout.Button
                        onClick={() => {
                            //const row = grid.rpckItmAppList.getData();
                            //row[0].wrhsCd = "111111";
                            //grid.rpckItmAppList.updateRow(row[0]);
                            //form.rpckItmAppSrch.setValue("prcssStatCd", undefined);
                            //form.rpckItmAppSrch.setSchema("prcssStatCd", { disabled: true });
                            //grid.rpckItmAppList.setShow("column", "wrhsCd", false);
                            //grid.rpckItmAppList.setShow("column", "mrn", false);
                            //grid.rpckItmAppList.setEdit("cell", "mrn", true)
                            ///grid.rpckItmAppList.setOption("edit", true);
                            //grid.rpckItmAppList.setOption("radio", false);
                            //grid.rpckItmAppList.setOption("checkbox", false);
                            //console.log(grid.rpckItmAppList.getData());
                            //console.log(grid.rpckItmAppList.getOrigin());
                            //console.log(grid.rpckItmAppList.getSelectedRow()); // 라디오
                            //console.log(grid.rpckItmAppList.getChecked()); // 체크박스
                            //grid.rpckItmAppList.addRow(); // pagination 이 in 인 경우
                            grid.rpckItmAppList.addRow({ mrn: 1111, dclrNo: 2222 });
                            grid.rpckItmAppList.addRow({ mrn: 1111, dclrNo: 2222 });
                            // out 서버에서
                            // in 데이터르 직접
                            //grid.rpckItmAppList.deleteRow("checked"); //??
                            //grid.rpckItmAppList.updateRow(grid.rpckItmAppList.getSelectedRow(), { mrn: "111" });
                            //grid.rpckItmAppList.setEdit("cell", "mrn", true); // body binding
                            //grid.rpckItmAppList.setEdit("column", "mrn", true); // head id
                        }}
                    ></Layout.Button>
                    <Button variant="primary">primary</Button>
                    <Button variant="warning">warning</Button>
                    <Button variant="danger">danger</Button>
                    <Button variant="secondary">secondary</Button>
                    <Button variant="info">info</Button>
                    <Button variant="outline-info">info</Button>
                    <Button variant="outline-primary">outline-primary</Button>
                    <Button variant="outline-danger">outline-danger</Button>
                    <Button variant="outline-secondary">outline-secondary</Button>
                </Layout.Left>
            </Layout>
            <Layout direction="row">
                <Layout.Left>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 row 추가
                             * pagination 이 in 인 경우 작동 조건 ( 데이터를 그리드에서 전체 컨트롤 )
                             * 파라메터
                             * data : any : 추가될 데이터 object
                             */
                            grid.rpckItmAppList.addRow({ mrn: "111111" });
                        }}
                    >
                        addRow
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 row 삭제
                             * 파라메터
                             * type : "checkbox" , "radio" , {삭제될 row} : 삭제할 대상은 "checkbox" , "radio" 또는 {삭제할 row object }
                             */
                            grid.rpckItmAppList.deleteRow("checkbox");
                            grid.rpckItmAppList.deleteRow("radio");
                        }}
                    >
                        deleteRow
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 checkbox 에 체크된 row return
                             * return array
                             */
                            const list = grid.rpckItmAppList.getChecked();
                            console.log(list);
                        }}
                    >
                        getChecked
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 radio 에 선택된 row return
                             * return object
                             */
                            const list = grid.rpckItmAppList.getSelectedRow();
                            console.log(list);
                        }}
                    >
                        getSelectedRow
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 data return
                             * return array
                             */
                            const list = grid.rpckItmAppList.getData();
                            console.log(list);
                        }}
                    >
                        getData
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드에 fetch 된 오리지널 데이터 return
                             * return array
                             */
                            const list = grid.rpckItmAppList.getOrigin();
                            console.log(list);
                        }}
                    >
                        getOrigin
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 객체 return
                             * return object
                             */

                            console.log(grid.rpckItmAppList.grid);
                        }}
                    >
                        grid
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 data를 origon 으로 되돌려줌
                             */

                            grid.rpckItmAppList.resetData();
                        }}
                    >
                        resetData
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 데이터 edit , body 의 binding 기준
                             */

                            grid.rpckItmAppList.setEdit("cell", "mrn", true); // body binding
                        }}
                    >
                        setEdit( cell , true )
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 데이터 edit , body 의 binding 기준
                             */

                            grid.rpckItmAppList.setEdit("cell", "mrn", false); // body binding
                        }}
                    >
                        setEdit( cell , false )
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 데이터 edit , head 의 id 기준
                             */

                            grid.rpckItmAppList.setEdit("column", "mrn", true); // body binding
                        }}
                    >
                        setEdit( column , true )
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 데이터 edit , head 의 id 기준
                             */

                            grid.rpckItmAppList.setEdit("column", "mrn", false); // body binding
                        }}
                    >
                        setEdit( column , false )
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 스키마의 option 변경
                             */

                            grid.rpckItmAppList.setOption("checkbox", false);
                            grid.rpckItmAppList.setOption("add", false);
                            grid.rpckItmAppList.setOption("delete", false);
                            grid.rpckItmAppList.setOption("edit", true);
                        }}
                    >
                        setOption
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 페이지변경 (0 ~ )
                             */

                            grid.rpckItmAppList.setPage(1);
                        }}
                    >
                        setPage
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 페이지 사이즈 변경
                             */

                            grid.rpckItmAppList.setSize(100);
                        }}
                    >
                        setSize
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 필드 보이기/ 숨기기 (head , id )
                             */

                            grid.rpckItmAppList.setShow("column", "wrhsCd", false);
                        }}
                    >
                        setShow( column )
                    </Button>
                    <Button
                        onClick={() => {
                            /*
                             * 그리드 필드 수정
                             */
                            const row = grid.rpckItmAppList.getSelectedRow();
                            grid.rpckItmAppList.updateRow({ ...row, mrn: "1234" });
                        }}
                    >
                        updateRow
                    </Button>
                </Layout.Left>
            </Layout>
        </Page>
    );
};
