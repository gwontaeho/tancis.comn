import React from "react";
import { v4 as uuid } from "uuid";
import { IconButton } from "@/comn/components";

type InputFileProps = React.InputHTMLAttributes<HTMLInputElement>;

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
    (props: InputFileProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const [_files, _setFiles] = React.useState<any[]>([]);
        const available = _files.filter((_file) => _file.delYn !== "Y");

        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const _filelist = Array.prototype.slice
                .call(event.target.files)
                .map((file) => ({ file, key: uuid(), status: "loading" }));

            if (props.maxLength)
                if (props.maxLength < available.length + _filelist.length)
                    _filelist.splice(-(available.length + _filelist.length - props.maxLength));

            _setFiles((prev) => (props.multiple ? prev.concat(_filelist) : _filelist));

            _filelist.forEach((file) => {
                _upload(file);
            });

            event.target.value = "";
        };

        const _upload = async (_file: any) => {
            try {
                const response = await _dummy(_file);
                _setFiles((prev) =>
                    prev.map((_) => {
                        if (_.key !== _file.key) return _;
                        return { ..._, status: "success" };
                    })
                );
            } catch (error) {
                _setFiles((prev) =>
                    prev.map((_) => {
                        if (_.key !== _file.key) return _;
                        return { ..._, status: "failed" };
                    })
                );
            }
        };

        const _reupload = async (_file: any) => {
            _setFiles((prev) =>
                prev.map((_) => {
                    if (_.key !== _file.key) return _;
                    return { ..._, status: "loading" };
                })
            );
            _upload(_file);
        };

        const _delete = async (_file: any) => {
            _setFiles((prev) =>
                prev.map((_) => {
                    if (_.key !== _file.key) return _;
                    return { ..._, delYn: "Y" };
                })
            );
        };

        const _dummy = (file: any): any => {
            const result = Math.random() < 0.7;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (result) {
                        resolve({
                            message: "message",
                            data: { id: 1, index: 0, url: "", size: 100, message: "", key: file.key },
                        });
                    } else {
                        reject(file);
                    }
                }, Math.random() * 3000);
            });
        };

        return (
            <div className="w-full">
                <label>
                    <div className="input">
                        {available.length > 1 ? `파일 ${available.length}개` : available[0]?.file.name}
                    </div>
                    <input onChange={onChange} hidden multiple={props.multiple} type="file" />
                </label>
                <div>
                    {available.map((_file) => {
                        const { key, file, status } = _file;
                        return (
                            <div key={key} className="px-2 py-1 flex justify-between items-center">
                                <span className="font-mono">{file.name}</span>
                                <div className="flex">
                                    {status === "loading" && (
                                        <IconButton icon="loading" className="animate-spin" size="xs" />
                                    )}
                                    {status === "failed" && (
                                        <IconButton icon="path" size="xs" onClick={() => _reupload(_file)}></IconButton>
                                    )}
                                    {status !== "loading" && (
                                        <IconButton icon="minus" size="xs" onClick={() => _delete(_file)}></IconButton>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);
