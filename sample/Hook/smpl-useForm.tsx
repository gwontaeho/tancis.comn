import { useEffect } from 'react'
import { Page, Group, Button, Layout, Table } from '@/comn/components'
import { FormSchemaType, FormValuesType } from '@/comn/hooks'
import { useForm } from '@/comn/hooks'

const SCHEMA_SEARCH: FormSchemaType = {
    id: 'search',
    schema: {
        text: { type: 'text', label: 'text', required: true },
        number: { type: 'number', label: 'number', required: true },
        password: { type: 'password', label: 'password' },
        textarea: {
            type: 'textarea',
            label: 'textarea',
            leftButton: { icon: 'left', onClick: () => {} },
            rightButton: { icon: 'left', onClick: () => {} },
        },
        select: { type: 'select', label: 'select' },
        checkbox: { type: 'checkbox', label: 'checkbox', all: true },
        radio: { type: 'radio', label: 'radio' },
        date: { type: 'date', label: 'date' },
        time: { type: 'time', label: 'time' },
        datetime: { type: 'datetime', label: 'datetime' },
        file: { type: 'file', label: 'file', multiple: true },
        code: { type: 'code', label: 'code', comnCd: 'COM_0015', area: 'comnCd' },
        daterange: {
            type: 'daterange',
            label: 'daterange',
            start: { name: 'startdate' },
            end: { name: 'enddate' },
            rangeButton: 0,
        },
        timerange: {
            type: 'timerange',
            label: 'timerange',
            start: { name: 'starttime' },
            end: { name: 'endtime' },
            rangeButton: 0,
        },
    },
}

const OPTION = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
]

export const SampleUseForm = () => {
    const {
        schema,
        setSchema,
        setValues,
        setEditable,
        getValues,
        handleSubmit,
        setValue,
        resetSchema,
        clearValues,
        clearErrors,
        watch,
        reset,
        isSubmitted,
        setFocus,
        validate,
    } = useForm({
        defaultSchema: SCHEMA_SEARCH,
    })

    console.log(setValue)

    const text = watch(['text'])

    const onSubmit = (data: FormValuesType) => {
        console.log(data)
    }

    useEffect(() => {}, [])

    const etr = (v: any) => {
        setEditable(v)
    }

    return (
        <Page>
            <Group>
                <Group.Header title="Form" />
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <Group.Body>
                    <Group.Row>
                        <Group.Control {...schema.text} />
                        <Group.Control {...schema.number} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...schema.password} />
                        <Group.Control {...schema.textarea} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...schema.select} options={OPTION} />
                        <Group.Control {...schema.checkbox} options={OPTION} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...schema.radio} options={OPTION} />
                        <Group.Control {...schema.date} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...schema.time} />
                        <Group.Control {...schema.datetime} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...schema.daterange} controlSize={10} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...schema.timerange} controlSize={10} />
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...schema.file} />
                        <Group.Control {...schema.code} />
                    </Group.Row>
                </Group.Body>
                {/* </form> */}
            </Group>

            <Table>
                <Table.Tr>
                    <Table.Th width={300}>
                        <Button
                            onClick={() => {
                                console.log(getValues())
                                // alert(JSON.stringify(getValues()))
                            }}
                        >
                            <code>getValues()</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                setValue('checkbox', ['1', '2'])
                            }}
                        >
                            <code>setValue()</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                setValues({ text: 'text', number: '001' })
                            }}
                        >
                            <code>{`setValues()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                clearValues()
                            }}
                        >
                            <code>{`clearValues()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                setEditable(true)
                            }}
                        >
                            <code>setEditable(true)</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                setEditable(false)
                            }}
                        >
                            <code>setEditable(false)</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                setSchema('datetime', { disabled: true })
                            }}
                        >
                            <code>{`setSchema("text", { disabled: true })`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                resetSchema()
                            }}
                        >
                            <code>{`resetSchema()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>

                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                validate()
                            }}
                        >
                            <code>{`validate()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                validate('text')
                            }}
                        >
                            <code>{`validate("text")`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                clearErrors()
                            }}
                        >
                            <code>{`clearErrors()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button
                            onClick={() => {
                                clearErrors('text')
                            }}
                        >
                            <code>{`clearErrors("text")`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button onClick={handleSubmit((e) => console.log(e))}>
                            <code>{`handleSubmit(() => {})`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <Button onClick={() => reset()}>
                            <code>{`reset()`}</code>
                        </Button>
                    </Table.Th>
                    <Table.Td></Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <code>{`const text = watch(["text"])`}</code>
                    </Table.Th>
                    <Table.Td>text : {text}</Table.Td>
                </Table.Tr>
                <Table.Tr>
                    <Table.Th>
                        <code>{`isSubmitted`}</code>
                    </Table.Th>
                    <Table.Td>isSubmitted : {String(isSubmitted)}</Table.Td>
                </Table.Tr>
            </Table>
        </Page>
    )
}

// return {
//     schema: getSchema(_schema),
//     setSchema,
//     resetSchema,
//     setEditable,
//     getValues,
//     setValue,
//     setFocus,
//     handleSubmit,
//     validate,
//     clearValues,
//     clearErrors,
//     watch,
//     setValues,
//     errors,
//     isSubmitted,
// };
