import type { User } from "@/types/auth";
import { logoutUser, getCurrentUser } from "@/services/auth";
import { AuthContext } from "./CreateContext";
import type { ReactNode } from "react";
import { useState,useEffect } from "react";

interface AuthProviderProps {
     children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            try {
                 const response = await getCurrentUser();
                 console.log(response)
                setUser(response);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

 ;

    const logout = async () => {
        try {
            await logoutUser();
        } finally {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}