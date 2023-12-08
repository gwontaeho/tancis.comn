import React, { useState, Children, cloneElement } from "react";
import classNames from "classnames";
import { v4 as uuid } from "uuid";

type TabProps = {
    children?: React.ReactNode;
    tab: string[];
};

export const Tab = (props: TabProps) => {
    const { children, tab } = props;
    const [current, setCurrent] = useState(0);

    return (
        <div className="space-y-4">
            <div className="border-b">
                {tab.map((t, i) => {
                    return (
                        <button
                            key={uuid()}
                            className={classNames("h-10 px-4 text-lg font-semibold", { "text-blue": current === i })}
                            onClick={() => setCurrent(i)}
                        >
                            {t}
                        </button>
                    );
                })}
            </div>
            <div>
                {Children.map(children, (child: any, i) => {
                    return cloneElement(child, { isCurrent: current === i });
                })}
            </div>
        </div>
    );
};

type TabPanelProps = {
    children?: React.ReactNode;
    isCurrent?: Boolean;
};

const TabPanel = (props: TabPanelProps) => {
    const { children, isCurrent } = props;
    return <div hidden={!isCurrent}>{children}</div>;
};

Tab.Panel = TabPanel;
