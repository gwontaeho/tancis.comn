import React, { useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { SunEditorOptions } from "suneditor/src/options";

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

const options: SunEditorOptions = {
    mode: "classic",
    rtl: false,
    katex: "window.katex",
    imageGalleryUrl: "https://etyswjpn79.execute-api.ap-northeast-1.amazonaws.com/suneditor-demo",
    videoFileInput: false,
    tabDisable: false,
    buttonList: [
        [
            "undo",
            "redo",
            "font",
            "fontSize",
            "formatBlock",
            "paragraphStyle",
            "blockquote",
            "bold",
            "underline",
            "italic",
            "strike",
            "subscript",
            "superscript",
            "fontColor",
            "hiliteColor",
            "textStyle",
            "removeFormat",
            "outdent",
            "indent",
            "align",
            "horizontalRule",
            "list",
            "lineHeight",
            "table",
            "link",
            "image",
            "video",
            "audio",
            "math",
            "imageGallery",
            "fullScreen",
            "showBlocks",
            "codeView",
            "preview",
            "print",
            "save",
            "template",
        ],
    ],
};

export const SEditor = React.forwardRef<HTMLInputElement, EditorProps>(
    (props: EditorProps, ref: React.ForwardedRef<any>) => {
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
            height = 300,
            onBlur,
            onFocus,
            onChange,
        } = props;

        const _props = Object.fromEntries(
            Object.entries({
                onBlur,
                onFocus,
                placeholder,
            }).filter(([, value]) => value !== undefined),
        );

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

        useEffect(() => {
            window.addEventListener("error", (e) => {
                if (e.message.startsWith("ResizeObserver")) {
                    const resizeObserverErrDiv = document.getElementById("webpack-dev-server-client-overlay-div");
                    const resizeObserverErr = document.getElementById("webpack-dev-server-client-overlay");
                    if (resizeObserverErr) {
                        resizeObserverErr.setAttribute("style", "display: none");
                    }
                    if (resizeObserverErrDiv) {
                        resizeObserverErrDiv.setAttribute("style", "display: none");
                    }
                }
            });
        }, []);

        return (
            <div className="w-full">
                {!edit && <div dangerouslySetInnerHTML={{ __html: _value }}></div>}
                <div className={edit === false ? "hidden" : "" + "inline-block w-100 min-h-100 h-auto"}>
                    <SunEditor
                        {..._props}
                        setContents={_value}
                        onChange={handleChange}
                        disable={readOnly}
                        hide={!edit}
                        width="100%"
                        height={height + "px"}
                        setOptions={options}
                    />
                </div>
            </div>
        );
    },
);
