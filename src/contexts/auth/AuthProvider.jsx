import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { authService } from '../../services/index.js'
import { auth } from "../../firebaseConfig.js";

export const AuthContext = createContext({
    login: async (email, password) => { },
    register: async (username, email, password, rePassword) => { },
    logout: () => { },
    authError: null,
    authState: {},
    isAuthenticated: false
});

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({ user: null });
    const [authError, setAuthError] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthState({
                    user: {
                        id: user.uid,
                        email: user.email,
                        name: user.displayName,
                    }
                });
            } else {
                setAuthState({ user: null });
            }
        });
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const user = await authService.login(email, password);
            setAuthState({
                user: {
                    id: user.uid,
                    email: user.email,
                    name: user.displayName,
                }
            });
        } catch (error) {
            setAuthError(error.message);
        }
    }

    const register = async (username, email, password, rePassword) => {
        try {
            const user = await authService.register(email, password);
            setAuthState({ id: user.id, email: user.email })
        } catch (error) {
            setAuthError(error.message);
        }
    }

    const contextValue = {
        register,
        login,
        logout: async () => {
            try {
                await signOut(auth);
                setAuthState({
                    user: null,
                });
            } catch (err) {
                setAuthError(err.message);
            }
        },
        authError,
        authState,
        isAuthenticated: !!authState.user,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
