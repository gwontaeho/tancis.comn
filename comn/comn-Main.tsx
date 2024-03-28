import { Routes, Route } from "react-router-dom";

import { CommonCodeList } from "@/comn/comn/code/ComnCdLst";
import { CountryCodeList } from "@/comn/comn/code/CntyCdLst";
import { DgtCountryCodeList } from "@/comn/comn/code/dgt3CntyCdLst";
import { CityCodeList } from "@/comn/comn/code/CityCdLst";
import { CurrencyCodeList } from "@/comn/comn/code/CurrCdLst";
import { BankCodeList } from "@/comn/comn/code/BnkCdLst";
import { PortCodeList } from "@/comn/comn/code/PortCdLst";
import { AirptCodeList } from "@/comn/comn/code/AirptCdLst";
import { PortAirptCodeList } from "@/comn/comn/code/PortAirptCdLst";
import { CompanyCodeList } from "@/comn/comn/code/CoCdLst";
import { ProcessingStatusCodeList } from "@/comn/comn/code/PrcssStatCdLst";
import { OrganizationCodeList } from "@/comn/comn/code/OrgCdLst";
import { WrhsCodeList } from "@/comn/comn/code/WrhsCdLst";
import { CarrCodeList } from "@/comn/comn/code/CarrCdLst";
import { VehicleUseCodeList } from "@/comn/comn/code/VhclUseCdLst";
import { OrganizationDepartmentCodeList } from "@/comn/comn/code/OrgDeptCdLst";
import { VehicleBodyCodeList } from "@/comn/comn/code/VhclBodyCdLst";
import { VehicleCategoryCodeList } from "@/comn/comn/code/VhclCtgrCdLst";
import { VehicleColorCodeList } from "@/comn/comn/code/VhclClrCdLst";
import { VehicleFuelCodeList } from "@/comn/comn/code/VhclFlCdLst";
import { VehicleManufactureCodeList } from "@/comn/comn/code/VhclMkerCdLst";
import { VehicleImportCountryCodeList } from "@/comn/comn/code/VhclImpCntyCdLst";
import { VehicleInsuranceTypeCodeList } from "@/comn/comn/code/VhclInsrTpCdLst";
import { VehicleModelCodeList } from "@/comn/comn/code/VhclMdlCdLst";
import { VehicleModelNumberCodeList } from "@/comn/comn/code/VhclMdlNoCdLst";
import { VehicleHolderCategoryList } from "@/comn/comn/code/VhclHlpnCtgrCdLst";
import { VehiclePropellerTypeCodeList } from "@/comn/comn/code/VhclPrplTpCdLst";
import { VehicleTransmissionTypeCodeList } from "@/comn/comn/code/VhclTrmssnTpCdLst";
import { CompanyDeclareCodeList } from "@/comn/comn/code/CoDclaCdLst";
import { CustomsCodeList } from "@/comn/comn/code/cstmCdLst";
import { CustomsOfficerCodeList } from "@/comn/comn/code/CstmOfcrCdLst";
import { HsCodeList } from "@/comn/comn/code/hsCdLst";
import { CompanyCodeDetail } from "@/comn/comn/code/CoCdDtl";
import { PostCodeList } from "@/comn/comn/code/PostCdLst";
import { TinNumberList } from "@/comn/comn/code/TinNoLst";
import { TbList } from "@/comn/comn/code/TbLst";
import { ColList } from "@/comn/comn/code/ColLst";
import { LblList } from "@/comn/comn/code/LblLst";

import { LblLangLst } from "@/comn/comn/lbl/LblLangLst";
import { LblLangEdit } from "@/comn/comn/lbl/LblLangEdit";
import { LblLangDtl } from "@/comn/comn/lbl/LblLangDtl";
import { LblLangRgsr } from "@/comn/comn/lbl/LblLangRgsr";

import { MsgLangLst } from "@/comn/comn/msg/MsgLangLst";
import { MsgLangEdit } from "@/comn/comn/msg/MsgLangEdit";
import { MsgLangDtl } from "@/comn/comn/msg/MsgLangDtl";
import { MsgLangRgsr } from "@/comn/comn/msg/MsgLangRgsr";

import { BltbrdLst } from "@/comn/comn/bltbrd/BltbrdLst";
import { BltbrdRgsr } from "@/comn/comn/bltbrd/BltbrdRgsr";
import { BltbrdDtl } from "@/comn/comn/bltbrd/BltbrdDtl";
import { BltbrdEdit } from "@/comn/comn/bltbrd/BltbrdEdit";

