import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/com/layouts/MainLayout";

import { SampleFormControlText } from "@/com/sample/Component/FormControl/smpl-Text";
import { SampleFormControlNumber } from "@/com/sample/Component/FormControl/smpl-Number";
import { SampleFormControlPassword } from "@/com/sample/Component/FormControl/smpl-Password";
import { SampleFormControlSelect } from "@/com/sample/Component/FormControl/smpl-Select";
import { SampleFormControlRadio } from "@/com/sample/Component/FormControl/smpl-Radio";
import { SampleFormControlCheckbox } from "@/com/sample/Component/FormControl/smpl-Checkbox";
import { SampleFormControlTextarea } from "@/com/sample/Component/FormControl/smpl-Textarea";
import { SampleFormControlDate } from "@/com/sample/Component/FormControl/smpl-Date";
import { SampleFormControlTime } from "@/com/sample/Component/FormControl/smpl-Time";
import { SampleFormControlDatetime } from "@/com/sample/Component/FormControl/smpl-Datetime";
import { SampleFormControlRange } from "@/com/sample/Component/FormControl/smpl-Range";
import { SampleFormControlFile } from "@/com/sample/Component/FormControl/smpl-File";

import { SampleForm } from "@/com/sample/Component/smpl-Form";
import { SampleTab } from "@/com/sample/Component/smpl-Tab";
import { SampleTree } from "@/com/sample/Component/smpl-Tree";
import { SampleTable } from "@/com/sample/Component/smpl-Table";
import { SampleWijmo } from "@/com/sample/Component/smpl-Wijmo";

import { SampleUseModal } from "@/com/sample/Hook/smpl-useModal";

import { SampleList } from "@/com/sample/Page/smpl-List";
import { SampleDetail } from "@/com/sample/Page/smpl-Detail";
import { SampleRegist } from "@/com/sample/Page/smpl-Regist";
import { SampleUpdate } from "@/com/sample/Page/smpl-Update";

export const SampleMain = () => {
    return (
        <MainLayout>
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
        </MainLayout>
    );
};
