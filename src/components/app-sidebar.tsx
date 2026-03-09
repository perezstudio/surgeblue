import * as React from "react"
import {
  Bell,
  MessageSquare,
  MessagesSquare,
  Rss,
  BookOpen,
  Calendar,
  Phone,
  LayoutGrid,
  Star,
  LifeBuoy,
  Send,
} from "lucide-react"

import { TeamSwitcher } from "@/components/team-switcher"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  community: [
    { title: "Feed", url: "/app/community/feed", icon: Rss },
    { title: "Notifications", url: "#", icon: Bell },
    { title: "Discussions", url: "#", icon: MessagesSquare },
    { title: "Chat", url: "#", icon: MessageSquare },
  ],
  helpDesk: [
    { title: "Resources", url: "/app/help-desk/resources", icon: BookOpen },
    { title: "Events", url: "#", icon: Calendar },
    { title: "Schedule A Call", url: "#", icon: Phone },
  ],
  trainingFavorites: [
    { title: "Canvassing 101", url: "#" },
    { title: "Voter Outreach", url: "#" },
    { title: "Campaign Finance", url: "#" },
  ],
  navSecondary: [
    { title: "Support", url: "#", icon: LifeBuoy },
    { title: "Feedback", url: "#", icon: Send },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {/* Community */}
        <SidebarGroup>
          <SidebarGroupLabel>Community</SidebarGroupLabel>
          <SidebarMenu>
            {data.community.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Help Desk */}
        <SidebarGroup>
          <SidebarGroupLabel>Help Desk</SidebarGroupLabel>
          <SidebarMenu>
            {data.helpDesk.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Training */}
        <SidebarGroup>
          <SidebarGroupLabel>Training</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Categories">
                <a href="#/training/categories">
                  <LayoutGrid />
                  <span>Categories</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {data.trainingFavorites.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <a href={item.url}>
                    <Star className="text-yellow-500" />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
