import {toast} from "sonner";

export function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
        .then(() => {
            toast.success('Copied to clipboard!')
        })
        .catch((err) => {
            toast.error("Could not copy clipboard!")
            console.error("Failed to copy: ", err);
        });
}