import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function TermsAndCondition() {
    const [content, setContent] = useState("");

    const handleChange = (value: string) => {
        setContent(value);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "align",
        "list",
        "indent",
        "blockquote",
        "code-block",
        "link",
        "image",
        "video",
    ];

    return (
        <div className="w-[96%] mx-auto mt-4 border h-[85vh] overflow-hidden rounded-md p-4 flex flex-col gap-4">
            <h1 className={"text-3xl text-[#123499] font-semibold"}>Terms & Condition</h1>
            {/* Editor */}
            <ReactQuill
                theme="snow"
                value={content}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                className="w-full h-[88%] bg-white"
                placeholder="Write your terms and conditions here..."
            />

            {/* Preview */}
            {/*<div className="mt-4 h-[30vh] w-full">*/}
            {/*    <h3 className="text-lg font-semibold mb-2">Preview (HTML Output):</h3>*/}
            {/*    <div*/}
            {/*        className="border p-3 rounded-md prose max-w-none"*/}
            {/*        dangerouslySetInnerHTML={{ __html: content }}*/}
            {/*    />*/}
            {/*</div>*/}
        </div>
    );
}
