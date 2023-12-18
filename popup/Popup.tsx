import { Routes, Route } from 'react-router-dom'
import { PopupLayout } from '@/comn/layouts/PopupLayout'
import { TestPopup } from './TestPopup'

export const CommonPopup = () => {
    return (
        <Routes>
            <Route path="/test" element={<TestPopup />} />
        </Routes>
    )
}
