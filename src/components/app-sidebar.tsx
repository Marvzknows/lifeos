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

// This is sample data.
const data = {
  navItems: [
    {
      title: "Dashboard",
      url: "#",
      isActive: true,
      icon: LayoutDashboard,
    },
  ],

  navGroups: [
    {
      title: "PRODUCTIVITY",
      items: [
        { title: "Tasks", url: "/tasks", isActive: false, icon: CheckSquare },
        { title: "Calendar", url: "#", isActive: false, icon: Calendar },
        { title: "Notes", url: "notes", isActive: false, icon: NotebookText },
        { title: "Goals", url: "#", isActive: false, icon: Target },
        { title: "Journal", url: "journal", isActive: false, icon: BookOpen },
      ],
    },
    {
      title: "FINANCE",
      items: [
        {
          title: "Transactions",
          url: "#",
          isActive: false,
          icon: ArrowLeftRight,
        },
        { title: "Budget", url: "#", isActive: false, icon: Wallet },
        { title: "Bills", url: "#", isActive: false, icon: Receipt },
        { title: "Subscriptions", url: "#", isActive: false, icon: CreditCard },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                    isActive={item.isActive}
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
                      isActive={item.isActive}
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
