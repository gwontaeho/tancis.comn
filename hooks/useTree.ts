import { useRef } from "react";

type UseTreeProps = any;

export const useTree = (props?: UseTreeProps) => {
    const _tree = useRef<any>({
        _checkbox: true,
        _checked: [],
    });

    const setData = (data: any) => {
        _tree.current._setData(data);
    };

    const setChildren = (parent: any, data: any) => {
        _tree.current._setChildren(parent, data);
    };

    return { tree: { _tree }, setData, setChildren };
};
