import { Routes, Route } from "react-router-dom";

import { SampleForm } from "@/tancis/sample/pages/samp-Form";
import { SampleTab } from "@/tancis/sample/pages/samp-Tab";
import { SampleTree } from "@/tancis/sample/pages/samp-Tree";
import { SampleTable } from "@/tancis/sample/pages/samp-Table";
import { SampleWijmo } from "@/tancis/sample/pages/samp-Wijmo";

import { SampleList } from "@/tancis/sample/pages/SampleList";
import { SampleDetail } from "@/tancis/sample/pages/SampleDetail";
import { SampleRegist } from "@/tancis/sample/pages/SampleRegist";
import { SampleUpdate } from "@/tancis/sample/pages/SampleUpdate";

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
