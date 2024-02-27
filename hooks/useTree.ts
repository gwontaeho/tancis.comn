import { useRef } from "react";

type UseTreeProps = {
    defaultSchema: any;
};

export const useTree = (props: UseTreeProps) => {
    const { defaultSchema } = props;
    const { options, data } = defaultSchema;

    const _tree = useRef<any>({
        _defaultSchema: defaultSchema,
        _height: options.height,
        _size: options.size,
        _data: data,
    });

    const getChecked = () => {};
    const setCheck = (id?: string) => {
        _tree.current._setData((prev: any) => {
            console.log(prev);
            return prev;
        });
    };
    const setOpen = (id?: string) => {
        _tree.current._setData((prev: any) => {
            console.log(prev);
            return prev;
        });
    };

    return { tree: { _tree }, getChecked, setCheck, setOpen };
};
