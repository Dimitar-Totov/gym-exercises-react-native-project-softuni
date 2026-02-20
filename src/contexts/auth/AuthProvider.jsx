import { createContext, useState } from "react";

import { authService } from '../../services/index.js'

export const AuthContext = createContext({
    login: async (email, password) => { },
    logout: () => { },
    authError: null,
    auth: {},
});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [authError, setAuthError] = useState(null)

    const login = async (email, password) => {
        try {
            const user = await authService.login(email, password);
            setAuth({ id: user.id, email: user.email })
        } catch (error) {
            setAuthError(error.message);
        }
    }
    const contextValue = {
        login,
        logout: () => setAuth({}),
        authError,
        auth,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
