export const SampleRoutes = [
    {
        name: "Sample",
        base: "/samples",
        children: [
            {
                name: "Sample Component",
                base: "/components",
                children: [
                    {
                        name: "FormControl",
                        children: [
                            {
                                name: "Text",
                                to: "/formcontroltext",
                            },
                            {
                                name: "Number",
                                to: "/formcontrolnumber",
                            },
                            {
                                name: "Password",
                                to: "/formcontrolpassword",
                            },
                            {
                                name: "Select",
                                to: "/formcontrolselect",
                            },
                            {
                                name: "Radio",
                                to: "/formcontrolradio",
                            },
                            {
                                name: "Checkbox",
                                to: "/formcontrolcheckbox",
                            },
                            {
                                name: "Textarea",
                                to: "/formcontroltextarea",
                            },
                            {
                                name: "Date",
                                to: "/formcontroldate",
                            },
                            {
                                name: "Time",
                                to: "/formcontroltime",
                            },
                            {
                                name: "Datetime",
                                to: "/formcontroldatetime",
                            },
                            {
                                name: "Range",
                                to: "/formcontrolrange",
                            },
                            {
                                name: "File",
                                to: "/formcontrolfile",
                            },
                        ],
                    },
                    {
                        name: "Table",
                        to: "/table",
                    },
                    {
                        name: "Form",
                        to: "/form",
                    },

                    {
                        name: "Tab",
                        to: "/tab",
                    },
                    {
                        name: "Tree",
                        to: "/tree",
                    },
                    {
                        name: "Wijmo",
                        to: "/wijmo",
                    },
                ],
            },
            {
                name: "Sample Hook",
                base: "/hooks",
                children: [
                    {
                        name: "useModal",
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
                ],
            },
            {
                name: "Sample Page",
                base: "/pages",

                children: [
                    {
                        name: "List",
                        to: "/l",
                    },
                    {
                        name: "Detail",
                        to: "/d",
                    },
                    {
                        name: "Update",
                        to: "/u",
                    },
                    {
                        name: "Regist",
                        to: "/r",
                    },
                ],
            },
        ],
    },
];
