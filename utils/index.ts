import lodash from 'lodash'
import dayjs from 'dayjs'
import { api } from '@/comn'

export const envs = {
    base: `${process.env.REACT_APP_BASE}`,
}

export const utils = {
    equals: (first: object, second: object) => {
        return lodash.isEqual(first, second)
    },
    getMockData: ({ totCnt = 99 }) => {
        return {
            totCnt,
            page: 0,
            size: 10,
            content: Array(totCnt)
                .fill(null)
                .map((_, i) => ({
                    id: new Date().getTime() + i,
                    a: Math.random() * 1000,
                    b: Math.random() * 1000,
                    d: dayjs().format('YYYY-MM-DD'),
                })),
        }
    },

    getMockDataWithPaging: ({ data = {}, page = 0, size = 10 }: { data: any; page: number; size: number }) => {
        return { ...data, content: lodash.chunk(data.content, size)[page] }
    },
    getMockOptions: (count = 3) => {
        return Array(count)
            .fill(null)
            .map(() => ({ label: (Math.random() * 1000).toFixed(), value: (Math.random() * 1000).toFixed() }))
    },
    getCode: (arg: { comnCd?: string; keyword?: string; area?: string; page?: number; size?: number }) => {
        const { comnCd, area, page = 0, size, keyword = '' } = arg

        console.log(area)

        let url = ''
        switch (area) {
            case 'comnCd':
                url = `/ptl-com/api/v1/comn/comn-cds?comnCd=${comnCd}&cdVldVal=${keyword}`
                break
            case 'cntyCd':
                url = `/ptl-com/api/v1/comn/cnty-cds?cntyCd=${keyword}`
                break
            case 'currCd':
                url = `/ptl-com/api/v1/comn/curr-cds?currCd=${keyword}`
                break
            case 'bnkCd':
                url = `/ptl-com/api/v1/comn/comn-cds?comnCd=CO012&cdVldVal=${keyword}`
                break
            default:
                url = `/ptl-com/api/v1/comn/comn-cds?comnCd=${comnCd}&cdVldVal=${keyword}`
                break
        }

        if (size) url += `&size=${size}`
        if (page) url += `&page=${size}`

        return api.get(url)
    },
    getCodeLabel: (area?: string, code?: any) => {
        switch (area) {
            case 'comnCd':
                return code.cdVldValNm
            case 'cntyCd':
                return code.cntyNm
            case 'currCd':
                return code.currNm
            case 'bnkCd':
                return code.cdVldValNm
            default:
                return code.cdVldValNm
        }
    },
    getCodeValue: (area?: string, code?: any) => {
        switch (area) {
            case 'comnCd':
                return code.cdVldVal
            case 'cntyCd':
                return code.cntyCd
            case 'currCd':
                return code.currCd
            case 'bnkCd':
                return code.cdVldVal
            default:
                return code.cdVldVal
        }
    },
}
