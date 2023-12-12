import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import RecoilProvider from "@/com/recoil";
import AuthProvider from "@/com/auth";
import { Main } from "@/com/routes/Main";
import { Popup } from "@/com/routes/Popup";
import { Sign } from "@/com/routes/Sign";
import { CommonModal, CommonToast } from "@/com/components/_";

function App() {
    return (
        <CookiesProvider>
            <RecoilProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/signin" element={<Sign />} />
                            <Route path="/popup/*" element={<Popup />} />
                            <Route path="*" element={<Main />} />
                        </Routes>
                        <CommonModal />
                        <CommonToast />
                    </BrowserRouter>
                </AuthProvider>
            </RecoilProvider>
        </CookiesProvider>
    );
}

export default App;
