"use client";

import { useState } from "react";
import { CircleUser, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/utils/ModeToggle";
import Notifications from "./Notifications";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFrappeAuth } from 'frappe-react-sdk';
import UserSettings from "./UserSettings";

interface UserMenuItem {
  label: string;
  route: string;
}

const userMenuItems: UserMenuItem[] = [
  { label: "Dashboard", route: "/dashboard" },
  { label: "Website", route: "/" },
  { label: "Settings", route: "settings" },
  { label: "Support", route: "/support" },
  { label: "Logout", route: "/login" },
];

export function HeaderItems() {
  const navigate = useNavigate();
  const { currentUser, logout } = useFrappeAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleMenuItemClick = (item: UserMenuItem) => {
    if (item.label === "Logout") {
      handleLogout();
    } else if (item.label === "Settings") {
      setIsSettingsOpen(true);
    } else {
      navigate(item.route);
    }
  };

  return (
    <div className="flex h-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-2">
      {currentUser ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-auto h-10 w-10">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Notifications />
            </DropdownMenuContent>
          </DropdownMenu>
           <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userMenuItems.map((item, index) => (
                <DropdownMenuItem 
                  key={index} 
                  onSelect={() => handleMenuItemClick(item)}
                >
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {isSettingsOpen && (
            <UserSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
          )}
        </>
      ) : (
        <>
          <Button variant="ghost" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
          <Button variant="default" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </>
      )}
    
    </div>
  );
}

export default HeaderItems;
