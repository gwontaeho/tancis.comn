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

const InputCodeMain = (props: InputCodeProps) => {
    const { openPopup } = usePopup()
    const keywordInput = React.useRef<HTMLInputElement>(null)
    const cdVldValNmInput = React.useRef<HTMLInputElement>(null)

    React.useEffect(() => {
        if (!props.value) return
        if (keywordInput.current?.value === props.value) return
        getComnCd(props.value)
    }, [props.value])

    const handleChange = lodash.debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            if (cdVldValNmInput.current) cdVldValNmInput.current.value = ''
            return
        }
        getComnCd(e.target.value)
    }, 500)

    const getComnCd = async (keyword: string) => {
        if (!props.area && !props.comnCd) return
        if (props.maxLength !== undefined && keyword.length < props.maxLength) {
            if (cdVldValNmInput.current) cdVldValNmInput.current.value = ''
            return
        }

        try {
            const {
                data: { content },
            } = await utils.getCode({ comnCd: props.comnCd, area: props.area, size: 1, keyword })

            if (!content[0]) {
                if (cdVldValNmInput.current) cdVldValNmInput.current.value = ''
                return
            }

            if (cdVldValNmInput.current) cdVldValNmInput.current.value = utils.getCodeLabel(props.area, content[0])
            if (keywordInput.current) keywordInput.current.value = utils.getCodeValue(props.area, content[0])

            if (!props.onChange) return
            props.onChange(content[0].cdVldVal)
        } catch (error) {}
    }

    const handleClickSearch = () => {
        if (!props.area || props.area === 'comnCd') {
            openPopup({
                params: { comnCd: props.comnCd },
                url: `/comn/smpl/pages/comnCdPpup`,
                callback: (data: any) => {
                    if (cdVldValNmInput.current) cdVldValNmInput.current.value = data.label
                    if (keywordInput.current) keywordInput.current.value = data.code
                },
            })
        }
    }

    return (
        <div className="flex">
            <input
                ref={keywordInput}
                className="input rounded-r-none flex-1"
                onChange={handleChange}
                maxLength={props.maxLength}
            />
            <button className="button border-x-0 rounded-none" onClick={handleClickSearch}>
                <Icon icon="search" size="xs" />
            </button>
            <input ref={cdVldValNmInput} readOnly className="input rounded-l-none flex-[2]" />
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
