export const SampleRoutes = [
    {
        name: "Sample",
        base: "/comn",
        children: [
            {
                name: "temp",
                base: "/smpl/temp",
            },
            {
                name: "Sample Component",
                base: "/smpl/components",
                children: [
                    {
                        name: "FormControl",
                        base: "/FormControl",
                        children: [
                            {
                                name: "Text",
                                to: "/Text",
                            },
                            {
                                name: "Number",
                                to: "/Number",
                            },
                            {
                                name: "Password",
                                to: "/Password",
                            },
                            {
                                name: "Select",
                                to: "/Select",
                            },
                            {
                                name: "Radio",
                                to: "/Radio",
                            },
                            {
                                name: "Checkbox",
                                to: "/Checkbox",
                            },
                            {
                                name: "Textarea",
                                to: "/Textarea",
                            },
                            {
                                name: "Date",
                                to: "/Date",
                            },
                            {
                                name: "Time",
                                to: "/Time",
                            },
                            {
                                name: "Datetime",
                                to: "/Datetime",
                            },
                            {
                                name: "Range",
                                to: "/Range",
                            },
                            {
                                name: "File",
                                to: "/File",
                            },
                            {
                                name: "Code",
                                to: "/Code",
                            },
                        ],
                    },
                    {
                        name: "Page",
                        to: "/Page",
                    },
                    {
                        name: "Icon",
                        to: "/Icon",
                    },
                    {
                        name: "Button",
                        to: "/Button",
                    },
                    {
                        name: "IconButton",
                        to: "/IconButton",
                    },
                    {
                        name: "Group",
                        to: "/Group",
                    },
                    {
                        name: "Layout",
                        to: "/Layout",
                    },
                    {
                        name: "Tooltip",
                        to: "/Tooltip",
                    },
                    {
                        name: "Table",
                        to: "/Table",
                    },
                    {
                        name: "Tab",
                        to: "/Tab",
                    },
                    {
                        name: "Tree",
                        to: "/Tree",
                    },
                    {
                        name: "Wijmo",
                        to: "/Wijmo",
                    },
                ],
            },
            {
                name: "Sample Hook",
                base: "/smpl/hooks",
                children: [
                    {
                        name: "useModal ·",
                        to: "/useModal",
                    },
                    {
                        name: "useFetch",
                        to: "/useFetch",
                    },
                    {
                        name: "usePopup",
                        to: "/usePopup",
                    },
                    {
                        name: "useForm",
                        to: "/useForm",
                    },
                    {
                        name: "useAuth",
                        to: "/useAuth",
                    },
                    {
                        name: "useToast",
                        to: "/useToast",
                    },
                    {
                        name: "useWijmo",
                        to: "/useWijmo",
                    },
                    {
                        name: "useTab",
                        to: "/useTab",
                    },
                    {
                        name: "useTree",
                        to: "/useTree",
                    },
                    {
                        name: "useStore",
                        to: "/useStore",
                    },
                ],
            },
            {
                name: "Common Page",
                base: "/comn",

                children: [
                    {
                        name: "Common Code Popup",
                        to: "/ppup/comnCdPpup",
                    },
                    {
                        name: "Country Code Popup",
                        to: "/ppup/cntyCdPpup",
                    },
                    {
                        name: "City Code Popup",
                        to: "/ppup/cityCdPpup",
                    },
                    {
                        name: "Currency Code Popup",
                        to: "/ppup/currCdPpup",
                    },
                    {
                        name: "Bank Code Popup",
                        to: "/ppup/bnkCdPpup",
                    },
                    {
                        name: "Port Code Popup",
                        to: "/ppup/portCdPpup",
                    },
                    {
                        name: "Port/ Airport Code Popup",
                        to: "/ppup/portAirptCdPpup",
                    },
                    {
                        name: "Airport Code Popup",
                        to: "/ppup/airptCdPpup",
                    },
                    {
                        name: "Company Code Popup",
                        to: "/ppup/coCdPpup",
                    },
                    {
                        name: "Process Status Code Popup",
                        to: "/ppup/prcssStatPpup",
                    },
                    {
                        name: "Organization Code Popup",
                        to: "/ppup/orgCdPpup",
                    },
                    {
                        name: "Label Language Processing",
                        to: "/lbl/lblLangLst",
                    },
                    {
                        name: "Message Language Processing",
                        to: "/msg/msgLangLst",
                    },
                ],
            },
        ],
    },
];
