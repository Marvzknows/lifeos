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
  navMain: [
    {
      title: "PRODUCTIVITY",
      url: "#",
      items: [
        { title: "Tasks", url: "#", isActive: true, icon: CheckSquare },
        { title: "Calendar", url: "#", isActive: false, icon: Calendar },
        { title: "Notes", url: "#", isActive: false, icon: NotebookText },
        { title: "Goals", url: "#", isActive: false, icon: Target },
        { title: "Journal", url: "#", isActive: false, icon: BookOpen },
      ],
    },
    {
      title: "FINANACE",
      url: "#",
      items: [
        { title: "Overview", url: "#", isActive: false, icon: LayoutDashboard },
        {
          title: "Transactions",
          url: "#",
          isActive: false,
          icon: ArrowLeftRight,
        },
        { title: "Budget", url: "#", isActive: false, icon: Wallet },
        { title: "Bills", url: "#", isActive: false, icon: Receipt },
        { title: "Subscription", url: "#", isActive: false, icon: CreditCard },
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
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="font-semibold text-muted-foreground">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="text-xs"
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
