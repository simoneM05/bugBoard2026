"use client";
import { MoonIcon, SunIcon } from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "./theme-provider";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <Toggle
        variant="outline"
        className="group data-[state=on]:hover:bg-muted size-9 absolute top-3 right-3 data-[state=on]:bg-transparent"
        onPressedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
        <MoonIcon
          size={16}
          className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
          aria-hidden="true"
        />
        <SunIcon
          size={16}
          className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
          aria-hidden="true"
        />
      </Toggle>
    </div>
  );
}