export const ComnMain = () => {
    return (
        <Routes>
            <Route path="/ppup/comnCdPpup" element={<CommonCodeList />} />
            <Route path="/ppup/cntyCdPpup" element={<CountryCodeList />} />
            <Route path="/ppup/dgt3CntyCdPpup" element={<DgtCountryCodeList />} />
            <Route path="/ppup/cityCdPpup" element={<CityCodeList />} />
            <Route path="/ppup/currCdPpup" element={<CurrencyCodeList />} />
            <Route path="/ppup/bnkCdPpup" element={<BankCodeList />} />
            <Route path="/ppup/portCdPpup" element={<PortCodeList />} />
            <Route path="/ppup/portAirptCdPpup" element={<PortAirptCodeList />} />
            <Route path="/ppup/airptCdPpup" element={<AirptCodeList />} />
            <Route path="/ppup/coCdPpup" element={<CompanyCodeList />} />
            <Route path="/ppup/prcssStatPpup" element={<ProcessingStatusCodeList />} />
            <Route path="/ppup/orgCdPpup" element={<OrganizationCodeList />} />
            <Route path="/ppup/wrhsCdPpup" element={<WrhsCodeList />} />
            <Route path="/ppup/carrCdPpup" element={<CarrCodeList />} />
            <Route path="/ppup/coDclaCdPpup" element={<CompanyDeclareCodeList />} />
            <Route path="/ppup/orgDeptCdPpup" element={<OrganizationDepartmentCodeList />} />
            <Route path="/ppup/cstmCdPpup" element={<CustomsCodeList />} />
            <Route path="/ppup/cstmOfcrCdPpup" element={<CustomsOfficerCodeList />} />
            <Route path="/ppup/vhclBodyCdPpup" element={<VehicleBodyCodeList />} />
            <Route path="/ppup/vhclCtgrCdPpup" element={<VehicleCategoryCodeList />} />
            <Route path="/ppup/vhclClrCdPpup" element={<VehicleColorCodeList />} />
            <Route path="/ppup/vhclFlCdPpup" element={<VehicleFuelCodeList />} />
            <Route path="/ppup/vhclMkerCdPpup" element={<VehicleManufactureCodeList />} />
            <Route path="/ppup/vhclImpCntyCdPpup" element={<VehicleImportCountryCodeList />} />
            <Route path="/ppup/vhclInsrTpCdPpup" element={<VehicleInsuranceTypeCodeList />} />
            <Route path="/ppup/vhclMdlCdPpup" element={<VehicleModelCodeList />} />
            <Route path="/ppup/vhclMdlNoCdPpup" element={<VehicleModelNumberCodeList />} />
            <Route path="/ppup/vhclHlpnCtgrCdPpup" element={<VehicleHolderCategoryList />} />
            <Route path="/ppup/vhclPrplTpCdPpup" element={<VehiclePropellerTypeCodeList />} />
            <Route path="/ppup/vhclTrmssnTpCdPpup" element={<VehicleTransmissionTypeCodeList />} />
            <Route path="/ppup/vhclUseCdPpup" element={<VehicleUseCodeList />} />
            <Route path="/ppup/coCdDtl" element={<CompanyCodeDetail />} />
            <Route path="/ppup/hsCdPpup" element={<HsCodeList />} />
            <Route path="/ppup/postCdPpup" element={<PostCodeList />} />
            <Route path="/ppup/tinNoPpup" element={<TinNumberList />} />
            <Route path="/ppup/tbPpup" element={<TbList />} />
            <Route path="/ppup/colPpup" element={<ColList />} />
            <Route path="/ppup/lblPpup" element={<LblList />} />

            <Route path="/lbl/lblLangLst" element={<LblLangLst />} />
            <Route path="/lbl/lblLangRgsr" element={<LblLangRgsr />} />
            <Route path="/lbl/LblLangDtl/:lblId" element={<LblLangDtl />} />
            <Route path="/lbl/LblLangEdit/:lblId" element={<LblLangEdit />} />

            <Route path="/msg/msgLangLst" element={<MsgLangLst />} />
            <Route path="/msg/msgLangRgsr" element={<MsgLangRgsr />} />
            <Route path="/msg/MsgLangDtl/:msgId" element={<MsgLangDtl />} />
            <Route path="/msg/MsgLangEdit/:msgId" element={<MsgLangEdit />} />

            <Route path="/bltbrd/bltbrdLst" element={<BltbrdLst />} />
            <Route path="/bltbrd/bltbrdRgsr" element={<BltbrdRgsr />} />
            <Route path="/bltbrd/bltbrdDtl/:id" element={<BltbrdDtl />} />
            <Route path="/bltbrd/bltbrdEdit/:id" element={<BltbrdEdit />} />
        </Routes>
    );
};
