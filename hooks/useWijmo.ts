import { useRef, useState } from "react";
import * as wjGrid from "@grapecity/wijmo.react.grid.multirow";

type useWijmoProps = {
  defaultSchema: object;
};

export const useWijmo = (props: useWijmoProps) => {
  const { defaultSchema } = props;

  const gridRef = useRef<wjGrid.MultiRow>();
  const contentRef = useRef<object[]>();

  const schema = defaultSchema;

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

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

  const getCheckedIndex = () => {
    if (!gridRef.current) return;

    return gridRef.current.control.rows.filter((r: any) => r.isSelected).map((r: any) => r.dataIndex);
  };

  const addRow = () => {
    if (!gridRef.current) return;

    gridRef.current.control.collectionView.addNew();
    const lastIndex = gridRef.current.control.collectionView.sourceCollection.length - 1;
    gridRef.current.control.collectionView.sourceCollection[lastIndex] = {
      _wc_index: "_" + lastIndex,
      _wc_type: "added",
    };
    contentRef.current = [...(contentRef.current = []), { _wc_index: "_" + lastIndex, _wc_type: "added" }];
  };

  const removeRow = (index = 0) => {
    if (!gridRef.current) return;
    if (!contentRef.current) return;

    const pageIndex = gridRef.current.control.collectionView.pageIndex;
    contentRef.current = contentRef.current.filter((_, i) => i !== pageIndex * size + index);
    gridRef.current.control.collectionView.removeAt(index);
  };

  const removeChecked = () => {
    if (!gridRef.current) return;
    if (!contentRef.current) return;

    getCheckedIndex()
      .sort((a: number, b: number) => b - a)
      .forEach((index: number) => {
        const pageIndex = gridRef.current?.control.collectionView.pageIndex;
        contentRef.current = contentRef.current?.filter((_, i) => i !== pageIndex * size + index);
        gridRef.current?.control.collectionView.removeAt(index);
      });
  };

  const grid = { gridRef, contentRef, schema, page, setPage, size, setSize, addRow, removeChecked };

  return {
    grid,
    getData,
    getPageData,
    getChecked,
    getCheckedIndex,
    addRow,
    removeRow,
    removeChecked,
    page,
    size,
    setPage,
    setSize,
  };
};
