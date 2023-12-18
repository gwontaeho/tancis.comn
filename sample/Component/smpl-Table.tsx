import { FormControl, Layout, Table, Group } from '@/comn/components'

export const SampleTable = () => {
    return (
        <Layout>
            <Group>
                <Group.Header title="Table" />
                <Table>
                    <Table.Tr>
                        <Table.Th required={true}>
                            <FormControl />
                        </Table.Th>
                        <Table.Th></Table.Th>
                        <Table.Th></Table.Th>
                        <Table.Th></Table.Th>
                        <Table.Th></Table.Th>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td rowSpan={2}></Table.Td>
                        <Table.Td>
                            <FormControl />
                        </Table.Td>
                        <Table.Td>
                            <FormControl type="date" />
                        </Table.Td>
                        <Table.Td colSpan={2}>
                            <FormControl type="select" />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td></Table.Td>
                        <Table.Td colSpan={2}></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td></Table.Td>
                        <Table.Td colSpan={2}></Table.Td>
                        <Table.Td></Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th required={true}></Table.Th>
                        <Table.Td required={true}>table example</Table.Td>
                        <Table.Td colSpan={2}></Table.Td>
                        <Table.Td></Table.Td>
                    </Table.Tr>

                    <Table.Tr>
                        <Table.Td></Table.Td>
                        <Table.Td></Table.Td>
                        <Table.Td colSpan={2}></Table.Td>
                        <Table.Td></Table.Td>
                    </Table.Tr>
                </Table>
            </Group>

            <Group className="[&_a]:text-blue">
                <Group.Body>
                    <Table border={false}>
                        <Table.Tr>
                            <Table.Td>
                                <a href="#Table">Table</a>
                            </Table.Td>
                            <Table.Td>
                                <a href="#Tr">Table.Tr</a>
                            </Table.Td>
                            <Table.Td>
                                <a href="#Th">Table.Th</a>
                            </Table.Td>
                            <Table.Td>
                                <a href="#Td">Table.Td</a>
                            </Table.Td>
                        </Table.Tr>
                    </Table>
                </Group.Body>
            </Group>

            <Group id="Table">
                <Group.Header title="table" />
                <Group.Body>
                    <Table>
                        <Table.Tr>
                            <Table.Th>Attribute</Table.Th>
                            <Table.Th>Type</Table.Th>
                            <Table.Th>Default</Table.Th>
                            <Table.Th>Description</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                        </Table.Tr>
                    </Table>
                </Group.Body>
            </Group>

            <Group id="Tr">
                <Group.Header title="tr" />
                <Group.Body>
                    <Table>
                        <Table.Tr>
                            <Table.Th>Attribute</Table.Th>
                            <Table.Th>Type</Table.Th>
                            <Table.Th>Default</Table.Th>
                            <Table.Th>Description</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                        </Table.Tr>
                    </Table>
                </Group.Body>
            </Group>

            <Group id="Th">
                <Group.Header title="th" />
                <Group.Body>
                    <Table>
                        <Table.Tr>
                            <Table.Th>Attribute</Table.Th>
                            <Table.Th>Type</Table.Th>
                            <Table.Th>Default</Table.Th>
                            <Table.Th>Description</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                        </Table.Tr>
                    </Table>
                </Group.Body>
            </Group>
            <Group id="Td">
                <Group.Header title="td" />
                <Group.Body>
                    <Table>
                        <Table.Tr>
                            <Table.Th>Attribute</Table.Th>
                            <Table.Th>Type</Table.Th>
                            <Table.Th>Default</Table.Th>
                            <Table.Th>Description</Table.Th>
                        </Table.Tr>
                        <Table.Tr>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                            <Table.Td></Table.Td>
                        </Table.Tr>
                    </Table>
                </Group.Body>
            </Group>
        </Layout>
    )
}
