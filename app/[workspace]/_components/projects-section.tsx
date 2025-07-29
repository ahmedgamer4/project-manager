'use client';

import { ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function ProjectsSection() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between">
        <SidebarGroupLabel
          asChild
          className="flex cursor-pointer items-center gap-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <button className="flex items-center gap-2" type="button">
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
            />
            <span>Projects</span>
          </button>
        </SidebarGroupLabel>
        <Button
          className="h-6 w-6"
          onClick={(e) => {
            e.stopPropagation();
            // Add new project logic
          }}
          size="icon"
          variant="ghost"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>

      {isExpanded && (
        <SidebarGroupContent className="px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-primary p-2 text-primary-foreground text-sm">
                  A
                </div>
                <span>Project Alpha</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-primary p-2 text-primary-foreground text-sm">
                  B
                </div>
                <span>Project Beta</span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton>
                <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-primary p-2 text-primary-foreground text-sm">
                  G
                </div>
                <span>Project Gamma</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      )}
    </SidebarGroup>
  );
}
