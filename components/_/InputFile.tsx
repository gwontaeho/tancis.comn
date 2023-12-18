import React from 'react'
import { v4 as uuid } from 'uuid'
import { Upload } from 'tus-js-client'
import { IconButton } from '@/comn/components'

type InputFileProps = React.InputHTMLAttributes<HTMLInputElement>

type FileType = {
    file: File
    key: string
    status: 'success' | 'loading' | 'failed'
    bytesSent: number
    bytesTotal: number
    percentage: number
}

export const InputFile = React.forwardRef<HTMLInputElement, InputFileProps>(
    (props: InputFileProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const [_files, _setFiles] = React.useState<any[]>([])
        const available = _files.filter((_file) => _file.delYn !== 'Y')

        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const _filelist = Array.prototype.slice
                .call(event.target.files)
                .map((file) => ({ file, key: uuid(), status: 'loading', percentage: 0 }))

            if (props.maxLength)
                if (props.maxLength < available.length + _filelist.length)
                    _filelist.splice(-(available.length + _filelist.length - props.maxLength))

            _setFiles((prev) => (props.multiple ? prev.concat(_filelist) : _filelist))

            _filelist.forEach((file) => {
                _upload(file)
            })

            event.target.value = ''
        }

        const _upload = async (_file: any) => {
            console.log(_file)
            try {
                const upload = new Upload(_file.file, {
                    endpoint: 'http://localhost:1080/files/',
                    retryDelays: [0, 3000, 5000, 10000, 20000],
                    metadata: {
                        filename: _file.file.name,
                        filetype: _file.file.type,
                    },
                    onError: (error) => {},
                    onProgress: (bytesSent, bytesTotal) => {
                        const percentage = (bytesSent / bytesTotal) * 100
                        console.log(percentage)
                        _setFiles((prev) =>
                            prev.map((_) => {
                                if (_.key !== _file.key) return _
                                return { ..._, bytesSent, bytesTotal, percentage }
                            })
                        )
                    },
                    onSuccess: () => {
                        _setFiles((prev) =>
                            prev.map((_) => {
                                if (_.key !== _file.key) return _
                                return { ..._, status: 'success' }
                            })
                        )
                    },
                })

                upload.findPreviousUploads().then(function (previousUploads) {
                    if (previousUploads.length) {
                        upload.resumeFromPreviousUpload(previousUploads[0])
                    }
                    upload.start()
                })

                // const response = await _dummy(_file)
            } catch (error) {
                console.log(error)
                _setFiles((prev) =>
                    prev.map((_) => {
                        if (_.key !== _file.key) return _
                        return { ..._, status: 'failed' }
                    })
                )
            }
        }

        const _reupload = async (_file: any) => {
            _setFiles((prev) =>
                prev.map((_) => {
                    if (_.key !== _file.key) return _
                    return { ..._, status: 'loading' }
                })
            )
            _upload(_file)
        }

        const _delete = async (_file: any) => {
            _setFiles((prev) =>
                prev.map((_) => {
                    if (_.key !== _file.key) return _
                    return { ..._, delYn: 'Y' }
                })
            )
        }

        // const _dummy = (file: any): any => {
        //     const result = Math.random() < 0.7
        //     return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //             if (result) {
        //                 resolve({
        //                     message: 'message',
        //                     data: { id: 1, index: 0, url: '', size: 100, message: '', key: file.key },
        //                 })
        //             } else {
        //                 reject(file)
        //             }
        //         }, Math.random() * 3000)
        //     })
        // }

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
                        const { key, file, status, percentage } = _file
                        return (
                            <div key={key} className="px-2 py-1 flex justify-between items-center">
                                <span className="font-mono break-all">{file.name}</span>
                                <div className="flex">
                                    {status === 'loading' && (
                                        <div className="flex items-center">
                                            <span>{percentage.toFixed(2)}</span>
                                            <IconButton icon="loading" className="animate-spin" size="xs" />
                                        </div>
                                    )}
                                    {status === 'failed' && (
                                        <IconButton icon="path" size="xs" onClick={() => _reupload(_file)}></IconButton>
                                    )}
                                    {status !== 'loading' && (
                                        <IconButton icon="minus" size="xs" onClick={() => _delete(_file)}></IconButton>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
)
