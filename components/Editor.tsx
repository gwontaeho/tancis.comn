import React, { useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css";
import { FormControlProps } from "./FormControl";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

type EditorProps = {
    height?: number;
    edit?: boolean;

    name?: string;
    value?: any;
    readOnly?: boolean;
    disabled?: boolean;
    maxLength?: number;
    placeholder?: string;
    defaultValue?: any;
    onBlur?: (arg?: any) => void;
    onFocus?: (arg?: any) => void;
    onChange?: (arg?: any) => void;
};

const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block",
    "float",
    "height",
    "width",
];

const modules = {
    imageActions: {},
    imageFormats: {},
    toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],

        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],

        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],

        ["clean"],
        ["image", "video"],
    ],
};

export const Editor = React.forwardRef<HTMLInputElement, EditorProps>(
    (props: EditorProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        const {
            /** */
            edit = true,
            name,
            value,
            readOnly,
            disabled,
            maxLength,
            placeholder,
            defaultValue,
            height = 400,
            onBlur,
            onFocus,
            onChange,
        } = props;

        const [_value, _setValue] = React.useState<any>(value || "");

        const changeHandler = (props: any) => {
            //console.log(props);
            _setValue(props);
        };

        React.useEffect(() => {
            if (value === _value) return;
            _setValue(value || "");
        }, [value]);

        const handleChange = (value: any) => {
            _setValue(value);

            if (onChange) {
                onChange(value);
            }
        };

        return (
            <div className="w-full">
                {!edit && <div dangerouslySetInnerHTML={{ __html: _value }}></div>}
                <div hidden={!edit}>
                    <ReactQuill
                        value={_value}
                        onChange={handleChange}
                        readOnly={readOnly}
                        theme="snow"
                        formats={formats}
                        modules={modules}
                        style={{
                            height: "400px",
                        }}
                    />
                </div>
            </div>
        );
    },
);
