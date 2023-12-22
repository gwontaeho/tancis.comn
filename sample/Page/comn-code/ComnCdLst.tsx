import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Wijmo } from '@/comn/components'
import { Page, Group, Layout, Button } from '@/comn/components'
import { useForm, useFetch, useWijmo, useCondition, usePopup, useTheme } from '@/comn/hooks'
import { APIS, SCHEMA_FORM_COMN_CD, SCHEMA_GRID_COMN_CD } from './ComnCdService'

export const CommonCodeList = (props: any) => {
    const { t } = useTranslation()
    const { getParams, close, postMessage } = usePopup()
    const params = getParams()
    const { theme } = useTheme()
    const grid = useWijmo({
        defaultSchema: SCHEMA_GRID_COMN_CD((data: any) => {
            postMessage({ code: data.cdVldVal, label: data.cdVldValNm })
            close()
        }),
    })
    const form = useForm({
        defaultSchema: SCHEMA_FORM_COMN_CD,
        values: { comnCd: params.comnCd, langCd: theme.lang.toUpperCase() },
    })

    const fetch_Srch = useFetch({
        api: () => APIS.getComnCdLst(form.getValues(), 0, grid.size),
    })

    const onSubmit = () => {
        fetch_Srch.fetch()
    }

    useEffect(() => {
        onSubmit()
    }, [])

    return (
        <Page>
            <Page.Navigation base="/sample/pages" nodes={[{ path: '/', label: 'List' }, { label: 'Regist' }]} />
            <Page.Header title={t('T_COMN_CD_LST')} description={t('T_COMN_CD_LST')} />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Group>
                    <Group.Body>
                        <Group.Row>
                            <Group.Control {...form.schema.comnCd}></Group.Control>
                            <Group.Control {...form.schema.cdVldVal}></Group.Control>
                        </Group.Row>
                        <Group.Row>
                            <Group.Control {...form.schema.cdVldValNm}></Group.Control>
                            <Group.Control {...form.schema.langCd} select={true}></Group.Control>
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
                            <Button type="submit">{t('B_SRCH')}</Button>
                        </Layout.Right>
                    </Layout>
                </Group>
            </form>

            <Group>{fetch_Srch.data && <Wijmo {...grid.grid} data={fetch_Srch.data} />}</Group>
            <Layout.Right>
                <Button onClick={close}>{t('B_CLS')}</Button>
            </Layout.Right>
        </Page>
    )
}
