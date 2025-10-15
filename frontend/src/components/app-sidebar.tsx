import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ArrowRightToLine, EllipsisVertical, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import ProfileDropDown from "./profile-dropdown";

const sidebarItems = [
  {
    id: "all-issue",
    label: "All Issue",
    path: "/AllIssue",
    hasDropdown: false,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    hasDropdown: true,
  },
];

/**
 * Renders the application's sidebar containing navigation items and a profile dropdown.
 *
 * Renders a vertical list of sidebar items from `sidebarItems`; items with a dropdown expose an inline menu with an "Add" action that invokes the local `handleAdd` handler for that item. The footer displays the profile dropdown.
 *
 * @returns The sidebar JSX element containing the navigation groups and footer profile dropdown.
 */
export function AppSidebar() {
  const handleAdd = (itemLabel: string) => {
    console.log(`Add clicked for ${itemLabel}`);
  };

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent className="flex flex-col gap-0">
        {sidebarItems.map((item) => (
          <SidebarGroup key={item.id}>
            {item.hasDropdown ? (
              <DropdownMenu>
                <Link to={item.path} className="hover:bg-accent rounded-md">
                  <SidebarGroupLabel className="flex justify-between">
                    {item.label}
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="p-0"
                        size="icon"
                        onClick={(e) => e.preventDefault()}
                      >
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                  </SidebarGroupLabel>
                </Link>
                <DropdownMenuContent side="bottom" className="w-10">
                  <DropdownMenuItem
                    className="items-center"
                    onClick={() => handleAdd(item.label)}
                  >
                    <Plus size={12} />
                    <span className="ml-2 text-xs">Add</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to={item.path} className="hover:bg-accent rounded-md">
                <SidebarGroupLabel className="flex justify-between">
                  {item.label}
                  <Button variant="ghost" className="p-0" size="icon">
                    <ArrowRightToLine size={12} />
                  </Button>
                </SidebarGroupLabel>
              </Link>
            )}
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="flex items-center">
        <ProfileDropDown />
      </SidebarFooter>
    </Sidebar>
  );
}