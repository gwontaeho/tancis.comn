import { Routes, Route } from "react-router-dom";
import { PopupLayout } from "@/comn/layouts/PopupLayout";
import { SampleUsePopupTarget } from "@/comn/sample/Hook/smpl-usePopup";

export const SamplePopup = () => {
    return (
        <PopupLayout>
            <Routes>
                <Route path="/usePopup" element={<SampleUsePopupTarget />} />
            </Routes>
        </PopupLayout>
    );
};
