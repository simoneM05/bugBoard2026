import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Provides authentication context (user and loading) to descendant components.
 *
 * On mount, attempts to read an `accessToken` from localStorage; if present,
 * fetches the current user from `/users/me`, updates the `user` state on success,
 * and always clears the `loading` flag when finished. Errors encountered while
 * fetching are logged to the console.
 *
 * @param children - The descendant React nodes that will receive the auth context
 * @returns A React provider element exposing `{ user, loading }` to its children
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const result = await response.json();
          setUser(result.data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Accesses the authentication context for the current React component tree.
 *
 * @returns The authentication context value containing `user` (the current user or `null`) and `loading` (a boolean indicating whether authentication state is being resolved).
 * @throws Error if called outside of an `AuthProvider`
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth deve essere usato dentro AuthProvider");
  }

  return context;
}