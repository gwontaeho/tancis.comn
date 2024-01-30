import React from "react";
import * as XLSX from "xlsx";
import { Icon, Button } from "@/comn/components";
import {} from "@/comn/components";
import { comnEnvs, comnUtils } from "@/comn/utils";
import { useTranslation } from "react-i18next";
import { useModal } from "@/comn/hooks";
import lodash from "lodash";
import { CommonErrors } from "@/comn/components/_";

type ExcelUploadProps = {
    edit?: boolean;
    schema?: any;
    keys?: any;
    handler?: (item: any, index: number) => { data: Array<any>; error?: any };
    onUpload?: (args: any) => {};
    onTremplate?: (args: any) => {};
};

export const ExcelUpload = (props: ExcelUploadProps) => {
    const { edit, schema, keys = {}, handler } = props;
    const input = React.useRef<HTMLInputElement>(null);

    const { t } = useTranslation();

    return edit === true ? (
        <>
            <Button variant="secondary">Template</Button>
            <div className="uf-form-control min-w-fit">
                <div className="uf-form-control-main">
                    <div className="w-full relative flex items-center">
                        <div className="w-full">
                            <div>
                                <label>
                                    <div className="input uf-button bg-uf-main cursor-pointer">
                                        <Icon icon={"fileSearch"} />
                                    </div>
                                    <input hidden={true} type="file" ref={input} accept=".xlsx, .xls" />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Button
                variant="warning"
                onClick={() => {
                    const value = input.current?.value;
                }}
            >
                Upload
            </Button>
        </>
    ) : (
        <></>
    );
};
