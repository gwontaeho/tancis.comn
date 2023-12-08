export const SampleRoutes = [
    {
        name: "Sample",
        base: "/sample",
        children: [
            {
                name: "Sample Component",
                children: [
                    {
                        name: "Controls",
                        base: "/controls",
                        children: [
                            {
                                name: "Text",
                                to: "/text",
                            },
                            {
                                name: "Number",
                                to: "/number",
                            },
                            {
                                name: "Password",
                                to: "/password",
                            },
                            {
                                name: "Select",
                                to: "/select",
                            },
                            {
                                name: "Radio",
                                to: "/radio",
                            },
                            {
                                name: "Checkbox",
                                to: "/checkbox",
                            },
                            {
                                name: "Textarea",
                                to: "/textarea",
                            },
                            {
                                name: "Date",
                                to: "/date",
                            },
                            {
                                name: "Time",
                                to: "/time",
                            },
                            {
                                name: "Datetime",
                                to: "/datetime",
                            },
                            {
                                name: "Between",
                                to: "/between",
                            },
                            {
                                name: "File",
                                to: "/file",
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
