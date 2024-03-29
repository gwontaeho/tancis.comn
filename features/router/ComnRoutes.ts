export const ComnRoutes = [
    {
        name: "Common",
        base: "/comn",
        children: [
            {
                name: "Guide",
                base: "Guide",
                children: [
                    {
                        name: "기본 구조",
                        to: "/comn/smpl/guide/Structure",
                    },
                    {
                        name: "코드데이터 사용",
                        to: "/comn/smpl/guide/Popup",
                    },
                    {
                        name: "오류 검증",
                        to: "/comn/smpl/guide/Validation",
                    },
                    {
                        name: "Back-End 호출",
                        to: "/comn/smpl/guide/Api",
                    },
                    {
                        name: "라우터 구성",
                        to: "/comn/smpl/guide/Router",
                    },
                    {
                        name: "공통 유틸",
                        to: "/comn/smpl/guide/Function",
                    },
                ],
            },
            {
                name: "Sample",
                base: "Sample",
                children: [
                    {
                        name: "Repacking BL (with Item)",
                        to: "/comn/smpl/sample/cgme0411001q",
                    },
                ],
            },
            {
                name: "Component",
                base: "/smpl/components",
                children: [
                    {
                        name: "Form Component",
                        base: "/form",
                        children: [
                            {
                                name: "Basic",
                                to: "/comn/smpl/components/FormControl/Basic",
                            },
                            {
                                name: "Text",
                                to: "/comn/smpl/components/FormControl/Text",
                            },
                            {
                                name: "Number",
                                to: "/comn/smpl/components/FormControl/Number",
                            },
                            {
                                name: "Password",
                                to: "/comn/smpl/components/FormControl/Password",
                            },
                            {
                                name: "Select",
                                to: "/comn/smpl/components/FormControl/Select",
                            },
                            {
                                name: "Radio",
                                to: "/comn/smpl/components/FormControl/Radio",
                            },
                            {
                                name: "Checkbox",
                                to: "/comn/smpl/components/FormControl/Checkbox",
                            },
                            {
                                name: "Textarea",
                                to: "/comn/smpl/components/FormControl/Textarea",
                            },
                            {
                                name: "Date",
                                to: "/comn/smpl/components/FormControl/Date",
                            },
                            {
                                name: "Time",
                                to: "/comn/smpl/components/FormControl/Time",
                            },
                            {
                                name: "Datetime",
                                to: "/comn/smpl/components/FormControl/Datetime",
                            },
                            {
                                name: "DateRange",
                                to: "/comn/smpl/components/FormControl/DateRange",
                            },
                            {
                                name: "TimeRange",
                                to: "/comn/smpl/components/FormControl/TimeRange",
                            },
                            {
                                name: "File",
                                to: "/comn/smpl/components/FormControl/File",
                            },
                            {
                                name: "Code",
                                to: "/comn/smpl/components/FormControl/Code",
                            },
                        ],
                    },
                    {
                        name: "Layout Component",
                        base: "/layout",
                        children: [
                            {
                                name: "Basic",
                                to: "/comn/smpl/components/Basic",
                            },
                            {
                                name: "Text",
                                to: "/comn/smpl/components/Text",
                            },
                            {
                                name: "Grid",
                                to: "/comn/smpl/components/Grid",
                            },
                            {
                                name: "Page",
                                to: "/comn/smpl/components/Page",
                            },
                            {
                                name: "Icon",
                                to: "/comn/smpl/components/Icon",
                            },
                            {
                                name: "Button",
                                to: "/comn/smpl/components/Button",
                            },
                            {
                                name: "IconButton",
                                to: "/comn/smpl/components/IconButton",
                            },
                            {
                                name: "Group",
                                to: "/comn/smpl/components/Group",
                            },
                            {
                                name: "Layout",
                                to: "/comn/smpl/components/Layout",
                            },
                            {
                                name: "Tooltip",
                                to: "/comn/smpl/components/Tooltip",
                            },
                            {
                                name: "Table",
                                to: "/comn/smpl/components/Table",
                            },
                            {
                                name: "Tab",
                                to: "/comn/smpl/components/Tab",
                            },
                            {
                                name: "Tree",
                                to: "/comn/smpl/components/Tree",
                            },
                        ],
                    },
                ],
            },
            {
                name: "Common Hook",
                base: "/smpl/hooks",
                children: [
                    {
                        name: "useModal ·",
                        to: "/comn/smpl/hooks/useModal",
                    },
                    {
                        name: "useFetch",
                        to: "/comn/smpl/hooks/useFetch",
                    },
                    {
                        name: "usePopup",
                        to: "/comn/smpl/hooks/usePopup",
                    },
                    {
                        name: "useForm",
                        to: "/comn/smpl/hooks/useForm",
                    },
                    {
                        name: "useAuth",
                        to: "/comn/smpl/hooks/useAuth",
                    },
                    {
                        name: "useToast",
                        to: "/comn/smpl/hooks/useToast",
                    },
                    {
                        name: "useTab",
                        to: "/comn/smpl/hooks/useTab",
                    },
                    {
                        name: "useTree",
                        to: "/comn/smpl/hooks/useTree",
                    },
                    {
                        name: "useStore",
                        to: "/comn/smpl/hooks/useStore",
                    },
                ],
            },
            {
                name: "Common Page",
                base: "/comn",
                children: [
                    {
                        name: "게시판",
                        base: "/smpl/board",
                        children: [
                            {
                                name: "개발자 게시판",
                                to: "/comn/comn/bltbrd/bltbrdLst",
                            },
                        ],
                    },
                    {
                        name: "Language Management",
                        base: "/smpl/locale",
                        children: [
                            {
                                name: "Label Language Processing",
                                to: "/comn/comn/lbl/lblLangLst",
                            },
                            {
                                name: "Message Language Processing",
                                to: "/comn/comn/msg/msgLangLst",
                            },
                        ],
                    },
                    {
                        name: "Code Popup",
                        base: "/smpl/hooks",
                        children: [
                            {
                                name: "Common Code Popup",
                                to: "/comn/comn/ppup/comnCdPpup",
                            },
                            {
                                name: "Country Code Popup",
                                to: "/comn/comn/ppup/cntyCdPpup",
                            },
                            {
                                name: "Digit3 Country Code Popup",
                                to: "/comn/comn/ppup/dgt3CntyCdPpup",
                            },
                            {
                                name: "City Code Popup",
                                to: "/comn/comn/ppup/cityCdPpup",
                            },
                            {
                                name: "Currency Code Popup",
                                to: "/comn/comn/ppup/currCdPpup",
                            },
                            {
                                name: "Bank Code Popup",
                                to: "/comn/comn/ppup/bnkCdPpup",
                            },
                            {
                                name: "Port Code Popup",
                                to: "/comn/comn/ppup/portCdPpup",
                            },
                            {
                                name: "Port/ Airport Code Popup",
                                to: "/comn/comn/ppup/portAirptCdPpup",
                            },
                            {
                                name: "Airport Code Popup",
                                to: "/comn/comn/ppup/airptCdPpup",
                            },
                            {
                                name: "Company Code Popup",
                                to: "/comn/comn/ppup/coCdPpup",
                            },
                            // {
                            //     name: "Process Status Code Popup",
                            //     to: "/comn/comn/ppup/prcssStatPpup",
                            // },
                            {
                                name: "Organization Code Popup",
                                to: "/comn/comn/ppup/orgCdPpup",
                            },
                            {
                                name: "Bonded Warehouse Code Popup",
                                to: "/comn/comn/ppup/wrhsCdPpup",
                            },
                            {
                                name: "Carrier Code Popup",
                                to: "/comn/comn/ppup/carrCdPpup",
                            },
                            {
                                name: "Company Detail Code Popup",
                                to: "/comn/comn/ppup/coDtlCdPpup",
                            },
                            {
                                name: "Company Declare Code Popup",
                                to: "/comn/comn/ppup/coDclaCdPpup",
                            },
                            {
                                name: "Organization Department Code Popup",
                                to: "/comn/comn/ppup/orgDeptCdPpup",
                            },
                            {
                                name: "Customs Code Popup",
                                to: "/comn/comn/ppup/cstmCdPpup",
                            },
                            {
                                name: "Customs Officers Code Popup",
                                to: "/comn/comn/ppup/cstmOfcrCdPpup",
                            },
                            {
                                name: "Vehicle Body Code Popup",
                                to: "/comn/comn/ppup/vhclBodyCdPpup",
                            },
                            {
                                name: "Vehicle Category Code Popup",
                                to: "/comn/comn/ppup/vhclCtgrCdPpup",
                            },
                            {
                                name: "Vehicle Color Code Popup",
                                to: "/comn/comn/ppup/vhclClrCdPpup",
                            },
                            {
                                name: "Vehicle Fuel Code Popup",
                                to: "/comn/comn/ppup/vhclFlCdPpup",
                            },
                            {
                                name: "Vehicle Maker Code Popup",
                                to: "/comn/comn/ppup/vhclMkerCdPpup",
                            },
                            {
                                name: "Vehicle Import Country Code Popup",
                                to: "/comn/comn/ppup/vhclImpCntyCdPpup",
                            },
                            {
                                name: "Vehicle Insurance Type Code Popup",
                                to: "/comn/comn/ppup/vhclInsrTpCdPpup",
                            },
                            {
                                name: "Vehicle Model Code Popup",
                                to: "/comn/comn/ppup/vhclMdlCdPpup",
                            },
                            {
                                name: "Vehicle Model Number Code Popup",
                                to: "/comn/comn/ppup/vhclMdlNoCdPpup",
                            },
                            {
                                name: "Vehicle Holder Category Code Popup",
                                to: "/comn/comn/ppup/vhclHlpnCtgrCdPpup",
                            },
                            {
                                name: "Vehicle Propeller Type Code Popup",
                                to: "/comn/comn/ppup/vhclPrplTpCdPpup",
                            },
                            {
                                name: "Vehicle Transmission Type Code Popup",
                                to: "/comn/comn/ppup/vhclTrmssnTpCdPpup",
                            },
                            {
                                name: "Vehicle Use Code Popup",
                                to: "/comn/comn/ppup/vhclUseCdPpup",
                            },
                            {
                                name: "Postal Code Popup",
                                to: "/comn/comn/ppup/postCdPpup",
                            },
                            {
                                name: "TIN Number Popup",
                                to: "/comn/comn/ppup/tinNoPpup",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
