import { useSearchParams, Outlet } from 'react-router-dom'
import { MainLayout } from './MainLayout'
import { PopupLayout } from './PopupLayout'

export const Layout = () => {
    const [searchParams] = useSearchParams()
    const ppup = searchParams.get('ppup')

    if (ppup === 'Y')
        return (
            <PopupLayout>
                <Outlet />
            </PopupLayout>
        )

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
}
