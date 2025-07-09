import React from "react";
import { useToast } from "../../hooks/useToast";
import { X } from "lucide-react";

const Toast = () => {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) return null;

    return (
        <div className="fixed bottom-5 right-5 z-50 space-y-3 max-w-md">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`flex items-center p-4 rounded-lg shadow-lg 
                        ${
                            toast.type === "success"
                                ? "bg-green-500 text-white"
                                : ""
                        } 
                        ${toast.type === "error" ? "bg-red-500 text-white" : ""}
                        ${toast.type === "info" ? "bg-blue-500 text-white" : ""}
                        ${
                            toast.type === "warning"
                                ? "bg-yellow-500 text-white"
                                : ""
                        }
                        animate-slideIn
                    `}
                >
                    <div className="flex-1">{toast.message}</div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="ml-4 focus:outline-none text-white"
                    >
                        <X size={18} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Toast;
