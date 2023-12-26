import lodash from 'lodash'
import dayjs from 'dayjs'
import { api } from '@/comn'

export const envs = {
    base: `${process.env.REACT_APP_BASE}`,
}

export const utils = {
    setValuesFromParams: (form: any, params: any) => {
        form.setValues(params, false)
    },
    isEmpty: (obj: any) => {
        return lodash.isEmpty(obj)
    },
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
                    a: 'a' + Math.random() * 1000,
                    b: 'b' + Math.random() * 1000,
                    c: 'c' + Math.random() * 1000,
                    d: 'd' + Math.random() * 1000,
                    e: 'e' + Math.random() * 1000,
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
    getCode: (arg: {
        comnCd?: string
        keyword?: string
        keywordName?: string
        area?: string
        page?: number
        size?: number
        langCd?: string
        cntyCd?: string
    }) => {
        const { comnCd, area, page = 0, size, keyword = '', keywordName = '', langCd = '', cntyCd = '' } = arg

        let url = ''
        switch (area) {
            case 'comnCd':
                url = `/ptl-com/api/v1/comn/comn-cds?comnCd=${comnCd}&cdVldVal=${keyword}&cdVldValNm=${keywordName}&langCd=${langCd}`
                break
            case 'cityCd':
                url = `/ptl-com/api/v1/comn/city-cds?regnCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`
                break
            case 'portCd':
                url = `/ptl-com/api/v1/comn/port-cds?portAirptCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`
                break
            case 'cntyCd':
                url = `/ptl-com/api/v1/comn/cnty-cds?cntyCd=${keyword}&cntyNm=${keywordName}`
                break
            case 'currCd':
                url = `/ptl-com/api/v1/comn/curr-cds?currCd=${keyword}&currNm=${keywordName}`
                break
            case 'bnkCd':
                url = `/ptl-com/api/v1/comn/comn-cds?comnCd=CO012&cdVldVal=${keyword}&cdVldValNm=${keywordName}`
                break
            case 'portAirptCd':
                url = `/ptl-com/api/v1/comn/port-airpt-cds?portAirptTpCd=AIRPT&portAirptCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`
                break
            case 'airptCd':
                url = `/ptl-com/api/v1/comn/airpt-cds?portAirptCd=${keyword}&regnNm=${keywordName}&cntyCd=${cntyCd}`
                break
            case 'coCd':
                url = `/ptl-com/api/v1/comn/cos?coTpCd=C&tin=${keyword}&coNm=${keywordName}`
                break
            case 'prcssStatCd':
                url = `/ptl-com/api/v1/comn/prcss-stat-cds?bsopPrcssStatCd=COM_9000&item=${keyword}&prcssStatCdNm=${keywordName}`
                break
            case 'orgCd':
                url = `/ptl-com/api/v1/comn/orgs?orgTpCd=01&orgCd=${keyword}&orgNm=${keywordName}`
                break
            default:
                url = `/ptl-com/api/v1/comn/comn-cds?comnCd=${comnCd}&cdVldVal=${keyword}&cdVldValNm=${keywordName}&langCd=${langCd}`
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
            case 'cityCd':
                return code.regnNm
            case 'portCd':
                return code.regnNm
            case 'currCd':
                return code.currNm
            case 'bnkCd':
                return code.cdVldValNm
            case 'portAirptCd':
                return code.regnNm
            case 'airptCd':
                return code.regnNm
            case 'coCd':
                return code.coNm
            case 'prcssStatCd':
                return code.itemNm
            case 'orgCd':
                return code.orgNm
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
            case 'cityCd':
                return code.regnCd
            case 'portCd':
                return code.portAirptCd
            case 'currCd':
                return code.currCd
            case 'bnkCd':
                return code.cdVldVal
            case 'portAirptCd':
                return code.portAirptCd
            case 'airptCd':
                return code.portAirptCd
            case 'coCd':
                return code.tin
            case 'prcssStatCd':
                return code.item
            case 'orgCd':
                return code.orgCd
            default:
                return code.cdVldVal
        }
    },
}
