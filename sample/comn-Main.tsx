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
import { WrhsCodeList } from "@/comn/sample/Page/comn-code/WrhsCdLst";
import { LblLangLst } from "@/comn/comn/lbl/LblLangLst";
import { LblLangEdit } from "@/comn/comn/lbl/LblLangEdit";
import { LblLangDtl } from "@/comn/comn/lbl/LblLangDtl";
import { LblLangRgsr } from "@/comn/comn/lbl/LblLangRgsr";
import { MsgLangLst } from "@/comn/comn/msg/MsgLangLst";
import { MsgLangEdit } from "@/comn/comn/msg/MsgLangEdit";
import { MsgLangDtl } from "@/comn/comn/msg/MsgLangDtl";
import { MsgLangRgsr } from "@/comn/comn/msg/MsgLangRgsr";

import { VehicleUseCodeList } from "./Page/comn-code/VhclUseCdLst";
import { OrganizationDepartmentCodeList } from "./Page/comn-code/OrgDeptCdLst";
import { VehicleBodyCodeList } from "./Page/comn-code/VhclBodyCdLst";
import { VehicleCategoryCodeList } from "./Page/comn-code/VhclCtgrCdLst";
import { VehicleColorCodeList } from "./Page/comn-code/VhclClrCdLst";
import { VehicleFuelCodeList } from "./Page/comn-code/VhclFlCdLst";
import { VehicleManufactureCodeList } from "./Page/comn-code/VhclMkerCdLst";
import { VehicleImportCountryCodeList } from "./Page/comn-code/VhclImpCntyCdLst";
import { VehicleInsuranceTypeCodeList } from "./Page/comn-code/VhclInsrTpCdLst";
import { VehicleModelCodeList } from "./Page/comn-code/VhclMdlCdLst";
import { VehicleModelNumberCodeList } from "./Page/comn-code/VhclMdlNoCdLst";
import { VehicleHolderCategoryList } from "./Page/comn-code/VhclHlpnCtgrCdLst";
import { VehiclePropellerTypeCodeList } from "./Page/comn-code/VhclPrplTpCdLst";
import { VehicleTransmissionTypeCodeList } from "./Page/comn-code/VhclTrmssnTpCdLst";
import { CompanyDeclareCodeList } from "./Page/comn-code/CoDclaCdLst";
import { CustomsCodeList } from "./Page/comn-code/cstmCdLst";
import { CompanyCodeDetail } from "./Page/comn-code/CoCdDtl";

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
            <Route path="/comn/ppup/wrhsCdPpup" element={<WrhsCodeList />} />
            <Route path="/comn/lbl/lblLangLst" element={<LblLangLst />} />
            <Route path="/comn/lbl/lblLangRgsr" element={<LblLangRgsr />} />
            <Route path="/comn/lbl/LblLangDtl/:lblId" element={<LblLangDtl />} />
            <Route path="/comn/lbl/LblLangEdit/:lblId" element={<LblLangEdit />} />
            <Route path="/comn/msg/msgLangLst" element={<MsgLangLst />} />
            <Route path="/comn/msg/msgLangRgsr" element={<MsgLangRgsr />} />
            <Route path="/comn/msg/MsgLangDtl/:msgId" element={<MsgLangDtl />} />
            <Route path="/comn/msg/MsgLangEdit/:msgId" element={<MsgLangEdit />} />
            <Route path="/comn/ppup/coDclaCdPpup" element={<CompanyDeclareCodeList />} />
            <Route path="/comn/ppup/orgDeptCdPpup" element={<OrganizationDepartmentCodeList />} />
            <Route path="/comn/ppup/cstmCdPpup" element={<CustomsCodeList />} />
            <Route path="/comn/ppup/vhclBodyCdPpup" element={<VehicleBodyCodeList />} />
            <Route path="/comn/ppup/vhclCtgrCdPpup" element={<VehicleCategoryCodeList />} />
            <Route path="/comn/ppup/vhclClrCdPpup" element={<VehicleColorCodeList />} />
            <Route path="/comn/ppup/vhclFlCdPpup" element={<VehicleFuelCodeList />} />
            <Route path="/comn/ppup/vhclMkerCdPpup" element={<VehicleManufactureCodeList />} />
            <Route path="/comn/ppup/vhclImpCntyCdPpup" element={<VehicleImportCountryCodeList />} />
            <Route path="/comn/ppup/vhclInsrTpCdPpup" element={<VehicleInsuranceTypeCodeList />} />
            <Route path="/comn/ppup/vhclMdlCdPpup" element={<VehicleModelCodeList />} />
            <Route path="/comn/ppup/vhclMdlNoCdPpup" element={<VehicleModelNumberCodeList />} />
            <Route path="/comn/ppup/vhclHlpnCtgrCdPpup" element={<VehicleHolderCategoryList />} />
            <Route path="/comn/ppup/vhclPrplTpCdPpup" element={<VehiclePropellerTypeCodeList />} />
            <Route path="/comn/ppup/vhclTrmssnTpCdPpup" element={<VehicleTransmissionTypeCodeList />} />
            <Route path="/comn/ppup/vhclUseCdPpup" element={<VehicleUseCodeList />} />
            <Route path="/comn/ppup/coCdDtl" element={<CompanyCodeDetail />} />
        </Routes>
    );
};
