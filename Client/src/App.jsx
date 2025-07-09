import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";
import { ToastProvider } from "./context/ToastContext";
import "./styles/globals.css"; // Tailwind CSS file

const App = () => {
    return (
        <AuthProvider>
            <CourseProvider>
                <ToastProvider>
                    <BrowserRouter>
                        <AppRoutes />
                    </BrowserRouter>
                </ToastProvider>
            </CourseProvider>
        </AuthProvider>
    );
};

export default App;
