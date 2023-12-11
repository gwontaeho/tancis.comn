import { useRef, useState } from "react";
import lodash from "lodash";
import { FormControlType } from "../components";

type WijmoOptionType = {
    checkbox?: boolean;
    pagination?: "in" | "out";
    add?: boolean;
    remove?: boolean;
    isReadOnly?: boolean;
};
export type WijmoHeadType = { cells: { header: string; binding?: string; colspan?: number }[] }[];
export type WijmoBodyType = {
    cells: { binding: string; colspan?: number; type?: FormControlType }[];
    colspan?: number;
}[];
export type WijmoSchemaType = {
    id: string;
    options: WijmoOptionType;
    head: WijmoHeadType;
    body: WijmoBodyType;
};
type UseWijmoProps = {
    defaultSchema: WijmoSchemaType;
};

export const useWijmo = (props: UseWijmoProps) => {
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
        return gridRef.current.control.rows.filter((r: any) => r.isSelected).map((r: any) => r.dataItem);
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
