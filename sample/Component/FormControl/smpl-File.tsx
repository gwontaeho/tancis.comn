import React from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, FormControl } from "@/comn/components";
import Prism from "prismjs";
import { useForm, FormSchemaType } from "@/comn/hooks";
import "prismjs/themes/prism.css";

export const SampleFormControlFile = () => {
    React.useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <Sample title="File">
            <Sample.Section
                title={`<FormControl type="file" />`}
                description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
            >
                <Sample.Table
                    data={[
                        ["Properties", "Type", "Default", "Description"],
                        ["type","string","text",<>    text,    <br /> number, password, select, radio, checkbox, textarea, datetime , file, daterange,    timerange, code</>,],
                        ["rightText?", "string", "", <>파일 필드(file field) 오른쪽의 텍스트 배치</>],
                        ["leftButton?","React.ButtonHTMLAttributes<HTMLButtonElement>","",<>파일 필드(file field) 왼쪽의 버튼 배치</>,],
                        ["rightButton?","React.ButtonHTMLAttributes<HTMLButtonElement>","",<>파일 필드(file field) 오른쪽의 버튼 배치</>,],
                        ["invalid?","any","",<>파일 필드(file field) 내용의 유효성검사 시 false일 경우에 나타내는 가상클래스</>,],
                        ["size?", "number", "", <>파일 필드(file field)의 너비를 문자수(in characters) 단위로 명시</>],
                        ["defaultValue?", "any", "", <>파일 필드(file field)의 기본값을 설정</>],
                        ["message?", "string", "", <>파일 필드(file field) 하단의 알림 메세지 설정</>],
                        ["multiple?", "boolean", "", <>파일 필드(file field) 요소에 사용자가 둘 이상의 값을 입력할 수 있음을 명시</>],
                    ]}
                />

                <Sample.Code>{`<FormControl type="file" rightText={'File field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="file" rightText={"File field"} />
                </Page>

                <Sample.Code>{`<FormControl type="file" leftButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="file" leftButton={{ icon: "search" }} />
                </Page>

                <Sample.Code>{`<FormControl type="file" rightButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="file" rightButton={{ icon: "search" }} />
                </Page>

                <Sample.Code>{`<FormControl type="file" invalid={{message:"invalid"}}/>`}</Sample.Code>
                <Page>
                    <FormControl type="file" invalid={{ message: "invalid" }} />
                </Page>

                <Sample.Code>{`<FormControl type="file" size={5} />`}</Sample.Code>
                <Page>
                    <FormControl type="file" size={5} />
                </Page>

                <Sample.Code>{`<FormControl type="file" defaultValue={'File field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="file" defaultValue={"File field"} />
                </Page>

                <Sample.Code>{`<FormControl type="file" message={'error!!!'} />`}</Sample.Code>
                <Page>
                    <FormControl type="file" message={"error!!!"} />
                </Page>

                <Sample.Code>{`<FormControl type="file" multiple={true} />`}</Sample.Code>
                <Page>
                    <FormControl type="file" multiple={true} />
                </Page>


            </Sample.Section>
        </Sample>
    );
};
