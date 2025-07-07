import React, { createContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Dummy user data
const dummyUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    token: "dummy-token-123",
};

// AuthContext Provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(dummyUser);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};