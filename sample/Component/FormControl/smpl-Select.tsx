import React from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, FormControl } from "@/comn/components";
import Prism from "prismjs";
import { useForm, FormSchemaType } from "@/comn/hooks";
import "prismjs/themes/prism.css";

export const SampleFormControlSelect = () => {
    React.useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <Sample title="Select">
            <Sample.Section
                title={`<FormControl type="select" />`}
                description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
            >
                <Sample.Table
                    data={[
                        ["Properties", "Type", "Default", "Description"],
                        ["type", "string", "text", <>     text,     <br /> number, password, select, radio, checkbox, textarea, datetime , file, daterange,     timerange, code </>,],
                        ["options?", "TFormControlOptions", "", <>콤보 박스(select box)의 옵션 메뉴를 제공하는 드롭다운 리스트 </>],
                        ["value?", "any", "", <>콤보 박스(select box)에 나타나는 초깃값을 설정</>],
                        ["name?", "string", "", <>콤보 박스(select box)의 name값 설정</>],
                        ["rightText?", "string", "", <>콤보 박스(select box) 오른쪽의 텍스트 배치</>],
                        ["leftButton?", "React.ButtonHTMLAttributes<HTMLButtonElement>", "", <>콤보 박스(select box) 왼쪽의 버튼 배치</>,],
                        ["rightButton?", "React.ButtonHTMLAttributes<HTMLButtonElement>", "", <>콤보 박스(select box) 오른쪽의 버튼 배치</>,],
                        ["onChange?", "void", "", <>값이 변경된 직후가 아니라, 변경되고 포커스를 잃을 때 발생</>],
                        ["onBlur?", "void", "", <>포커스 된 콤보 박스(select box)의 포커스가 사라졌을 때 호출</>],
                        ["disabled?", "boolean", "", <>콤보 박스(select box)의 요소가 비활성화됨을 명시</>],
                        ["readOnly?", "boolean", "", <>요소의 콤보 박스(select box)가 읽기 전용임을 명시</>],
                        ["defaultValue?", "any", "", <>콤보 박스(select box)의 기본값을 설정</>],
                        ["message?", "string", "", <>콤보 박스(select box) 하단의 알림 메세지 설정</>],
                        ["all?", "boolean", "", <>콤보 박스(select box)의 전체 옵션 설정</>],
                    ]}
                />

                <Sample.Code>{`<FormControl type="select" options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl type="select" options={[{ label: "Select field 1", value: "1" },
                                                        { label: "Select field 2", value: "2" },
                                                        { label: "Select field 3", value: "3" },]}/>
                </Page>
             
                <Sample.Code>{`<FormControl type="select" value={"Select field"} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl type="select" value={"Select field"} options={[{ label: "Select field 1", value: "1" },
                                                                              { label: "Select field 2", value: "2" },
                                                                              { label: "Select field 3", value: "3" },]}/>
                </Page>

                <Sample.Code>{`<FormControl type="select" name={'Select field'} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl type="select" name={"Select field"} options={[{ label: "Select field 1", value: "1",},
                                                                              { label: "Select field 2", value: "2" },
                                                                              { label: "Select field 3", value: "3" },]}/>
                </Page>

                <Sample.Code>{`<FormControl type="select" rightText={'Text field'} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl type="select" rightText={"Select field"}  options={[{ label: "Select field 1", value: "1",},
                                                                              { label: "Select field 2", value: "2" },
                                                                              { label: "Select field 3", value: "3" },]}/>
                </Page>

                <Sample.Code>{`<FormControl type="select" leftButton={{ icon: 'search'}} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl type="select" leftButton={{ icon: "search" }} options={[{ label: "Select field 1", value: "1",},
                                                                              { label: "Select field 2", value: "2" },
                                                                              { label: "Select field 3", value: "3" },]}/>
                </Page>

                <Sample.Code>{`<FormControl type="select" rightButton={{ icon: 'search'}} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl type="select" rightButton={{ icon: "search" }} options={[{ label: "Select field 1", value: "1",},
                                                                              { label: "Select field 2", value: "2" },
                                                                              { label: "Select field 3", value: "3" },]}/>
                </Page>

                <Sample.Code>{`<FormControl type="select" onChange={(event) => { alert(event.target.value)}} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl
                        type="select"
                        onChange={(event) => { alert(event.target.value);
                        }}
                        options={[{ label: "Select field 1", value: "1",},
                        { label: "Select field 2", value: "2" },
                        { label: "Select field 3", value: "3" },]}/>
                </Page>

                <Sample.Code>{`<FormControl type="select" onBlur={() => { alert('Text field')}} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl
                        type="select"
                        onBlur={() => { alert("Select field");
                        }}
                        options={[{ label: "Select field 1", value: "1",},
                            { label: "Select field 2", value: "2" },
                            { label: "Select field 3", value: "3" },]}/>
                </Page>

                <Sample.Code>{`<FormControl type="select" disabled={true} defaultValue={'Text field'} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl type="select" disabled={true} defaultValue={"Text field"}  options={[{ label: "Select field 1", value: "1",},
                                                                                                    { label: "Select field 2", value: "2" },
                                                                                                    { label: "Select field 3", value: "3" },]}/>
                </Page>

                <Sample.Code>{`<FormControl type="select" readOnly={true} defaultValue={'2'} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl type="select" readOnly={true} defaultValue={"2"} options={[{ label: "Select field 1", value: "1",},
                                                                                                    { label: "Select field 2", value: "2" },
                                                                                                    { label: "Select field 3", value: "3" },]}/>
                </Page>

              
                <Sample.Code>{`<FormControl type="select" defaultValue={'Text field'} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl type="select" defaultValue={"Text field"} options={[{ label: "Select field 1", value: "1",},
                                                                                    { label: "Select field 2", value: "2" },
                                                                                    { label: "Select field 3", value: "3" },]}/>
                </Page>

                <Sample.Code>{`<FormControl type="select" message={'error!!!'} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl type="select" message={"error!!!"} options={[{ label: "Select field 1", value: "1",},
                                                                            { label: "Select field 2", value: "2" },
                                                                            { label: "Select field 3", value: "3" },]}/>
                </Page>

                <Sample.Code>{`<FormControl type="select" all={true} options={[{ label: "Select field 1", value: "1" }, { label: "Select field 2", value: "2" },{ label: "Select field 3", value: "3" },]}/>`}</Sample.Code>
                <Page>
                    <FormControl type="select" all={true} options={[{ label: "Select field 1", value: "1",},
                                                                            { label: "Select field 2", value: "2" },
                                                                            { label: "Select field 3", value: "3" },]}/>
                </Page>

            </Sample.Section>
        </Sample>
    );
};
