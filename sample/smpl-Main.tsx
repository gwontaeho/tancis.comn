import { Routes, Route } from "react-router-dom";

import { Components } from "./Component";

import { SampleFormControlBasic } from "@/comn/sample/Component/FormControl/smpl-Basic";
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
import { SampleFormControlDateRange } from "@/comn/sample/Component/FormControl/smpl-DateRange";
import { SampleFormControlTimeRange } from "@/comn/sample/Component/FormControl/smpl-TimeRange";
import { SampleFormControlFile } from "@/comn/sample/Component/FormControl/smpl-File";
import { SampleFormControlCode } from "@/comn/sample/Component/FormControl/smpl-Code";

import { SampleLayoutBasic } from "@/comn/sample/Component/smpl-LayoutBasic";
import { SampleText } from "@/comn/sample/Component/smpl-Text";
import { SamplePage } from "@/comn/sample/Component/smpl-Page";
import { SampleIcon } from "@/comn/sample/Component/smpl-Icon";
import { SampleTooltip } from "@/comn/sample/Component/smpl-Tooltip";
import { SampleTab } from "@/comn/sample/Component/smpl-Tab";
import { SampleTree } from "@/comn/sample/Component/smpl-Tree";
import { SampleTable } from "@/comn/sample/Component/smpl-Table";
import { SampleIconButton } from "@/comn/sample/Component/smpl-IconButton";
import { SampleGrid } from "@/comn/sample/Component/smpl-Grid";
import { SampleGroup } from "@/comn/sample/Component/smpl-Group";
import { SampleLayout } from "@/comn/sample/Component/smpl-Layout";
import { SampleButton } from "@/comn/sample/Component/smpl-Button";

import { SampleUseForm } from "@/comn/sample/Hook/smpl-useForm";
import { SampleUseModal } from "@/comn/sample/Hook/smpl-useModal";
import { SampleUseToast } from "@/comn/sample/Hook/smpl-useToast";
import { SampleUsePopup } from "@/comn/sample/Hook/smpl-usePopup";
import { SampleUsePopupWindow } from "@/comn/sample/Hook/smpl-usePopup";
import { SampleUseTab } from "@/comn/sample/Hook/smpl-useTab";
import { SampleUseTree } from "@/comn/sample/Hook/smpl-useTree";
import { SampleUseFetch } from "@/comn/sample/Hook/smpl-useFetch";
import { SampleUseStore } from "@/comn/sample/Hook/smpl-useStore";

import { CGME0411001Q } from "@/comn/sample/Sample/CGME0411001Q";
import { CGME0411002S } from "@/comn/sample/Sample/CGME0411002S";
import { CGME0411003Q } from "@/comn/sample/Sample/CGME0411003Q";

import { GuideBasic } from "@/comn/sample/Guide/guide-Basic";
import { GuidePopup } from "@/comn/sample/Guide/guide-Popup";
import { GuideValidation } from "@/comn/sample/Guide/guide-Validation";
import { GuideApi } from "@/comn/sample/Guide/guide-Api";
import { GuideFunction } from "@/comn/sample/Guide/guide-Function";
import { GuideRouter } from "@/comn/sample/Guide/guide-Router";

export const SampleMain = () => {
    return (
        <Routes>
            <Route path="/components" element={<Components />} />

            <Route path="/components/FormControl/Basic" element={<SampleFormControlBasic />} />
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
            <Route path="/components/FormControl/DateRange" element={<SampleFormControlDateRange />} />
            <Route path="/components/FormControl/TimeRange" element={<SampleFormControlTimeRange />} />
            <Route path="/components/FormControl/File" element={<SampleFormControlFile />} />
            <Route path="/components/FormControl/Code" element={<SampleFormControlCode />} />

            <Route path="/components/Basic" element={<SampleLayoutBasic />} />
            <Route path="/components/Text" element={<SampleText />} />
            <Route path="/components/Page" element={<SamplePage />} />
            <Route path="/components/Icon" element={<SampleIcon />} />
            <Route path="/components/Tooltip" element={<SampleTooltip />} />
            <Route path="/components/Tab" element={<SampleTab />} />
            <Route path="/components/Tree" element={<SampleTree />} />
            <Route path="/components/Table" element={<SampleTable />} />
            <Route path="/components/IconButton" element={<SampleIconButton />} />
            <Route path="/components/Grid" element={<SampleGrid />} />
            <Route path="/components/Group" element={<SampleGroup />} />
            <Route path="/components/Layout" element={<SampleLayout />} />
            <Route path="/components/Button" element={<SampleButton />} />

            <Route path="/hooks/useForm" element={<SampleUseForm />} />
            <Route path="/hooks/useModal" element={<SampleUseModal />} />
            <Route path="/hooks/useToast" element={<SampleUseToast />} />
            <Route path="/hooks/usePopup" element={<SampleUsePopup />} />
            <Route path="/hooks/usePopupWindow" element={<SampleUsePopupWindow />} />
            <Route path="/hooks/useTab" element={<SampleUseTab />} />
            <Route path="/hooks/useTree" element={<SampleUseTree />} />
            <Route path="/hooks/useFetch" element={<SampleUseFetch />} />
            <Route path="/hooks/useStore" element={<SampleUseStore />} />

            <Route path="/sample/cgme0411001q" element={<CGME0411001Q />} />
            <Route path="/sample/cgme0411002s" element={<CGME0411002S />} />
            <Route path="/sample/cgme0411002s/:dclrNo" element={<CGME0411002S />} />
            <Route path="/sample/cgme0411003q" element={<CGME0411003Q />} />

            <Route path="/guide/Structure" element={<GuideBasic />} />
            <Route path="/guide/Popup" element={<GuidePopup />} />
            <Route path="/guide/Validation" element={<GuideValidation />} />
            <Route path="/guide/Api" element={<GuideApi />} />
            <Route path="/guide/Function" element={<GuideFunction />} />
            <Route path="/guide/Router" element={<GuideRouter />} />
        </Routes>
    );
};

export default SampleMain;
