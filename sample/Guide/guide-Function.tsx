import { useState } from "react";
import { Sample } from "@/comn/components/_";
import { Group, Layout, FormControl, Button } from "@/comn/components";
import { useForm, TFormSchema, useResource, useModal } from "@/comn/hooks";
import "prismjs/themes/prism.css";
import { comnEnvs, comnUtils } from "@/comn/utils";

export const GuideFunction = () => {
    const SF_FORM: TFormSchema = {
        id: "form",
        schema: {
            text: { label: "text", type: "text" },
        },
    };

    const form = useForm({
        defaultSchema: SF_FORM,
        defaultValues: {},
    });

    return (
        <Sample title="공통 유틸(comnUtils, comnEnvs)" description="공통 유틸(함수, 변수) 설명">
            <Sample.Section title="1. comnEnvs">
                <Layout direction="col">
                    <Sample.Section title="1.1 Import" description={<>- comnEnvs Import</>}>
                        <Sample.Section title="Source Code(서비스 파일)">
                            <Sample.Code>{`// 공통변수, 공통유틸 Import
import { comnEnvs, comnUtils } from "@/comn/utils";
`}</Sample.Code>
                        </Sample.Section>
                    </Sample.Section>
                    <Sample.Section title="1.2 공통변수 사용">
                        <Sample.Table
                            widths={["20%", "30%", "*"]}
                            data={[
                                ["속성", "사용방법", "설명"],
                                [
                                    "base",
                                    <Sample.Code>{`const a = \`\${comnEnvs.base}/...\` /* a = "${comnEnvs.base}/..." */`}</Sample.Code>,
                                    <>프로젝트의 기본 Web Context </>,
                                ],
                                [
                                    "base_comn",
                                    <Sample.Code>{`const a = \`\${comnEnvs.base_comn}/...\` /* a = "${comnEnvs.base_comn}/..." */`}</Sample.Code>,
                                    <>공통기능의 Web Context </>,
                                ],
                                [
                                    "locale",
                                    <Sample.Code>{`\`\${comnEnvs.locale.ko}\` /* "${comnEnvs.locale.ko}" */
\`\${comnEnvs.locale.en}\` /* "${comnEnvs.locale.en}" */
\`\${comnEnvs.locale.tz}\` /* "${comnEnvs.locale.tz}" */`}</Sample.Code>,
                                    <>프로젝트 지원 Locale 상수 </>,
                                ],
                                [
                                    "popup",
                                    <Sample.Code>{`\`\${comnEnvs.popup.cityCd}\` /* "${comnEnvs.popup.cityCd}" */
\`\${comnEnvs.popup.comnCd}\` /* "${comnEnvs.popup.comnCd}" */
\`\${comnEnvs.popup.cntyCd}\` /* "${comnEnvs.popup.cntyCd}" */`}</Sample.Code>,
                                    <>
                                        프로젝트 지원 공통 팝업창 주소
                                        <br />
                                        code 컴포넌트 이외의 소스에서 팝업을 사용할 경우 주소 제공{" "}
                                    </>,
                                ],
                            ]}
                        />
                    </Sample.Section>
                    <Sample.Section title="1.3 공통유틸 사용">
                        <Sample.Table
                            widths={["20%", "30%", "40%", "*"]}
                            data={[
                                ["구분", "함수명", "사용방법", "설명"],
                                [
                                    "Grid",
                                    "getGridData",
                                    <Sample.Code>{`grid.setData( comnUtils.getGridData([]) );`}</Sample.Code>,
                                    <>
                                        - 일반 Array 데이터를 Grid에 setData 할수 있는 형태로 가공 <br />
                                        - 일반 Array 데이터를 Grid에 setData 할수 있는 형태로 가공 <br />
                                    </>,
                                ],
                            ]}
                        />
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
