import React from "react";
import { Sample } from "@/comn/components/_";
import { Page, Group } from "@/comn/components";
import Prism from "prismjs";
import "prismjs/themes/prism.css";

export const SampleFormControlText = () => {
    const br = <br />;
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
                        ["label?", "ReactNode", "", <>화면에 표시될 라벨(컴포넌트)</>],
                        ["defaultValue?", "any", "", <>컴포넌트 초기 값111</>],
                    ]}
                />

                <Sample.Code>{`<Group.Control type="text" label="Text field" required={true} />`}</Sample.Code>
                <Page>
                    <Group>
                        <Group.Body>
                            <Group.Row>
                                <Group.Control type="text" label="Text field" required={true} />
                            </Group.Row>
                        </Group.Body>
                    </Group>
                </Page>
            </Sample.Section>
            <Sample.Section
                title="<Page />"
                description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
            >
                <Sample.Code>{`<Page>
    <Page.Header id="sample" title="sample" description="sample" />
    <Page.Navigation base="/" nodes={[{ path: 'sample', label: 'sample' }]} />
</Page>`}</Sample.Code>

                <Page>
                    <Page.Navigation base="/" nodes={[{ path: "sample", label: "sample" }]} />
                    <Page.Header id="sample" title="sample" description="sample" />
                </Page>
            </Sample.Section>

            <Sample.Section
                title="<Page.Navigation />"
                description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
            >
                <Sample.Table
                    data={[
                        ["Properties", "Type", "Default", "Description"],
                        ["base?", "string", "", ""],
                        ["nodes?", "NodeType[]", "true", ""],
                        ["popup?", "boolean", "default", ""],
                    ]}
                />

                <Sample.Code>{`<Page.Navigation base="/" nodes={[{ path: 'sample', label: 'sample' }]} />`}</Sample.Code>
            </Sample.Section>

            <Sample.Section
                title="<Page.Header />"
                description="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout"
            >
                <Sample.Table
                    data={[
                        ["Properties", "Type", "Default", "Description"],
                        ["id?", "string", "", ""],
                        ["title?", "NodeType[]", "true", ""],
                        ["description?", "boolean", "default", ""],
                    ]}
                />
                <Sample.Code>{`<Page.Header id="sample" title="sample" description="sample" />`}</Sample.Code>
            </Sample.Section>
        </Sample>
    );
};
