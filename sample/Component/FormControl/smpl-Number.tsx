import React from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group , FormControl } from "@/comn/components";
import Prism from "prismjs";
import { useForm, FormSchemaType } from "@/comn/hooks";
import "prismjs/themes/prism.css";
export const SampleFormControlNumber = () => {
    

    React.useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <Sample title="Number">
            <Sample.Section
                title={`<FormControl type="number" />`}
                description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
            >
                <Sample.Table
                    data={[
                        ["Properties", "Type", "Default", "Description"],
                        ["type","string","text",
                            <>
                                text,
                                <br /> number, password, select, radio, checkbox, textarea, datetime , file, daterange,
                                timerange, code
                            </>,
                        ],
                        ["value?", "any", "", <>입력 필드(input field)에 나타나는 초깃값을 설정</>],
                        ["name?", "string", "", <>입력 필드(input field)의 name값 설정</>],
                        ["rightText?", "string", "", <>입력 필드(input field) 오른쪽의 텍스트 배치</>],
                        ["leftButton?", "React.ButtonHTMLAttributes<HTMLButtonElement>", "",<>입력 필드(input field) 왼쪽의 버튼 배치</>,],
                        ["rightButton?", "React.ButtonHTMLAttributes<HTMLButtonElement>", "",<>입력 필드(input field) 오른쪽의 버튼 배치</>,],
                        ["onChange?", "void", "", <>값이 변경된 직후가 아니라, 변경되고 포커스를 잃을 때 발생</>],
                        ["onBlur?", "void", "", <>포커스 된 입력 필드(input field)의 포커스가 사라졌을 때 호출</>],
                        ["disabled?", "boolean", "", <>입력 필드(input field)의 요소가 비활성화됨을 명시</>],
                        ["readOnly?", "boolean", "", <>요소의 입력 필드(input field)가 읽기 전용임을 명시</>],
                        ["invalid?", "any", "", <>입력 필드(input field) 내용의 유효성검사 시 false일 경우에 나타내는 가상클래스</>],
                        ["size?", "number", "", <>입력 필드(input field)의 너비를 문자수(in characters) 단위로 명시</>],
                        ["defaultValue?", "any", "", <>입력 필드(input field)의 기본값을 설정</>],
                        ["onFocus?", "void", "", <>입력 필드(input field)의 포커스를 받은 경우 호출</>],
                        ["mask?", "string", "", <>입력 필드(input field)의 특정한 규칙을 설정</>],
                        ["message?", "string", "", <>입력 필드(input field) 하단의 알림 메세지 설정</>],
                        ["maxLength?", "number", "", <>입력 필드(input field)에 입력할 수 있는 최대 문자수를 명시</>],
                        ["decimalScale?", "number", "", <>입력 필드(input field)의 허용되는 소수 자릿수를 제어</>],
                        ["thousandSeparator?", "boolean", "", <>입력 필드(input field)의 1000단위 콤마 설정</>],
                        ["minLength?", "number", "", <>입력 필드(input field)에 입력해야하는 최소 문자수를 명시</>],
                    ]}
                />

                
                <Sample.Code>{`<FormControl type="number" value={'000000'} />`}</Sample.Code>
                <Page>
                    <FormControl type="number" value={'000000'} />
                </Page>

                <Sample.Code>{` <FormControl type="number" name={'number'}/>`}</Sample.Code>
                <Page>
                    <FormControl type="number" name={'number'}/>
                </Page>

                <Sample.Code>{`<FormControl type="number" rightText={'000000'} />`}</Sample.Code>
                <Page>
                    <FormControl type="number" rightText={'000000'} />
                </Page>

                <Sample.Code>{`<FormControl type="number" leftButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="number" leftButton={{ icon: 'search'}} />
                </Page>

                <Sample.Code>{`<FormControl type="number" rightButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <FormControl type="number" rightButton={{ icon: 'search'}} />
                </Page>

                <Sample.Code>{`<FormControl type="number" onChange={(event) => { alert(event.target.value)}} />`}</Sample.Code>
                <Page>
                    <FormControl type="number" onChange={(event) => { alert(event.target.value)}} />
                </Page>

                <Sample.Code>{`<FormControl type="number" onBlur={() => { alert('000000')}} />`}</Sample.Code>
                <Page>
                    <FormControl type="number" onBlur={() => { alert('000000')}} />
                </Page>

                <Sample.Code>{`<FormControl type="number" disabled={true} defaultValue={'000000'} />`}</Sample.Code>
                <Page>
                    <FormControl type="number" disabled={true} defaultValue={'000000'}/>
                </Page>

                <Sample.Code>{`<FormControl type="number" readOnly={true} defaultValue={'000000'} />`}</Sample.Code>
                <Page>
                   <FormControl type="number" readOnly={true} defaultValue={'000000'} />
                </Page>

                <Sample.Code>{`<FormControl type="number" invalid={{message:"invalid"}}/>`}</Sample.Code>
                <Page>
                    <FormControl type="number" invalid={{message:"invalid"}}/>
                </Page>
              
                <Sample.Code>{`<FormControl type="number" size={5} />`}</Sample.Code>
                <Page>
                     <FormControl type="number" size={5} />
                </Page>

                <Sample.Code>{`<FormControl type="number" defaultValue={'000000'} />`}</Sample.Code>
                <Page>
                  <FormControl type="number" defaultValue={'000000'} />
                 </Page>


                <Sample.Code>{`<FormControl type="number" onFocus={() => { console.log('000000')}} />`}</Sample.Code>
                <Page>
                  <FormControl type="number" onFocus={() => { console.log('000000')}} />
                </Page>

                <Sample.Code>{`<FormControl type="number" mask={'12-12'} />`}</Sample.Code>
                <Page>
                  <FormControl type="number" mask={'12-12'} />
                </Page>

                <Sample.Code>{`<FormControl type="number" message={'error!!!'} />`}</Sample.Code>
                <Page>
                  <FormControl type="number" message={'error!!!'} />
                </Page>

                <Sample.Code>{`<FormControl type="number" maxLength={3} />`}</Sample.Code>
                <Page>
                  <FormControl type="number" maxLength={3} />
                </Page>

                <Sample.Code>{`<FormControl type="number" decimalScale={3} />`}</Sample.Code>
                <Page>
                  <FormControl type="number" decimalScale={3} />
                </Page>

                <Sample.Code>{`<FormControl type="number" thousandSeparator={true} />`}</Sample.Code>
                <Page>
                  <FormControl type="number" thousandSeparator={true} />
                </Page>


                <Sample.Code>{`<FormControl type="number" minLength={10} />`}</Sample.Code>
                <Page>
                  <FormControl type="number" minLength={10} />
                </Page>
            </Sample.Section>
        </Sample>
    );
};
