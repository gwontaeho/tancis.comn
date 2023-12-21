import React from 'react'
import { Sample } from '@/comn/components/_'
import { Table, FormControl } from '@/comn/components'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

export const SampleFormControlText = () => {
    React.useEffect(() => {
        Prism.highlightAll()
    }, [])
    return (
        <Sample title="FormControl">
            <Sample.Section>
                <Table>
                    <Table.Tr>
                        <Table.Th width={200}></Table.Th>
                        <Table.Td>기본</Table.Td>
                        <Table.Td>기본</Table.Td>
                        <Table.Td>기본</Table.Td>
                    </Table.Tr>
                </Table>
            </Sample.Section>
        </Sample>
    )
}

const CodeDefault = `<FormControl  />`
const CodeMask0 = `<FormControl mask="TEST 000"  />`
// const CodeDefault = `<FormControl  />`
// const CodeDefault = `<FormControl  />`
// const CodeDefault = `<FormControl  />`
// const CodeDefault = `<FormControl  />`

{
    /* <Sample.Section>
<Table>
    <Table.Tr>
        <Table.Th width={200}>기본</Table.Th>
        <Table.Td width={200}>
            <FormControl />
        </Table.Td>
        <Table.Td></Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Th rowSpan={4}>마스크</Table.Th>
        <Table.Td>
            <FormControl mask="TEST 000" />
        </Table.Td>
        <Table.Td>
            <code>{`mask="TEST 000"`}</code>
        </Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Td>
            <FormControl mask="TEST AAA" />
        </Table.Td>
        <Table.Td>
            <code>{`mask="TEST AAA"`}</code>
        </Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Td>
            <FormControl mask="TEST aaa" />
        </Table.Td>
        <Table.Td>
            <code>{`mask="TEST aaa"`}</code>
        </Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Td>
            <FormControl mask="TEST " exact={false} />
        </Table.Td>
        <Table.Td>
            <code>{`mask="TEST" exact={false}`}</code>
        </Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Th>최대 길이</Table.Th>
        <Table.Td>
            <FormControl maxLength={5} />
        </Table.Td>
        <Table.Td>
            <code>{`maxLength={5}`}</code>
        </Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Th>왼쪽 버튼</Table.Th>
        <Table.Td>
            <FormControl leftButton={{ icon: 'search', onClick: () => alert('click') }} />
        </Table.Td>
        <Table.Td>
            <code>{`leftButton={{icon:"search"}}`}</code>
        </Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Th>오른쪽 버튼</Table.Th>
        <Table.Td>
            <FormControl rightButton={{ icon: 'search', onClick: () => alert('click') }} />
        </Table.Td>
        <Table.Td>
            <code>{`rightButton={{icon:"search"}}`}</code>
        </Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Th>오른쪽 텍스트</Table.Th>
        <Table.Td>
            <FormControl rightText="sample" />
        </Table.Td>
        <Table.Td>
            <code>{`rightText="sample"`}</code>
        </Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Th>영문 대문자</Table.Th>
        <Table.Td>
            <FormControl letterCase="upper" defaultValue="UPPER" />
        </Table.Td>
        <Table.Td>
            <code>{`letterCase="upper"`}</code>
        </Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Th>영문 소문자</Table.Th>
        <Table.Td>
            <FormControl letterCase="lower" defaultValue="lower" />
        </Table.Td>
        <Table.Td>
            <code>{`letterCase="lower"`}</code>
        </Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Th>메시지</Table.Th>
        <Table.Td>
            <FormControl message="any message" />
        </Table.Td>
        <Table.Td>
            <code>{`message="any message"`}</code>
        </Table.Td>
    </Table.Tr>
    <Table.Tr>
        <Table.Th>에러</Table.Th>
        <Table.Td>
            <FormControl invalid={true} />
        </Table.Td>
        <Table.Td>
            <code>{`invalid={true}`}</code>
        </Table.Td>
    </Table.Tr>
</Table>
</Sample.Section> */
}
