'use client';

import { ChevronDown, Search, SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function WorkspaceSwitcher() {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="flex h-auto items-center gap-2 hover:bg-sidebar-accent"
            variant="ghost"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded bg-purple-500 font-medium text-white text-xs">
              T
            </div>
            <span className="font-medium text-sm">testFirst1</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem>testFirst1</DropdownMenuItem>
          <DropdownMenuItem>Create new workspace</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="ml-auto flex items-center gap-1">
        <Button className="h-8 w-8" size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
        <Button className="h-8 w-8" size="icon" variant="ghost">
          <SquarePen className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
