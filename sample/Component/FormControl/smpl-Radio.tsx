import React from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group, FormControl } from "@/comn/components";
import Prism from "prismjs";
import { useForm, FormSchemaType } from "@/comn/hooks";
import "prismjs/themes/prism.css";

export const SampleFormControlRadio = () => {
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
                        ["type","string","text",<>    text,    <br /> number, password, select, radio, checkbox, textarea, datetime , file, daterange,    timerange, code</>,],
                        ["name?", "string", "", <>라디오 버튼(radio button)의 name값 설정</>],
                        ["rightText?", "string", "", <>라디오 버튼(radio button) 오른쪽의 텍스트 배치</>],
                        ["onChange?", "void", "", <>값이 변경된 직후가 아니라, 변경되고 포커스를 잃을 때 발생</>],
                        ["onBlur?", "void", "", <>포커스 된 라디오 버튼(radio button)의 포커스가 사라졌을 때 호출</>],
                        ["disabled?", "boolean", "", <>라디오 버튼(radio button)의 요소가 비활성화됨을 명시</>],
                        ["invalid?","any","",<>라디오 버튼(radio button) 내용의 유효성검사 시 false일 경우에 나타내는 가상클래스</>,],
                        ["defaultValue?", "any", "", <>라디오 버튼(radio button)의 기본값을 설정</>],
                        ["onFocus?", "void", "", <>라디오 버튼(radio button)의 포커스를 받은 경우 호출</>],
                        ["message?", "string", "", <>라디오 버튼(radio button) 하단의 알림 메세지 설정</>],
                    ]}
                />
              
                <Sample.Code>{`<FormControl type="checkbox" name={"Radio field"} options={[{ label: "radio 1", value: "1" }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="radio" name={"Radio field"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="radio" rightText={"Radio field"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="radio" rightText={"Radio field"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="radio" onChange={(event) => {alert(event.target.value);}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="radio" onChange={(event) => {alert(event.target.value);}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="radio" onBlur={() => {alert("Radio field");}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="radio" onBlur={() => {alert("Radio field");}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="radio" disabled={true} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="radio" disabled={true} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="radio" invalid={{ message: "invalid" }} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="radio" invalid={{ message: "invalid" }} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="radio" defaultValue={"2"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="radio" defaultValue={"2"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="radio" onFocus={() => {console.log("Radio field");}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="radio" onFocus={() => {console.log("Radio field");}} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>

                <Sample.Code>{`<FormControl type="radio" message={"error!!!"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />`}</Sample.Code>
                <Page>
                    <FormControl type="radio" message={"error!!!"} options={[{ label: "radio 1", value: "1",  }, { label: "radio 2", value: "2" }, { label: "radio 3", value: "3" }]} />
                </Page>



            </Sample.Section>
        </Sample>
    );
};
