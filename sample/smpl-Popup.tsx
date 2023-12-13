import { Routes, Route } from "react-router-dom";
import { PopupLayout } from "@/comn/layouts/PopupLayout";

import { PopupSearch } from "@/comn/sample/Page/smpl-List";

export const SamplePopup = () => {
    return (
        <PopupLayout>
            <Routes>
                <Route path="/pages" element={<PopupSearch />} />
            </Routes>
        </PopupLayout>
    );
};
