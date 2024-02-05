import { Sample } from "@/comn/components/_";
import { Page, Group, Layout, Table } from "@/comn/components";

export const SampleTable = () => {
    return (
        <Sample title="Table" description="">
            <Sample.Section>
                <Sample.Table
                    data={[
                        ["Component", "Description"],
                        ["<Table />", ""],
                        ["<Table.Tr />", ""],
                        ["<Table.Th />", ""],
                        ["<Table.Td />", ""],
                    ]}
                />
            </Sample.Section>

            <Sample.Section title="1. 3*4" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Table>
                            <Table.Tr>
                                <Table.Th required={true}></Table.Th>
                                <Table.Th></Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td required={true}></Table.Td>
                                <Table.Td></Table.Td>
                                <Table.Td></Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td></Table.Td>
                                <Table.Td></Table.Td>
                                <Table.Td></Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td></Table.Td>
                                <Table.Td></Table.Td>
                                <Table.Td></Table.Td>
                            </Table.Tr>
                        </Table>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <Table>
            <Table.Tr>
                <Table.Th required={true}></Table.Th>
                <Table.Th></Table.Th>
                <Table.Th></Table.Th>
            </Table.Tr>
            <Table.Tr>
                <Table.Td required={true}></Table.Td>
                <Table.Td></Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td></Table.Td>
                <Table.Td></Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td></Table.Td>
                <Table.Td></Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
        </Table>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>

            <Sample.Section title="2. 병합" description="">
                <Layout direction="row">
                    <Sample.Section title="Result">
                        <Table>
                            <Table.Tr>
                                <Table.Th colSpan={2}></Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td rowSpan={2}></Table.Td>
                                <Table.Td></Table.Td>
                                <Table.Td></Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td></Table.Td>
                                <Table.Td></Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td></Table.Td>
                                <Table.Td colspan={2}></Table.Td>
                            </Table.Tr>
                        </Table>
                    </Sample.Section>
                    <Sample.Section title="Code">
                        <Sample.Code>{`
const Sample = () => {
    return (
        <Table>
            <Table.Tr>
                <Table.Th colSpan={2}></Table.Th>
                <Table.Th></Table.Th>
            </Table.Tr>
            <Table.Tr>
                <Table.Td rowSpan={2}></Table.Td>
                <Table.Td></Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td></Table.Td>
                <Table.Td></Table.Td>
            </Table.Tr>
            <Table.Tr>
                <Table.Td></Table.Td>
                <Table.Td colspan={2}></Table.Td>
            </Table.Tr>
        </Table>
    );
};

`}</Sample.Code>
                    </Sample.Section>
                </Layout>
            </Sample.Section>
        </Sample>
    );
};
