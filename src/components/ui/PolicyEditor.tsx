import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface PolicyEditorProps {
    title: string;
    description: string;
    content: string;
    setContent: (content: string) => void;
    onSave: () => void;
    isLoading: boolean;
    isSaving: boolean;
}

export default function PolicyEditor({
    title,
    description,
    content,
    setContent,
    onSave,
    isLoading,
    isSaving
}: PolicyEditorProps) {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-[#125BAC] animate-spin" />
                <p className="text-blue-600 font-semibold">Loading editor...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full p-6 flex flex-col bg-transparent overflow-hidden">
            <div className="bg-white dark:bg-card border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-8 shadow-xl flex flex-col flex-1 overflow-hidden relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 shrink-0 relative z-10">
                    <div>
                        <h1 className={"text-3xl text-[#123499] dark:text-blue-400 font-black tracking-tight"}>{title}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{description}</p>
                    </div>
                    <Button 
                        disabled={isSaving}
                        onClick={onSave}
                        className="bg-[#125BAC] dark:bg-blue-600 text-white rounded-full px-10 h-12 font-bold shadow-lg shadow-blue-100 dark:shadow-none transition-all active:scale-95"
                    >
                        {isSaving ? <Loader2 className="animate-spin mr-2" size={18} /> : null}
                        {isSaving ? "Saving Changes..." : "Save Changes"}
                    </Button>
                </div>
                
                {/* Full Body Editor Container */}
                <div className="flex-1 flex flex-col overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-inner">
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        className="flex-1 flex flex-col overflow-hidden"
                        placeholder={`Write your ${title.toLowerCase()} here...`}
                    />
                </div>
            </div>
        </div>
    );
}
