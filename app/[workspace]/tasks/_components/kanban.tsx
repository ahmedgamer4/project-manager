import { Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  KanbanBoard,
  KanbanCard,
  KanbanCards,
  KanbanHeader,
  KanbanProvider,
} from '@/components/ui/kibo-ui/kanban';
import { columns } from '../data';

type KanbanFeature = {
  id: string;
  name: string;
  status: {
    id: string;
    name: string;
    color: string;
  };
  startAt: Date;
  endAt: Date;
  column: string;
  owner: {
    id: string;
    name: string;
    image: string;
  };
};

type KanbanProps = {
  features: KanbanFeature[];
  setFeatures: (features: KanbanFeature[]) => void;
  hoveredColumn: string | null;
  setHoveredColumn: (column: string | null) => void;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const shortDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
});

export const TasksKanban = ({
  features,
  setFeatures,
  hoveredColumn,
  setHoveredColumn,
}: KanbanProps) => {
  return (
    <KanbanProvider
      className="w-full"
      columns={columns}
      data={features}
      onDataChange={setFeatures}
    >
      {(column) => (
        <KanbanBoard
          id={column.id}
          key={column.id}
          onMouseEnter={() => {
            setHoveredColumn(column.id);
          }}
          onMouseLeave={() => {
            setHoveredColumn(null);
          }}
        >
          <KanbanHeader className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <column.icon size={18} style={{ color: column.color }} />
              <span>{column.name}</span>
            </div>
            <Button
              className="h-7 w-7 hover:bg-background"
              size="sm"
              variant="ghost"
            >
              <Plus size={16} />
            </Button>
          </KanbanHeader>
          <KanbanCards id={column.id}>
            {(feature: (typeof features)[number]) => (
              <KanbanCard
                column={column.id}
                id={feature.id}
                key={feature.id}
                name={feature.name}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <column.icon
                      className="min-h-4 min-w-4"
                      size={16}
                      style={{ color: column.color }}
                    />
                    <p className="m-0 flex-1 font-medium text-sm">
                      {feature.name}
                    </p>
                  </div>

                  {feature.owner && (
                    <Avatar className="h-4 w-4 shrink-0">
                      <AvatarImage src={feature.owner.image} />
                      <AvatarFallback>
                        {feature.owner.name?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <p className="m-0 text-muted-foreground text-xs">
                  {shortDateFormatter.format(feature.startAt)} -{' '}
                  {dateFormatter.format(feature.endAt)}
                </p>
              </KanbanCard>
            )}
          </KanbanCards>
          {hoveredColumn === column.id && (
            <div className="flex items-center justify-center p-2">
              <Button className="w-full" size="sm" variant="outline">
                <Plus size={16} />
              </Button>
            </div>
          )}
        </KanbanBoard>
      )}
    </KanbanProvider>
  );
};
