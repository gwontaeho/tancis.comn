import { Route } from "react-router-dom";
import { Base } from "@/comn";
import { Main } from "@/tra/tancis/Main";
import { Popup } from "@/tra/tancis/Popup";

function App() {
    return (
        <Base>
            <Route path="/popup/*" element={<Popup />} />
            <Route path="*" element={<Main />} />
        </Base>
    );
}

export default App;
