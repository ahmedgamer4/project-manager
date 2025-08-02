'use client';

import { CheckSquare, Home, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function MainNavigation() {
  const { workspace } = useParams();

  return (
    <SidebarMenu className="px-2">
      <SidebarMenuItem>
        <Link className="w-full" href={`/${workspace}`}>
          <SidebarMenuButton>
            <Home />
            Home
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <Link className="w-full" href={`/${workspace}/tasks`}>
          <SidebarMenuButton>
            <CheckSquare />
            <span>My Tasks</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <Link className="w-full" href={`/${workspace}/settings`}>
          <SidebarMenuButton>
            <Settings />
            <span>Settings</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <Link className="w-full" href={`/${workspace}/members`}>
          <SidebarMenuButton>
            <Users />
            <span>Members</span>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
