export const SampleRoutes = [
    {
        name: "Sample",
        base: "/comn/smpl",
        children: [
            {
                name: "Sample Component",
                base: "/components",
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
                        ],
                    },
                    {
                        name: "Table",
                        to: "/Table",
                    },
                    {
                        name: "Form",
                        to: "/Form",
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
