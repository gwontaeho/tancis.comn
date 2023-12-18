import { Layout, Tab } from '@/comn/components'
import { SampleForm } from './smpl-Form'
import { SampleTree } from './smpl-Tree'

export const SampleTab = () => {
    return (
        <Layout>
            <Tab tab={['tab1', 'tab2', 'tab3']}>
                <Tab.Panel>
                    <SampleForm />
                </Tab.Panel>
                <Tab.Panel>
                    <SampleForm />
                </Tab.Panel>
                <Tab.Panel>
                    <SampleTree />
                </Tab.Panel>
            </Tab>
        </Layout>
    )
}
