import React from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group } from "@/comn/components";
import Prism from "prismjs";
import { useForm, FormSchemaType } from "@/comn/hooks";
import "prismjs/themes/prism.css";

export const SCHEMA_FORM: FormSchemaType = {
    id: "form",
    schema: {
        field1: { type: "text", label: "Text Field 1", value: "Text Field 1" },
        field2: { type: "text", label: "Text Field 2", value: "Text Field 2"},
        field3: { type: "text", label: "Text Field 3", value: ""},
        field4: { type: "text", label: "Text Field 4", value: ""},
        field5: { type: "text", label: "Text Field 5", value: ""},
        field6: { type: "text", label: "Text Field 6", value: ""},
        field7: { type: "text", label: "Text Field 7", value: ""},
        field8: { type: "text", label: "Text Field 8", value: ""},
        field9: { type: "text", label: "Text Field 9", value: "Text Field 9"},
        field10: { type: "text", label: "Text Field 10", value: "Text Field 10"},
        field11: { type: "text", label: "Text Field 11", value: ""},
        field12: { type: "file", label: "Text Field 12", value: "",},
        field13: { type: "text", label: "Text Field 13", value: ""},
        field14: { type: "text", label: "Text Field 14", defaultValue: "Text Field 14"},
        field15: { type: "text", label: "Text Field 15", value: ""},
        field16: { type: "text", label: "Text Field 16", value: "", mask: 'AAA-000-aaa'},
        field17: { type: "text", label: "Text Field 17", value: ""},
        field18: { type: "text", label: "Text Field 18", value: ""},
        field19: { type: "text", label: "Text Field 19", value: ""},
        field20: { type: "text", label: "Text Field 20", value: ""},
        field21: { type: "text", label: "Text Field 21", value: ""},
        field22: { type: "text", label: "Text Field 22", value: ""},
    },
}
export const SampleFormControlText = () => {
    
    const form = useForm({
            defaultSchema: SCHEMA_FORM,            
          
        })
    

    React.useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <Sample title="Text">
            <Sample.Section
                title={`<Group.Control type="text" />`}
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
                        ["edit?", "boolean", "", <>입력 필드(input field)의 텍스트 조회</>],
                        ["rightText?", "string", "", <>입력 필드(input field) 오른쪽의 텍스트 배치</>],
                        ["leftButton?", "React.ButtonHTMLAttributes<HTMLButtonElement>", "", <>입력 필드(input field) 왼쪽의 버튼 배치</>],
                        ["rightButton?", "React.ButtonHTMLAttributes<HTMLButtonElement>", "", <>입력 필드(input field) 오른쪽의 버튼 배치</>],
                        ["onChange?", "void", "", <>값이 변경된 직후가 아니라, 변경되고 포커스를 잃을 때 발생</>],
                        ["onBlur?", "void", "", <>포커스 된 입력 필드(input field)의 포커스가 사라졌을 때 호출</>],
                        ["disabled?", "boolean", "", <>입력 필드(input field)의 요소가 비활성화됨을 명시</>],
                        ["readOnly?", "boolean", "", <>요소의 입력 필드(input field)가 읽기 전용임을 명시</>],
                        ["invalid?", "any", "", <>입력 필드(input field) 내용의 유효성검사 시 false일 경우에 나타내는 가상클래스</>],
                        ["multiple?", "boolean", "", <>입력 필드(input field)에 사용자가 둘 이상의 값을 입력할 수 있음을 명시</>],
                        ["size?", "keyof typeof SIZES", "", <>입력 필드(input field)의 너비를 문자수(in characters) 단위로 명시</>],
                        ["defaultValue?", "any", "", <>입력 필드(input field)의 기본값을 설정</>],
                        ["onFocus?", "void", "", <>입력 필드(input field)의 포커스를 받은 경우 호출</>],
                        ["mask?", "string", "", <>입력 필드(input field)의 특정한 규칙을 설정</>],
                    ]}
                />

                
                <Sample.Code>{`test`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control type="text" label="Text field 11" mask={'AAA-111-aaa'} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field1} type="text" label="Text field 1" value={'Text field 1'} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field1} type="text" label="Text field 1" value={'Text field 1'} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field2} type="text" label="Text field 2" edit={false} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field2} type="text" label="Text field 2" edit={false} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field3} type="text" label="Text field 3" name={'Text field 3'} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field3} type="text" label="Text field 3" name={'Text field 3'}/>
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field4} type="text" label="Text field" rightText={'Text field 4'} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field4} type="text" label="Text field 4" rightText={'Text field 4'} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field5} type="text" label="Text field" leftButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field5} type="text" label="Text field 5" leftButton={{ icon: 'search'}} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field6} type="text" label="Text field 6" rightButton={{ icon: 'search'}} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field6} type="text" label="Text field 6" rightButton={{ icon: 'search'}} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field7} type="text" label="Text field 7" onChange={(event) => { alert(event.target.value)}} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field7} type="text" label="Text field 7" onChange={(event) => { alert(event.target.value)}} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field8} type="text" label="Text field 8" onBlur={() => { alert('Text field 8')}} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field8} type="text" label="Text field 8" onBlur={() => { alert('Text field 8')}} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field9} type="text" label="Text field 9" disabled={true} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field9} type="text" label="Text field 9" disabled={true} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field10} type="text" label="Text field 10" readOnly={true} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field10} type="text" label="Text field 10" readOnly={true} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field11} type="text" label="Text field 11" invalid={true} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field11} type="text" label="Text field 11" invalid={true} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field12} type="file" label="Text field 12" multiple={true} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field12} type="file" label="Text field 12" multiple={true} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>
              
                <Sample.Code>{`<Group.Control {...form.schema.field13} type="text" label="Text field 13" size={5} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field13} type="text" label="Text field 13" size={5} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field14} type="text" label="Text field 14" defaultValue={'Text field 14'} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field14} type="text" label="Text field 14" defaultValue={'Text field 14'} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>


                <Sample.Code>{`<Group.Control {...form.schema.field15} type="text" label="Text field 15" onFocus={() => { console.log('Text field 15')}} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field15} type="text" label="Text field 15" onFocus={() => { console.log('Text field 15')}} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>

                <Sample.Code>{`<Group.Control {...form.schema.field16} type="text" label="Text field 16" mask={'AAA-000-aaa'} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control {...form.schema.field16}  label="Text field 16" mask={'AAA-000-aaa'} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>
            </Sample.Section>
           
        </Sample>
    );
};
