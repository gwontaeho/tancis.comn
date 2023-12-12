export const SampleRoutes = [
    {
        name: "Sample",
        base: "/sample",
        children: [
            {
                name: "Sample Component",
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
                name: "Sample Page",
                to: "/pages",
            },
        ],
    },
];
