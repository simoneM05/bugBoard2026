import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

const ProfileDropDown = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("✅ Logout successful");
      } else {
        console.error("❌ Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("💥 Error during logout:", error);
    } finally {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  };

  // Mostra skeleton durante il caricamento
  if (loading) {
    return (
      <div className="flex items-center gap-3 w-full p-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    );
  }

  // Non mostrare nulla se non c'è utente
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 w-full p-2 hover:bg-accent rounded-md cursor-pointer">
          <Avatar>
            <AvatarFallback>
              {user.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" className="w-56">
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-red-600 cursor-pointer"
        >
          {isLoggingOut ? "Disconnessione..." : "Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
