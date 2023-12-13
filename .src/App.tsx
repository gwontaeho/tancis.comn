import { Route } from "react-router-dom";
import { Base } from "@/com";
import { Main } from "@/tancis/Main";
import { Popup } from "@/tancis/Popup";

function App() {
    return (
        <Base>
            <Route path="/popup/*" element={<Popup />} />
            <Route path="*" element={<Main />} />
        </Base>
    );
}

export default App;
