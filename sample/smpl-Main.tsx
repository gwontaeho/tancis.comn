import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/comn/layouts/MainLayout";

import { SampleFormControlText } from "@/comn/sample/Component/FormControl/smpl-Text";
import { SampleFormControlNumber } from "@/comn/sample/Component/FormControl/smpl-Number";
import { SampleFormControlPassword } from "@/comn/sample/Component/FormControl/smpl-Password";
import { SampleFormControlSelect } from "@/comn/sample/Component/FormControl/smpl-Select";
import { SampleFormControlRadio } from "@/comn/sample/Component/FormControl/smpl-Radio";
import { SampleFormControlCheckbox } from "@/comn/sample/Component/FormControl/smpl-Checkbox";
import { SampleFormControlTextarea } from "@/comn/sample/Component/FormControl/smpl-Textarea";
import { SampleFormControlDate } from "@/comn/sample/Component/FormControl/smpl-Date";
import { SampleFormControlTime } from "@/comn/sample/Component/FormControl/smpl-Time";
import { SampleFormControlDatetime } from "@/comn/sample/Component/FormControl/smpl-Datetime";
import { SampleFormControlRange } from "@/comn/sample/Component/FormControl/smpl-Range";
import { SampleFormControlFile } from "@/comn/sample/Component/FormControl/smpl-File";

import { SampleIcon } from "@/comn/sample/Component/smpl-Icon";
import { SampleForm } from "@/comn/sample/Component/smpl-Form";
import { SampleTab } from "@/comn/sample/Component/smpl-Tab";
import { SampleTree } from "@/comn/sample/Component/smpl-Tree";
import { SampleTable } from "@/comn/sample/Component/smpl-Table";
import { SampleWijmo } from "@/comn/sample/Component/smpl-Wijmo";

import { SampleUseModal } from "@/comn/sample/Hook/smpl-useModal";
import { SampleUseToast } from "@/comn/sample/Hook/smpl-useToast";
import { SampleUsePopup } from "@/comn/sample/Hook/smpl-usePopup";

import { SampleList } from "@/comn/sample/Page/smpl-List";
import { SampleDetail } from "@/comn/sample/Page/smpl-Detail";
import { SampleRegist } from "@/comn/sample/Page/smpl-Regist";
import { SampleUpdate } from "@/comn/sample/Page/smpl-Update";
import { SampleCommonPopup } from "@/comn/sample/Page/smpl-ComnPopup";

export const SampleMain = () => {
    return (
        <MainLayout>
            <Routes>
                <Route
                    path="/components/FormControl/Text"
                    element={<SampleFormControlText />}
                />
                <Route
                    path="/components/FormControl/Number"
                    element={<SampleFormControlNumber />}
                />
                <Route
                    path="/components/FormControl/Password"
                    element={<SampleFormControlPassword />}
                />
                <Route
                    path="/components/FormControl/Select"
                    element={<SampleFormControlSelect />}
                />
                <Route
                    path="/components/FormControl/Radio"
                    element={<SampleFormControlRadio />}
                />
                <Route
                    path="/components/FormControl/Checkbox"
                    element={<SampleFormControlCheckbox />}
                />
                <Route
                    path="/components/FormControl/Textarea"
                    element={<SampleFormControlTextarea />}
                />
                <Route
                    path="/components/FormControl/Date"
                    element={<SampleFormControlDate />}
                />
                <Route
                    path="/components/FormControl/Time"
                    element={<SampleFormControlTime />}
                />
                <Route
                    path="/components/FormControl/Datetime"
                    element={<SampleFormControlDatetime />}
                />
                <Route
                    path="/components/FormControl/Range"
                    element={<SampleFormControlRange />}
                />
                <Route
                    path="/components/FormControl/File"
                    element={<SampleFormControlFile />}
                />

                <Route path="/components/icon" element={<SampleIcon />} />
                <Route path="/components/form" element={<SampleForm />} />
                <Route path="/components/tab" element={<SampleTab />} />
                <Route path="/components/tree" element={<SampleTree />} />
                <Route path="/components/wijmo" element={<SampleWijmo />} />
                <Route path="/components/table" element={<SampleTable />} />

                <Route path="/hooks/useModal" element={<SampleUseModal />} />
                <Route path="/hooks/useToast" element={<SampleUseToast />} />
                <Route path="/hooks/usePopup" element={<SampleUsePopup />} />

                <Route path="/pages" element={<SampleList />} />
                <Route path="/pages/:id" element={<SampleDetail />} />
                <Route path="/pages/:id/update" element={<SampleUpdate />} />
                <Route path="/pages/regist" element={<SampleRegist />} />
                <Route
                    path="/pages/comnPpup"
                    element={<SampleCommonPopup isPopup={true} />}
                />
            </Routes>
        </MainLayout>
    );
};
