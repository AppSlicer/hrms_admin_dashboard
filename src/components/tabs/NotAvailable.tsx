import type {FC, JSX} from "react";

interface NotAvailableProps {
    title?: string;
    message?: string;
    icon?: JSX.Element;
}

const NotAvailable: FC<NotAvailableProps> = ({
                                                 title = "Content Not Available",
                                                 message = "This section is currently empty or unavailable.",
                                                 icon,
                                             }) => {
    return (
        <div className="flex flex-col items-center justify-center p-10 text-center w-full h-full">
            <div className="text-6xl mb-4 text-gray-300">
                {icon || <span>🚫</span>}
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-700">{title}</h2>
            <p className="text-gray-500">{message}</p>
        </div>
    );
};

export default NotAvailable;