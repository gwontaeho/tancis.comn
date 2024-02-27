import React, { useCallback, useRef, useState } from "react";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import { Collapse, Icon } from "@/comn/components";
import { WIDTH } from "../features/foundation";

type TreeItemProps = {
    children?: React.ReactNode;
    name: string;
    parent: string[];
    _key: string;
    open?: boolean;
    checkbox?: boolean;
    onClick?: (...args: any) => void;
    data?: any;
};

type TreeProps = {
    _tree?: any;
    data?: any;
    size?: keyof typeof WIDTH;
    height?: string | number;
    onClick?: (...args: any) => void;
};

const TreeItem = (props: TreeItemProps) => {
    const { children, name, parent, _key, onClick, checkbox = false, open = false, data } = props;

    const childrenRef = useRef<HTMLUListElement>(null);
    const [_open, _setOpen] = useState<boolean>(open);

    const handleOpen = () => {
        _setOpen((prev) => !prev);
    };

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        parent.forEach((_) => {
            (document.getElementsByName(_)[0] as HTMLInputElement).indeterminate = true;
        });

        if (children) {
            if (childrenRef.current === null) return;
            Array.from(childrenRef.current.getElementsByTagName("input")).forEach((_) => {
                _.checked = e.target.checked;
                _.indeterminate = false;
            });
        }
    };

    const handleClick = () => {
        const { key, parent, ...rest } = data;
        onClick?.(rest);
    };

    return (
        <li>
            <div className={classNames("h-7 flex items-center space-x-1.5", { "ml-[1.125rem]": !children })}>
                {children && (
                    <button onClick={handleOpen}>
                        <Icon icon="right" size="xs" className={classNames("transition", _open && "rotate-90")} />
                    </button>
                )}
                {checkbox && (
                    <input
                        name={_key}
                        type="checkbox"
                        className="w-3"
                        // onClick={(e) => e.stopPropagation()}
                        onChange={handleCheck}
                    />
                )}
                <button onClick={handleClick}>{name}</button>
            </div>
            {Array.isArray(children) && (
                <Collapse open={_open}>
                    <ul ref={childrenRef} className="pl-[1.125rem]">
                        {children.map((child) => {
                            return <TreeItem _key={child.key} onClick={onClick} {...child} data={child} />;
                        })}
                    </ul>
                </Collapse>
            )}
        </li>
    );
};

export const Tree = (props: TreeProps) => {
    const { _tree, data, onClick, size = "full", height } = props;

    // const [data, setData] = useState(_tree.current._data);
    // if (_tree.current._setData === undefined) {
    //     _tree.current._setData = setData;
    // }

    // const size: keyof typeof WIDTH = _tree.current._size;
    // const height = _tree.current._height;

    // const ref = useCallback((ref: any) => {
    //     if (ref) _tree.current._ref = ref;
    // }, []);

    const mapper = (data: any, parent: any = []) => {
        return data.map((_: any) => {
            let __ = { ..._ };
            const key = uuid();
            __.key = key;
            __.parent = parent;
            __.checkbox = true;
            if (_.children) __.children = mapper(_.children, [...parent, key]);
            return __;
        });
    };

    return (
        <ul
            // ref={ref}
            className={classNames("overflow-auto p-4", WIDTH[size])}
            style={{ height }}
        >
            {mapper(data)?.map((child: any) => {
                return <TreeItem _key={child.key} onClick={onClick} {...child} data={child} />;
            })}
        </ul>
    );
};
