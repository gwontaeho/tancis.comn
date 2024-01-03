import React from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, FormControl } from "@/comn/components";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

export const SampleFormControlTime = () => {
    React.useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <Sample title="Time">
            <Sample.Section
                title={`<FormControl type="time" />`}
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
                        ["value?", "any", "", <>시간 필드(time field)에 나타나는 초깃값을 설정</>],
                        ["name?", "string", "", <>시간 필드(time field)의 name값 설정</>],
                        ["rightText?", "string", "", <>시간 필드(time field) 오른쪽의 텍스트 배치</>],
                        [
                            "leftButton?",
                            "React.ButtonHTMLAttributes<HTMLButtonElement>",
                            "",
                            <>시간 필드(time field) 왼쪽의 버튼 배치</>,
                        ],
                        [
                            "rightButton?",
                            "React.ButtonHTMLAttributes<HTMLButtonElement>",
                            "",
                            <>시간 필드(time field) 오른쪽의 버튼 배치</>,
                        ],
                        ["onChange?", "void", "", <>값이 변경된 직후가 아니라, 변경되고 포커스를 잃을 때 발생</>],
                        ["onBlur?", "void", "", <>포커스 된 시간 필드(time field)의 포커스가 사라졌을 때 호출</>],
                        ["disabled?", "boolean", "", <>시간 필드(time field)의 요소가 비활성화됨을 명시</>],
                        ["readOnly?", "boolean", "", <>요소의 시간 필드(time field)가 읽기 전용임을 명시</>],
                        [
                            "invalid?",
                            "any",
                            "",
                            <>시간 필드(time field) 내용의 유효성검사 시 false일 경우에 나타내는 가상클래스</>,
                        ],
                        ["size?", "number", "", <>시간 필드(time field)의 너비를 문자수(in characters) 단위로 명시</>],
                        ["defaultValue?", "any", "", <>시간 필드(time field)의 기본값을 설정</>],
                        ["onFocus?", "void", "", <>시간 필드(time field)의 포커스를 받은 경우 호출</>],
                        ["message?", "string", "", <>시간 필드(time field) 하단의 알림 메세지 설정</>],
                    ]}
                />

                <Sample.Code>{`<FormControl type="time" value={new Date("2024-01-03T03:24:00")} />`}</Sample.Code>
                <Page>
                    <FormControl type="time" value={new Date("2024-01-03T03:24:00")} />
                </Page>

                <Sample.Code>{` <FormControl type="time" name={'Time field'}/>`}</Sample.Code>
                <Page>
                    <FormControl type="time" name={"Time field"} />
                </Page>

                <Sample.Code>{`<FormControl type="time" rightText={'Time field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="time" rightText={"Time field"} />
                </Page>

                <Sample.Code>{`<FormControl type="time" leftButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="time" leftButton={{ icon: "search" }} />
                </Page>

                <Sample.Code>{`<FormControl type="time" rightButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="time" rightButton={{ icon: "search" }} />
                </Page>

                <Sample.Code>{`<FormControl type="time" onChange={(event) => { alert(event.target.value)}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="time"
                        onChange={(event) => {
                            alert(event.target.value);
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="time" onBlur={() => { alert('Time field')}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="time"
                        onBlur={() => {
                            alert("Time field");
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="time" disabled={true} value={new Date("2024-01-03T03:24:00")} />`}</Sample.Code>
                <Page>
                    <FormControl type="time" disabled={true} value={new Date("2024-01-03T03:24:00")} />
                </Page>

                <Sample.Code>{`<FormControl type="time" readOnly={true} value={new Date("2024-01-03T03:24:00")} />`}</Sample.Code>
                <Page>
                    <FormControl type="time" readOnly={true} value={new Date("2024-01-03T03:24:00")} />
                </Page>

                <Sample.Code>{`<FormControl type="time" invalid={{message:"invalid"}}/>`}</Sample.Code>
                <Page>
                    <FormControl type="time" invalid={{ message: "invalid" }} />
                </Page>

                <Sample.Code>{`<FormControl type="time" size={5} />`}</Sample.Code>
                <Page>
                    <FormControl type="time" size={5} />
                </Page>

                <Sample.Code>{`<FormControl type="time" defaultValue={'Time field'} />`}</Sample.Code>
                <Page>
                    <FormControl type="time" defaultValue={new Date("2024-01-03")} />
                </Page>

                <Sample.Code>{`<FormControl type="time" onFocus={() => { console.log('Time field')}} />`}</Sample.Code>
                <Page>
                    <FormControl
                        type="time"
                        onFocus={() => {
                            console.log("Time field");
                        }}
                    />
                </Page>

                <Sample.Code>{`<FormControl type="time" message={'error!!!'} />`}</Sample.Code>
                <Page>
                    <FormControl type="time" message={"error!!!"} />
                </Page>
            </Sample.Section>
        </Sample>
    );
};
