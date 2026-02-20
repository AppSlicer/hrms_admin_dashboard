import { useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { systemService } from "@/services/system.service.ts";
import { toast } from "sonner";
import { Button } from "@/components/ui/button.tsx";
import { Loader2 } from "lucide-react";

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
                        <h1 className={"text-3xl text-gray-900 dark:text-white font-black tracking-tight"}>Terms & Conditions</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Manage the legal agreement for your platform users.</p>
                    </div>
                    <Button 
                        disabled={isSaving}
                        onClick={handleSave}
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
                        className="flex-1 flex flex-col overflow-hidden dark:text-gray-200"
                        placeholder="Write your terms and conditions here..."
                    />
                </div>
            </div>

            <style>{`
                .ql-container.ql-snow {
                    border: none !important;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
                .ql-editor {
                    flex: 1;
                    overflow-y: auto;
                    padding: 2.5rem !important;
                    line-height: 1.8;
                    font-size: 1.05rem;
                    font-family: inherit;
                }
                .ql-toolbar.ql-snow {
                    border: none !important;
                    border-bottom: 1px solid #e5e7eb !important;
                    background: #f9fafb;
                    padding: 1rem 2rem !important;
                }
                .dark .ql-toolbar.ql-snow { 
                    border-bottom: 1px solid #1f2937 !important; 
                    background: #111827; 
                }
                .dark .ql-snow .ql-stroke { stroke: #9ca3af; }
                .dark .ql-snow .ql-fill { fill: #9ca3af; }
                .dark .ql-snow .ql-picker { color: #9ca3af; }
                .dark .ql-editor.ql-blank::before { color: #4b5563; }
                
                /* Custom scrollbar for the editor */
                .ql-editor::-webkit-scrollbar {
                    width: 6px;
                }
                .ql-editor::-webkit-scrollbar-track {
                    background: transparent;
                }
                .ql-editor::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 10px;
                }
                .dark .ql-editor::-webkit-scrollbar-thumb {
                    background: #374151;
                }
            `}</style>
        </div>
    );
}
