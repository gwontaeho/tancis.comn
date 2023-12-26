import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Wijmo } from '@/comn/components'
import { utils } from '@/comn/utils'
import { Page, Group, Layout, Button } from '@/comn/components'
import { useForm, useFetch, useWijmo, useCondition, usePopup, useModal, useToast } from '@/comn/hooks'
import { APIS, SCHEMA_FORM_CITY_CD, SCHEMA_GRID_CITY_CD } from './ComnCdService'

export const CityCodeList = (props: any) => {
    const { t } = useTranslation()
    const { condition } = useCondition()
    const modal = useModal()
    const toast = useToast()
    const form = useForm({ defaultSchema: SCHEMA_FORM_CITY_CD })
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
        key: [grid.page, grid.size],
        showToast: true,
    })

    const event_CityCdSrch = {
        success: () => {
            fetch_getCityCdLst.fetch()
        },
        error: () => {
            toast.showToast({ type: 'invalid', content: 'invalid form' })
        },
    }

    useEffect(() => {
        utils.setValuesFromParams(form, getParams())
    }, [])

    return (
        <Page>
            <Page.Header title={t('T_CITY_CD_LST')} description={t('T_CITY_CD_LST')} />
            <form>
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
                            <Button onClick={form.handleSubmit(event_CityCdSrch.success, event_CityCdSrch.error)}>
                                {t('B_SRCH')}
                            </Button>
                            <Button
                                onClick={() => {
                                    console.log(form.getValues())
                                }}
                            >
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
