import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import classNames from "classnames";
import { v4 as uuid } from "uuid";
import lodash from "lodash";
import { Icon } from "@/comn/components";
import { WIDTH } from "../features/foundation";

type TreeProps = {
    _tree?: any;
    data?: any;
    size?: keyof typeof WIDTH;
    height?: string | number;
    onClick?: (...args: any) => void;
    onCheck?: (...args: any) => void;
    onOpen?: (...args: any) => void;
};

type TreeItemProps = {
    _tree?: any;
    item?: any;
    _checked?: any;
};

const TreeItem = (props: TreeItemProps) => {
    const { _tree, _checked, item } = props;

    const content = typeof item === "string" ? _tree.current._reduced[item] : item;
    const { id, name, hasChildren, children, __key } = content;

    const childrenRef = useRef<HTMLUListElement>(null);
    const [_open, _setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        _setOpen((prev) => !prev);
        if (_tree.current._handler.onOpen) {
            _tree.current._handler.onOpen(content);
        }
    };

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        _tree.current._setChecked(content, e.target.checked);
    };

    const handleClick = () => {
        if (_tree.current._handler.onClick) {
            _tree.current._handler.onClick(content);
        }
    };

    return (
        <li>
            <div
                className={classNames("min-h-[1.75rem] flex items-center gap-1.5", {
                    "ml-[1.125rem]": !children && !hasChildren,
                })}
            >
                {(hasChildren || children) && (
                    <button onClick={handleOpen}>
                        <Icon icon="right" size="xs" className={classNames("transition", _open && "rotate-90")} />
                    </button>
                )}
                {_tree.current._checkbox && (
                    <input type="checkbox" className="w-3" checked={_checked.includes(__key)} onChange={handleCheck} />
                )}
                <button className="text-left" onClick={handleClick}>
                    {name}
                </button>
            </div>
            {Array.isArray(children) && _open && (
                <ul ref={childrenRef} className="pl-[1.125rem]">
                    {children.map((child) => {
                        return <TreeItem _tree={_tree} _checked={_checked} key={child} item={child} />;
                    })}
                </ul>
            )}
        </li>
    );
};

const reducer = (data: any, parent: any = []) => {
    return lodash.cloneDeep(data).reduce((prev: any, curr: any) => {
        const key = curr.__key || uuid();
        if (parent.length) {
            curr.parent = parent;
            curr.depth = parent.length;
        } else curr.depth = 0;

        if (curr?.children) {
            const childrenWithKey = curr.children.map((_: any) => ({ ..._, __key: uuid() }));
            curr.children = childrenWithKey.map(({ __key }: any) => __key);

            const children = reducer(childrenWithKey, [...parent, key]);
            curr.allChildren = Object.keys(children);

            for (const child in children) {
                prev[child] = children[child];
            }
        }
        prev[key] = curr;
        return prev;
    }, {});
};

export const Tree = (props: TreeProps) => {
    const { _tree, data = [], size = "full", height, onOpen, onClick, onCheck } = props;

    const [_data, _setData] = useState<any>(() => {
        _tree.current._data = data;
        _tree.current._reduced = reducer(data);
        const nextData = Object.entries(_tree.current._reduced)
            .filter(([, value]: any) => !value.parent)
            .map(([__key, value]: any) => ({ ...value, __key }));

        return nextData;
    });
    const [_checked, _setChecked] = useState([]);

    useEffect(() => {
        _tree.current._handler = {
            onOpen,
            onClick,
            onCheck,
        };

        _tree.current._setData = (_: any) => {
            _tree.current._data = _;
            _tree.current._reduced = reducer(_);
            const nextData = Object.entries(_tree.current._reduced)
                .filter(([, value]: any) => !value.parent)
                .map(([__key, value]: any) => ({ ...value, __key }));
            _setData(nextData);
        };

        _tree.current._setChildren = (data: any, children: any) => {
            const key = data.__key;
            const item = _tree.current._reduced[key];
            const childrenWithKey = children.map((_: any) => ({ ..._, __key: uuid() }));
            item.children = childrenWithKey.map(({ __key }: any) => __key);

            const newChildren = reducer(childrenWithKey, [...(item.parent || []), key]);
            item.allChildren = Object.keys(newChildren);

            _tree.current._reduced = Object.assign(_tree.current._reduced, newChildren);
            const nextData = Object.entries(_tree.current._reduced)
                .filter(([, value]: any) => !value.parent)
                .map(([__key, value]: any) => ({ ...value, __key }));

            _setData(nextData);
        };

        _tree.current._setChecked = (_: any, checked: any) => {
            if (checked) {
                let target = [_.__key];
                if (_.allChildren) target.push(..._.allChildren);
                const nextChecked = [..._tree.current._checked, ...target];
                if (_.parent) {
                    for (const parentKey of _.parent.toReversed()) {
                        const allChecked = _tree.current._reduced[parentKey].allChildren.every((child: any) =>
                            nextChecked.includes(child),
                        );
                        if (allChecked) nextChecked.push(parentKey);
                    }
                }

                _tree.current._checked = Array.from(new Set(nextChecked));
            } else {
                let target = [_.__key];
                if (_.allChildren) target.push(..._.allChildren);
                if (_.parent) target.push(..._.parent);
                const nextChecked = _tree.current._checked.filter((__key: any) => !target.includes(__key));
                _tree.current._checked = nextChecked;
            }
            _setChecked(_tree.current._checked);
        };
    }, []);

    return (
        <ul className={classNames("overflow-y-auto p-4", WIDTH[size])} style={{ height }}>
            {_data.map((item: any) => {
                return <TreeItem _tree={_tree} _checked={_checked} key={item.__key} item={item} />;
            })}
        </ul>
    );
};
