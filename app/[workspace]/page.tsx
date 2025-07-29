'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { MainNavigation } from './_components/main-navigation';
import { ProjectsSection } from './_components/projects-section';
import { SiteHeader } from './_components/site-header';
import { WorkspaceSwitcher } from './_components/workspace-switcher';

export default function WorkspacePage() {
  return (
    <SidebarProvider
      style={
        {
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <Sidebar>
        <SidebarHeader>
          <WorkspaceSwitcher />
        </SidebarHeader>
        <SidebarContent className="px-2">
          <MainNavigation />
          <ProjectsSection />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <SiteHeader />
        {/* Main content area - blank as requested */}
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <h1 className="font-semibold text-2xl text-muted-foreground">
              Welcome to your workspace
            </h1>
            <p className="mt-2 text-muted-foreground">
              Select an item from the sidebar to get started
            </p>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
