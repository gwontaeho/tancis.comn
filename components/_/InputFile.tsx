import React from "react";
import { v4 as uuid } from "uuid";
import { Icon, IconButton } from "@/comn/components";

type InputFileProps = React.InputHTMLAttributes<HTMLInputElement>;

type File = {
    id: string;
    url: string;
    size: number;
    index: number;
};

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
    (props: InputFileProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const [files, setFiles] = React.useState<any[]>([]);

        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const _filelist = Array.prototype.slice
                .call(event.target.files)
                .map((file) => ({ file, key: uuid(), status: "loading" }));

            setFiles((prev) => prev.concat(_filelist));

            console.log(_filelist);

            _filelist.forEach((file) => {
                _upload(file);
            });

            event.target.value = "";
        };

        const _upload = async (file: any) => {
            try {
                const response = await _dummy(file);
                setFiles((prev) =>
                    prev.map((_) => {
                        if (_.key !== response.data.key) return _;
                        return { ..._, status: response.result ? "success" : "failed" };
                    })
                );
            } catch (error) {}
        };

        // const _delete = () => {
        //     return new Promise((resolve) => {
        //         setTimeout(() => {
        //             resolve({
        //                 result: false,
        //                 message: "message",
        //                 data: [{ id: 1, index: 0, url: "", size: 100, result: false, message: "" }],
        //             });
        //         }, 2000);
        //     });
        // };

        const _dummy = (file: any): any => {
            const result = Math.random() < 0.5;

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        result,
                        message: "message",
                        data: { id: 1, index: 0, url: "", size: 100, result, message: "", key: file.key },
                    });
                }, Math.random() * 3000);
            });
        };

        return (
            <div className="w-full">
                <label>
                    <div className="input"></div>
                    <input onChange={onChange} hidden multiple={true} type="file" />
                </label>
                <div>
                    {files.map(({ file, status, key }) => {
                        return (
                            <div key={key} className="px-2 py-1 flex justify-between items-center">
                                <span className="font-mono">{file.name}</span>
                                <div className="flex">
                                    {status === "loading" && (
                                        <IconButton icon="loading" className="animate-spin" size="xs" />
                                    )}
                                    {status === "failed" && <IconButton icon="path" size="xs"></IconButton>}
                                    {status !== "loading" && <IconButton icon="minus" size="xs"></IconButton>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);
