import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { systemService } from "@/services/system.service.ts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";

export default function TermsAndCondition() {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchTerms = async () => {
            try {
                const data = await systemService.getTerms();
                setContent(data.content || "");
            } catch (error: any) {
                toast.error(error.message || "Failed to load terms");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTerms();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await systemService.updateTerms(content);
            toast.success("Terms & Conditions updated successfully");
        } catch (error: any) {
            toast.error(error.message || "Failed to update terms");
        } finally {
            setIsSaving(false);
        }
    };

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

    if (isLoading) {
        return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="w-[96%] mx-auto mt-4 border min-h-[85vh] overflow-hidden rounded-md p-4 flex flex-col gap-4 bg-white shadow-sm">
            <div className="flex justify-between items-center">
                <h1 className={"text-3xl text-[#123499] font-semibold"}>Terms & Condition</h1>
                <Button 
                    disabled={isSaving}
                    onClick={handleSave}
                    className="bg-[#125BAC] text-white rounded-full px-8"
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </Button>
            </div>
            
            {/* Editor */}
            <div className="flex-1 overflow-hidden min-h-[500px]">
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={handleChange}
                    modules={modules}
                    formats={formats}
                    className="h-[450px]"
                    placeholder="Write your terms and conditions here..."
                />
            </div>
        </div>
    );
}
