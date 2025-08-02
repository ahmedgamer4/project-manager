'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TasksCalendar } from './_components/calendar';
import { TasksKanban } from './_components/kanban';
import { exampleFeatures } from './data';

export default function TasksPage() {
  const [features, setFeatures] = useState(exampleFeatures);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col p-4">
      {/* <div className="flex h-full w-full flex-col rounded-md border border-border p-4"> */}
      <Tabs className="flex h-full flex-col space-y-3" defaultValue="kanban">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="kanban">Kanban</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          <Button
            className="!gap-2"
            size={'sm'}
            variant={'skeuomorphic-subtle'}
          >
            <Plus />
            New
          </Button>
        </div>
        <Separator orientation="horizontal" />
        <TabsContent className="flex-1 overflow-hidden" value="kanban">
          <TasksKanban
            features={features}
            hoveredColumn={hoveredColumn}
            setFeatures={setFeatures}
            setHoveredColumn={setHoveredColumn}
          />
        </TabsContent>
        <TabsContent className="flex-1" value="calendar">
          <ScrollArea className="h-[calc(100vh-130px-var(--header-height))]">
            <TasksCalendar />
          </ScrollArea>
        </TabsContent>
      </Tabs>
      {/* </div> */}
    </div>
  );
}
