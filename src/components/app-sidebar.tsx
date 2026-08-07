"use client";

import * as React from "react";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  CheckSquare,
  Calendar,
  NotebookText,
  Target,
  BookOpen,
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Receipt,
  CreditCard,
} from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  navItems: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
  ],

  navGroups: [
    {
      title: "PRODUCTIVITY",
      items: [
        { title: "Tasks", url: "/tasks", icon: CheckSquare },
        { title: "Calendar", url: "#", icon: Calendar },
        { title: "Notes", url: "/notes", icon: NotebookText },
        { title: "Goals", url: "#", icon: Target },
        { title: "Journal", url: "/journal", icon: BookOpen },
      ],
    },
    {
      title: "FINANCE",
      items: [
        {
          title: "Transactions",
          url: "#",

          icon: ArrowLeftRight,
        },
        { title: "Budget", url: "#", icon: Wallet },
        { title: "Bills", url: "#", icon: Receipt },
        { title: "Subscriptions", url: "#", icon: CreditCard },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <VersionSwitcher />
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* Standalone items */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    render={<a href={item.url} />}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Grouped items */}
        {data.navGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={pathname === item.url}
                      render={<a href={item.url} />}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
