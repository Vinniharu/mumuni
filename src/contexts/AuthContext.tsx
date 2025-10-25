"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import toast from "react-hot-toast";

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  admin: Admin | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load token and admin from sessionStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = sessionStorage.getItem("adminToken");
      const storedAdmin = sessionStorage.getItem("adminUser");
      
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedAdmin) {
        try {
          setAdmin(JSON.parse(storedAdmin));
        } catch (e) {
          console.error("Failed to parse stored admin", e);
        }
      }
      setIsInitialized(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const result = await response.json();
      setToken(result.token);
      setAdmin(result.admin);

      if (typeof window !== "undefined") {
        sessionStorage.setItem("adminToken", result.token);
        sessionStorage.setItem("adminUser", JSON.stringify(result.admin));
      }

      toast.success("Login successful!");
      return true;
    } catch (error: any) {
      toast.error(error.message || "Failed to login. Please check your credentials.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminUser");
    }
    toast.success("Logged out successfully!");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        token,
        admin,
        login,
        logout,
        isAuthenticated,
        isLoading: !isInitialized || isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
