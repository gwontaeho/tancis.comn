import React from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, FormControl } from "@/comn/components";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

export const SampleFormControlTextarea = () => {
    React.useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <Sample title="Textarea">
            <Sample.Section
                title={`<FormControl type="textarea" />`}
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
                                {" "}
                                text, <br /> number, password, select, radio, checkbox, textarea, datetime , file,
                                daterange, timerange, code
                            </>,
                        ],
                        ["value?", "any", "", <>텍스트 입력 영역(Textarea)에 나타나는 초깃값을 설정</>],
                        ["name?", "string", "", <>텍스트 입력 영역(Textarea)의 name값 설정</>],
                        ["rightText?", "string", "", <>텍스트 입력 영역(Textarea) 오른쪽의 텍스트 배치</>],
                        [
                            "leftButton?",
                            "React.ButtonHTMLAttributes<HTMLButtonElement>",
                            "",
                            <>텍스트 입력 영역(Textarea) 왼쪽의 버튼 배치</>,
                        ],
                        [
                            "rightButton?",
                            "React.ButtonHTMLAttributes<HTMLButtonElement>",
                            "",
                            <>텍스트 입력 영역(Textarea) 오른쪽의 버튼 배치</>,
                        ],
                        ["onChange?", "void", "", <>값이 변경된 직후가 아니라, 변경되고 포커스를 잃을 때 발생</>],
                        ["onBlur?", "void", "", <>포커스 된 텍스트 입력 영역(Textarea)의 포커스가 사라졌을 때 호출</>],
                        ["disabled?", "boolean", "", <>텍스트 입력 영역(Textarea)의 요소가 비활성화됨을 명시</>],
                        ["readOnly?", "boolean", "", <>요소의 텍스트 입력 영역(Textarea)가 읽기 전용임을 명시</>],
                        [
                            "invalid?",
                            "any",
                            "",
                            <>텍스트 입력 영역(Textarea) 내용의 유효성검사 시 false일 경우에 나타내는 가상클래스</>,
                        ],
                        [
                            "size?",
                            "number",
                            "",
                            <>텍스트 입력 영역(Textarea)의 너비를 문자수(in characters) 단위로 명시</>,
                        ],
                        ["defaultValue?", "any", "", <>텍스트 입력 영역(Textarea)의 기본값을 설정</>],
                        ["onFocus?", "void", "", <>텍스트 입력 영역(Textarea)의 포커스를 받은 경우 호출</>],
                        ["mask?", "string", "", <>텍스트 입력 영역(Textarea)의 특정한 규칙을 설정</>],
                        ["message?", "string", "", <>텍스트 입력 영역(Textarea) 하단의 알림 메세지 설정</>],
                        [
                            "maxLength?",
                            "number",
                            "",
                            <>텍스트 입력 영역(Textarea)에 입력할 수 있는 최대 문자수를 명시</>,
                        ],
                        ["decimalScale?", "number", "", <>텍스트 입력 영역(Textarea)의 허용되는 소수 자릿수를 제어</>],
                        ["thousandSeparator?", "boolean", "", <>텍스트 입력 영역(Textarea)의 1000단위 콤마 설정</>],
                        [
                            "letterCase?",
                            "string",
                            "",
                            <>텍스트 입력 영역(Textarea)의 대문자 또는 소문자 설정 (대문자 : upper / 소문자 : lower)</>,
                        ],
                        ["minLength?", "number", "", <>텍스트 입력 영역(Textarea)에 입력해야하는 최소 문자수를 명시</>],
                    ]}
                />

                <Sample.Code>{`<FormControl type="textarea" value={'Textarea field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" value={"Textarea field"} rows={10} />
                </Page>

                <Sample.Code>{` <FormControl type="textarea" name={'Textarea field'}/>`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" name={"Textarea field"} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" rightText={'Textarea field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" rightText={"Textarea field"} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" leftButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" leftButton={{ icon: "search" }} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" rightButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" rightButton={{ icon: "search" }} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" onChange={(event) => { alert(event.target.value)}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="textarea"
                        onChange={(event) => {
                            alert(event.target.value);
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" onBlur={() => { alert('Textarea field')}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="textarea"
                        onBlur={() => {
                            alert("Textarea field");
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" disabled={true} defaultValue={'Textarea field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" disabled={true} defaultValue={"Textarea field"} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" readOnly={true} defaultValue={'Textarea field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" readOnly={true} defaultValue={"Textarea field"} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" invalid={{message:"invalid"}}/>`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" invalid={{ message: "invalid" }} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" size={5} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" size={5} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" defaultValue={'Textarea field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" defaultValue={"Textarea field"} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" onFocus={() => { console.log('Textarea field')}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="textarea"
                        onFocus={() => {
                            console.log("Textarea field");
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" mask={'AAA-000-aaa'} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" mask={"AAA-000-aaa"} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" message={'error!!!'} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" message={"error!!!"} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" maxLength={3} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" maxLength={3} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" decimalScale={3} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" decimalScale={3} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" thousandSeparator={true} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" thousandSeparator={true} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" letterCase={'upper'} />`}</Sample.Code>
                <Page>
                    <FormControl type="textarea" letterCase={"upper"} />
                </Page>

                <Sample.Code>{`<FormControl type="textarea" minLength={10} />`}</Sample.Code>
                <Page></Page>
            </Sample.Section>
        </Sample>
    );
};
