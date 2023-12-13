import { Routes, Route } from "react-router-dom";
import { PopupLayout } from "@/com/layouts/PopupLayout";

import { PopupSearch } from "@/com/sample/Page/smpl-List";

export const SamplePopup = () => {
    return (
        <PopupLayout>
            <Routes>
                <Route path="/pages" element={<PopupSearch />} />
            </Routes>
        </PopupLayout>
    );
};
