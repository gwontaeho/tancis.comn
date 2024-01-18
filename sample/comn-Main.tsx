import { Routes, Route } from "react-router-dom";

import { CommonCodeList } from "@/comn/sample/Page/comn-code/ComnCdLst";
import { CountryCodeList } from "@/comn/sample/Page/comn-code/CntyCdLst";
import { CityCodeList } from "@/comn/sample/Page/comn-code/CityCdLst";
import { CurrencyCodeList } from "@/comn/sample/Page/comn-code/CurrCdLst";
import { BankCodeList } from "@/comn/sample/Page/comn-code/BnkCdLst";
import { PortCodeList } from "@/comn/sample/Page/comn-code/PortCdLst";
import { AirptCodeList } from "@/comn/sample/Page/comn-code/AirptCdLst";
import { PortAirptCodeList } from "@/comn/sample/Page/comn-code/PortAirptCdLst";
import { CompanyCodeList } from "@/comn/sample/Page/comn-code/CoCdLst";
import { ProcessingStatusCodeList } from "@/comn/sample/Page/comn-code/PrcssStatCdLst";
import { OrganizationCodeList } from "@/comn/sample/Page/comn-code/OrgCdLst";
import { LabelLanguageList } from "@/comn/comn/lbl/LblLangLst";

export const ComnMain = () => {
    return (
        <Routes>
            <Route path="/comn/ppup/comnCdPpup" element={<CommonCodeList />} />
            <Route path="/comn/ppup/cntyCdPpup" element={<CountryCodeList />} />
            <Route path="/comn/ppup/cityCdPpup" element={<CityCodeList />} />
            <Route path="/comn/ppup/currCdPpup" element={<CurrencyCodeList />} />
            <Route path="/comn/ppup/bnkCdPpup" element={<BankCodeList />} />
            <Route path="/comn/ppup/portCdPpup" element={<PortCodeList />} />
            <Route path="/comn/ppup/portAirptCdPpup" element={<PortAirptCodeList />} />
            <Route path="/comn/ppup/airptCdPpup" element={<AirptCodeList />} />
            <Route path="/comn/ppup/coCdPpup" element={<CompanyCodeList />} />
            <Route path="/comn/ppup/prcssStatPpup" element={<ProcessingStatusCodeList />} />
            <Route path="/comn/ppup/orgCdPpup" element={<OrganizationCodeList />} />
            <Route path="/comn/lbl/lblLangLst" element={<LabelLanguageList />} />
        </Routes>
    );
};
