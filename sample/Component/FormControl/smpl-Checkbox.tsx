import React from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, FormControl } from "@/comn/components";
import Prism from "prismjs";
import { useForm, FormSchemaType } from "@/comn/hooks";
import "prismjs/themes/prism.css";

export const SampleFormControlCheckbox = () => {
    React.useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <Sample title="Checkbox">
            <Sample.Section
                title={`<FormControl type="checkbox" />`}
                description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
            >
                <Sample.Table
                    data={[
                        ["Properties", "Type", "Default", "Description"],
                        ["type","string","text",<>    text,    <br /> number, password, select, radio, checkbox, textarea, datetime , file, daterange,    timerange, code</>,],
                        ["options?", "TFormControlOptions", "", <>체크 박스(checkbox)의 옵션 메뉴를 제공하는 드롭다운 리스트 </>],
                        ["name?", "string", "", <>체크 박스(checkbox)의 name값 설정</>],
                        ["rightText?", "string", "", <>체크 박스(checkbox) 오른쪽의 텍스트 배치</>],
                        ["onChange?", "void", "", <>값이 변경된 직후가 아니라, 변경되고 포커스를 잃을 때 발생</>],
                        ["onBlur?", "void", "", <>포커스 된 체크 박스(checkbox)의 포커스가 사라졌을 때 호출</>],
                        ["disabled?", "boolean", "", <>체크 박스(checkbox)의 요소가 비활성화됨을 명시</>],
                        ["invalid?","any","",<>체크 박스(checkbox) 내용의 유효성검사 시 false일 경우에 나타내는 가상클래스</>,],
                        ["defaultValue?", "any", "", <>체크 박스(checkbox)의 기본값을 설정</>],
                        ["onFocus?", "void", "", <>체크 박스(checkbox)의 포커스를 받은 경우 호출</>],
                        ["message?", "string", "", <>체크 박스(checkbox) 하단의 알림 메세지 설정</>],
                        ["area?", "string", "", <>체크 박스(checkbox) 공통 코드를 설정</>],
                        ["comnCd?", "string", "", <>체크 박스(checkbox) 공통 코드를 호출</>],
                    ]}
                />

                <Sample.Code>{`<FormControl type="checkbox" options={[{ label: "radio 1", value: "1" }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="checkbox" name={"Radio field"} options={[{ label: "radio 1", value: "1" }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" name={"Radio field"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="checkbox" rightText={"Radio field"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" rightText={"Radio field"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="checkbox" onChange={(event) => {alert(event.target.value);}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" onChange={(event) => {alert(event.target.value);}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="checkbox" onBlur={() => {alert("Radio field");}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" onBlur={() => {alert("Radio field");}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="checkbox" disabled={true} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" disabled={true} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="checkbox" invalid={{ message: "invalid" }} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" invalid={{ message: "invalid" }} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="checkbox" defaultValue={"2"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" defaultValue={"2"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="checkbox" onFocus={() => {console.log("Radio field");}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" onFocus={() => {console.log("Radio field");}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="checkbox" message={"error!!!"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" message={"error!!!"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="checkbox" area="currCd" />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" area="currCd" />
                </Page>

                <Sample.Code>{`<FormControl type="checkbox" comnCd="COM_0015" />`}</Sample.Code>
                <Page>
                    <FormControl type="checkbox" comnCd="COM_0015" />
                </Page>


            </Sample.Section>
        </Sample>
    );
};
