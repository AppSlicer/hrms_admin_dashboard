import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setCoords({
                x: rect.left + rect.width / 2,
                y: rect.top - 10
            });
            setIsVisible(true);
        }
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    return (
        <div 
            ref={triggerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-full truncate overflow-hidden"
        >
            {children}
            {isVisible && content && ReactDOM.createPortal(
                <div 
                    style={{ 
                        left: `${coords.x}px`, 
                        top: `${coords.y}px`,
                        transform: 'translate(-50%, -100%)'
                    }}
                    className="fixed z-[9999] px-3 py-2 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-xl pointer-events-none animate-in fade-in zoom-in-95 duration-200 max-w-xs break-words whitespace-normal"
                >
                    {content}
                    {/* Arrow */}
                    <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                </div>,
                document.body
            )}
        </div>
    );
}
