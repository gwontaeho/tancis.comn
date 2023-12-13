import { Routes, Route } from "react-router-dom";
import { PopupLayout } from "@/com/layouts/PopupLayout";
import { TestPopup } from "./TestPopup";

export const CommonPopup = () => {
    return (
        <PopupLayout>
            <Routes>
                <Route path="/test" element={<TestPopup />} />
            </Routes>
        </PopupLayout>
    );
};