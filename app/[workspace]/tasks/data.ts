import { faker } from '@faker-js/faker';
import { capitalizeFirstLetter } from 'better-auth';
import {
  Circle,
  CircleCheck,
  CircleDashed,
  CircleDot,
  CircleDotDashed,
} from 'lucide-react';

export const columns = [
  {
    id: faker.string.uuid(),
    name: 'Backlog',
    icon: CircleDashed,
  },
  { id: faker.string.uuid(), name: 'Todo', icon: Circle, color: '#6B7280' },
  {
    id: faker.string.uuid(),
    name: 'In Progress',
    icon: CircleDotDashed,
    color: '#F59E0B',
  },
  {
    id: faker.string.uuid(),
    name: 'In Review',
    icon: CircleDot,
    color: '#10B981',
  },
  {
    id: faker.string.uuid(),
    name: 'Done',
    icon: CircleCheck,
    color: '#10B981',
  },
];

const users = Array.from({ length: 4 })
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  }));

export const exampleFeatures = Array.from({ length: 20 })
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    name: capitalizeFirstLetter(faker.company.buzzPhrase()),
    status: {
      id: faker.string.uuid(),
      name: faker.helpers.arrayElement([
        'backlog',
        'todo',
        'in-progress',
        'in-review',
        'done',
      ]) as string,
      color: faker.color.rgb(),
    },
    startAt: faker.date.past({ years: 0.5, refDate: new Date() }),
    endAt: faker.date.future({ years: 0.5, refDate: new Date() }),
    column: faker.helpers.arrayElement(columns).id,
    owner: faker.helpers.arrayElement(users),
  }));
