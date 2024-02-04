import { Sample } from "@/comn/components/_";
import { Text, Layout } from "@/comn/components";

export const SampleText = () => {
    return (
        <Sample title="Text">
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Props", "Description"],
                        ["href", ""],
                        ["underline", ""],
                        ["size", ""],
                    ]}
                />
            </Sample.Section>

            <Sample.Section title="1. " description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Text size="sm">Text Component Size sm</Text>
                        <Text size="base">Text Component Size base</Text>
                        <Text size="lg">Text Component Size lg</Text>
                        <Text size="xl">Text Component Size xl</Text>
                        <Text size="2xl">Text Component Size 2xl</Text>
                    </Sample.Section>

                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
       <>
        <Text size="sm">Text Component Size sm</Text>
        <Text size="base">Text Component Size base</Text>
        <Text size="lg">Text Component Size lg</Text>
        <Text size="xl">Text Component Size xl</Text>
        <Text size="2xl">Text Component Size 2xl</Text>
       </>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
