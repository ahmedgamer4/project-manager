import Link from 'next/link';
import {
  CalendarBody,
  CalendarDate,
  CalendarDatePagination,
  CalendarDatePicker,
  CalendarHeader,
  CalendarItem,
  CalendarMonthPicker,
  CalendarProvider,
  CalendarYearPicker,
} from '@/components/ui/kibo-ui/calendar';
import { exampleFeatures } from '../data';

const earliestYear =
  exampleFeatures
    .map((feature) => feature.startAt.getFullYear())
    .sort()
    .at(0) ?? new Date().getFullYear();
const latestYear =
  exampleFeatures
    .map((feature) => feature.endAt.getFullYear())
    .sort()
    .at(-1) ?? new Date().getFullYear();

export const TasksCalendar = () => {
  return (
    <CalendarProvider className="h-full">
      <CalendarDate>
        <CalendarDatePicker>
          <CalendarMonthPicker />
          <CalendarYearPicker end={latestYear} start={earliestYear} />
        </CalendarDatePicker>
        <CalendarDatePagination />
      </CalendarDate>
      <CalendarHeader />
      <CalendarBody features={exampleFeatures}>
        {({ feature }) => (
          <Link
            className="flex flex-col gap-2 rounded-md border border-border p-1"
            href={`/tasks/${feature.id}`}
          >
            <CalendarItem feature={feature} key={feature.id} />
          </Link>
        )}
      </CalendarBody>
    </CalendarProvider>
  );
};
