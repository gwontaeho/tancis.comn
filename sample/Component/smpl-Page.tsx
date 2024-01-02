import { Page } from "@/comn/components";
import { Sample } from "@/comn/components/_";

export const SamplePage = () => {
    return (
        <Sample title="Page">
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
