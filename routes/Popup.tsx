import { Routes, Route } from "react-router-dom";
import { PopupLayout } from "@/com/layouts/PopupLayout";
import { SamplePopup } from "@/tancis/sample/SamplePopup";

export const Popup = () => {
    return (
        <PopupLayout>
            <Routes>
                <Route path="/sample/*" element={<SamplePopup />} />
            </Routes>
        </PopupLayout>
    );
};
