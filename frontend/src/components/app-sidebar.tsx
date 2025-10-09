import {
  Sidebar,
  SidebarContent,
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
import {
  ArrowRightToLine,
  Edit2,
  EllipsisVertical,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

// Definisci i dati della sidebar
const sidebarItems = [
  {
    id: "all-issue",
    label: "All Issue",
    path: "/",
    hasDropdown: false,
  },
  {
    id: "faq",
    label: "Faq",
    path: "/faq",
    hasDropdown: true,
  },
  {
    id: "docs",
    label: "Docs",
    path: "/docs",
    hasDropdown: true,
  },
  {
    id: "feature",
    label: "Feature",
    path: "/feature",
    hasDropdown: true,
  },
  {
    id: "bug",
    label: "Bug",
    path: "/bug",
    hasDropdown: true,
  },
];

export function AppSidebar() {
  const handleAdd = (itemLabel: string) => {
    console.log(`Add clicked for ${itemLabel}`);
    // Implementa la logica di add qui
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
                  <DropdownMenuItem
                    className="items-center"
                    onClick={() => handleAdd(item.label)}
                  >
                    <Trash2 size={12} />
                    <span className="ml-2 text-xs">Delete</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="items-center"
                    onClick={() => handleAdd(item.label)}
                  >
                    <Edit2 size={12} />
                    <span className="ml-2 text-xs">Edit</span>
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
    </Sidebar>
  );
}
