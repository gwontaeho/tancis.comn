import lodash from "lodash";

export const utils = {
    getMockData: ({ totCnt = 99 }) => {
        return {
            totCnt,
            page: 0,
            size: 10,
            content: Array(totCnt)
                .fill(null)
                .map((_, i) => ({
                    id: new Date().getTime() + i,
                    a: Math.random() * 1000,
                    b: Math.random() * 1000,
                })),
        };
    },
    getMockDataWithPaging: ({ data = {}, page = 0, size = 10 }: { data: any; page: number; size: number }) => {
        return { ...data, content: lodash.chunk(data.content, size)[page] };
    },
};
