import { Page, Group, Layout, Button } from "@/comn/components";
import { useForm, useResource, TFormSchema } from "@/comn/hooks";

const SCHEMA_FORM: TFormSchema = {
    id: "form",
    schema: {
        field1: {
            type: "code",
            area: "cityCd",
            label: "Region Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field2: {
            type: "code",
            area: "comnCd",
            comnCd: "COM_0015",
            label: "Common Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field3: {
            type: "code",
            area: "cntyCd",
            label: "Country Code",
            controlSize: 10,
            popupSize: "md",
        },
        field4: {
            type: "code",
            area: "currCd",
            label: "Currency Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field5: {
            type: "code",
            area: "bnkCd",
            label: "Bank Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field6: {
            type: "code",
            area: "portCd",
            label: "Port Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field7: {
            type: "code",
            area: "airptCd",
            label: "Airport Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field8: {
            type: "code",
            area: "portAirptCd",
            label: "Port/Airport Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field9: {
            type: "code",
            area: "coCd",
            label: "Company Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field10: {
            type: "code",
            area: "prcssStatCd",
            label: "Processing Status Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field11: {
            type: "code",
            area: "orgCd",
            label: "Organization Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field12: {
            type: "code",
            area: "wrhsCd",
            label: "WareHouse Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field13: {
            type: "code",
            area: "coDclaCd",
            label: "Company Declare Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },

        field14: {
            type: "code",
            area: "orgDeptCd",
            label: "Organization Department Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field15: {
            type: "code",
            area: "cstmOfceCd",
            label: "Customs Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field16: {
            type: "code",
            area: "vhclBodyCd",
            label: "Vehicle Body Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field17: {
            type: "code",
            area: "vhclCtgrCd",
            label: "Vehicle Category Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field18: {
            type: "code",
            area: "vhclClrCd",
            label: "Vehicle Color Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field19: {
            type: "code",
            area: "vhclFlCd",
            label: "Vehicle Fuel Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field20: {
            type: "code",
            area: "vhclMkerCd",
            label: "Vehicle Maker Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field21: {
            type: "code",
            area: "vhclImpCntyCd",
            label: "Vehicle Import Country Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field22: {
            type: "code",
            area: "vhclInsrTpCd",
            label: "Vehicle Insurance Type Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field23: {
            type: "code",
            area: "vhclMdlCd",
            label: "Vehicle Model Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field24: {
            type: "code",
            area: "vhclMdlNoCd",
            label: "Vehicle Model Number Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field25: {
            type: "code",
            area: "vhclHlpnCtgrCd",
            label: "Vehicle Holder Category Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field26: {
            type: "code",
            area: "vhclPrplTpCd",
            label: "Vehicle Propeller Type Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field27: {
            type: "code",
            area: "vhclTrmssnTpCd",
            label: "Vehicle Transmission Type Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field28: {
            type: "code",
            area: "vhclUseCd",
            label: "Vehicle Use Code",
            controlSize: 10,
            maxLength: 3,
            popupSize: "md",
        },
        field29: {
            type: "code",
            area: "coCdDtl",
            label: "Company Code Detail",
            controlSize: 10,
            maxLength: 9,
            popupSize: "md",
        },
    },
};

export const SampleFormControlCode = () => {
    useResource({
        defaultSchema: [
            { area: "cityCd" },
            { area: "comnCd", comnCd: "COM_0015" },
            { area: "cntyCd" },
            { area: "currCd" },
            { area: "bnkCd" },
            { area: "portCd" },
            { area: "airptCd" },
            { area: "portAirptCd" },
            { area: "coCd" },
            { area: "prcssStatCd" },
            { area: "orgCd" },
            { area: "wrhsCd" },
            { area: "coDclaCd" },
            { area: "orgDeptCd" },
            { area: "cstmCd" },
            { area: "vhclBodyCd" },
            { area: "vhclCtgrCd" },
            { area: "vhclClrCd" },
            { area: "vhclFlCd" },
            { area: "vhclMkerCd" },
            { area: "vhclImpCntyCd" },
            { area: "vhclInsrTpCd" },
            { area: "vhclMdlCd" },
            { area: "vhclMdlNoCd" },
            { area: "vhclHlpnCtgrCd" },
            { area: "vhclPrplTpCd" },
            { area: "vhclTrmssnTpCd" },
            { area: "vhclUseCd" },
            { area: "coCdDtl" },
        ],
    });

    const form = useForm({ defaultSchema: SCHEMA_FORM, defaultValues: { field2: "a01" } });

    return (
        <Page>
            <Group>
                <Group.Body>
                    <Group.Row>
                        <Group.Control {...form.schema.field1}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field2}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field3}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field4}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field5}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field6}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field7}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field8}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field9}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field10}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field11}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field12}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field13}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field14}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field15}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field16}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field17}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field18}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field19}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field20}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field21}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field22}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field23}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field24}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field25}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field26}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field27}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field28}></Group.Control>
                    </Group.Row>
                    <Group.Row>
                        <Group.Control {...form.schema.field29}></Group.Control>
                    </Group.Row>
                </Group.Body>
            </Group>

            <Layout direction="row">
                <Layout.Right>
                    <Button
                        onClick={() => {
                            console.log(form.getValues());
                        }}
                    >
                        Value
                    </Button>
                    <Button
                        onClick={() => {
                            form.setValue("field2", "a032");
                        }}
                    >
                        set Value
                    </Button>
                </Layout.Right>
            </Layout>
        </Page>
    );
};
