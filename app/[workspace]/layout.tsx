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

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <SidebarInset className="overflow-x-hidden">
        <SiteHeader />

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
