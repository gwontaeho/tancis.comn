import React from "react";
import Prism from "prismjs";
import { v4 as uuid } from "uuid";
import { Table, Tree } from "@/comn/components";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-jsx";

import classNames from "classnames";

type SampleProps = {
    children?: React.ReactNode;
    title?: String;
    description?: any;
};

type SampleSectionProps = {
    children?: React.ReactNode;
    id?: string;
    title?: string;
    description?: any;
};
type SampleDocProps = {
    name: string;
    code: string;
    param?: any;
    result?: any;
};
type SampleCodeProps = {
    children?: string;
    exec?: () => void;
};
type SampleTableProps = {
    data?: any[];
};

export const Sample = (props: SampleProps) => {
    const { children, title, description } = props;

    return (
        <div className="space-y-8 tracking-wide">
            <div>
                {title && <div className="text-[1.8rem]">{title}</div>}
                {description && <div className="text-[1.4rem]">{description}</div>}
            </div>
            {children}
        </div>
    );
};

const Button = (props: any) => {
    return (
        <button onClick={props.onClick} className="tracking-wide border p-2 font-semibold">
            {props.children}
        </button>
    );
};

const Section = (props: SampleSectionProps) => {
    const { children, id, title, description } = props;

    return (
        <div id={id} className="bg-uf-card-background p-4 flex flex-col flex-1 rounded gap-4">
            {title && <div className="text-[1.2rem]">{title}</div>}
            {description && <div className="text-[1rem]">{description}</div>}
            {children}
        </div>
    );
};

const Result = (props: any) => {
    return (
        <div className="flex gap-4">
            <div className="">Result :</div>
            <div>{props.children}</div>
        </div>
    );
};

const Code = (props: SampleCodeProps) => {
    React.useEffect(() => {
        Prism.highlightAll();
    }, [props.children]);

    return (
        <pre className="relative flex-1">
            <code className={`language-jsx`}>{props.children}</code>
            {props.exec && (
                <button className="absolute top-2 right-2" onClick={props.exec}>
                    exec
                </button>
            )}
        </pre>
    );
};

const Doc = (props: SampleDocProps) => {
    const { name, code, param, result } = props;
    return (
        <div className="space-y-4 bg-card-background p-4">
            <div className="text-[1.4rem]">{name}</div>
            <code className="block text-[1.2rem]">{code}</code>
            {param && (
                <div>
                    <div className="text-[1rem]">Parameters</div>
                    <Tree data={param} />
                </div>
            )}
            {result && (
                <div>
                    <div className="text-[1rem]">Return</div>
                    <Tree data={result} />
                </div>
            )}
        </div>
    );
};

Sample.Section = Section;
Sample.Button = Button;
Sample.Doc = Doc;
Sample.Result = Result;
Sample.Code = Code;

Sample.Table = (props: SampleTableProps) => {
    return (
        <Table
            className="text-[13px] tracking-wide [&_tr]:h-[2.5rem] [&_td]:px-2"
            before={
                <colgroup>
                    {props.data?.[0]?.map((_: any, i: number) => {
                        return (
                            <col key={uuid()} className={classNames({ "w-[20%]": i !== props.data?.[0].length - 1 })} />
                        );
                    })}
                </colgroup>
            }
        >
            {props.data?.map((row, i) => {
                return (
                    <Table.Tr key={uuid()} header={i === 0}>
                        {row.map((_: any) => {
                            return <Table.Td key={uuid()}>{_}</Table.Td>;
                        })}
                    </Table.Tr>
                );
            })}
        </Table>
    );
};
