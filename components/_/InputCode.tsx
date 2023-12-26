import React from 'react'
import lodash from 'lodash'
import { Control } from 'react-hook-form'
import { usePopup } from '@/comn/hooks'
import { utils } from '@/comn/utils'
import { Icon } from '@/comn/components'
import { ControllerWrapper } from '@/comn/components/_'

type InputCodeProps = {
    name?: string
    value?: any
    comnCd?: string
    area?: string
    maxLength?: number
    control?: Control
    onChange?: (...args: any) => void
}

const PopupUrls: { [id: string]: string } = {
    comnCd: `/comn/smpl/pages/comnCdPpup`,
    cityCd: `/comn/smpl/pages/cityCdPpup`,
    cntyCd: `/comn/smpl/pages/cntyCdPpup`,
    bankCd: `/comn/smpl/pages/bankCdPpup`,
    currCd: `/comn/smpl/pages/currCdPpup`,
    portCd: `/comn/smpl/pages/portCdPpup`,
}

const InputCodeMain = (props: InputCodeProps) => {
    const { openPopup } = usePopup()
    const keywordInput = React.useRef<HTMLInputElement>(null)
    const LabelInput = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        if (!props.value) return
        if (keywordInput.current?.value === props.value) return
        getComnCd(props.value)
    }, [props.value])

    const handleChange = lodash.debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            if (LabelInput.current) LabelInput.current.value = ''
            return
        }
        getComnCd(e.target.value)
    }, 500)

    const getComnCd = async (keyword: string) => {
        if (!props.area && !props.comnCd) return
        if (props.maxLength !== undefined && keyword.length < props.maxLength) {
            if (LabelInput.current) LabelInput.current.value = ''
            return
        }

        try {
            const {
                data: { content },
            } = await utils.getCode({ comnCd: props.comnCd, area: props.area, size: 1, keyword })

            if (!content[0]) {
                if (LabelInput.current) LabelInput.current.value = ''
                return
            }

            if (LabelInput.current) LabelInput.current.value = utils.getCodeLabel(props.area, content[0])
            if (keywordInput.current) keywordInput.current.value = utils.getCodeValue(props.area, content[0])

            if (!props.onChange) return
            props.onChange(content[0].cdVldVal)
        } catch (error) {}
    }

    const handleClickSearch = () => {
        openPopup({
            params: { comnCd: props.comnCd },
            url: PopupUrls[props.area || 'comnCd'],
            callback: (data: any) => {
                if (LabelInput.current) LabelInput.current.value = data.label
                if (keywordInput.current) keywordInput.current.value = data.code
            },
        })
    }

    return (
        <div className="w-full flex">
            <input
                ref={keywordInput}
                className="input rounded-r-none flex-1"
                onChange={handleChange}
                maxLength={props.maxLength}
            />
            <button className="button border-x-0 rounded-none" type="button" onClick={handleClickSearch}>
                <Icon icon="search" size="xs" />
            </button>
            <input ref={LabelInput} readOnly className="input rounded-l-none flex-[2]" />
        </div>
    )
}

export const InputCode = (props: InputCodeProps) => {
    if (props.control && props.name)
        return (
            <ControllerWrapper {...props} control={props.control} name={props.name}>
                <InputCodeMain />
            </ControllerWrapper>
        )

    return <InputCodeMain {...props} />
}
