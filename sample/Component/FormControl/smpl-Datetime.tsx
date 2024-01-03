import React from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, FormControl } from "@/comn/components";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

export const SampleFormControlDatetime = () => {
    React.useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <Sample title="Datetime">
            <Sample.Section
                title={`<FormControl type="datetime" />`}
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
                        ["value?", "any", "", <>날짜시간 필드(datetime field)에 나타나는 초깃값을 설정</>],
                        ["name?", "string", "", <>날짜시간 필드(datetime field)의 name값 설정</>],
                        ["rightText?", "string", "", <>날짜시간 필드(datetime field) 오른쪽의 텍스트 배치</>],
                        [
                            "leftButton?",
                            "React.ButtonHTMLAttributes<HTMLButtonElement>",
                            "",
                            <>날짜시간 필드(datetime field) 왼쪽의 버튼 배치</>,
                        ],
                        [
                            "rightButton?",
                            "React.ButtonHTMLAttributes<HTMLButtonElement>",
                            "",
                            <>날짜시간 필드(datetime field) 오른쪽의 버튼 배치</>,
                        ],
                        ["onChange?", "void", "", <>값이 변경된 직후가 아니라, 변경되고 포커스를 잃을 때 발생</>],
                        [
                            "onBlur?",
                            "void",
                            "",
                            <>포커스 된 날짜시간 필드(datetime field)의 포커스가 사라졌을 때 호출</>,
                        ],
                        ["disabled?", "boolean", "", <>날짜시간 필드(datetime field)의 요소가 비활성화됨을 명시</>],
                        ["readOnly?", "boolean", "", <>요소의 날짜시간 필드(datetime field)가 읽기 전용임을 명시</>],
                        [
                            "invalid?",
                            "any",
                            "",
                            <>날짜시간 필드(datetime field) 내용의 유효성검사 시 false일 경우에 나타내는 가상클래스</>,
                        ],
                        [
                            "size?",
                            "number",
                            "",
                            <>날짜시간 필드(datetime field)의 너비를 문자수(in characters) 단위로 명시</>,
                        ],
                        ["defaultValue?", "any", "", <>날짜시간 필드(datetime field)의 기본값을 설정</>],
                        ["onFocus?", "void", "", <>날짜시간 필드(datetime field)의 포커스를 받은 경우 호출</>],
                        ["message?", "string", "", <>날짜시간 필드(datetime field) 하단의 알림 메세지 설정</>],
                    ]}
                />

                <Sample.Code>{`<FormControl type="datetime" value={new Date("2024-01-03T06:24:00")} />`}</Sample.Code>
                <Page>
                    <FormControl type="datetime" value={new Date("2024-01-03T06:24:00")} />
                </Page>

                <Sample.Code>{` <FormControl type="datetime" name={'Date field'}/>`}</Sample.Code>
                <Page>
                    <FormControl type="datetime" name={"Date field"} />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" rightText={'Date field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="datetime" rightText={"Date field"} />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" leftButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="datetime" leftButton={{ icon: "search" }} />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" rightButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="datetime" rightButton={{ icon: "search" }} />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" onChange={(event) => { alert(event.target.value)}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="datetime"
                        onChange={(event) => {
                            alert(event.target.value);
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" onBlur={() => { alert('Date field')}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="datetime"
                        onBlur={() => {
                            alert("Date field");
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" disabled={true} value={new Date("2024-01-03")} />`}</Sample.Code>
                <Page>
                    <FormControl type="datetime" disabled={true} value={new Date("2024-01-03")} />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" readOnly={true} value={new Date("2024-01-03")} />`}</Sample.Code>
                <Page>
                    <FormControl type="datetime" readOnly={true} value={new Date("2024-01-03")} />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" invalid={{message:"invalid"}}/>`}</Sample.Code>
                <Page>
                    <FormControl type="datetime" invalid={{ message: "invalid" }} />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" size={5} />`}</Sample.Code>
                <Page>
                    <FormControl type="datetime" size={5} />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" defaultValue={'Date field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="datetime" defaultValue={new Date("2024-01-03")} />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" onFocus={() => { console.log('Date field')}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="datetime"
                        onFocus={() => {
                            console.log("Date field");
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="datetime" message={'error!!!'} />`}</Sample.Code>
                <Page>
                    <FormControl type="datetime" message={"error!!!"} />
                </Page>
            </Sample.Section>
        </Sample>
    );
};
