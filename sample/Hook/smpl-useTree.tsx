import { Layout, Group, Tree, Divider } from '@/comn/components'
import { Sample } from '@/comn/components/_'

const treeviewItems = () => [
    {
        id: '1',
        name: 'public',
        children: [
            {
                id: '2',
                name: 'assets',
                children: [
                    {
                        id: '3',
                        name: 'image',
                        children: [
                            {
                                id: '4',
                                name: 'aa',
                            },
                            {
                                id: '5',
                                name: 'generic.png',
                            },
                            {
                                id: '6',
                                name: 'shield.svg',
                            },
                        ],
                    },
                    {
                        id: '7',
                        name: 'video',
                        children: [
                            {
                                id: '8',
                                name: 'beach.mp4',
                            },
                            {
                                id: '9',
                                name: 'background.map',
                            },
                        ],
                    },
                    {
                        id: '10',
                        name: 'js',
                        children: [
                            {
                                id: '11',
                                name: 'theme.js',
                            },
                            {
                                id: '12',
                                name: 'theme.min.js',
                            },
                        ],
                    },
                ],
            },
            {
                id: '13',
                name: 'dashboard',
                children: [
                    {
                        id: '14',
                        name: 'default.html',
                    },
                    {
                        id: '15',
                        name: 'analytics.html',
                    },
                    {
                        id: '16',
                        name: 'crm.html',
                    },
                ],
            },
            {
                id: '17',
                name: 'index.html',
            },
        ],
    },
    {
        id: '18',
        name: 'Files',
        children: [
            {
                id: '19',
                name: 'build.zip',
            },
            {
                id: '20',
                name: 'live-1.3.4.zip',
            },
            {
                id: '21',
                name: 'app.exe',
            },
            {
                id: '22',
                name: 'export.csv',
            },
            {
                id: '23',
                name: 'default.pdf',
            },
            {
                id: '24',
                name: 'Yellow_Coldplay.wav',
            },
        ],
    },
    {
        id: '25',
        name: 'package.json',
    },
    {
        id: '26',
        name: 'package-lock.json',
    },
    {
        id: '27',
        name: 'README.md',
    },
]

export const SampleUseTree = () => {
    return (
        <Sample>
            <Tree data={treeviewItems()} />
        </Sample>
    )
}
