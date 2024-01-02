import React from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, FormControl } from "@/comn/components";
import Prism from "prismjs";
import { useForm, FormSchemaType } from "@/comn/hooks";
import "prismjs/themes/prism.css";

export const SampleFormControlText = () => {
    React.useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <Sample title="Text">
            <Sample.Section
                title={`<FormControl type="text" />`}
                description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
            >
                <Sample.Table
                    data={[
                        ["Properties", "Type", "Default", "Description"],
                        [
                            "type",
                            "string",
                            "text",
                            <>
                                text,
                                <br /> number, password, select, radio, checkbox, textarea, datetime , file, daterange,
                                timerange, code
                            </>,
                        ],
                        ["value?", "any", "", <>입력 필드(input field)에 나타나는 초깃값을 설정</>],
                        ["name?", "string", "", <>입력 필드(input field)의 name값 설정</>],
                        ["rightText?", "string", "", <>입력 필드(input field) 오른쪽의 텍스트 배치</>],
                        [
                            "leftButton?",
                            "React.ButtonHTMLAttributes<HTMLButtonElement>",
                            "",
                            <>입력 필드(input field) 왼쪽의 버튼 배치</>,
                        ],
                        [
                            "rightButton?",
                            "React.ButtonHTMLAttributes<HTMLButtonElement>",
                            "",
                            <>입력 필드(input field) 오른쪽의 버튼 배치</>,
                        ],
                        ["onChange?", "void", "", <>값이 변경된 직후가 아니라, 변경되고 포커스를 잃을 때 발생</>],
                        ["onBlur?", "void", "", <>포커스 된 입력 필드(input field)의 포커스가 사라졌을 때 호출</>],
                        ["disabled?", "boolean", "", <>입력 필드(input field)의 요소가 비활성화됨을 명시</>],
                        ["readOnly?", "boolean", "", <>요소의 입력 필드(input field)가 읽기 전용임을 명시</>],
                        [
                            "invalid?",
                            "any",
                            "",
                            <>입력 필드(input field) 내용의 유효성검사 시 false일 경우에 나타내는 가상클래스</>,
                        ],
                        ["size?", "number", "", <>입력 필드(input field)의 너비를 문자수(in characters) 단위로 명시</>],
                        ["defaultValue?", "any", "", <>입력 필드(input field)의 기본값을 설정</>],
                        ["onFocus?", "void", "", <>입력 필드(input field)의 포커스를 받은 경우 호출</>],
                        ["mask?", "string", "", <>입력 필드(input field)의 특정한 규칙을 설정</>],
                        ["message?", "string", "", <>입력 필드(input field) 하단의 알림 메세지 설정</>],
                        ["maxLength?", "number", "", <>입력 필드(input field)에 입력할 수 있는 최대 문자수를 명시</>],
                        ["decimalScale?", "number", "", <>입력 필드(input field)의 허용되는 소수 자릿수를 제어</>],
                        ["thousandSeparator?", "boolean", "", <>입력 필드(input field)의 1000단위 콤마 설정</>],
                        [
                            "letterCase?",
                            "string",
                            "",
                            <>입력 필드(input field)의 대문자 또는 소문자 설정 (대문자 : upper / 소문자 : lower)</>,
                        ],
                        ["minLength?", "number", "", <>입력 필드(input field)에 입력해야하는 최소 문자수를 명시</>],
                    ]}
                />
                <Sample.Section>
                    <Sample.Code>{`<FormControl type="text" value={'Text field'} />`}</Sample.Code>
                </Sample.Section>
                <Sample.Section>
                    <FormControl type="text" value={"Text field"} />
                </Sample.Section>

                <Sample.Code>{` <FormControl type="text" name={'Text field'}/>`}</Sample.Code>
                <Page>
                    <FormControl type="text" name={"Text field"} />
                </Page>

                <Sample.Code>{`<FormControl type="text" rightText={'Text field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" rightText={"Text field"} />
                </Page>

                <Sample.Code>{`<FormControl type="text" leftButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" leftButton={{ icon: "search" }} />
                </Page>

                <Sample.Code>{`<FormControl type="text" rightButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" rightButton={{ icon: "search" }} />
                </Page>

                <Sample.Code>{`<FormControl type="text" onChange={(event) => { alert(event.target.value)}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="text"
                        onChange={(event) => {
                            alert(event.target.value);
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="text" onBlur={() => { alert('Text field')}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="text"
                        onBlur={() => {
                            alert("Text field");
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="text" disabled={true} defaultValue={'Text field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" disabled={true} defaultValue={"Text field"} />
                </Page>

                <Sample.Code>{`<FormControl type="text" readOnly={true} defaultValue={'Text field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" readOnly={true} defaultValue={"Text field"} />
                </Page>

                <Sample.Code>{`<FormControl type="text" invalid={{message:"invalid"}}/>`}</Sample.Code>
                <Page>
                    <FormControl type="text" invalid={{ message: "invalid" }} />
                </Page>

                <Sample.Code>{`<FormControl type="text" size={5} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" size={5} />
                </Page>

                <Sample.Code>{`<FormControl type="text" defaultValue={'Text field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" defaultValue={"Text field"} />
                </Page>

                <Sample.Code>{`<FormControl type="text" onFocus={() => { console.log('Text field')}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="text"
                        onFocus={() => {
                            console.log("Text field");
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="text" mask={'AAA-000-aaa'} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" mask={"AAA-000-aaa"} />
                </Page>

                <Sample.Code>{`<FormControl type="text" message={'error!!!'} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" message={"error!!!"} />
                </Page>

                <Sample.Code>{`<FormControl type="text" maxLength={3} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" maxLength={3} />
                </Page>

                <Sample.Code>{`<FormControl type="text" decimalScale={3} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" decimalScale={3} />
                </Page>

                <Sample.Code>{`<FormControl type="text" thousandSeparator={true} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" thousandSeparator={true} />
                </Page>

                <Sample.Code>{`<FormControl type="text" letterCase={'upper'} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" letterCase={"upper"} />
                </Page>

                <Sample.Code>{`<FormControl type="text" minLength={10} />`}</Sample.Code>
                <Page>
                    <FormControl type="text" minLength={10} />
                </Page>
            </Sample.Section>
        </Sample>
    );
};
