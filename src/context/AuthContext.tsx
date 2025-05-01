
import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { authService } from "@/services/auth.service";
import { User } from "@/types/database.types";
import { toast } from "sonner";

export type UserRole = "company" | "client";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isCompany: boolean;
  isClient: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// For development purposes only
const MOCK_USERS = [
  {
    id: "1",
    name: "Solar Company",
    email: "company@example.com",
    password: "password123",
    role: "company" as UserRole,
  },
  {
    id: "2",
    name: "Client User",
    email: "client@example.com",
    password: "password123", 
    role: "client" as UserRole,
  },
];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Check if user is authenticated with Supabase
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const userData = await authService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          fetchUser();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    // Initial user fetch
    fetchUser();

    // Cleanup listener
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // For development purposes, check if using mock users
      const mockUser = MOCK_USERS.find(
        (u) => u.email === email && u.password === password
      );

      if (mockUser) {
        // Using mock auth for development
        const { password: _, ...userWithoutPassword } = mockUser;
        setUser(userWithoutPassword as unknown as User);
        localStorage.setItem("solarUser", JSON.stringify(userWithoutPassword));
        toast.success("Login bem-sucedido (modo de desenvolvimento)");
        return;
      }

      // Production auth with Supabase
      await authService.login(email, password);
      const userData = await authService.getCurrentUser();
      
      if (!userData) {
        throw new Error("Usuário não encontrado");
      }
      
      setUser(userData);
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error("Falha no login", {
        description: error.message || "Verifique suas credenciais e tente novamente"
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // For development with mock users
      if (localStorage.getItem("solarUser")) {
        localStorage.removeItem("solarUser");
        setUser(null);
        return;
      }
      
      // Production logout with Supabase
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Erro ao fazer logout", {
        description: "Tente novamente ou recarregue a página"
      });
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
    isCompany: user?.role === "company",
    isClient: user?.role === "client",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
