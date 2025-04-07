"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

function CopyButton({ code }: { code: string }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={copyToClipboard}
            type="button"
            className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 group relative"
        >
            {copied ? (<div className="flex items-center gap-1.5 text-green-400">
                <Check className="size-4 text-green-400" />
                <span className=" text-green-400 text-sm">copied!</span>
            </div>
            ) : (
                <Copy className=" size-4 text-gray-400 group-hover:text-gray-300" />
            )}
        </button>
    );
}

export default CopyButton;