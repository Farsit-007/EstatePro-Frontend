"use client";
import * as React from "react";
import { Building, Settings, SquareTerminal } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
// import Logo from "@/app/assets/svgs/Logo";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { IUser } from "@/types/user";

const navDataByRole = {
  tenant: [
    {
      title: "Dashboard",
      url: "/tenant/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "My Rental Request",
      url: "/tenant/my-rental-request",
      icon: SquareTerminal,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: Settings,
    },
  ],
  landlord: [
    {
      title: "Dashboard",
      url: "/landlord/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Manage Rental House",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Create Rental House",
          url: "/landlord/manage-rental-house",
        },
        {
          title: "Rental House List",
          url: "/landlord/house-list",
        },
      ],
    },
    {
      title: "Manage Rental Request",
      url: "/landlord/manage-rental-request",
      icon: SquareTerminal,
    },

    {
      title: "Profile",
      url: "/profile",
      icon: Settings,
    },
  ],
  admin: [
    {
      title: "Admin Dashboard",
      url: "/admin/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "User Management",
      url: "/admin/user-managment",
      icon: SquareTerminal,
    },
    {
      title: "All Listing House",
      url: "/admin/all-listing-house",
      icon: SquareTerminal,
    },
    {
      title: "All Rental Request",
      url: "/admin/all-request",
      icon: SquareTerminal,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: Settings,
    },
  ],
};
type AppSidebarProps = {
  user: IUser;
} & React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const role = user?.role;
  const items = navDataByRole[role!];
  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link
                href="/"
                className="flex items-center gap-2 group"
                prefetch={false}
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                  <div className="relative px-4 py-1 bg-white dark:bg-gray-900 ring-1 ring-gray-900/5 rounded-full leading-none flex items-center">
                    <Building className="h-5 w-5 text-purple-600" />
                    <span className="ml-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                      EstatePro
                    </span>
                  </div>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
