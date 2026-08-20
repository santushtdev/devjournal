"use client"
import { Moon, Sun,  StickyNote, } from "lucide-react"

import { FolderPlus, FolderKanban, NotebookPen, Code2 } from "lucide-react";

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar"


import { ModeToggle } from "@/components/mode-toggle";

const items = [
  { title: "Create Project", url: "/projects/new", icon: FolderPlus },
  { title: "Project", url: "/projects", icon: FolderKanban },
  { title: "Notes", url: "/notes", icon: NotebookPen },
  { title: "Snippets", url: "/snippets", icon: Code2 },
];

export function AppSidebar() {
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
const isActive = (url: string) => window.location.pathname === url;

const navigate = (url: string) => {
  window.location.href = url;
};

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
            DJ
          </span>
          <span className="truncate text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            DevJournal
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-[11px] font-medium uppercase tracking-wider text-sidebar-foreground/60">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton isActive={isActive(item.url)} onClick={() => navigate(item.url)}>
  <item.icon className="h-4 w-4" />
  <span>{item.title}</span>
</SidebarMenuButton>

                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">Theme</span>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}