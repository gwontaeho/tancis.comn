import { useRef, useState } from "react";
import lodash from "lodash";
import { FormControlType } from "../components";

type TWijmoOptions = {
    checkbox?: boolean;
    pagination?: "in" | "out";
    add?: boolean;
    remove?: boolean;
    isReadOnly?: boolean;
};
export type TWijmoHead = { cells: { header: string; binding?: string; colspan?: number }[] }[];
export type TWijmoBody = {
    cells: {
        width?: any;
        area?: string;
        comnCd?: string;
        binding: string;
        colspan?: number;
        isReadOnly?: boolean;
        options?: any[];
        type?: FormControlType;
        render?: (data?: any) => React.ReactNode;
        onClick?: (data?: any) => void;
    }[];
    colspan?: number;
}[];
export type WijmoSchemaType = {
    id: string;
    options: TWijmoOptions;
    head: TWijmoHead;
    body: TWijmoBody;
};
type UseWijmoArgs = {
    defaultSchema: WijmoSchemaType;
};

export const useWijmo = (props: UseWijmoArgs) => {
    const { defaultSchema } = props;

    const gridRef = useRef<any>();
    const contentRef = useRef<Record<string, any>>();

    const schema = defaultSchema;

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const getOrigin = () => {
        if (!gridRef.current) return;
        return contentRef.current;
    };

    const resetData = () => {
        if (!gridRef.current) return;
        gridRef.current.control.collectionView.sourceCollection = lodash.cloneDeep(contentRef.current);
    };

    const getData = () => {
        if (!gridRef.current) return;
        return gridRef.current.control.collectionView.sourceCollection;
    };

    const getPageData = () => {
        if (!gridRef.current) return;
        return gridRef.current.control.collectionView.items;
    };

    const getChecked = () => {
        if (!gridRef.current) return;
        return (gridRef.current.control.rows as any[])
            .filter((r) => r.isSelected)
            .map((r: any) => r.dataItem)
            .filter((d, i, a) => a.findIndex((v) => v["__index"] === d["__index"]) === i);
    };

    const grid = { gridRef, contentRef, schema, page, setPage, size, setSize };

    return {
        grid,
        getData,
        getPageData,
        getChecked,
        resetData,
        page,
        size,
        setPage,
        setSize,
        getOrigin,
    };
};
