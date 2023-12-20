import React from 'react'

type TabSchemaType = any[]
type TabDefaultSchemaType = { id: string; schema: TabSchemaType }
type UseTabProps = { defaultSchema: TabDefaultSchemaType }

export const useTab = (props: UseTabProps) => {
    const { defaultSchema } = props
    const { id, schema } = defaultSchema

    const [_schema, _setSchema] = React.useState<TabSchemaType>(() =>
        schema.map((_, i) => {
            const defaultActive = schema.some((_) => _.active) ? schema.findIndex((_) => _.active) : 0
            return { ..._, active: i === defaultActive }
        })
    )

    const value = _schema.findIndex((_) => _.active)

    const setActive = (index: number) => {
        _setSchema((prev) =>
            prev.map((_, i) => {
                return { ..._, active: i === index }
            })
        )
    }
    const setDisabled = (index: number, status: boolean) => {
        _setSchema((prev) => {
            return prev.map((_, i) => {
                if (i === 0) if (index === value) return { ..._, active: true }

                if (i !== index) return _
                return { ..._, disabled: status, active: false }
            })
        })
    }
    const setVisible = (index: number, status: boolean) => {
        _setSchema((prev) =>
            prev.map((_, i) => {
                if (i === 0) if (index === value) return { ..._, active: true }

                if (i !== index) return _
                return { ..._, visible: status }
            })
        )
    }
    const setLabel = (index: number, label: string) => {
        _setSchema((prev) =>
            prev.map((_, i) => {
                if (i !== index) return _
                return { ..._, label }
            })
        )
    }

    const tab = { value, schema: _schema, onChange: setActive }

    return { tab, value, setActive, setDisabled, setVisible, setLabel }
}
