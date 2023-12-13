import { Routes, Route } from "react-router-dom";

import { SampleFormControlText } from "@/com/sample/Component/FormControl/samp-Text";
import { SampleFormControlNumber } from "@/com/sample/Component/FormControl/samp-Number";
import { SampleFormControlPassword } from "@/com/sample/Component/FormControl/samp-Password";
import { SampleFormControlSelect } from "@/com/sample/Component/FormControl/samp-Select";
import { SampleFormControlRadio } from "@/com/sample/Component/FormControl/samp-Radio";
import { SampleFormControlCheckbox } from "@/com/sample/Component/FormControl/samp-Checkbox";
import { SampleFormControlTextarea } from "@/com/sample/Component/FormControl/samp-Textarea";
import { SampleFormControlDate } from "@/com/sample/Component/FormControl/samp-Date";
import { SampleFormControlTime } from "@/com/sample/Component/FormControl/samp-Time";
import { SampleFormControlDatetime } from "@/com/sample/Component/FormControl/samp-Datetime";
import { SampleFormControlRange } from "@/com/sample/Component/FormControl/samp-Range";
import { SampleFormControlFile } from "@/com/sample/Component/FormControl/samp-File";

import { SampleForm } from "@/com/sample/Component/samp-Form";
import { SampleTab } from "@/com/sample/Component/samp-Tab";
import { SampleTree } from "@/com/sample/Component/samp-Tree";
import { SampleTable } from "@/com/sample/Component/samp-Table";
import { SampleWijmo } from "@/com/sample/Component/samp-Wijmo";

import { SampleUseModal } from "@/com/sample/Hook/samp-useModal";

import { SampleList } from "@/com/sample/Page/samp-List";
import { SampleDetail } from "@/com/sample/Page/samp-Detail";
import { SampleRegist } from "@/com/sample/Page/samp-Regist";
import { SampleUpdate } from "@/com/sample/Page/samp-Update";

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

            <Route path="/hooks/useModal" element={<SampleUseModal />} />

            <Route path="/pages" element={<SampleList />} />
            <Route path="/pages/:id" element={<SampleDetail />} />
            <Route path="/pages/:id/update" element={<SampleUpdate />} />
            <Route path="/pages/regist" element={<SampleRegist />} />
        </Routes>
    );
};
