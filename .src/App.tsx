import { Route } from 'react-router-dom'
import { Base } from '@/comn'
import { Main } from '@/tra/tancis/Main'

function App() {
    return (
        <Base>
            <Route path="*" element={<Main />} />
        </Base>
    )
}

export default App
