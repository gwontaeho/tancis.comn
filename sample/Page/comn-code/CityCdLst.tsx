import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Wijmo } from '@/comn/components'
import { utils } from '@/comn/utils'
import { Page, Group, Layout, Button } from '@/comn/components'
import { useForm, useFetch, useWijmo, useCondition, usePopup, FormValuesType } from '@/comn/hooks'
import { APIS, SCHEMA_FORM_CITY_CD, SCHEMA_GRID_CITY_CD } from './ComnCdService'

export const CityCodeList = (props: any) => {
    const { t } = useTranslation()
    const { condition } = useCondition()
    const form = useForm({ defaultSchema: SCHEMA_FORM_CITY_CD, values: condition })
    const [params] = useSearchParams()
    const { close, postMessage, getParams } = usePopup()
    const grid = useWijmo({
        defaultSchema: SCHEMA_GRID_CITY_CD((data: any) => {
            postMessage({ code: data.regnCd, label: data.regnNm })
            close()
        }),
    })

    const fetch_getCityCdLst = useFetch({
        api: () => APIS.getCityCdLst(form.getValues(), grid.page, grid.size),
        enabled: form.isSubmitted,
        key: [grid.page, grid.size],
    })

    const onSubmit_CityCdSrch = () => {
        //fetch_getCityCdLst.fetch()
        console.log(form.isSubmitted)
    }
    useEffect(() => {
        utils.setValuesFromParams(form, getParams())
    }, [])

    return (
        <Page>
            <Page.Header title={t('T_CITY_CD_LST')} description={t('T_CITY_CD_LST')} />
            <form onSubmit={() => false}>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.schema.cntyCd}></Group.Control>
                            <Group.Control {...form.schema.regnCd}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.regnNm} controlSize={10}></Group.Control>
                        </Group.Row>
                    </Group.Body>
                    <Layout direction="row">
                        <Layout.Left>
                            <Button
                                onClick={() => {
                                    form.reset()
                                }}
                            >
                                {t('B_RESET')}
                            </Button>
                        </Layout.Left>
                        <Layout.Right>
                            <Button type="button" onClick={form.handleSubmit(onSubmit_CityCdSrch)}>
                                {t('B_SRCH')}
                            </Button>
                        </Layout.Right>
                    </Layout>
                </Group>
            </form>

            <Group>
                <Wijmo {...grid.grid} data={fetch_getCityCdLst.data} />
            </Group>
            <Layout.Right>
                <Button onClick={close}>{t('B_CLS')}</Button>
            </Layout.Right>
        </Page>
    )
}
