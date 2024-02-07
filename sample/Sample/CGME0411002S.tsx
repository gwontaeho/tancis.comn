import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { cgmUtils } from "@/tra/tancis/cgme/comn"; // 시스템 공통 유틸
import { Page, Group, Layout, Button, Grid, ExcelUpload, FormControl, Table } from "@/comn/components";
import {
    useForm,
    useToast,
    useFetch,
    useModal,
    useAuth,
    useStore,
    useGrid,
    usePopup,
    useResource,
    useExcel,
} from "@/comn/hooks";
import { BASE, URLS, APIS, SF_RPCK_ITM_APP, SG_RPCK_ITM_APP_ITM_LIST } from "./services/CgmeRpckItmAppService";
import { CommonErrors } from "@/comn/components/_";

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
 * Repacking Item Declaration Registration
 * !== 재포장 BL(품목) 신고서 등록 ==!
 */
export const CGME0411002S = () => {
    const { resource } = useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "prcssStatCd" },
            { area: "portCd" },
            { area: "cityCd" },
        ],
    });
    const pgeUid = "UI-CGME-0411-002S";
    const { t } = useTranslation(); // Translation Hook !== 언어 변환 Hook ==!
    const navigate = useNavigate(); // Navigate Hook !== 화면 이동 Hook ==!
    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!
    const { pgeStore, setStore, getStore } = useStore({ pgeUid: pgeUid }); // Page Store Hook !== 화면 데이터 저장 Hook ==!
    const toast = useToast(); // Toast Message Hook !== Toast 메세지 표시 Hook ==!
    const auth = useAuth(); // Login , User Information Hook !== 로그인, 유저정보 Hook ==!
    const { dclrNo } = useParams(); // Key Information of this Component Router !== 라우터에 정의된 키정보 ==!
    const [sameAsAbove, setSameAsAbove] = useState(false); // User define State !== 사용자 정의 스테이트 ==!
    const { openPopup } = usePopup();
    const excel = useExcel({ excel1: { edit: true }, excel2: { edit: true } });

    const [rpckItmAppItmList, setRpckItmAppItmList] = useState(comnUtils.getGridData([]));

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
        // Repacking Item Application !== 재포장 품목 신청서 검색 ==!
        rpckItmApp: useForm({
            defaultSchema: SF_RPCK_ITM_APP,
            defaultValues: { prcsTpCd: "A" },
        }),
    };

    //const mrn 4= form.rpckItmApp.watch(["mrn"]);

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
            page: 0,
            size: 10,
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
        // Save Repacking Item Application !== 재포장 품목 신청서 저장 ==!
        saveRpckItmApp: useFetch({
            api: (data) => APIS.saveRpckItmApp({ ...data, dcltTin: data.dcltTin ? data.dcltTin : auth.get("tin") }),
            onSuccess: () => {
                modal.openModal({
                    content: "msg.00003",
                    onConfirm: () => {
                        navigate(URLS.cgme0411001q);
                    },
                    onCancel: () => {
                        navigate(URLS.cgme0411001q);
                    },
                });
            },
            onError: (error) => {
                console.log(error);
                if (error.response.status === 400) {
                    console.log(error.response.data);
                    form.rpckItmApp.setErrors(error.response.data.errors);
                }

                modal.openModal({
                    content: "msg.00006",
                });
            },
        }),
        // Get Repacking Item Application !== 재포장 품목 신청서 조회 ==!
        getRpckItmApp: useFetch({
            api: (data) => APIS.getRpckItmApp(dclrNo),
            enabled: !!dclrNo,
            onSuccess: (data) => {
                form.rpckItmApp.setValues({
                    ...data.rpckItmAppInfo.content,
                    rprtNo: dclrNo?.replaceAll("-", ""),
                    pckgUtCd: "1A",
                });
            },
            onError: (error) => {},
            showToast: true,
        }),
        // Get Repacking Item Application Item List !== 재포장 품목 신청서 목록 조회 ==!
        getRpckItmAppItmList: useFetch({
            api: (data) => APIS.getRpckItmAppItmList(dclrNo, grid.rpckItmAppItmList.page, 9999),
            enabled: !!dclrNo,
            onSuccess: (data: any) => {
                setRpckItmAppItmList(comnUtils.getGridData(data.rpckItmAppItmList.content));
            },
            onError: () => {},
            showToast: true,
        }),
    };

    /*
     * Listening sameAsAbove state change
     * !== sameAsAbove 변경 감지 ==!
     */
    useEffect(() => {
        form.rpckItmApp.setSchemas(["ntprTin", "ntprNm", "ntprTelno", "ntprAddr"], {
            readOnly: sameAsAbove,
        });
        if (!sameAsAbove) return;

        const matched = {
            cnsiTin: "ntprTin",
            cnsiNm: "ntprNm",
            cnsiTelno: "ntprTelno",
            cnsiAddr: "ntprAddr",
        };

        Object.entries(matched).forEach(([cnsi, ntpr]) => {
            form.rpckItmApp.setValue(ntpr, form.rpckItmApp.getValue(cnsi));
        });

        const subscription = form.rpckItmApp.watch((value, { name }) => {
            switch (name) {
                case "cnsiTin":
                case "cnsiNm":
                case "cnsiTelno":
                case "cnsiAddr":
                    form.rpckItmApp.setValue(matched[name], value[name]);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [sameAsAbove]);

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
        // Save Repacking Item Application !== 재포장 품목 신청서 저장 ==!
        saveRpckItmApp: form.rpckItmApp.handleSubmit(
            () => {
                const data = { ...form.rpckItmApp.getValues(), rpckItmList: grid.rpckItmAppItmList.getData() };
                modal.openModal({
                    content: "msg.00101",
                    onConfirm: () => {
                        fetch.saveRpckItmApp.fetch(data);
                    },
                });
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        ),

        // Submit Repacking Item Application !== 재포장 품목 신청서 전송 ==!
        submitRpckItmApp: form.rpckItmApp.handleSubmit(
            (data) => {
                fetch.saveRpckItmApp.fetch(data);
            },
            () => {
                toast.showToast({ type: "warning", content: "msg.00002" });
            },
        ),
        click_Btn_AddGridRpckItmAppItmList: () => {
            openPopup({
                url: URLS.cgme0411003q,
                params: { dclrNo: dclrNo },
                size: "lg",
                callback: ({ data = Array<any> }) => {
                    if (comnUtils.isEmpty(data)) return;

                    const gridData = grid.rpckItmAppItmList.getData();

                    data.map((item: any) => {
                        let index = comnUtils.findIndex(gridData, {
                            mrn: item.mrn,
                            msn: item.msn,
                            hsn: item.hsn,
                            hsCd: item.hsCd,
                            spcd: item.spcd,
                        });
                        if (index > -1) {
                            toast.showToast({
                                content:
                                    t("msg.00005") +
                                    `( MRN : ${item.mrn}, MSN: ${item.msn}, HSN: ${item.hsn}, HS Code: ${item.hsCd}, Specific Code : ${item.spcd})`,
                                type: "warning",
                            });
                        } else {
                            grid.rpckItmAppItmList.addRow(item);
                        }
                    });
                },
            });
        },
        click_Btn_DeleteGridRpckItmAppItmList: () => {
            const seltList: any[] = grid.rpckItmAppItmList.getChecked() || [];
            if (comnUtils.isEmpty(seltList)) {
                modal.openModal({ content: "msg.00004" });
                return;
            }

            modal.openModal({
                content: "msg.00103",
                onConfirm: () => {
                    grid.rpckItmAppItmList.deleteRow("checkbox");
                },
            });
        },
    };

    useEffect(() => {
        form.rpckItmApp.setValue("test", "1111");
    }, []);

    const handle_upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = e.target.files || [];
        const f = files[0];
        const reader = new FileReader();
        let excelData: any;

        reader.onload = (e: any) => {
            const data = e.target.result;
            const readedData = XLSX.read(data, { type: "binary" });
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];

            /* Convert array to json*/
            const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
            console.log(dataParse);

            //setFileUploaded(dataParse);
        };
        reader.readAsBinaryString(f);
    };

    const mrn = form.rpckItmApp.watch(["mrn"]);

    return (
        <Page
            id={"UI-CGME-0411-002S"}
            title={t("T_RPCK_ITM_DCLR_RGSR")}
            description={t("T_RPCK_ITM_DCLR_RGSR")}
            navigation={{
                base: comnEnvs.base,
                nodes: [...BASE.nodes, { path: "/mnfs/wrhs/rpck/cgme0411002s", label: "T_RPCK_ITM_DCLR_RGSR" }],
            }}
        >
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Table>
                            <Table.Tr>
                                <Table.Th width={"5%"}>No</Table.Th>
                                <Table.Th width={"35%"}>Modify Item</Table.Th>
                                <Table.Th width={"30%"}>Before Contents</Table.Th>
                                <Table.Th width={"30%"}>After Contents</Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th>1</Table.Th>
                                <Table.Th>Cargo Type</Table.Th>
                                <Table.Td>Import</Table.Td>
                                <Table.Td>
                                    <FormControl
                                        type="select"
                                        options={[
                                            { label: "수입", value: "imp" },
                                            { label: "수출", value: "exp" },
                                        ]}
                                    />
                                </Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Th>1</Table.Th>
                                <Table.Th>Cargo Type</Table.Th>
                                <Table.Td>Import</Table.Td>
                                <Table.Td>
                                    <FormControl type="text" />
                                </Table.Td>
                            </Table.Tr>
                        </Table>
                    </Group.Section>
                </Group.Body>
            </Group>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Group.Row>
                            <Group.Label label="No" labelSize={1} align="center"></Group.Label>
                            <Group.Label
                                label="Modify Item"
                                labelSize={3}
                                align="center"
                                borderLeft={false}
                            ></Group.Label>
                            <Group.Label
                                label="Before Contents"
                                labelSize={4}
                                align="center"
                                borderLeft={false}
                            ></Group.Label>
                            <Group.Label
                                label="After Content"
                                labelSize={4}
                                align="center"
                                borderLeft={false}
                            ></Group.Label>
                        </Group.Row>
                        <Group.Row>
                            <Group.Label label="1" labelSize={1} align="center"></Group.Label>
                            <Group.Label
                                label="Cargo Type"
                                labelSize={3}
                                align="center"
                                borderLeft={false}
                            ></Group.Label>
                            <Group.Control type="text" edit={false} value="Import" borderRight={true} />
                            <Group.Control
                                type="select"
                                options={[
                                    { label: "수입", value: "imp" },
                                    { label: "수출", value: "exp" },
                                ]}
                            />
                        </Group.Row>
                        <Group.Row>
                            <Group.Label label="2" labelSize={1} align="center"></Group.Label>
                            <Group.Label
                                label="Cargo Type"
                                labelSize={3}
                                align="center"
                                borderLeft={false}
                            ></Group.Label>
                            <Group.Control type="text" edit={false} value="Import" borderRight={true} />
                            <Group.Control type="text" />
                        </Group.Row>
                    </Group.Section>
                </Group.Body>
            </Group>
            <Group>
                <Group.Body>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.rprtNo} />
                            <Group.Control {...form.rpckItmApp.schema.prcssStatCd} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.mblNo} />
                            <Group.Control {...form.rpckItmApp.schema.crn} align="" />
                        </Group.Row>
                        <Group.Row>
                            <Group.Col>
                                <Link to="1111" className="underline">
                                    <FormControl {...form.rpckItmApp.schema.mblNo} />
                                </Link>
                                <Button variant="primary" icon="search" size="xs">
                                    검색
                                </Button>
                            </Group.Col>
                        </Group.Row>
                        <Group.Row borderLeft={false} borderRight={false}>
                            <Group.Any align="right" anySize={2}>
                                폼 중간에 글자 넣기 입니다
                            </Group.Any>
                            <Group.Control type="text" />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.cagClsfCd} />
                            <Group.Control {...form.rpckItmApp.schema.dstnPlcCd} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.godsDesc} />
                            <Group.Control {...form.rpckItmApp.schema.loadPortCd} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Label label={"L_PCKG_NO"} required={true} />
                            <Group.Col padding={0}>
                                <Layout direction="col" gap={0}>
                                    <Layout direction="row" gap={0}>
                                        <Group.Control {...form.rpckItmApp.schema.blPckgNo} />
                                        <Group.Control {...form.rpckItmApp.schema.pckgUtCd} />
                                        <Group.Any>
                                            <Button> 버튼</Button>
                                        </Group.Any>
                                    </Layout>
                                    <Layout direction="row" gap={0}>
                                        <Group.Control {...form.rpckItmApp.schema.blPckgNo} />
                                        <Group.Control {...form.rpckItmApp.schema.pckgUtCd} />
                                        <Group.Any>
                                            <Button> 버튼</Button>
                                        </Group.Any>
                                    </Layout>
                                </Layout>
                            </Group.Col>
                            <Group.Control {...form.rpckItmApp.schema.blGwght} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Label label={"L_PCKG_NO"} required={true} />
                            <Group.Col combine={true}>
                                <Group.Control {...form.rpckItmApp.schema.blPckgNo} />
                                <Group.Any>-</Group.Any>
                                <Group.Control {...form.rpckItmApp.schema.pckgUtCd} />
                                <Button>검색</Button>
                            </Group.Col>
                            <Group.Control {...form.rpckItmApp.schema.blGwght} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.pckgTpCd} />
                            <Group.Control {...form.rpckItmApp.schema.blNwght} />
                        </Group.Row>
                    </Group.Section>
                    <Group.Title title={"L_CO"} titleSize={2}></Group.Title>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.exppnTin} />
                            <Group.Control
                                {...form.rpckItmApp.schema.exppnNm}
                                rightButton={{
                                    icon: "search",
                                    onClick: () => {
                                        openPopup({
                                            url: `${comnEnvs.base_comn}/comn/ppup/coCdPpup`,
                                            callback: ({ data }) => {
                                                form.rpckItmApp.setValues(
                                                    {
                                                        exppnTin: data.coTin,
                                                        exppnNm: data.coNm,
                                                        exppnTelno: data.rprsTlphNo,
                                                        exppnAddr: data.coAddr,
                                                    },
                                                    true,
                                                );
                                            },
                                        });
                                    },
                                }}
                            />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.exppnTelno} />
                            <Group.Control {...form.rpckItmApp.schema.exppnAddr} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.cnsiTin} />
                            <Group.Control
                                {...form.rpckItmApp.schema.cnsiNm}
                                rightButton={{
                                    icon: "search",
                                    onClick: () => {
                                        openPopup({
                                            url: `${comnEnvs.base_comn}/comn/ppup/coCdPpup`,
                                            callback: ({ data }) => {
                                                form.rpckItmApp.setValues(
                                                    {
                                                        cnsiTin: data.coTin,
                                                        cnsiNm: data.coNm,
                                                        cnsiTelno: data.rprsTlphNo,
                                                        cnsiAddr: data.coAddr,
                                                    },
                                                    true,
                                                );
                                            },
                                        });
                                    },
                                }}
                            />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.cnsiTelno} />
                            <Group.Control {...form.rpckItmApp.schema.cnsiAddr} />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control
                                type="boolean"
                                inputLabel="L_SAME_AS_ABOVE"
                                value={sameAsAbove}
                                onChange={(value) => setSameAsAbove(value)}
                            />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.ntprTin} />
                            <Group.Control
                                {...form.rpckItmApp.schema.ntprNm}
                                rightButton={{
                                    icon: "search",
                                    onClick: () => {
                                        openPopup({
                                            url: `${comnEnvs.base_comn}/comn/ppup/coCdPpup`,
                                            callback: ({ data }) => {
                                                form.rpckItmApp.setValues(
                                                    {
                                                        ntprTin: data.coTin,
                                                        ntprNm: data.coNm,
                                                        ntprTelno: data.rprsTlphNo,
                                                        ntprAddr: data.coAddr,
                                                    },
                                                    true,
                                                );
                                            },
                                        });
                                    },
                                }}
                            />
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.ntprTelno} />
                            <Group.Control {...form.rpckItmApp.schema.ntprAddr} />
                        </Group.Row>
                    </Group.Section>
                    <Group.Title title={"L_WRHS"} titleSize={2}></Group.Title>
                    <Group.Section>
                        <Group.Row>
                            <Group.Control {...form.rpckItmApp.schema.wrhsCd} controlSize={10} />
                        </Group.Row>
                    </Group.Section>
                </Group.Body>
            </Group>

            <Group>
                <Group.Body>
                    <Group.Title title={"L_RPCK_ITM_LST"} titleSize={2}></Group.Title>

                    <Layout direction="row">
                        <Layout.Left>
                            <ExcelUpload
                                {...excel.schema.excel1}
                                template="excel/template"
                                onUpload={(file) => {
                                    excel
                                        .excelToJson(file, 0)
                                        .then((data) => {
                                            const validData = comnUtils.validateForGrid(
                                                data,
                                                SG_RPCK_ITM_APP_ITM_LIST.body,
                                                resource,
                                                {
                                                    key1: { binding: "mrn", header: "L_MRN" },
                                                    key2: { binding: "msn", header: "L_MSN" },
                                                    key3: { binding: "hsn", header: "L_HSN" },
                                                },
                                            );

                                            if (validData.result === "fail") {
                                                modal.openModal({
                                                    content: <CommonErrors {...validData.error} />,
                                                    draggable: true,
                                                    title: "L_ERR",
                                                    size: "lg",
                                                });
                                                return;
                                            }

                                            modal.openModal({ content: "msg.com.00016" });

                                            grid.rpckItmAppItmList.setData(data.data);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            modal.openModal({ content: err.error.message });
                                        });
                                }}
                            />
                        </Layout.Left>
                        <Layout.Right>
                            <Button
                                role="gridAdd"
                                onClick={() => {
                                    handler.click_Btn_AddGridRpckItmAppItmList();
                                }}
                            ></Button>
                            <Button
                                role="gridDelete"
                                onClick={() => {
                                    handler.click_Btn_DeleteGridRpckItmAppItmList();
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
                    <Grid {...grid.rpckItmAppItmList.grid} data={rpckItmAppItmList} />
                </Group.Body>
            </Group>

            <Layout direction="row">
                <Layout.Left>
                    <Button
                        role="list"
                        onClick={() => {
                            navigate(URLS.cgme0411001q);
                        }}
                    ></Button>
                </Layout.Left>
                <Layout.Right>
                    <Button
                        onClick={() => {
                            //form.rpckItmApp.setValue("mrn", "11111");
                            excel.setEdit("excel1", false);
                        }}
                    >
                        테스트
                    </Button>
                    <Button
                        onClick={() => {
                            //form.rpckItmApp.setValue("mrn", "11111");
                            //excel.setEdit("excel1", true);
                            console.log(grid.rpckItmAppItmList.getData());
                        }}
                    >
                        테스트
                    </Button>
                    <Button role="save" onClick={handler.saveRpckItmApp}></Button>
                    <Button role="submit" onClick={handler.submitRpckItmApp}></Button>
                </Layout.Right>
            </Layout>
        </Page>
    );
};
