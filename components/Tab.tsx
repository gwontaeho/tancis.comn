import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { v4 as uuid } from "uuid";

type TabProps = {
    children?: React.ReactNode;
    schema: any[];
    value?: number;
    onChange?: (index: number) => void;
};

type TabPanelProps = {
    children?: React.ReactNode;
    isActive?: Boolean;
};

export const Tab = (props: TabProps) => {
    const { children, schema, value, onChange } = props;
    const { t } = useTranslation();
    const [key] = React.useState(uuid());

    const [_value, _setValue] = React.useState<number>(() => {
        if (value !== undefined) return value;
        if (schema.some((_) => _.active)) return schema.findIndex((_) => _.active);
        return 0;
    });

    useEffect(() => {
        if (value === undefined) return;
        if (value === _value) return;
        _setValue(value);
    }, [value]);

    const handleClickTab = (i: number) => {
        _setValue(i);
        if (onChange) onChange(i);
    };

    return (
        <div className="space-y-4">
            <div className="border-b flex">
                {schema.map(({ label, disabled, visible }, i) => {
                    if (visible === false) return null;
                    const isActive = _value === i;

                    return (
                        <button
                            key={key + i}
                            type="button"
                            className={classNames(
                                "truncate transition rounded-t border-b-2 border-transparent max-w-xs h-8 px-4 text-lg",
                                {
                                    "bg-uf-main text-uf-white border-uf-layout-header": isActive,
                                    "text-uf-lightgray": disabled,
                                },
                            )}
                            onClick={() => !disabled && handleClickTab(i)}
                        >
                            {typeof label === "string" ? t(label) : label}
                        </button>
                    );
                })}
            </div>
            <div>
                {React.Children.map(children, (child: any, i) => {
                    return React.cloneElement(child, { isActive: _value === i });
                })}
            </div>
        </div>
    );
};

const TabPanel = (props: TabPanelProps) => {
    const { children, isActive } = props;
    return <div hidden={!isActive}>{children}</div>;
};

Tab.Panel = TabPanel;
