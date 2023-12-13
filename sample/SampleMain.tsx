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
            <Route path="/components/FormControl/Text" element={<SampleFormControlText />} />
            <Route path="/components/FormControl/Number" element={<SampleFormControlNumber />} />
            <Route path="/components/FormControl/Password" element={<SampleFormControlPassword />} />
            <Route path="/components/FormControl/Select" element={<SampleFormControlSelect />} />
            <Route path="/components/FormControl/Radio" element={<SampleFormControlRadio />} />
            <Route path="/components/FormControl/Checkbox" element={<SampleFormControlCheckbox />} />
            <Route path="/components/FormControl/Textarea" element={<SampleFormControlTextarea />} />
            <Route path="/components/FormControl/Date" element={<SampleFormControlDate />} />
            <Route path="/components/FormControl/Time" element={<SampleFormControlTime />} />
            <Route path="/components/FormControl/Datetime" element={<SampleFormControlDatetime />} />
            <Route path="/components/FormControl/Range" element={<SampleFormControlRange />} />
            <Route path="/components/FormControl/File" element={<SampleFormControlFile />} />

            <Route path="/components/form" element={<SampleForm />} />
            <Route path="/components/tab" element={<SampleTab />} />
            <Route path="/components/tree" element={<SampleTree />} />
            <Route path="/components/wijmo" element={<SampleWijmo />} />
            <Route path="/components/table" element={<SampleTable />} />

            <Route path="/hooks/useModal" element={<SampleUseModal />} />

            <Route path="/pages" element={<SampleList />} />
            <Route path="/pages/:id" element={<SampleDetail />} />
            <Route path="/pages/:id/update" element={<SampleUpdate />} />
            <Route path="/pages/regist" element={<SampleRegist />} />
        </Routes>
    );
};
