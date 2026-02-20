import { useEffect, useState, useCallback } from "react";
import { systemService } from "@/services/system.service.ts";
import { toast } from "sonner";
import PolicyEditor from "@/components/ui/PolicyEditor";

interface SystemPolicyPageProps {
    type: 'terms' | 'privacy';
}

export default function SystemPolicyPage({ type }: SystemPolicyPageProps) {
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const isTerms = type === 'terms';
    
    const config = {
        title: isTerms ? "Terms & Conditions" : "Privacy Policy",
        description: isTerms 
            ? "Manage the legal agreement for your platform users." 
            : "Define and manage how user data is protected.",
        successMsg: isTerms 
            ? "Terms & Conditions updated successfully" 
            : "Privacy Policy updated successfully",
        errorMsg: isTerms ? "Failed to load terms" : "Failed to load policy"
    };

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = isTerms 
                ? await systemService.getTerms() 
                : await systemService.getPrivacy();
            setContent(data.content || "");
        } catch (error: any) {
            toast.error(error.message || config.errorMsg);
        } finally {
            setIsLoading(false);
        }
    }, [isTerms, config.errorMsg]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (isTerms) {
                await systemService.updateTerms(content);
            } else {
                await systemService.updatePrivacy(content);
            }
            toast.success(config.successMsg);
        } catch (error: any) {
            toast.error(error.message || "Failed to update content");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <PolicyEditor 
            title={config.title}
            description={config.description}
            content={content}
            setContent={setContent}
            onSave={handleSave}
            isLoading={isLoading}
            isSaving={isSaving}
        />
    );
}
