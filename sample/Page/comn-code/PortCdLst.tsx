import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Wijmo } from '@/comn/components'
import { Page, Group, Layout, Button } from '@/comn/components'
import { useForm, useFetch, useWijmo, useCondition, usePopup, useTheme } from '@/comn/hooks'
import { APIS, SCHEMA_FORM_PORT_CD, SCHEMA_GRID_PORT_CD } from './ComnCdService'

export const PortCodeList = (props: any) => {
    const { t } = useTranslation()
    const { condition } = useCondition()
    const form = useForm({ defaultSchema: SCHEMA_FORM_PORT_CD, values: condition })
    const { close, postMessage } = usePopup()
    const grid = useWijmo({
        defaultSchema: SCHEMA_GRID_PORT_CD((data: any) => {
            postMessage({ code: data.portAirptCd, label: data.regnNm })
            close()
        }),
    })

    const fetch_Srch = useFetch({
        api: () => APIS.getPortCdLst(form.getValues(), grid.page, grid.size),
        enabled: form.isSubmitted,
        key: [grid.page, grid.size],
    })

    const onSubmit = () => {
        fetch_Srch.fetch()
    }

    return (
        <Page>
            <Page.Header title={t('T_PORT_CD_LST')} description={t('T_PORT_CD_LST')} />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Group>
                    <Group.Body>
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
