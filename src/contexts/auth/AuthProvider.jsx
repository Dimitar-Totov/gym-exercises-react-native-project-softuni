import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { authService, profileService } from '../../services/index.js'
import { auth } from "../../firebaseConfig.js";

export const AuthContext = createContext({
    login: async (email, password) => { },
    register: async (email, password, username) => { },
    logout: () => { },
    authError: null,
    authState: {},
    isAuthenticated: false,
    updateUser: async (username, password, currentPassword) => { },
});

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({ user: null });
    const [authError, setAuthError] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                async function loadImage() {
                    const profileImage = await profileService.loadProfileImage(user.uid)
                    setAuthState({
                        user: {
                            id: user.uid,
                            email: user.email,
                            username: user.displayName,
                            profileImage: profileImage ? profileImage : null,
                        }
                    });
                }
                loadImage()
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
                    username: user.displayName,
                }
            });
        } catch (error) {
            setAuthError(error.message);
        }
    }

    const register = async (email, password, username) => {
        try {
            const user = await authService.register(email, password, username);

            setAuthState({
                user: {
                    id: user.uid,
                    email: user.email,
                    username: username,
                }
            })
        } catch (error) {
            setAuthError(error.message);
        }
    }

    const updateUser = async (username, password, currentPassword) => profileService.updateUser(username, password, currentPassword)

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
        updateUser,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}
