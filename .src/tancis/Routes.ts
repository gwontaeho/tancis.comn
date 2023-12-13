export const TancisRoutes = [
    {
        name: "test",
        base: "/test",
        children: [
            {
                name: "aaa",
                base: "/aaa",

                children: [
                    {
                        name: "bb",
                        to: "/bb",
                    },
                    {
                        name: "cc",
                        to: "/cc",
                    },
                ],
            },
        ],
    },
];
