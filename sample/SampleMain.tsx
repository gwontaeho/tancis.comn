import { Routes, Route } from "react-router-dom";

import { SampleForm } from "@/com/sample/pages/samp-Form";
import { SampleTab } from "@/com/sample/pages/samp-Tab";
import { SampleTree } from "@/com/sample/pages/samp-Tree";
import { SampleTable } from "@/com/sample/pages/samp-Table";
import { SampleWijmo } from "@/com/sample/pages/samp-Wijmo";

import { SampleList } from "@/com/sample/pages/SampleList";
import { SampleDetail } from "@/com/sample/pages/SampleDetail";
import { SampleRegist } from "@/com/sample/pages/SampleRegist";
import { SampleUpdate } from "@/com/sample/pages/SampleUpdate";

export const SampleMain = () => {
    return (
        <Routes>
            <Route path="/form" element={<SampleForm />} />
            <Route path="/tab" element={<SampleTab />} />
            <Route path="/tree" element={<SampleTree />} />
            <Route path="/wijmo" element={<SampleWijmo />} />
            <Route path="/table" element={<SampleTable />} />

            <Route path="/pages" element={<SampleList />} />
            <Route path="/pages/:id" element={<SampleDetail />} />
            <Route path="/pages/:id/update" element={<SampleUpdate />} />
            <Route path="/pages/regist" element={<SampleRegist />} />
        </Routes>
    );
};
