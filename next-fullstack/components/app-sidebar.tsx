"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavPersonal } from "@/components/nav-personal"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getUser } from "@/lib/supabase/get-user"
import { Tables } from "@/database.types"

// This is sample data.
const data = {
  personal: [
    {
      name: "Dinners",
      url: "#",
      icon: Bot
    },
    {
      name: "Reviews",
      url: "#",
      icon: Bot
    },
    {
      name: "My dishes",
      url: "#",
      icon: Frame,
    },
    {
      name: "Settings",
      url: "#",
      icon: Frame,
    },
  ],
}

type AppSidebarProps = {
  user: Exclude<Awaited<ReturnType<typeof getUser>>, null>,
  households: Tables<'households'>[],
  currentHouseholdId: number,
}

export function AppSidebar({ appSidebar, ...props }: React.ComponentProps<typeof Sidebar> & { appSidebar: AppSidebarProps }) {
  const user = {
    name: "Someone",
    email: appSidebar.user.email || 'Unknown email',
    avatar: "/avatars/shadcn.jpg",
  };
  const currentHousehold = appSidebar.households.find(household => household.id === appSidebar.currentHouseholdId);
  if (!currentHousehold) {
    return <div>Incorrect household</div>
  }
  const teams = [
    {
      id: currentHousehold.id,
      name: currentHousehold.name,
      logo: Command,
      plan: currentHousehold.city,
    },
    ...((appSidebar.households || []).map(household => {
      if (household.id === currentHousehold.id) {
        return
      }
      return {
        id: household.id,
        name: household.name,
        logo: Command,
        plan: household.city,
      }
    })),
  ].filter(v => !!v);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavPersonal personal={data.personal} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
