import React, { useState, useCallback } from "react";
import { ToastContext } from "./ToastContextCreator";

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    // Add a new toast - memoized to prevent infinite update loops
    const showToast = useCallback(
        (message, type = "success", duration = 3000) => {
            const id = Date.now();
            setToasts((prevToasts) => [
                ...prevToasts,
                { id, message, type, duration },
            ]);

            // Auto remove toast after duration
            setTimeout(() => {
                setToasts((prevToasts) =>
                    prevToasts.filter((toast) => toast.id !== id)
                );
            }, duration);

            return id;
        },
        []
    );

    // Remove a toast by id - memoized to prevent infinite update loops
    const removeToast = useCallback((id) => {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        );
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
            {children}
        </ToastContext.Provider>
    );
};
