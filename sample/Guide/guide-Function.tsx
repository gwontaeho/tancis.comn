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
                            widths={["w-[15%]", "w-[50%]", "w-auto"]}
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
                        <Sample.Section title="Grid 관련">
                            <Sample.Table
                                widths={["w-[15%]", "w-[20%]", "w-[20%]", "*"]}
                                data={[
                                    ["name", "Usage", "Description"],
                                    [
                                        "getGridData",
                                        "content: Record<string, any>",
                                        <></>,
                                        <>
                                            - 데이터 Array 를 Grid에 setData 할수 있는 형태(페이징 정보)로 가공해서
                                            return
                                            <br />
                                        </>,
                                    ],
                                ]}
                            />
                        </Sample.Section>
                        <Sample.Section title="Locale 관련">
                            <Sample.Table
                                widths={["w-[15%]", "w-[60%]", "*"]}
                                data={[
                                    ["함수명", "사용방법", "설명"],

                                    [
                                        "getLocale",
                                        <Sample.Code>{`const locale = comnUtils.getLocale(); // ${comnUtils.getLocale()}`}</Sample.Code>,
                                        <>
                                            - 현재 국제화정보(locale, 단축)를 return <br />- ko | en | tz
                                        </>,
                                    ],
                                    [
                                        "getLocaleString",
                                        <Sample.Code>{`const locale = comnUtils.getLocaleString(); // ${comnUtils.getLocaleString()}`}</Sample.Code>,
                                        <>
                                            - 현재 국제화정보(locale)를 return <br />- ko-KR | en-TZ | sw-TZ
                                        </>,
                                    ],
                                ]}
                            />
                        </Sample.Section>
                        <Sample.Section title="Date 관련">
                            <Sample.Table
                                widths={["w-[15%]", "w-[60%]", "*"]}
                                data={[
                                    ["함수명", "사용방법", "설명"],

                                    [
                                        "getDate",
                                        <Sample.Code>{`const locale = comnUtils.getLocale(); // ${comnUtils.getLocale()}`}</Sample.Code>,
                                        <>
                                            - 현재 국제화정보(locale, 단축)를 return <br />- ko | en | tz
                                        </>,
                                    ],
                                    [
                                        "getLocaleString",
                                        <Sample.Code>{`const locale = comnUtils.getLocaleString(); // ${comnUtils.getLocaleString()}`}</Sample.Code>,
                                        <>
                                            - 현재 국제화정보(locale)를 return <br />- ko-KR | en-TZ | sw-TZ
                                        </>,
                                    ],
                                ]}
                            />
                        </Sample.Section>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
