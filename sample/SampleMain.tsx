import { Routes, Route } from "react-router-dom";

import { SampleFormControlText } from "@/com/sample/pages/samp-FormControlText";
import { SampleFormControlNumber } from "@/com/sample/pages/samp-FormControlNumber";
import { SampleFormControlPassword } from "@/com/sample/pages/samp-FormControlPassword";
import { SampleFormControlSelect } from "@/com/sample/pages/samp-FormControlSelect";
import { SampleFormControlRadio } from "@/com/sample/pages/samp-FormControlRadio";
import { SampleFormControlCheckbox } from "@/com/sample/pages/samp-FormControlCheckbox";
import { SampleFormControlTextarea } from "@/com/sample/pages/samp-FormControlTextarea";
import { SampleFormControlDate } from "@/com/sample/pages/samp-FormControlDate";
import { SampleFormControlTime } from "@/com/sample/pages/samp-FormControlTime";
import { SampleFormControlDatetime } from "@/com/sample/pages/samp-FormControlDatetime";
import { SampleFormControlRange } from "@/com/sample/pages/samp-FormControlRange";
import { SampleFormControlFile } from "@/com/sample/pages/samp-FormControlFile";

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
            <Route path="/formcontroltext" element={<SampleFormControlText />} />
            <Route path="/formcontrolnumber" element={<SampleFormControlNumber />} />
            <Route path="/formcontrolpassword" element={<SampleFormControlPassword />} />
            <Route path="/formcontrolselect" element={<SampleFormControlSelect />} />
            <Route path="/formcontrolradio" element={<SampleFormControlRadio />} />
            <Route path="/formcontrolcheckbox" element={<SampleFormControlCheckbox />} />
            <Route path="/formcontroltextarea" element={<SampleFormControlTextarea />} />
            <Route path="/formcontroldate" element={<SampleFormControlDate />} />
            <Route path="/formcontroltime" element={<SampleFormControlTime />} />
            <Route path="/formcontroldatetime" element={<SampleFormControlDatetime />} />
            <Route path="/formcontrolrange" element={<SampleFormControlRange />} />
            <Route path="/formcontrolfile" element={<SampleFormControlFile />} />

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
