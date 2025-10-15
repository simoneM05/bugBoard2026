import { Outlet } from "react-router-dom";
import ThemeSwitcher from "./theme-switcher";
import { SidebarProvider, SidebarTrigger, SidebarInset } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";

const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="ml-auto">
            <ThemeSwitcher />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
