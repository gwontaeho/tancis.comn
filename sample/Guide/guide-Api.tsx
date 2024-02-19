import { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Group, Layout, FormControl, Button } from "@/comn/components";
import { useForm, TFormSchema, useResource, useModal } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnEnvs, comnUtils } from "@/comn/utils";

export const GuideApi = () => {
    useResource({
        defaultSchema: [
            { area: "comnCd", comnCd: "COM_0100" },
            { area: "comnCd", comnCd: "CAG_0018" },
            { area: "comnCd", comnCd: "CAG_0006" },
            { area: "wrhsCd" },
        ],
    });

    const modal = useModal(); // Modal Window Hook !== Modal 창 Hook ==!

    const code = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    const SF_FORM: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text", type: "text" },
            select1: { label: "select 1", type: "select", area: "comnCd", comnCd: "COM_0100" },
            select2: { label: "select 2", type: "select", options: code },
            radio: { label: "radio", type: "radio", area: "comnCd", comnCd: "CAG_0018" },
            checkbox: {
                label: "checkbox",
                type: "checkbox",
                area: "comnCd",
                comnCd: "CAG_0006",
                all: true,
            },
            code: { label: "code", type: "code", area: "wrhsCd", maxLength: 5 },
        },
    };

    const form = useForm({
        defaultSchema: SF_FORM,
        defaultValues: {},
    });

    return (
        <Sample title="Back-End 호출" description="Front-End에서 Back-End Api를 호출하는 방법">
            <Sample.Section title="1. 사용방법(기본)">
                <Layout direction="col">
                    <Sample.Section
                        title="1.1 환경변수 확인"
                        description={
                            <>
                                - .env.development 파일에 Api 호출 주소 Base 정의
                                <br />- 존재하지 않거나 주소가 잘못된 경우 REACT_APP_API_서비스명 대문자(내외부구분)
                                으로 추가 및 수정
                                <br />- .env.development 파일은 수정 후 서버 재시작을 통해 반영
                            </>
                        }
                    >
                        <Sample.Section title="Source Code(.env.development)">
                            <Sample.Code>{`
# 백앤드 API 주소 설정(공통, 샘플)
REACT_APP_API_COMN=http://localhost:9700/ptl
REACT_APP_API_SAMPLE=http://localhost:19430/sample
# 백앤드 API 주소 설정(외부)
REACT_APP_API_PTLE=http://localhost:9400/ptl
REACT_APP_API_LPCE=http://localhost:9410/lpc
REACT_APP_API_CLRE=http://localhost:9420/clr
REACT_APP_API_CGME=http://localhost:9430/cgm
REACT_APP_API_OLME=http://localhost:9440/olm
REACT_APP_API_LCME=http://localhost:9450/lcm
REACT_APP_API_TDWE=http://localhost:9460/tdw
# 백앤드 API 주소 설정(내부)
REACT_APP_API_PTLI=http://localhost:9700/ptl
REACT_APP_API_LPCI=http://localhost:9710/lpc
REACT_APP_API_CLRI=http://localhost:9720/clr
REACT_APP_API_CGMI=http://localhost:9730/cgm
REACT_APP_API_OLMI=http://localhost:9740/olm
REACT_APP_API_LCMI=http://localhost:9750/lcm
REACT_APP_API_TDWI=http://localhost:9760/tdw
REACT_APP_API_CLBI=http://localhost:9770/clb
REACT_APP_API_RKMI=http://localhost:9780/rkm

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="1.2 Import" description={<>- API 라이브러리를 Import</>}>
                        <Sample.Section title="Source Code(서비스 파일)">
                            <Sample.Code>{`
// api import
import { api } from "@/comn";

`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.3 Api 호출 정의(BASE)"
                        description={
                            <>
                                - 서비스 파일의 BASE 영역에 Api 호출 Base 주소 정의
                                <br />- BASE 에 하나 이상의 Back-End를 호출하는 경우 추가 정의 후 사용
                                <br />- Back-End Api 주소의 제일 마지막 단어 조합( 소문자, - 를 _ 로 변환 )
                                <br />- 예) /api/v1/cgme/io/dmsc/dmsc-gods-cri =&gt; api_dmsc_gods_cri
                            </>
                        }
                    >
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
export const BASE = {
    ...
    // 서비스에서 사용하는 Back-End Api 의 기본 주소를 정의
    api : \`\${process.env.REACT_APP_API_SAMPLE}/api/v1/cgme/wrhs/rpck/rpck-itm-app\`,
    // 하나의 서비스에서 사용하는 Back-End Api 의 기본 주소가 하나 이상인 경우 추가
    api_dmsc_gods_cri : \`\${process.env.REACT_APP_API_CGME}/api/v1/cgme/io/dmsc/dmsc-gods-cri\`,
    ...
};
`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section
                        title="1.4 Api 호출 정의(APIS)"
                        description={
                            <>
                                - 서비스 파일의 APIS 영역에 Back-End Api 호출 파마레터와 리턴 정의
                                <br />- export 를 사용하여 다른 서비스에서도 import 하여 호출 가능하도록 정의
                                <br />- Back-End Controller의 메소드명과 동일하게 작성
                                <br />- GET 방식의 경우 일반적으로 조회조건 , 페이지번호 , 페이지 사이즈 파라메터 정의
                                <br />- api.메소드소문자 형식으로 호출하여 사용
                                <br />- 예) api.get , api.post , api.delete
                                <br />- get방식의 경우 URL에 파라메터를 전송하기 위해 comnUtils.toGetParams 을 사용하여
                                get 방식의 파라메터로 변환 처리 필요
                            </>
                        }
                    >
                        <Sample.Section title="Source Code">
                            <Sample.Code>{`
export const APIS = {
    ...
    // 목록조회 Api 예시
    // data : 검색조건 , page : 페이지 번호( 0 ~ ) , size : 페이지 사이즈
    getRpckItmAppList: (data: any, page: number, size: number) => {
        // BASE 의 기본 주소에 파라메터들을 조합하여 호출
        // get 방식의 경우 params 에 조회조건들을 추가(comnUtils.toGetParams로 변환)
        return api.get(\`\${BASE.api}?page=\${page}&size=\${size}\`, {
            params: comnUtils.toGetParams(data),
        });
    },
    ...
}
`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
