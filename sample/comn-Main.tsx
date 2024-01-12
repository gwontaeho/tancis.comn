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
import { __Test } from "../components/__TEST";

export const ComnMain = () => {
    return (
        <Routes>
            <Route path="/ppup/comnCdPpup" element={<CommonCodeList />} />
            <Route path="/ppup/cntyCdPpup" element={<CountryCodeList />} />
            <Route path="/ppup/cityCdPpup" element={<CityCodeList />} />
            <Route path="/ppup/currCdPpup" element={<CurrencyCodeList />} />
            <Route path="/ppup/bnkCdPpup" element={<BankCodeList />} />
            <Route path="/ppup/portCdPpup" element={<PortCodeList />} />
            <Route path="/ppup/portAirptCdPpup" element={<PortAirptCodeList />} />
            <Route path="/ppup/airptCdPpup" element={<AirptCodeList />} />
            <Route path="/ppup/coCdPpup" element={<CompanyCodeList />} />
            <Route path="/ppup/prcssStatPpup" element={<ProcessingStatusCodeList />} />
            <Route path="/ppup/orgCdPpup" element={<OrganizationCodeList />} />
        </Routes>
    );
};
