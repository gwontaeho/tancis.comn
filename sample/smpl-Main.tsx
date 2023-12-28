import { Routes, Route } from "react-router-dom";

import { Temp } from "./temp";

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
import { SampleFormControlCode } from "@/comn/sample/Component/FormControl/smpl-Code";

import { SamplePage } from "@/comn/sample/Component/smpl-Page";
import { SampleIcon } from "@/comn/sample/Component/smpl-Icon";
import { SampleTooltip } from "@/comn/sample/Component/smpl-Tooltip";
import { SampleTab } from "@/comn/sample/Component/smpl-Tab";
import { SampleTree } from "@/comn/sample/Component/smpl-Tree";
import { SampleTable } from "@/comn/sample/Component/smpl-Table";
import { SampleWijmo } from "@/comn/sample/Component/smpl-Wijmo";
import { SampleIconButton } from "@/comn/sample/Component/smpl-IconButton";

import { SampleUseForm } from "@/comn/sample/Hook/smpl-useForm";
import { SampleUseModal } from "@/comn/sample/Hook/smpl-useModal";
import { SampleUseToast } from "@/comn/sample/Hook/smpl-useToast";
import { SampleUsePopup } from "@/comn/sample/Hook/smpl-usePopup";
import { SampleUsePopupTarget } from "@/comn/sample/Hook/smpl-usePopup";
import { SampleUseWijmo } from "@/comn/sample/Hook/smpl-useWijmo";
import { SampleUseTab } from "@/comn/sample/Hook/smpl-useTab";
import { SampleUseTree } from "@/comn/sample/Hook/smpl-useTree";
import { SampleUseFetch } from "@/comn/sample/Hook/smpl-useFetch";
import { SampleUseStore } from "@/comn/sample/Hook/smpl-useStore";

import { SampleList } from "@/comn/sample/Page/smpl-List";
import { SampleDetail } from "@/comn/sample/Page/smpl-Detail";
import { SampleRegist } from "@/comn/sample/Page/smpl-Regist";
import { SampleUpdate } from "@/comn/sample/Page/smpl-Update";
import { CommonCodeList } from "@/comn/sample/Page/comn-code/ComnCdLst";
import { CountryCodeList } from "@/comn/sample/Page/comn-code/CntyCdLst";
import { CityCodeList } from "@/comn/sample/Page/comn-code/CityCdLst";
import { CurrencyCodeList } from "@/comn/sample/Page/comn-code/CurrCdLst";
import { BankCodeList } from "@/comn/sample/Page/comn-code/BankCdLst";
import { PortCodeList } from "@/comn/sample/Page/comn-code/PortCdLst";
import { __Test } from "../components/__TEST";

export const SampleMain = () => {
    return (
        <Routes>
            <Route path="/temp" element={<Temp />} />

            <Route path="/test999" element={<__Test />} />

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
            <Route path="/components/FormControl/Code" element={<SampleFormControlCode />} />

            <Route path="/components/Page" element={<SamplePage />} />
            <Route path="/components/Icon" element={<SampleIcon />} />
            <Route path="/components/Tooltip" element={<SampleTooltip />} />
            <Route path="/components/Tab" element={<SampleTab />} />
            <Route path="/components/Tree" element={<SampleTree />} />
            <Route path="/components/Wijmo" element={<SampleWijmo />} />
            <Route path="/components/Table" element={<SampleTable />} />
            <Route path="/components/IconButton" element={<SampleIconButton />} />

            <Route path="/hooks/useForm" element={<SampleUseForm />} />
            <Route path="/hooks/useModal" element={<SampleUseModal />} />
            <Route path="/hooks/useToast" element={<SampleUseToast />} />
            <Route path="/hooks/usePopup" element={<SampleUsePopup />} />
            <Route path="/hooks/usePopupTarget" element={<SampleUsePopupTarget />} />
            <Route path="/hooks/useWijmo" element={<SampleUseWijmo />} />
            <Route path="/hooks/useTab" element={<SampleUseTab />} />
            <Route path="/hooks/useTree" element={<SampleUseTree />} />
            <Route path="/hooks/useFetch" element={<SampleUseFetch />} />
            <Route path="/hooks/useStore" element={<SampleUseStore />} />

            <Route path="/pages/list" element={<SampleList />} />
            <Route path="/pages/detail" element={<SampleDetail />} />
            <Route path="/pages/update" element={<SampleUpdate />} />
            <Route path="/pages/regist" element={<SampleRegist />} />

            <Route path="/pages/comnCdPpup" element={<CommonCodeList />} />
            <Route path="/pages/cntyCdPpup" element={<CountryCodeList />} />
            <Route path="/pages/cityCdPpup" element={<CityCodeList />} />
            <Route path="/pages/currCdPpup" element={<CurrencyCodeList />} />
            <Route path="/pages/bnkCdPpup" element={<BankCodeList />} />
            <Route path="/pages/portCdPpup" element={<PortCodeList />} />
            <Route path="/pages/portAirptCdPpup" element={<PortCodeList />} />
            <Route path="/pages/airptCdPpup" element={<PortCodeList />} />
            <Route path="/pages/coCdPpup" element={<PortCodeList />} />
            <Route path="/pages/prcssStatPpup" element={<PortCodeList />} />
            <Route path="/pages/orgCdPpup" element={<PortCodeList />} />
        </Routes>
    );
};
