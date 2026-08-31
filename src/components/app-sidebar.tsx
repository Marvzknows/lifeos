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
  ChartBarStacked,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "@/components/ui/sidebar";

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
        { title: "Tasks", url: "/tasks", icon: CheckSquare, disable: false },
        { title: "Calendar", url: "#", icon: Calendar, disable: true },
        { title: "Notes", url: "/notes", icon: NotebookText, disable: false },
        { title: "Goals", url: "#", icon: Target, disable: true },
        { title: "Journal", url: "/journal", icon: BookOpen, disable: false },
      ],
    },
    {
      title: "FINANCE",
      items: [
        {
          title: "Transactions",
          url: "/transactions",

          icon: ArrowLeftRight,
          disable: false
        },
        { title: "Budget", url: "/budget", icon: Wallet, disable: false },
        { title: "Categories", url: "/categories", icon: ChartBarStacked, disable: false },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavigation = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between">
          <VersionSwitcher />
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
                    render={<Link href={item.url} />}
                    onClick={handleNavigation}
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
                      render={<Link aria-disabled={item.disable} href={item.url} />}
                      onClick={handleNavigation}
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
