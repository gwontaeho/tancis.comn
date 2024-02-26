import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type EditorProps = {
    children?: React.ReactNode;
    schema?: any[];
    value?: string;
    height?: number;
    edit?: boolean;
    onChange?: (index: number) => void;
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "color",
    "background",
];

const modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
        ["clean"],
    ],
};

export const Editor = (props: EditorProps) => {
    const { height = 400, value, edit = true } = props;
    const changeHandler = (e: any) => {
        console.log(e);
    };

    return (
        <ReactQuill
            defaultValue={value || ""}
            onChange={changeHandler}
            readOnly={!edit}
            style={{
                height: height + "px",
                width: "100%",
                display: "inline-flex",
                flexDirection: "column",
            }}
            theme="snow"
            formats={formats}
            modules={modules}
        />
    );
};
