"use client";

import usersApi from "@/apis/users/users";
import { IUser } from "@/types/User";
import {
  getTokenFromLS,
  removeTokenFromLS,
  setTokenToLS,
} from "@/lib/utils/localStorage";
import { addToast } from "@heroui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  profile: IUser | null;
  login: (tokens: { accessToken: string; refreshToken: string }) => void;
  logout: (isForced?: boolean) => void;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const handleLogin = (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => {
    setTokenToLS(tokens);
    setIsAuthenticated(true);
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  };

  const handleLogout = useCallback(
    (isForced: boolean = false) => {
      removeTokenFromLS();
      setIsAuthenticated(false);
      queryClient.removeQueries({ queryKey: ["profile"] });
      queryClient.clear();

      addToast({
        title: isForced ? "Session Expired" : "Logout Successful",
        description: isForced
          ? "Your session has expired, please log in again."
          : "You have been logged out successfully.",
        color: isForced ? "warning" : "success",
      });

      router.push("/sign-in");
    },
    [router, queryClient]
  );

  useEffect(() => {
    const initializeAuth = () => {
      const tokens = getTokenFromLS();
      if (tokens?.accessToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    initializeAuth();

    const handleStorageChange = () => {
      const currentTokens = getTokenFromLS();
      if (!currentTokens?.accessToken) {
        setIsAuthenticated(false);
        queryClient.removeQueries({ queryKey: ["profile"] });
      } else {
        setIsAuthenticated(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [queryClient]);

  const {
    data: profile,
    isError,
    refetch,
    isLoading: isProfileLoading,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => (await usersApi.getMe()).data,
    enabled: !!isAuthenticated,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const performLogout = () => handleLogout(true);

    window.addEventListener("auth:logout", performLogout);

    return () => {
      window.removeEventListener("auth:logout", performLogout);
    };
  }, [handleLogout]);

  const isLoading =
    isAuthenticated === null || (isAuthenticated === true && isProfileLoading);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!isAuthenticated && !isError,
        isLoading,
        profile: profile || null,
        login: handleLogin,
        logout: handleLogout,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider, useAuthContext };
